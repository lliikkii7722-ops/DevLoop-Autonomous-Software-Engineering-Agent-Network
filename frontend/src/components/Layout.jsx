import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app-page">
      <nav className="top-nav">
        <div className="brand">
          Dev<span>Loop</span> <small>APP</small>
        </div>

        <div className="top-links">
          <Link to="/dashboard">Dashboard</Link>

          {(role === "ADMIN" || role === "PROJECT_MANAGER") && (
            <>
              <Link to="/projects">Projects</Link>
              <Link to="/sprints">Sprints</Link>
              <Link to="/team">Team</Link>
              <Link to="/analytics">Analytics</Link>
            </>
          )}

          {(role === "ADMIN" ||
            role === "PROJECT_MANAGER" ||
            role === "DEVELOPER" ||
            role === "TESTER") && <Link to="/tasks">Tasks</Link>}

          {(role === "ADMIN" ||
            role === "PROJECT_MANAGER" ||
            role === "DEVELOPER" ||
            role === "TESTER" ||
            role === "DEVOPS") && (
            <>
              <Link to="/ai">Agents</Link>
              <Link to="/activity">Activity</Link>
            </>
          )}

          {(role === "ADMIN" ||
            role === "PROJECT_MANAGER" ||
            role === "DEVOPS") && <Link to="/health">Health</Link>}
        </div>

        <button onClick={logout}>Logout</button>
      </nav>

      <main className="app-main">{children}</main>
    </div>
  );
}