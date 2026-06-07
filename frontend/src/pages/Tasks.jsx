import { useEffect, useState } from "react";
import api from "../api/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    projectId: 1,
    title: "",
    description: "",
    priority: "HIGH",
    status: "TODO",
  });

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks/project/1");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", form);

      setForm({
        projectId: 1,
        title: "",
        description: "",
        priority: "HIGH",
        status: "TODO",
      });

      loadTasks();
    } catch (err) {
      console.error("Task creation failed", err);
      alert("Task creation failed");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error("Task delete failed", err);
      alert("Task delete failed");
    }
  };

  return (
    <div className="section">
      <p className="tag">TASK EXECUTION</p>
      <h1>Tasks</h1>

      <form className="card form" onSubmit={createTask}>
        <input
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Task Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>HIGH</option>
          <option>MEDIUM</option>
          <option>LOW</option>
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>TODO</option>
          <option>IN_PROGRESS</option>
          <option>COMPLETED</option>
          <option>BLOCKED</option>
        </select>

        <button>Create Task</button>
      </form>

      <div className="grid">
        {tasks.map((task) => (
          <div className="card" key={task.id}>
            <small>TASK #{task.id}</small>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <b>Priority:</b> {task.priority}
            </p>
            <span className="online">● {task.status}</span>

            <button
              style={{ marginTop: "18px", background: "#ff3b6b" }}
              onClick={() => deleteTask(task.id)}
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}