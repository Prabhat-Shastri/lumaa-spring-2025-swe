const authService = require("../services/authService");
const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants/constants");

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await authService.register(username, password);
        res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: ERROR_MESSAGES.USER_EXISTS });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await authService.login(username, password);
        res.json(result);
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
};

module.exports = { register, login };
