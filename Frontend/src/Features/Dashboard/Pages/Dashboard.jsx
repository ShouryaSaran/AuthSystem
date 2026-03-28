import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/Hooks/useAuth";
import { createTask, deleteTask, getTasks, updateTask } from "../Services/task.service";
import "../Styles/dashboard.scss";

const emptyForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

function Dashboard() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitLabel = useMemo(() => (editingTaskId ? "Update task" : "Create task"), [editingTaskId]);

  const loadTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingTaskId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || null,
    };

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, payload);
        setMessage("Task updated successfully.");
      } else {
        await createTask(payload);
        setMessage("Task created successfully.");
      }

      resetForm();
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const onEdit = (task) => {
    setEditingTaskId(task._id);
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "",
    });
  };

  const onDelete = async (taskId) => {
    setMessage("");
    setError("");

    try {
      await deleteTask(taskId);
      setMessage("Task deleted successfully.");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const onLogout = async () => {
    await handleLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <h1>Task Dashboard</h1>
            <p>
              Signed in as <strong>{user?.username}</strong> ({user?.role})
            </p>
          </div>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-grid">
          <form className="task-form" onSubmit={handleSubmit}>
            <h2>{submitLabel}</h2>

            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Write API docs" />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details"
              rows={4}
            />

            <div className="inline-fields">
              <div>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={form.status} onChange={handleChange}>
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority">Priority</label>
                <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <label htmlFor="dueDate">Due date</label>
            <input id="dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />

            {error && <p className="feedback error">{error}</p>}
            {message && <p className="feedback success">{message}</p>}

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                {submitLabel}
              </button>
              {editingTaskId && (
                <button type="button" className="secondary-btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <section className="task-list-panel">
            <h2>Your Tasks</h2>
            {loading ? <p>Loading tasks...</p> : null}
            {!loading && tasks.length === 0 ? <p>No tasks yet. Create your first one.</p> : null}

            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className="task-item">
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description || "No description"}</p>
                    <small>
                      {task.status} • {task.priority}
                    </small>
                  </div>

                  <div className="task-actions">
                    <button type="button" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => onDelete(task._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
