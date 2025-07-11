
import { connection } from "../../db.js";

export async function categoriesGet(req, res) {
    try {
        const sql = `
            SELECT *,
                ( 
                    SELECT COUNT(*)
                    FROM movies1
                    WHERE movies1.category_id = categories1.id
                ) AS count
            FROM categories1
            ORDER BY name;`;
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
