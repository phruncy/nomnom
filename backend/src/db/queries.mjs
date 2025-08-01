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
        const result = await client.query(QUERY, [id]);
        return result[0][0];
    }
    catch (error) {
        console.error("Error: could not retrieve record.");
        throw error;
    }
}

export const createRecipe = async (recipe) => {
    const QUERY = `INSERT INTO recipes (name, description, link) VALUES (?, ?, ?)`;
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [recipe.name, recipe.description, recipe.link]);
        return result;
    }
    catch {
        console.error("Error: could not create record.");
        throw error;
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
