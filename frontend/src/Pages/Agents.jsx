import React, { useEffect, useState } from "react";

const API_URL =
  "https://dwellify-backend-bq39.onrender.com/api/users/agents";

const ITEMS_PER_PAGE = 5;

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch agents");
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
    return new Date(timestamp._seconds * 1000).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "status approved";
      case "rejected":
        return "status rejected";
      default:
        return "status pending";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAgents = agents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container">
      <h1>Agents Management</h1>

      {loading && <p className="center">Loading agents...</p>}
      {error && <p className="error">⚠ {error}</p>}

      {!loading && !error && agents.length === 0 && (
        <p className="center">No agents found.</p>
      )}

      {!loading && !error && agents.length > 0 && (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Agency</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>License</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {currentAgents.map((agent) => (
                  <tr key={agent.uid}>
                    <td>{agent.agentDetails?.name || "N/A"}</td>
                    <td>{agent.agentDetails?.agencyName || "N/A"}</td>
                    <td>{agent.agentDetails?.email || "N/A"}</td>
                    <td>{agent.phoneNumber || "N/A"}</td>
                    <td>{agent.agentDetails?.licenseId || "N/A"}</td>
                    <td>
                      <span className={getStatusClass(agent.agentStatus)}>
                        {agent.agentStatus || "pending"}
                      </span>
                    </td>
                    <td>{formatDate(agent.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      <style>{`
        .container {
          padding: 40px;
          font-family: Inter, sans-serif;
          background: #f9fafb;
          min-height: 100vh;
        }

        h1 {
          margin-bottom: 30px;
          font-size: 26px;
          font-weight: 600;
        }

        .table-wrapper {
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.05);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f3f4f6;
        }

        th, td {
          padding: 14px 16px;
          text-align: left;
          font-size: 14px;
        }

        th {
          font-weight: 600;
          color: #374151;
        }

        tbody tr {
          border-top: 1px solid #e5e7eb;
        }

        tbody tr:hover {
          background: #f9fafb;
        }

        .status {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .approved {
          background: #dcfce7;
          color: #166534;
        }

        .rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .pending {
          background: #fef9c3;
          color: #854d0e;
        }

        .pagination {
          margin-top: 20px;
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .pagination button {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background: white;
          cursor: pointer;
        }

        .pagination button:hover:not(:disabled) {
          background: #2563eb;
          color: white;
        }

        .pagination button.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .center {
          text-align: center;
          margin-top: 40px;
        }

        .error {
          color: #b91c1c;
          text-align: center;
        }
      `}</style>
    </div>
  );
}