
import { connection } from "../db.js";

export async function getUserData(req, res, next) {
    req.user = {
        isLoggedIn: false,
        role: 'public',
    };

    if (!req.cookies.loginToken) {
        return next();
    }

    try {
        const sql = `
            SELECT
                users1.id, users1.email,
                users1.created_at AS userCreatedAt,
                tokens1.created_at AS tokenCreatedAt
            FROM users1
            INNER JOIN tokens1
                ON users1.id = tokens1.user_id
            WHERE tokens1.text = ?;`;
        const [result] = await connection.execute(sql, [req.cookies.loginToken]);

        if (result.length === 1) {
            req.user = {
                isLoggedIn: true,
                role: 'admin',
                ...result[0],
            };
        }
    } catch (error) {
        console.log(error);
    }

    return next();
}
