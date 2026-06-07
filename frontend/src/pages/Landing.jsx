import { Link } from "react-router-dom";

export default function Landing() {
  const agents = [
    ["Requirements Analysis Agent", "Creates requirements, user stories and BDD scenarios."],
    ["System Design Agent", "Generates architecture, API contracts and DB schema."],
    ["Development Agent", "Creates code structure, entities, controllers and services."],
    ["Testing Agent", "Generates unit tests, integration tests and edge cases."],
    ["Code Review Agent", "Finds bugs, code smells, security and performance issues."],
    ["DevOps Agent", "Generates Dockerfile, Jenkinsfile and Kubernetes YAML."],
    ["Project Manager Agent", "Creates sprint plans, tasks, priorities and risks."],
  ];

  return (
    <div className="landing">
      <nav className="top-nav">
        <div className="brand">Dev<span>Loop</span> <small>v2.0</small></div>
        <div className="top-links">
          <a href="#problem">Problem</a>
          <a href="#agents">Agents</a>
          <a href="#stack">Stack</a>
          <a href="#outcome">Outcome</a>
        </div>
        <Link className="nav-btn" to="/login">Launch Demo</Link>
      </nav>

      <section className="hero">
        <p className="tag">AUTONOMOUS SOFTWARE ENGINEERING</p>
        <h1>The AI Agent Network That <span>Builds Software</span></h1>
        <p>
          DevLoop automates the SDLC from requirements to deployment using specialized AI agents.
        </p>
        <Link className="big-btn" to="/login">Launch Demo</Link>
      </section>

      <section id="problem" className="section split">
        <div>
          <p className="tag">THE PROBLEM</p>
          <h2>Manual SDLC Is Slowing Teams Down</h2>
          <p>Development teams waste time on repetitive engineering tasks, manual reviews and disconnected workflows.</p>
        </div>
        <div className="cards">
          <div className="card">Increased Development Time</div>
          <div className="card">Inconsistent Code Quality</div>
          <div className="card">Poor Project Visibility</div>
          <div className="card">Manual CI/CD Setup</div>
        </div>
      </section>

      <section id="agents" className="section">
        <p className="tag">AGENT NETWORK</p>
        <h2>7 Specialized AI Agents</h2>
        <div className="grid">
          {agents.map((a, i) => (
            <div className="card" key={i}>
              <small>AGENT-0{i + 1}</small>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
              <b className="online">● ONLINE</b>
            </div>
          ))}
        </div>
      </section>

      <section id="stack" className="section center">
        <p className="tag">TECH STACK</p>
        <h2>Built on Battle-Tested Tools</h2>
        <div className="stack">
          {["Java", "Spring Boot", "React", "MySQL", "Ollama", "JWT", "Docker", "Jenkins", "Kubernetes"].map(x => <span key={x}>{x}</span>)}
        </div>
      </section>

      <section id="outcome" className="section center">
        <p className="tag">OUTCOME</p>
        <h2>What Teams Gain</h2>
        <div className="grid four">
          <div className="card"><h3>Build Faster</h3><p>Reduce SDLC time.</p></div>
          <div className="card"><h3>Fewer Defects</h3><p>Improve code quality.</p></div>
          <div className="card"><h3>Deployment Ready</h3><p>Generate DevOps files.</p></div>
          <div className="card"><h3>Full Visibility</h3><p>Track health and activity.</p></div>
        </div>
      </section>
    </div>
  );
}