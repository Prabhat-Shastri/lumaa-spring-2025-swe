const queries = {
    // User queries
    users: {
        insert: "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        findByUsername: "SELECT * FROM users WHERE username = $1",
    },

    // Task queries
    tasks: {
        getAll: "SELECT * FROM tasks WHERE userId = $1",
        insert: "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
        update: "UPDATE tasks SET title=$1, description=$2, isComplete=$3 WHERE id=$4 RETURNING *",
        delete: "DELETE FROM tasks WHERE id=$1",
    }
};

module.exports = queries; 