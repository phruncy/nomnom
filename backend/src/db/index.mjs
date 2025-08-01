import { createPool } from 'mysql2/promise';

const pool = createPool({
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_ROOT_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
});

const connectToDatabase = async () => {
    try {
        await pool.getConnection();
        console.log('DB Connection successful');
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { connectToDatabase, pool };
