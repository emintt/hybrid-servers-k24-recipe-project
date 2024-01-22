import {Request, Response, NextFunction} from 'express';
import {
  deleteRecipe,
  fetchAllRecipeByAppId,
  fetchAllRecipe,
  fetchRecipeById,
  postRecipe,
} from '../models/recipeModel';
import CustomError from '../../classes/CustomError';
import {RecipeResponse, MessageResponse} from '@sharedTypes/MessageTypes';
import {RecipeItem, TokenContent} from '@sharedTypes/DBTypes';

const recipeListGet = async (
  req: Request,
  res: Response<RecipeItem[]>,
  next: NextFunction
) => {
  try {
    const recipe = await fetchAllRecipe();
    if (recipe === null) {
      const error = new CustomError('No recipe found', 404);
      next(error);
      return;
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const recipeListGetByAppId = async (
  req: Request<{id: string}>,
  res: Response<RecipeItem[]>,
  next: NextFunction
) => {
  try {
    const recipe = await fetchAllRecipeByAppId(req.params.id);
    if (recipe === null) {
      const error = new CustomError('No recipe found', 404);
      next(error);
      return;
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const recipeGet = async (
  req: Request<{id: string}>,
  res: Response<RecipeItem>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const recipe = await fetchRecipeById(id);
    if (recipe === null) {
      const error = new CustomError('No recipe found', 404);
      next(error);
      return;
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const recipePost = async (
  req: Request<{}, {}, Omit<RecipeItem, 'recipe_id' | 'created_at'>>,
  res: Response<RecipeResponse, {user: TokenContent}>,
  next: NextFunction
) => {
  try {
    // add user_id to recipe object from token
    req.body.user_id = res.locals.user.user_id;
    console.log(req.body);
    const newRecipe = await postRecipe(req.body);
    if (newRecipe === null) {
      const error = new CustomError('Recipe not created', 500);
      next(error);
      return;
    }
    res.json({message: 'Recipe created', recipe: newRecipe});
  } catch (error) {
    next(error);
  }
};

const recipeDelete = async (
  req: Request<{id: string}>,
  res: Response<MessageResponse, {user: TokenContent; token: string}>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteRecipe(id, res.locals.user, res.locals.token);
    if (result === null) {
      const error = new CustomError('Recipe not deleted', 500);
      next(error);
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {recipeListGet, recipeListGetByAppId, recipeGet, recipePost, recipeDelete};
