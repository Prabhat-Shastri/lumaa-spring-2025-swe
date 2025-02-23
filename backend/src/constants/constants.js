module.exports = {
    // Auth related constants
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET,
        EXPIRY: "1h"
    },

    // HTTP Status codes
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        SERVER_ERROR: 500
    },

    // Error messages
    ERROR_MESSAGES: {
        ACCESS_DENIED: "Access Denied",
        INVALID_TOKEN: "Invalid Token",
        INVALID_CREDENTIALS: "Invalid credentials",
        USER_EXISTS: "User already exists",
        SERVER_ERROR: "Server error"
    },

    // Success messages
    SUCCESS_MESSAGES: {
        TASK_DELETED: "Task deleted"
    },

    // Crypto related
    BCRYPT_SALT_ROUNDS: 10
}; 