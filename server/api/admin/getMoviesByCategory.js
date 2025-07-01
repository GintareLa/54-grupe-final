
import { connection } from "../../db.js";

export async function getMoviesByCategory(req, res) {
    try {
        const sql = `
            SELECT *
            FROM movies1
            WHERE category_id = (SELECT id FROM categories1 WHERE url_slug = ?);`;
        const [result] = await connection.execute(sql, [req.params.slug]);
        return res.json({
            status: 'success',
            list: result,
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
