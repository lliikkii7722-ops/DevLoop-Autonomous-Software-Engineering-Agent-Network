import { useEffect, useState } from "react";
import api from "../api/api";

export default function Projects() {
  const emptyForm = {
    title: "",
    description: "",
    techStack: "",
    status: "ACTIVE",
    plannedBudget: "",
    actualCost: "",
    plannedDays: "",
    completedDays: "",
    totalTasks: "",
    completedTasks: "",
    defects: "",
    testingCoverage: "",
    availableHours: "",
    workedHours: "",
  };

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
      alert("Failed to load projects. Check backend/token.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title || "E-Commerce Platform",
      description:
        form.description ||
        "AI-powered shopping platform with product catalog, cart, payments and order tracking.",
      techStack:
        form.techStack || "Java, Spring Boot, React, MySQL, Docker",
      status: form.status || "ACTIVE",

      plannedBudget: Number(form.plannedBudget || 500000),
      actualCost: Number(form.actualCost || 420000),
      plannedDays: Number(form.plannedDays || 120),
      completedDays: Number(form.completedDays || 90),
      totalTasks: Number(form.totalTasks || 60),
      completedTasks: Number(form.completedTasks || 48),
      defects: Number(form.defects || 4),
      testingCoverage: Number(form.testingCoverage || 85),
      availableHours: Number(form.availableHours || 1000),
      workedHours: Number(form.workedHours || 800),
    };

    try {
      setLoading(true);
      await api.post("/projects", payload);
      setForm(emptyForm);
      await loadProjects();
      alert("Project created successfully");
    } catch (err) {
      console.error("Project creation failed", err);
      alert("Project creation failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      await loadProjects();
      alert("Project deleted successfully");
    } catch (err) {
      console.error("Project delete failed", err);
      alert("Project delete failed");
    }
  };

  const show = (value, fallback = "0") => {
    if (value === null || value === undefined || value === "") return fallback;
    return value;
  };

  return (
    <div className="section">
      <p className="tag">PROJECT MANAGEMENT</p>
      <h1>Projects</h1>

      <form className="card form" onSubmit={createProject}>
        <input
          placeholder="Project Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Project Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Tech Stack"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />

        <div className="form-two">
          <input
            type="number"
            placeholder="Planned Budget"
            value={form.plannedBudget}
            onChange={(e) =>
              setForm({ ...form, plannedBudget: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Actual Cost"
            value={form.actualCost}
            onChange={(e) =>
              setForm({ ...form, actualCost: e.target.value })
            }
          />
        </div>

        <div className="form-two">
          <input
            type="number"
            placeholder="Planned Days"
            value={form.plannedDays}
            onChange={(e) =>
              setForm({ ...form, plannedDays: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Completed Days"
            value={form.completedDays}
            onChange={(e) =>
              setForm({ ...form, completedDays: e.target.value })
            }
          />
        </div>

        <div className="form-two">
          <input
            type="number"
            placeholder="Total Tasks"
            value={form.totalTasks}
            onChange={(e) =>
              setForm({ ...form, totalTasks: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Completed Tasks"
            value={form.completedTasks}
            onChange={(e) =>
              setForm({ ...form, completedTasks: e.target.value })
            }
          />
        </div>

        <div className="form-two">
          <input
            type="number"
            placeholder="Defects"
            value={form.defects}
            onChange={(e) => setForm({ ...form, defects: e.target.value })}
          />

          <input
            type="number"
            placeholder="Testing Coverage %"
            value={form.testingCoverage}
            onChange={(e) =>
              setForm({ ...form, testingCoverage: e.target.value })
            }
          />
        </div>

        <div className="form-two">
          <input
            type="number"
            placeholder="Available Hours"
            value={form.availableHours}
            onChange={(e) =>
              setForm({ ...form, availableHours: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Worked Hours"
            value={form.workedHours}
            onChange={(e) =>
              setForm({ ...form, workedHours: e.target.value })
            }
          />
        </div>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="PLANNED">PLANNED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="ON_HOLD">ON_HOLD</option>
        </select>

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>

      <div className="grid">
        {projects.map((p) => (
          <div className="card" key={p.id}>
            <small>PROJECT #{p.id}</small>

            <h3>{p.title || "Untitled Project"}</h3>

            <p>{p.description || "No description available"}</p>

            <p>
              <b>Stack:</b> {p.techStack || "Not specified"}
            </p>

            <p>
              <b>Budget:</b> ₹{show(p.plannedBudget)}
            </p>

            <p>
              <b>Actual Cost:</b> ₹{show(p.actualCost)}
            </p>

            <p>
              <b>Days:</b> {show(p.completedDays)}/{show(p.plannedDays)}
            </p>

            <p>
              <b>Tasks:</b> {show(p.completedTasks)}/{show(p.totalTasks)}
            </p>

            <p>
              <b>Defects:</b> {show(p.defects)}
            </p>

            <p>
              <b>Coverage:</b> {show(p.testingCoverage)}%
            </p>

            <p>
              <b>Hours:</b> {show(p.workedHours)}/{show(p.availableHours)}
            </p>

            <span className="online">● {p.status || "ACTIVE"}</span>

            <button
              style={{ marginTop: "18px", background: "#ff3b6b" }}
              onClick={() => deleteProject(p.id)}
            >
              Delete Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}