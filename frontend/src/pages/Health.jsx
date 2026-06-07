import { useEffect, useState } from "react";
import api from "../api/api";

export default function Health() {
  const [health, setHealth] = useState({
    score: 0,
    status: "CRITICAL",
    scheduleRisk: "HIGH",
    qualityRisk: "HIGH",
  });

  useEffect(() => {
    loadHealth();
  }, []);

  const loadHealth = async () => {
    const res = await api.get("/projects");
    const projects = res.data;

    if (projects.length === 0) return;

    const p = projects[projects.length - 1];

    const taskScore =
      Number(p.totalTasks || 0) > 0
        ? (Number(p.completedTasks || 0) / Number(p.totalTasks || 1)) * 40
        : 0;

    const timeScore =
      Number(p.plannedDays || 0) > 0
        ? (1 - Number(p.completedDays || 0) / Number(p.plannedDays || 1)) * 20
        : 0;

    const qualityScore =
      Number(p.testingCoverage || 0) * 0.3 - Number(p.defects || 0) * 2;

    const score = Math.max(
      0,
      Math.min(100, Math.round(taskScore + timeScore + qualityScore))
    );

    setHealth({
      score,
      status: score >= 75 ? "HEALTHY" : score >= 50 ? "WARNING" : "CRITICAL",
      scheduleRisk: Number(p.completedDays || 0) > Number(p.plannedDays || 0) ? "HIGH" : "LOW",
      qualityRisk:
        Number(p.defects || 0) > 5 || Number(p.testingCoverage || 0) < 70
          ? "HIGH"
          : "LOW",
    });
  };

  return (
    <div className="section">
      <p className="tag">PROJECT HEALTH INTELLIGENCE</p>
      <h1>Health Score</h1>

      <div className="grid four">
        <div className="card">
          <small>OVERALL STATUS</small>
          <h2>{health.status}</h2>
        </div>

        <div className="card">
          <small>HEALTH SCORE</small>
          <h2>{health.score}/100</h2>
        </div>

        <div className="card">
          <small>SCHEDULE RISK</small>
          <h2>{health.scheduleRisk}</h2>
        </div>

        <div className="card">
          <small>QUALITY RISK</small>
          <h2>{health.qualityRisk}</h2>
        </div>
      </div>
    </div>
  );
}