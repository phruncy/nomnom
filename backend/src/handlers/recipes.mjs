import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { validationResult, matchedData } from 'express-validator';
import { createRecipe, findAllRecipes, findRecipe, remove, updateRecipe } from '../db/queries.mjs';
import { RequestError } from '../models/RequestError.mjs';

export const getAllRecipes = async (req, res) => {
    try {
        const data = await findAllRecipes();
        return res.json({ data });
    } catch(error) {
        return res.status(500).send({msg: "Database error."});
    }
};

export const getRecipe = async (req, res, next) => {
    try {
        const parsedId = parseInt(req.params.id);
        if (isNaN(parsedId)) {
            throw new RequestError(400, 'invalid Id');
        }
        const data = await findRecipe(parsedId);
        res.status(200).json({data});
    } catch (error) {
        next(error);
    }
};

export const deleteRecipe = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new RequestError(404);
        }
        const result = await remove(parsedId);
    } catch (error) {
        next(error)   
    }
    res.sendStatus(200);
};

export const addRecipe = async(req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new RequestError(400);
        }
        const recipe = matchedData(req);
        await createRecipe(recipe);
        res.status(201).send(recipe);
    } catch {
        next(error);
    }
};

export const replaceRecipe = async (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    
    try {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) throw new RequestError(404);
        const result = await updateRecipe({id: parsedId, ...body});
        res.sendStatus(200);
    }
    catch (error) {
        next(error); 
    }
};

export const patchRecipe = (req, res) => {
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
};

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
    let result;
    try {
        result = fs.writeFileSync(filepath, serialized, 'utf-8');
    } catch {
        throw new Error(`Could not write to File. Error ${result}`);
    }
}
