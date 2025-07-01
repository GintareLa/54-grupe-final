
import { connection } from "../../db.js";

export async function getMovieBySlug(req, res) {
    try {
        const sql = `
            SELECT movies1.*,
                categories1.name as categoryName,
                categories1.url_slug as categoryUrlSlug
            FROM movies1
            INNER JOIN categories1
                ON categories1.id = movies1.category_id
            WHERE movies1.url_slug = ?;`;
        const [result] = await connection.execute(sql, [req.params.slug]);
        return res.json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: 'error',
            data: [],
            msg: 'Serverio klaida',
        });
    }
}
