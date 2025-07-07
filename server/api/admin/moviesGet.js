
import { connection } from "../../db.js";

export async function moviesGet(req, res) {
    try {
        const sql = `
            SELECT movies1.*, categories1.url_slug AS category_url_slug
            FROM movies1
            INNER JOIN categories1
                ON movies1.category_id = categories1.id;`;
        const [result] = await connection.execute(sql);

        return res.json({
            status: 'success',
            list: result.map(m => ({
                ...m,
                thumbnail: (m.thumbnail ? `http://localhost:5434/img/movie-thumbnails/${m.thumbnail}` : ''),
            })),
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: 'error',
            list: [],
            msg: 'Serverio klaida',
        });
    }
}
