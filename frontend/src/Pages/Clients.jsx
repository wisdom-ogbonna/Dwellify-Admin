import React, { useEffect, useState } from "react";

const API_URL =
  "https://dwellify-backend-bq39.onrender.com/api/users/clients";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch CLinets");
      }

      const data = await response.json();
      setAgents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?._seconds) return "N/A";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading agents...</h2>;
  }

  if (error) {
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>
        Error: {error}
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Registered Agents</h1>

      <div style={styles.grid}>
        {agents.length === 0 ? (
          <p>No agents found.</p>
        ) : (
          agents.map((agent) => (
            <div key={agent.uid} style={styles.card}>
              <h2>{agent.agentDetails?.name || "No Name"}</h2>

              <p><strong>Agency:</strong> {agent.agentDetails?.agencyName}</p>
              <p><strong>Email:</strong> {agent.agentDetails?.email}</p>
              <p><strong>Phone:</strong> {agent.phoneNumber}</p>
              <p><strong>License ID:</strong> {agent.agentDetails?.licenseId}</p>
              <p><strong>Address:</strong> {agent.agentDetails?.address}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      agent.agentStatus === "approved"
                        ? "green"
                        : agent.agentStatus === "rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {agent.agentStatus}
                </span>
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {formatDate(agent.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};