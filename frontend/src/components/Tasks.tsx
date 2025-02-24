import React, { useEffect, useState } from 'react';
import '../styles/Tasks.css';

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;  // or "isComplete" depending on your API
  userid?: number;      // or "userId"
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const token = localStorage.getItem('token');

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        } else {
          alert(data.error || 'Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [token]);

  // Create a new task
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        // Add the new task to state
        setTasks((prev) => [...prev, data]);
        // Reset form
        setTitle('');
        setDescription('');
        setShowModal(false);
      } else {
        alert(data.error || 'Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Toggle complete status
  const handleToggleComplete = async (taskId: number, currentStatus: boolean) => {
    try {
      const existingTask = tasks.find(t => t.id === taskId);
      if (!existingTask) return;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: existingTask.title,
            description: existingTask.description,
            isComplete: !currentStatus  // Changed from iscomplete to isComplete
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? data : task))
        );
      } else {
        alert(data.error || 'Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Save edited task
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/${editingTask.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingTask.title,
            description: editingTask.description,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) => (task.id === editingTask.id ? data : task))
        );
        setEditingTask(null);
      } else {
        alert(data.error || 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const handleDelete = async (taskId: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        alert(data.message || 'Task deleted');
      } else {
        alert(data.error || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2 className="tasks-title">Tasks</h2>
        <button className="add-task-button" onClick={() => setShowModal(true)}>
          Add New Task
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3>Create New Task</h3>
            <form onSubmit={handleCreate} className="modal-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button">
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTask?.id === task.id ? (
              <form onSubmit={handleSaveEdit} className="modal-form">
                <div className="form-group">
                  <input
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, description: e.target.value })
                    }
                  />
                </div>
                <div className="task-actions">
                  <button type="submit" className="task-button edit-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="task-button delete-button"
                    onClick={() => setEditingTask(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </div>
                <div className="task-actions">
                  <span
                    className={`task-status ${
                      task.iscomplete ? 'status-complete' : 'status-incomplete'
                    }`}
                  >
                    {task.iscomplete ? 'Completed' : 'Not Completed'}
                  </span>
                  <button
                    className="task-button complete-button"
                    onClick={() => handleToggleComplete(task.id, task.iscomplete)}
                  >
                    {task.iscomplete ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button
                    className="task-button edit-button"
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="task-button delete-button"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
