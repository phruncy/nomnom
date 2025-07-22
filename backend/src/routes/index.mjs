import { Router } from 'express';

import recipeRoutes from './recipes.mjs';

const router = Router();
router.use(recipeRoutes);

export default router;
