
import { connection } from "../../db.js";

export async function getAllMovies(req, res) {
    try {
        const sql = `
            SELECT movies1.*,
                categories1.url_slug AS categoryUrlSlug,
                categories1.name AS categoryName
            FROM movies1
            INNER JOIN categories1
                ON categories1.id = movies1.category_id
            WHERE movies1.is_published = 1 AND  categories1.is_published = 1;`;
        const [result] = await connection.execute(sql);
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
