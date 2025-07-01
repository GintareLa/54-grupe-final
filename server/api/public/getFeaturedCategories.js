
import { connection } from "../../db.js";

export async function getFeaturedCategories(req, res) {
    try {
        const sql = `
            SELECT *,
                ( 
                    SELECT COUNT(*)
                    FROM movies1
                    WHERE movies1.category_id = categories1.id AND movies1.is_published = 1
                ) AS count
            FROM categories1
            WHERE is_published = 1
            ORDER BY count DESC
            LIMIT 3;`;
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
