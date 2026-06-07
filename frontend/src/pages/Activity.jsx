import { useEffect, useState } from "react";
import api from "../api/api";

export default function Activity() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const res = await api.get("/activity/project/1");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="section">
      <p className="tag">AUDIT TRAIL</p>

      <h1>Activity Logs</h1>

      <div className="grid">
        {logs.map((log) => (
          <div className="card" key={log.id}>
            <small>{log.module}</small>
            <h3>{log.action}</h3>
            <p>
              <b>Performed By:</b> {log.performedBy}
            </p>
            <p>{log.createdAt}</p>
          </div>
        ))}
      </div>

      {logs.length === 0 && (
        <div className="card">
          <h3>No activity yet</h3>
          <p>Create a project, task, sprint, or run an AI agent to generate logs.</p>
        </div>
      )}
    </div>
  );
}