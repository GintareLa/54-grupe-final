
import express from 'express';
import { getLogout } from '../api/admin/getLogout.js';
import { getAllMovies } from '../api/admin/getAllMovies.js';
import { getMovieBySlug } from '../api/admin/getMovieBySlug.js';
import { getMoviesByCategory } from '../api/admin/getMoviesByCategory.js';
import { categoriesGet } from '../api/admin/categoriesGet.js';
import { categoriesPost } from '../api/admin/categoriesPost.js';
import { categoriesDelete } from '../api/admin/categoriesDelete.js';
import { categoriesPut } from '../api/admin/categoriesPut.js';

export const adminApiRouter = express.Router();

adminApiRouter.get('/logout', getLogout);

adminApiRouter.get('/movies', getAllMovies);
adminApiRouter.get('/movies/:slug', getMovieBySlug);
adminApiRouter.get('/movies-by-category/:slug', getMoviesByCategory);

adminApiRouter.get('/categories', categoriesGet);
adminApiRouter.post('/categories', categoriesPost);
adminApiRouter.put('/categories/:id', categoriesPut);
adminApiRouter.delete('/categories/:id', categoriesDelete);

adminApiRouter.all('*error', (req, res) => {
    return res.status(404).json({
        status: 'error',
        msg: 'No such admin API route exists',
    })
});
