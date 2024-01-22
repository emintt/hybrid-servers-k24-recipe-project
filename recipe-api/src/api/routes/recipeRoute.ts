import express from 'express';
import {
  recipeDelete,
  recipeGet,
  recipeListGet,
  recipeListGetByAppId,
  recipePost,
} from '../controllers/recipeController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(recipeListGet).post(authenticate, recipePost);

router.route('/:id').get(recipeGet).delete(authenticate, recipeDelete);

router.route('/app/:id').get(recipeListGetByAppId);

export default router;
