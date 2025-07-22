import express, { Router } from 'express';

import { checkSchema, validationResult, matchedData } from 'express-validator';
import { recipeValidationSchema } from '../utils/validationSchemas.mjs';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const RESOURCE_PATH = '../../public/dummyData.json';
const router = Router();
router.use(express.json());

const idProvider = new IdProvider();

router.get('/recipes', (req, res) => {
    const data = requestRecipes();
    const {
        query: { filter, value },
    } = req;
    if (filter && value) {
        const result = data.recipes.filter(recipe => recipe[filter].includes(value));
        data.recipes = result;
        return res.json(data);
    }
    res.cookie('recipe_cookie', 'Hello Recipe!', { maxAge: 1000 * 60 * 120 });
    res.json(data);
});

router.post('/recipes', checkSchema(recipeValidationSchema), (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const recipe = matchedData(req);
    const newId = idProvider.getId();
    const newRecipe = { id: newId, ...recipe };

    const data = readMockData();
    data.recipes.push(newRecipe);
    try {
        writeMockData(data);
    } catch {
        return res.sendStatus(500);
    }
    res.status(201).send(newRecipe);
});

router.get('/recipes/:id', (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({ msg: 'Bad request. Invalid id.' });
    }
    const data = requestRecipes();
    const findRecipe = data.recipes.find(recipe => recipe.id === parsedId);
    if (!findRecipe) {
        return res.sendStatus(404);
    }
    res.json(findRecipe);
});

router.put('/recipes/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const data = requestRecipes();
    const findRecipeIndex = data.recipes.findIndex(recipe => recipe.id == parsedId);
    if (findRecipeIndex === -1) {
        return res.sendStatus(404);
    }
    data.recipes[findRecipeIndex] = { id: parsedId, ...body };
    try {
        writeMockData(data);
    } catch {
        res.sendStatus(500);
    }
    res.sendStatus(200);
});

router.patch('/recipes/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const data = requestRecipes();
    const findIndex = data.recipes.findIndex(recipe => recipe.id === parsedId);
    if (findIndex === -1) {
        return res.sendStatus(404);
    }
    data.recipes[findIndex] = { ...data.recipes[findIndex], ...body };
    try {
        writeMockData(data);
    } catch {
        return res.sendStatus(500);
    }
    res.sendStatus(200);
});

router.delete('/recipes/:id', (req, res) => {
    const {
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const data = requestRecipes();
    const recipeIndex = data.recipes.findIndex(recipe => recipe.id == parsedId);
    if (recipeIndex === -1) {
        return res.sendStatus(404);
    }
    data.recipes.splice(recipeIndex, 1);
    writeMockData(data);
    res.sendStatus(200);
});

function readMockData() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filepath = path.join(__dirname, RESOURCE_PATH);
    const rawData = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(rawData);
}

function writeMockData(data) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filepath = path.join(__dirname, RESOURCE_PATH);
    const serialized = JSON.stringify(data);
    try {
        fs.writeFileSync(filepath, serialized, 'utf-8');
    } catch {
        throw new Error('Could not write to File');
    }
}

function requestRecipes() {
    return readMockData();
}

function IdProvider() {
    this.id = 35;
    this.getId = () => {
        return this.id++;
    };
}

export default router;
