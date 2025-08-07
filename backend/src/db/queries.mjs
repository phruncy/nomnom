import { RequestError } from "../models/RequestError.mjs";
import { pool } from "./index.mjs";

 export const findAllRecipes = async() => {
    const query = "SELECT * FROM recipes";
    try {
        const client = await pool.getConnection();
        const result = await client.query(query);
        return result[0];
    } catch (error) {
        console.error("Error: Could not retrieve all records from database recipes.");
        throw error;
    }
}

export const findRecipe = async(id) => {
    const QUERY = "SELECT * FROM recipes WHERE id = ?";
    try {
        const client = await pool.getConnection();
        const [result, fields] = await client.query(QUERY, [id]);
        if (result.length === 0)
            throw new RequestError(404);
        return result[0];
    }
    catch (error) {
        throw error;
    }
}

export const createRecipe = async (recipe) => {
    
    const client = await pool.getConnection();
    try {
        await client.beginTransaction();
        // create recipe table entry
        const RECIPE_QUERY = `INSERT INTO recipes (name, description, link) VALUES (?, ?, ?)`;
        const [createRecipeResult] = await client.execute(RECIPE_QUERY, [recipe.name, recipe.description, recipe.link]);
        const recipeId = createRecipeResult.insertId;

        // insert tags if needed
        const tagPlaceholders = recipe.tags.map(() => '(?)').join(', ');
        if (recipe.tags.length > 0) {
            const TAG_QUERY = `INSERT INTO tags (name) VALUES ${tagPlaceholders} ON DUPLICATE KEY UPDATE name = name`;
            await client.query(TAG_QUERY, recipe.tags);
        }
        // fetch tag ids
        const TAG_ID_QUERY = `SELECT id, name FROM tags WHERE name IN (${recipe.tags.map(() => '?').join(', ')})`;
        const [tagIds] = await client.query(TAG_ID_QUERY, recipe.tags);

        // join recipe and tags
        const tuples = tagIds.map(tag => [recipeId, tag.id]);
        if (tuples.length > 0) {
            const TAG_INSERT_QUERY = `INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (${tuples.map(() => '?').join(', ')}) 
            ON DUPLICATE KEY UPDATE recipe_id = recipe_id`;
            await client.query(TAG_INSERT_QUERY, tuples.flat());
        }

        await client.commit();
        return {id: recipeId, ...recipe};
    }
    catch(error) {
        await client.rollback();
        console.error("Error: could not create record.");
        throw error;
    }
    finally {
        client.release();
    }
}

export const updateRecipe = async(recipe) => {
    const QUERY = `UPDATE recipes 
        SET name = ?, description = ?, link = ? 
        WHERE id = ?`;
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [recipe.name, recipe.description, recipe.link, recipe.id]);
        return result[0];
    } catch (error) {
        console.error(`Error updateing db entry: ${error}`);
        throw error;
    }
}

export const remove = async(id) => {
    const QUERY = 'DELETE FROM recipes WHERE id = ?'
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id]);
        return result[0];
    } catch (error) {
        console.error(`Error deleting db entry: ${error}`);
        throw error;
    }
}
