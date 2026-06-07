import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ADMIN" });

  const register = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-cyber">
      <div className="auth-left">
        <h1>Dev<span>Loop</span></h1>
        <p>Create your AI engineering control center account.</p>
      </div>

      <form className="auth-panel" onSubmit={register}>
        <small>CREATE ACCESS</small>
        <h2>Register</h2>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option>ADMIN</option>
          <option>PROJECT_MANAGER</option>
          <option>DEVELOPER</option>
          <option>TESTER</option>
          <option>DEVOPS</option>
        </select>
        <button>Create Account</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}