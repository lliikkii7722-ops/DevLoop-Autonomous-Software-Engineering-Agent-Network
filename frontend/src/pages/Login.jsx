import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-cyber">
      <div className="auth-left">
        <h1>Dev<span>Loop</span></h1>
        <p>Multi-Agent AI Software Engineering Platform</p>
      </div>

      <form className="auth-panel" onSubmit={login}>
        <small>SECURE ACCESS</small>
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button>Launch Dashboard</button>
        <p>New here? <Link to="/register">Create account</Link></p>
      </form>
    </div>
  );
}