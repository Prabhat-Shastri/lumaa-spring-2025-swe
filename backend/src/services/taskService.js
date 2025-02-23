const pool = require("../config/db");
const queries = require("../database/queries");
const { SUCCESS_MESSAGES } = require("../constants/constants");

class TaskService {
    async getTasks(userId) {
        const tasks = await pool.query(queries.tasks.getAll, [userId]);
        return tasks.rows;
    }

    async createTask(title, description, userId) {
        const task = await pool.query(queries.tasks.insert, [title, description, userId]);
        return task.rows[0];
    }

    async updateTask(id, title, description, isComplete) {
        const task = await pool.query(queries.tasks.update, [title, description, isComplete, id]);
        return task.rows[0];
    }

    async deleteTask(id) {
        await pool.query(queries.tasks.delete, [id]);
        return { message: SUCCESS_MESSAGES.TASK_DELETED };
    }
}

module.exports = new TaskService(); 
