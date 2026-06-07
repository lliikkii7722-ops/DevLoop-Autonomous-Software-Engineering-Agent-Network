import { useEffect, useState } from "react";
import api from "../api/api";

export default function Analytics() {
  const [data, setData] = useState({
    totalProjects: 0,
    highRiskProjects: 0,
    resourceUtilization: 0,
    budgetUsage: 0,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const res = await api.get("/projects");
    const projects = res.data.filter((p) => p.plannedBudget !== null);

    const totalProjects = projects.length;

    const highRiskProjects = projects.filter(
      (p) => Number(p.defects || 0) > 5 || Number(p.testingCoverage || 0) < 70
    ).length;

    const totalAvailable = projects.reduce(
      (sum, p) => sum + Number(p.availableHours || 0),
      0
    );

    const totalWorked = projects.reduce(
      (sum, p) => sum + Number(p.workedHours || 0),
      0
    );

    const totalBudget = projects.reduce(
      (sum, p) => sum + Number(p.plannedBudget || 0),
      0
    );

    const totalCost = projects.reduce(
      (sum, p) => sum + Number(p.actualCost || 0),
      0
    );

    setData({
      totalProjects,
      highRiskProjects,
      resourceUtilization:
        totalAvailable > 0 ? Math.round((totalWorked / totalAvailable) * 100) : 0,
      budgetUsage:
        totalBudget > 0 ? Math.round((totalCost / totalBudget) * 100) : 0,
    });
  };

  return (
    <div className="section">
      <p className="tag">PROJECT ANALYTICS</p>
      <h1>Analytics Dashboard</h1>

      <div className="grid four">
        <div className="card">
          <h3>Total Projects</h3>
          <h2>{data.totalProjects}</h2>
        </div>

        <div className="card">
          <h3>High Risk Projects</h3>
          <h2>{data.highRiskProjects}</h2>
        </div>

        <div className="card">
          <h3>Resource Utilization</h3>
          <h2>{data.resourceUtilization}%</h2>
        </div>

        <div className="card">
          <h3>Budget Usage</h3>
          <h2>{data.budgetUsage}%</h2>
        </div>
      </div>
    </div>
  );
}