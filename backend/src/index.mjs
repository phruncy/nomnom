import express from 'express';
import routes from './routes/index.mjs';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hi');
});
