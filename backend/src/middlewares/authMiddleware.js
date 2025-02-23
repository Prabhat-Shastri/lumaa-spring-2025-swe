const jwt = require("jsonwebtoken");
const { JWT, HTTP_STATUS, ERROR_MESSAGES } = require("../constants/constants");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.ACCESS_DENIED });

    try {
        const verified = jwt.verify(token, JWT.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
};

module.exports = authMiddleware;
