import express from 'express';

const app = express();
const PORT = 5434

app.use(express.static('public'));

app.get('/api', (req, res) => {
    return res.json({
        status: 'success',
        msg: 'API is working',
    });
});

app.get('*error', (req, res) => {
    return res.status(404).json({
        status: 'error',
        msg: 'No such route',
    });
});

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});