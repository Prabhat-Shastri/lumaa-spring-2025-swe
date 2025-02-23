const taskService = require("../services/taskService");
const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants/constants");

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.user.id);
        res.json(tasks);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: ERROR_MESSAGES.SERVER_ERROR });
    }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await taskService.createTask(title, description, req.user.id);
        res.json(task);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: ERROR_MESSAGES.SERVER_ERROR });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        const task = await taskService.updateTask(id, title, description, isComplete);
        res.json(task);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: ERROR_MESSAGES.SERVER_ERROR });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await taskService.deleteTask(id);
        res.json(result);
    } catch (error) {
        res.status(HTTP_STATUS.SERVER_ERROR).json({ error: ERROR_MESSAGES.SERVER_ERROR });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
