import express from 'express';
import routes from './routes/index.mjs';
import { connectToDatabase } from './db/index.mjs';

const PORT = process.env.PORT || 3001;
const app = express();

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(`Database connection failed, error: ${err}`);
        process.exit(0);
    });

app.use('/api', routes);
app.use((error, req, res, next) => {
    console.log('Global Error!');
    if (error.status) {
        res.status(error.status).send(error.msg);
    } else {
        res.sendStatus(500);
    }
})
