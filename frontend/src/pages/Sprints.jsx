import { useEffect, useState } from "react";
import api from "../api/api";

export default function Sprints() {
  const [sprints, setSprints] = useState([]);

  const [form, setForm] = useState({
    projectId: 1,
    sprintName: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });

  const loadSprints = async () => {
    try {
      const res = await api.get("/sprints/project/1");
      setSprints(res.data);
    } catch (err) {
      console.error("Failed to load sprints", err);
    }
  };

  useEffect(() => {
    loadSprints();
  }, []);

  const createSprint = async (e) => {
    e.preventDefault();

    try {
      await api.post("/sprints", form);

      setForm({
        projectId: 1,
        sprintName: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE",
      });

      loadSprints();
    } catch (err) {
      console.error("Sprint creation failed", err);
      alert("Sprint creation failed");
    }
  };

  const deleteSprint = async (id) => {
    if (!window.confirm("Delete this sprint?")) return;

    try {
      await api.delete(`/sprints/${id}`);
      loadSprints();
    } catch (err) {
      console.error("Sprint delete failed", err);
      alert("Sprint delete failed");
    }
  };

  return (
    <div className="section">
      <p className="tag">SPRINT PLANNING</p>
      <h1>Sprints</h1>

      <form className="card form" onSubmit={createSprint}>
        <input
          placeholder="Sprint Name"
          value={form.sprintName}
          onChange={(e) => setForm({ ...form, sprintName: e.target.value })}
        />

        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>ACTIVE</option>
          <option>PLANNED</option>
          <option>COMPLETED</option>
        </select>

        <button>Create Sprint</button>
      </form>

      <div className="grid">
        {sprints.map((sprint) => (
          <div className="card" key={sprint.id}>
            <small>SPRINT #{sprint.id}</small>
            <h3>{sprint.sprintName}</h3>
            <p>
              {sprint.startDate} to {sprint.endDate}
            </p>
            <span className="online">● {sprint.status}</span>

            <button
              style={{ marginTop: "18px", background: "#ff3b6b" }}
              onClick={() => deleteSprint(sprint.id)}
            >
              Delete Sprint
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}