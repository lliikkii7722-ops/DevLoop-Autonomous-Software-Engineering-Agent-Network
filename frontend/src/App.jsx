import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AiWorkspace from "./pages/AiWorkspace";
import Tasks from "./pages/Tasks";
import Sprints from "./pages/Sprints";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import Health from "./pages/Health";
import Activity from "./pages/Activity";
import Layout from "./components/Layout";


function Protected({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Protected><Layout><Dashboard /></Layout></Protected>} />
      <Route path="/projects" element={<Protected><Layout><Projects /></Layout></Protected>} />
      <Route path="/ai" element={<Protected><Layout><AiWorkspace /></Layout></Protected>} />
      <Route path="/tasks" element={<Protected><Layout><Tasks /></Layout></Protected>} />
      <Route path="/sprints" element={<Protected><Layout><Sprints /></Layout></Protected>} />
      <Route path="/team" element={<Protected><Layout><Team /></Layout></Protected>} />
      <Route path="/analytics" element={<Protected><Layout><Analytics /></Layout></Protected>} />
      <Route path="/health" element={<Protected><Layout><Health /></Layout></Protected>} />
      <Route path="/activity" element={<Protected><Layout><Activity /></Layout></Protected>} />
    </Routes>
  );
}