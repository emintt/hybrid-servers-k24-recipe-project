/**
 * @api {get} /media?page=1?limit=10 Get Media List
 * @apiName GetMediaList
 * @apiGroup Media
 *
 * @apiParam {Number} [page=1] Page number. Use both page and limit to implement pagination.
 * @apiParam {Number} [limit=10] Number of items per page. Use both page and limit to implement pagination.
 *
 * @apiSuccess {Object[]} media_list List of media items.
 * @apiSuccess {Number} media_list.media_id Media's unique ID.
 * @apiSuccess {Number} media_list.user_id User's unique ID.
 * @apiSuccess {String} media_list.filename Media's filename.
 * @apiSuccess {Number} media_list.filesize Media's filesize.
 * @apiSuccess {String} media_list.media_type Media's type.
 * @apiSuccess {String} media_list.title Media's title.
 * @apiSuccess {String} media_list.description Media's description.
 * @apiSuccess {String} media_list.created_at Media's creation date.
 * @apiSuccess {String} media_list.thumbnail Media's thumbnail.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "media_id": 73,
 *             "user_id": 7,
 *             "filename": "//localhost:3002/uploads/example.png",
 *             "filesize": 1256723,
 *             "media_type": "image/png",
 *             "title": "Example Title",
 *             "description": "Example Description",
 *             "created_at": "2024-01-26T09:38:08.000Z",
 *             "thumbnail": "//localhost:3002/uploads/example-thumb.png"
 *         },
 *         {
 *             "media_id": 74,
 *             "user_id": 7,
 *             "filename": "//localhost:3002/uploads/example.jpg",
 *             "filesize": 1642268,
 *             "media_type": "image/jpeg",
 *             "title": "Another Title",
 *             "description": "Another Description",
 *             "created_at": "2024-01-26T09:40:34.000Z",
 *             "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *         }
 *     ]
 *
 * @apiError MediaNotFound No media items found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 */
/**
 * @api {post} /media Post Media
 * @apiName PostMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {String} title Title of the recipe.
 * @apiParam {String} [description] Description of the recipe (optional).
 * @apiParam {String} filename Filename of the recipe.
 * @apiParam {String} media_type Type of the recipe.
 * @apiParam {Number} filesize Size of the recipe file.
 * @apiParam {String} serving Serving of the recipe.
 * @apiParam {String} ingredients Ingredients of the recipe.
 * @apiParam {String} cook_time Cook_time of the recipe.
 * @apiParam {String} instruction Instruction of the recipe.
 *
 * @apiExample {json} Request-Example:
 *     {
 *       "title": "Example Title",
 *       "description": "Example Description",
 *       "filename": "example.jpg",
 *       "media_type": "image/jpg",
 *       "filesize": 12345,
 *       "serving": "2 annosta";
 *       "cook_time": "30 min";
 *       "ingredients": "example ingredients";
 *       "instruction": "example instruction";
 *     }
 *
 * @apiSuccess {Number} media_id ID of the recipe.
 * @apiSuccess {Number} user_id ID of the user who posted the media.
 * @apiSuccess {String} filename Filename of the recipe.
 * @apiSuccess {Number} filesize Size of the recipe file.
 * @apiSuccess {String} media_type Type of the recipe.
 * @apiSuccess {String} title Title of the recipe.
 * @apiSuccess {String} description Description of the recipe.
 * @apiSuccess {String} media.serving Serving of the recipe.
 * @apiSuccess {String} media.ingredients Ingredients of the recipe.
 * @apiSuccess {String} media.cook_time Cook_time of the recipe.
 * @apiSuccess {String} media.instruction Instruction of the recipe.
 * @apiSuccess {String} created_at Timestamp when the media was created.
 * @apiSuccess {String} thumbnail Thumbnail of the recipe.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media_id": 1,
 *       "user_id": 1,
 *       "filename": "example.jpg",
 *       "filesize": 12345,
 *       "media_type": "image/jpg",
 *       "title": "Example Title",
 *       "description": "Example Description",
 *       "serving": "2 annosta";
 *       "cook_time": "30 min";
 *       "ingredients": "example ingredients";
 *       "instruction": "example instruction";
 *       "created_at": "2024-01-26T09:38:08.000Z",
 *       "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *     }
 *
 * @apiError MediaNotCreated Media not created.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Media not created"
 *     }
 *
 */

/**
 * @api {get} /media/mostcommented Get Most Commented Recipe
 * @apiName GetMostCommentedMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiSuccess {Object[]} media Array of 4 most commented media objects.
 * @apiSuccess {Number} media.media_id ID of the recipe.
 * @apiSuccess {Number} media.user_id ID of the user who posted the media.
 * @apiSuccess {String} media.filename Filename of the recipe.
 * @apiSuccess {Number} media.filesize Size of the recipe file.
 * @apiSuccess {String} media.media_type Type of the recipe.
 * @apiSuccess {String} media.title Title of the recipe.
 * @apiSuccess {String} media.description Description of the recipe.
 * @apiSuccess {String} media.serving Serving of the recipe.
 * @apiSuccess {String} media.ingredients Ingredients of the recipe.
 * @apiSuccess {String} media.cook_time Cook_time of the recipe.
 * @apiSuccess {String} media.instruction Instruction of the recipe.
 * @apiSuccess {String} media.created_at Timestamp when the media was created.
 * @apiSuccess {String} media.thumbnail Thumbnail of the recipe.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "media_id": 1,
 *         "user_id": 1,
 *         "filename": "example.jpg",
 *         "filesize": 12345,
 *         "media_type": "image/jpg",
 *         "title": "Example Title",
 *         "description": "Example Description",
 *       "serving": "2 annosta";
 *       "cook_time": "30 min";
 *       "ingredients": "example ingredients";
 *       "instruction": "example instruction";
 *         "created_at": "2024-01-26T09:38:08.000Z",
 *         "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *       },
 *       ...
 *     ]
 *
 * @apiError MediaNotFound No media items found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 */

