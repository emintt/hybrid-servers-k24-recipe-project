import express, {Request, Response} from 'express';

import recipeRoute from './routes/recipeRoute';
import tagRoute from './routes/tagRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'recipe api v1',
  });
});

router.use('/recipe', recipeRoute);
router.use('/tags', tagRoute);

export default router;
