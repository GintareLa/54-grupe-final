
import express from 'express';
import { getAllCategories } from '../api/getAllCategories.js';
import { getFeaturedCategories } from '../api/getFeaturedCategories.js';

export const apiRouter = express.Router();

apiRouter.get('/categories', getAllCategories);
apiRouter.get('/categories/featured', getFeaturedCategories);

apiRouter.all('*error', (req, res) => {
    return res.status(404).json({
        status: 'error',
        msg: 'No such API route exists',
    })
});
