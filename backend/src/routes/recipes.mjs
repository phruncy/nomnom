import express, { Router } from 'express';
import { getAllRecipes, getRecipe, deleteRecipe, addRecipe, replaceRecipe, patchRecipe } from '../handlers/recipes.mjs';
import { checkSchema } from 'express-validator';
import { recipeValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router();
router.use(express.json());

router.get('/recipes', getAllRecipes);

router.post('/recipes', checkSchema(recipeValidationSchema), addRecipe);

router.get('/recipes/:id', getRecipe);

router.put('/recipes/:id', replaceRecipe);

router.patch('/recipes/:id', patchRecipe);

router.delete('/recipes/:id', deleteRecipe);

export default router;