/**
 * @api {get} /media/:id Get Recipe
 * @apiName GetMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Object[]} media Array of media objects.
 * @apiSuccess {Number} media.media_id ID of the recipe.
 * @apiSuccess {Number} media.user_id ID of the user who posted the media.
 * @apiSuccess {String} media.filename Filename of the recipe.
 * @apiSuccess {Number} media.filesize Size of the recipe file.
 * @apiSuccess {String} media.media_type Type of the recipe.
 * @apiSuccess {String} media.title Title of the recipe.
 * @apiSuccess {String} media.description Description of the recipe.
 * @apiSuccess {String} media.serving Serving of the recipe.
 * @apiSuccess {String} media.ingredients Ingredients of the recipe.
 * @apiSuccess {String} media.cook_time Cook_time of the recipe.
 * @apiSuccess {String} media.instruction Instruction of the recipe.
 * @apiSuccess {String} media.created_at Timestamp when the media was created.
 * @apiSuccess {String} media.thumbnail Thumbnail of the recipe.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "media_id": 1,
 *         "user_id": 1,
 *         "filename": "example.jpg",
 *         "filesize": 12345,
 *         "media_type": "image/jpg",
 *         "title": "Example Title",
 *         "description": "Example Description",
 *         "serving": "2 annosta";
 *         "cook_time": "30 min";
 *         "ingredients": "example ingredients";
 *         "instruction": "example instruction";
 *         "created_at": "2024-01-26T09:38:08.000Z",
 *         "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *       },
 *       ...
 *     ]
 *
 * @apiError MediaNotFound No media items found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 */
/**
 * @api {put} /media/:id Update Media
 * @apiName UpdateMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} id Media's unique ID.
 * @apiParam {String} [title] Title of the recipe (optional).
 * @apiParam {String} [description] Description of the recipe (optional).
 * @apiParam {String} [serving] Serving of the recipe.
 * @apiParam {String} [ingredients] Ingredients of the recipe.
 * @apiParam {String} [cook_time] Cook_time of the recipe.
 * @apiParam {String} [instruction] Instruction of the recipe.
 *
 * @apiExample {json} Request-Example:
 *     {
 *       "title": "Updated Title",
 *       "description": "Updated Description"
 *     }
 *
 * @apiSuccess {Object} media Updated media object.
 * @apiSuccess {Number} media.media_id ID of the recipe.
 * @apiSuccess {Number} media.user_id ID of the user who posted the media.
 * @apiSuccess {String} media.filename Filename of the recipe.
 * @apiSuccess {Number} media.filesize Size of the recipe file.
 * @apiSuccess {String} media.media_type Type of the recipe.
 * @apiSuccess {String} media.title Title of the recipe.
 * @apiSuccess {String} media.description Description of the recipe.
 * @apiSuccess {String} media.serving Serving of the recipe.
 * @apiSuccess {String} media.ingredients Ingredients of the recipe.
 * @apiSuccess {String} media.cook_time Cook_time of the recipe.
 * @apiSuccess {String} media.instruction Instruction of the recipe.
 * @apiSuccess {String} media.created_at Timestamp when the media was created.
 * @apiSuccess {String} media.thumbnail Thumbnail of the recipe.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media_id": 1,
 *       "user_id": 1,
 *       "filename": "example.jpg",
 *       "filesize": 12345,
 *       "media_type": "image/jpg",
 *       "title": "Updated Title",
 *       "description": "Updated Description",
 *       "serving": "2 annosta";
 *       "cook_time": "30 min";
 *       "ingredients": "example ingredients";
 *       "instruction": "example instruction";
 *       "created_at": "2024-01-26T09:38:08.000Z",
 *       "thumbnail": "//localhost:3002/uploads/example-thumb.jpg"
 *     }
 *
 * @apiError MediaNotFound The media item was not found.
 * @apiError InvalidInput The input for title or description was not valid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "InvalidInput"
 *     }
 */
/**
 * @api {delete} /media/:id Delete Media
 * @apiName DeleteMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token for authentication.
 *
 * @apiParam {Number} id Media's unique ID.
 *
 * @apiSuccess {Object} response Response object.
 * @apiSuccess {String} response.message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Media deleted successfully"
 *     }
 *
 * @apiError MediaNotFound The media item was not found.
 * @apiError Unauthorized The user is not authorized to delete the media.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No media found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 */
