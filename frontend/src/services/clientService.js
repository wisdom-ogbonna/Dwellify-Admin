const API_URL = "https://dwellify-backend-bq39.onrender.com/api/users/clients";

export const clientService = {
  getAllClients: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      throw error;
    }
  },

  getClientById: async (uid) => {
    try {
      const response = await fetch(`${API_URL}/${uid}`);
      if (!response.ok) throw new Error("Client not found");
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch client ${uid}:`, error);
      throw error;
    }
  },

  formatClientDate: (timestamp) => {
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
      active: "status approved",
    };
    return map[status?.toLowerCase()] || "status pending";
  },
};
