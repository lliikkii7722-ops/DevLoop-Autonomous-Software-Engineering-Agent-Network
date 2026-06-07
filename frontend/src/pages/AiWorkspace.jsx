import { useState } from "react";

export default function AIWorkspace() {
  const [prompt, setPrompt] = useState("");
  const [agentType, setAgentType] = useState("REQUIREMENTS");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const runAgent = async () => {
    if (!prompt.trim()) {
      setResponse("Please enter a project idea first.");
      return;
    }

    try {
      setLoading(true);
      setResponse("AI Agent is working...");

      const res = await fetch("http://localhost:2008/api/agents/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          projectId: 1,
          agentType: agentType,
          input: prompt,
        }),
      });

      if (!res.ok) {
        throw new Error("Agent request failed");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse("Failed to execute AI Agent. Check backend, token, and Ollama.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <p className="tag">AI WORKSPACE</p>

      <h1>Multi-Agent Command Center</h1>

      <div className="card">
        <select
          value={agentType}
          onChange={(e) => setAgentType(e.target.value)}
        >
          <option value="REQUIREMENTS">Requirements Agent</option>
          <option value="DESIGN">System Design Agent</option>
          <option value="DEVELOPMENT">Development Agent</option>
          <option value="TESTING">Testing Agent</option>
          <option value="CODE_REVIEW">Code Review Agent</option>
          <option value="DEVOPS">DevOps Agent</option>
          <option value="PROJECT_MANAGER">Project Manager Agent</option>
          <option value="TASK_GENERATOR">Task Generator Agent</option>
        </select>

        <textarea
          rows="8"
          placeholder="Example: Build a college placement portal"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="big-btn"
          style={{ marginTop: "20px" }}
          onClick={runAgent}
          disabled={loading}
        >
          {loading ? "RUNNING..." : "RUN AGENT"}
        </button>
      </div>

      {response && (
        <div
          className="card output"
          style={{
            marginTop: "30px",
            whiteSpace: "pre-line",
          }}
        >
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}