const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const queries = require("../database/queries");
const { JWT, BCRYPT_SALT_ROUNDS, ERROR_MESSAGES } = require("../constants/constants");

class AuthService {
    async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const result = await pool.query(queries.users.insert, [username, hashedPassword]);
        return result.rows[0];
    }

    async login(username, password) {
        const user = await pool.query(queries.users.findByUsername, [username]);
        if (user.rows.length === 0) {
            throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const token = jwt.sign({ id: user.rows[0].id }, JWT.SECRET_KEY, { expiresIn: JWT.EXPIRY });
        return { token };
    }
}

module.exports = new AuthService();