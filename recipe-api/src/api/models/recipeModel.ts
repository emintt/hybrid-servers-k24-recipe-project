import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {RecipeItem, TokenContent} from '@sharedTypes/DBTypes';
import promisePool from '../../lib/db';
import {fetchData} from '../../lib/functions';
import {MessageResponse} from '@sharedTypes/MessageTypes';

/**
 * Get all media items from the database
 *
 * @returns {array} - array of media items
 * @throws {Error} - error if database query fails
 */

const fetchAllRecipe = async (): Promise<RecipeItem[] | null> => {
  const uploadPath = process.env.UPLOAD_URL;
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      `SELECT *,
      CONCAT(?, filename) AS filename,
      CONCAT(?, CONCAT(filename, "-thumb.png")) AS thumbnail
      FROM RecipeItems`,
      [uploadPath, uploadPath]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllRecipe error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const fetchAllRecipeByAppId = async (
  id: string
): Promise<RecipeItem[] | null> => {
  const uploadPath = process.env.UPLOAD_URL;
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      `SELECT *,
      CONCAT(?, filename) AS filename,
      CONCAT(?, CONCAT(filename, "-thumb.png")) AS thumbnail
      FROM RecipeItems
      WHERE app_id = ?`,
      [uploadPath, uploadPath, id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllMedia error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Get media item by id from the database
 *
 * @param {number} id - id of the media item
 * @returns {object} - object containing all information about the media item
 * @throws {Error} - error if database query fails
 */

const fetchRecipeById = async (id: number): Promise<RecipeItem | null> => {
  const uploadPath = process.env.UPLOAD_URL;
  try {
    // TODO: replace * with specific column names needed in this case
    const sql = `SELECT *,
                CONCAT(?, filename) AS filename,
                CONCAT(?, CONCAT(filename, "-thumb.png")) AS thumbnail
                FROM RecipeItems
                WHERE media_id=?`;
    const params = [uploadPath, uploadPath, id];
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      sql,
      params
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('fetchRecipeById error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Add new media item to database
 *
 * @param {object} media - object containing all information about the new media item
 * @returns {object} - object containing id of the inserted media item in db
 * @throws {Error} - error if database query fails
 */
const postRecipe = async (
  media: Omit<RecipeItem, 'recipe_id' | 'created_at'>
): Promise<RecipeItem | null> => {
  //  filename, filesize, media_type tulee upload media
  const {user_id, filename, filesize, media_type, title, description,
    serving, cook_time, ingredients, instruction} = media;
  const sql = `INSERT INTO RecipeItems (user_id, filename, filesize, media_type, title, description,
    serving, cook_time, ingredients, instruction)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, filesize, media_type, title, description,
    serving, cook_time, ingredients, instruction];
  try {
    const result = await promisePool.execute<ResultSetHeader>(sql, params);
    console.log('result', result);
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      'SELECT * FROM RecipeItems WHERE recipe_id = ?',
      [result[0].insertId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Update media item in database
 *
 * @param {object} media - object containing all information about the media item
 * @param {number} id - id of the media item
 * @returns {object} - object containing id of the updated media item in db
 * @throws {Error} - error if database query fails
 */

const putMedia = async (
  media: Pick<RecipeItem, 'title' | 'description'>,
  id: number
) => {
  try {
    const sql = promisePool.format('UPDATE RecipeItems SET ? WHERE ?', [
      media,
      id,
    ]);
    const result = await promisePool.execute<ResultSetHeader>(sql);
    console.log('result', result);
    return {media_id: result[0].insertId};
  } catch (e) {
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Delete media item from database
 *
 * @param {number} id - id of the media item
 * @returns {object} - object containing id of the deleted media item in db
 * @throws {Error} - error if database query fails
 */

const deleteRecipe = async (
  id: number,
  user: TokenContent,
  token: string
): Promise<MessageResponse> => {
  console.log('deleteRecipe', id);
  const media = await fetchRecipeById(id);
  console.log(media);

  if (!media) {
    return {message: 'Media not found'};
  }

  // if admin add user_id from media object to user object from token content
  if (user.level_name === 'Admin') {
    user.user_id = media.user_id;
  }

  // remove environment variable UPLOAD_URL from filename
  media.filename = media?.filename.replace(
    process.env.UPLOAD_URL as string,
    ''
  );

  console.log(token);

  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM Likes WHERE media_id = ?;', [id]);

    await connection.execute('DELETE FROM Comments WHERE media_id = ?;', [id]);

    await connection.execute('DELETE FROM Ratings WHERE media_id = ?;', [id]);

    // ! user_id in SQL so that only the owner of the media item can delete it
    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM RecipeItems WHERE media_id = ? and user_id = ?;',
      [id, user.user_id]
    );

    if (result.affectedRows === 0) {
      return {message: 'Media not deleted'};
    }

    // delete file from upload server
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const deleteResult = await fetchData<MessageResponse>(
      `${process.env.UPLOAD_SERVER}/delete/${media.filename}`,
      options
    );

    console.log('deleteResult', deleteResult);
    if (deleteResult.message !== 'File deleted') {
      throw new Error('File not deleted');
    }

    // if no errors commit transaction
    await connection.commit();

    return {message: 'Media deleted'};
  } catch (e) {
    await connection.rollback();
    console.error('error', (e as Error).message);
    throw new Error((e as Error).message);
  } finally {
    connection.release();
  }
};

/**
 * Get all the most liked media items from the database
 *
 * @returns {object} - object containing all information about the most liked media item
 * @throws {Error} - error if database query fails
 */

const fetchMostLikedRecipe = async (): Promise<RecipeItem | undefined> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      'SELECT * FROM `MostLikedRecipe`'
    );
    if (rows.length === 0) {
      return undefined;
    }
    rows[0].filename =
      process.env.MEDIA_SERVER + '/uploads/' + rows[0].filename;
  } catch (e) {
    console.error('getMostLikedRecipe error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Get all the most commented media items from the database
 *
 * @returns {object} - object containing all information about the most commented media item
 * @throws {Error} - error if database query fails
 */

const fetchMostCommentedRecipe = async (): Promise<RecipeItem | undefined> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      'SELECT * FROM `MostCommentedRecipe`'
    );
    if (rows.length === 0) {
      return undefined;
    }
    rows[0].filename =
      process.env.MEDIA_SERVER + '/uploads/' + rows[0].filename;
  } catch (e) {
    console.error('getMostCommentedRecipe error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

/**
 * Get all the highest rated media items from the database
 *
 * @returns {object} - object containing all information about the highest rated media item
 * @throws {Error} - error if database query fails
 */

const fetchHighestRatedRecipe = async (): Promise<RecipeItem | undefined> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & RecipeItem[]>(
      'SELECT * FROM `HighestRatedRecipe`'
    );
    if (rows.length === 0) {
      return undefined;
    }
    rows[0].filename =
      process.env.MEDIA_SERVER + '/uploads/' + rows[0].filename;
    return rows[0];
  } catch (e) {
    console.error('getHighestRatedRecipe error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {
  fetchAllRecipe,
  fetchAllRecipeByAppId,
  fetchRecipeById,
  postRecipe,
  deleteRecipe,
  fetchMostLikedRecipe,
  fetchMostCommentedRecipe,
  fetchHighestRatedRecipe,
  putMedia,
};
