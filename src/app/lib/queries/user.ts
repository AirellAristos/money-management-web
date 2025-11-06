import { logger } from "../logger"
import { pool } from "../pg"

export async function insertUser(username: string, email: string, profilePicture: string, refreshToken: string) {
    const client = await pool.connect()
    try {
        const query = `
            INSERT INTO users (username, email, profile_picture, refresh_token)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `

        const result = await client.query(query, [username, email, profilePicture, refreshToken])
        logger.info('User successfuly created', {
            module: 'queries/user.ts',
            function: 'insertUser',
            username: result.rows[0].username,
            email: result.rows[0].emails
        })
        return result.rows[0]
    } catch (error) {
        console.error("❌ Error inserting user:", error)
        logger.error('Error when creating user', {
            module: 'queries/user.ts',
            function: 'insertUser',
            error: error
        })
        throw error
    } finally {
        client.release()
    }
}

export async function isUserExists(email: string) {
    const client = await pool.connect()
    try {
        const query = `SELECT * FROM users WHERE email = $1`

        const result = await client.query(query, [email])

        if (result.rows.length > 0) {
            return true
        }

        return false
    } catch (error) {
        console.error("❌ Error selecting user by email:", error)
        logger.error('Error when selecting user by email', {
            module: 'queries/user.ts',
            function: 'isUserExists',
            error: error
        })
        throw error
    } finally {
        client.release()
    }
}