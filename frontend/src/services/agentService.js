const API_URL = "https://dwellify-backend-bq39.onrender.com/api/users/agents";

export const agentService = {
  getAllAgents: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      throw error;
    }
  },

  getAgentById: async (uid) => {
    try {
      const response = await fetch(`${API_URL}/${uid}`);
      if (!response.ok) throw new Error("Agent not found");
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch agent ${uid}:`, error);
      throw error;
    }
  },

  formatAgentDate: (timestamp) => {
    if (!timestamp?._seconds) return "N/A";
    return new Date(timestamp._seconds * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  getStatusTheme: (status) => {
    const map = {
      approved: "status approved",
      rejected: "status rejected",
      pending: "status pending",
    };
    return map[status?.toLowerCase()] || "status pending";
  },
};
