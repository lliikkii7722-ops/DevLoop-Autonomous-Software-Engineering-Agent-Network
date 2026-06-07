import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <section className="hero">
        <p className="tag">DEVLOOP CONTROL CENTER</p>
        <h1>
          AI Agents Ready To <span>Build Your Software</span>
        </h1>
        <p>
          Manage projects, generate requirements, create tasks, plan sprints,
          review code, and generate DevOps files using AI agents.
        </p>

        <div className="hero-buttons">
          <Link className="big-btn" to="/projects">Create Project</Link>
          <Link className="big-btn ghost" to="/ai">Run AI Agent</Link>
        </div>
      </section>

      <section className="section">
        <p className="tag">WORKFLOW</p>
        <h2>From Idea To Deployment</h2>

        <div className="grid four">
          <div className="card"><h3>1. Project</h3><p>Create and manage software projects.</p></div>
          <div className="card"><h3>2. AI Agents</h3><p>Generate requirements, design, code plans and tests.</p></div>
          <div className="card"><h3>3. Tasks & Sprints</h3><p>Convert ideas into trackable execution.</p></div>
          <div className="card"><h3>4. DevOps</h3><p>Generate Docker, Jenkins and Kubernetes configs.</p></div>
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="tag">AGENT NETWORK</p>
          <h2>7 AI Agents Working Together</h2>
          <p>
            Each agent owns one SDLC phase and helps teams reduce manual
            engineering work.
          </p>
        </div>

        <div className="cards">
          <div className="card">Requirements Analysis Agent</div>
          <div className="card">System Design Agent</div>
          <div className="card">Development Agent</div>
          <div className="card">Testing Agent</div>
          <div className="card">Code Review Agent</div>
          <div className="card">DevOps Agent</div>
          <div className="card">Project Manager Agent</div>
        </div>
      </section>

      <section className="section center">
        <p className="tag">MODULES</p>
        <h2>DevLoop App Modules</h2>

        <div className="grid">
          <Link className="card" to="/projects"><h3>Projects</h3><p>Manage software projects.</p></Link>
          <Link className="card" to="/ai"><h3>AI Workspace</h3><p>Run SDLC AI agents.</p></Link>
          <Link className="card" to="/tasks"><h3>Tasks</h3><p>Track development tasks.</p></Link>
          <Link className="card" to="/sprints"><h3>Sprints</h3><p>Plan agile sprints.</p></Link>
          <Link className="card" to="/team"><h3>Team</h3><p>Manage project members.</p></Link>
          <Link className="card" to="/analytics"><h3>Analytics</h3><p>View progress metrics.</p></Link>
          <Link className="card" to="/health"><h3>Health Score</h3><p>Track project health.</p></Link>
          <Link className="card" to="/activity"><h3>Activity Logs</h3><p>View audit trail.</p></Link>
        </div>
      </section>
    </div>
  );
}