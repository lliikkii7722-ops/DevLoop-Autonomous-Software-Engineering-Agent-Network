import { useEffect, useState } from "react";
import api from "../api/api";

export default function Team() {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    projectId: 1,
    name: "",
    email: "",
    role: "",
    skill: "",
  });

  const loadTeam = async () => {
    try {
      const res = await api.get("/team/project/1");
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to load team", err);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const addMember = async (e) => {
    e.preventDefault();

    try {
      await api.post("/team", form);

      setForm({
        projectId: 1,
        name: "",
        email: "",
        role: "",
        skill: "",
      });

      loadTeam();
    } catch (err) {
      console.error("Member creation failed", err);
      alert("Member creation failed");
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this team member?")) return;

    try {
      await api.delete(`/team/${id}`);
      loadTeam();
    } catch (err) {
      console.error("Member delete failed", err);
      alert("Member delete failed");
    }
  };

  return (
    <div className="section">
      <p className="tag">TEAM MANAGEMENT</p>
      <h1>Team</h1>

      <form className="card form" onSubmit={addMember}>
        <input
          placeholder="Member Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Member Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option>FRONTEND DEVELOPER</option>
          <option>BACKEND DEVELOPER</option>
          <option>FULL STACK DEVELOPER</option>
          <option>TESTER</option>
          <option>DEVOPS ENGINEER</option>
          <option>PROJECT MANAGER</option>
        </select>

        <input
          placeholder="Skill / Tech Stack"
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
        />

        <button>Add Team Member</button>
      </form>

      <div className="grid">
        {members.map((member) => (
          <div className="card" key={member.id}>
            <small>MEMBER #{member.id}</small>
            <h3>{member.name}</h3>
            <p>{member.email}</p>
            <p>
              <b>Role:</b> {member.role}
            </p>
            <span className="online">● {member.skill}</span>

            <button
              style={{ marginTop: "18px", background: "#ff3b6b" }}
              onClick={() => deleteMember(member.id)}
            >
              Delete Member
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
