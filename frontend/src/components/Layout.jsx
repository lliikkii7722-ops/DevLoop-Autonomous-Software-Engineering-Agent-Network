 import { Link, useNavigate } from "react-router-dom";

 export default function Layout({ children }) {
   const navigate = useNavigate();

   const logout = () => {
     localStorage.clear();
     navigate("/");
   };

   return (
     <div className="app-page">
       <nav className="top-nav">
         <div className="brand">Dev<span>Loop</span> <small>APP</small></div>
         <div className="top-links">
           <Link to="/dashboard">Dashboard</Link>
           <Link to="/projects">Projects</Link>
           <Link to="/ai">Agents</Link>
           <Link to="/tasks">Tasks</Link>
           <Link to="/sprints">Sprints</Link>
           <Link to="/team">Team</Link>
           <Link to="/analytics">Analytics</Link>
           <Link to="/health">Health</Link>
           <Link to="/activity">Activity</Link>
         </div>
         <button onClick={logout}>Logout</button>
       </nav>

       <main className="app-main">{children}</main>
     </div>
   );
 }