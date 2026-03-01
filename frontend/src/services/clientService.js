const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_CLIENTS = [
  {
    id: "CL-001",
    name: "Tunde Ednut",
    email: "tunde@example.com",
    phone: "+234 801 234 5678",
    status: "Active",
    joined: "2025-11-20",
    totalBookings: 12,
  },
  {
    id: "CL-002",
    name: "Aisha Bello",
    email: "aisha.b@dwellify.ng",
    phone: "+234 905 555 0101",
    status: "Inactive",
    joined: "2026-01-15",
    totalBookings: 0,
  },
  {
    id: "CL-003",
    name: "Ikechukwu Okafor",
    email: "ike@riversstate.gov.ng",
    phone: "+234 703 111 2233",
    status: "Active",
    joined: "2026-02-10",
    totalBookings: 5,
  },
  {
    id: "CL-004",
    name: "Sarah Williams",
    email: "sarah.w@gmail.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
  },
];

export const clientService = {
  getAllClients: async () => {
    await delay(800);
    return [...MOCK_CLIENTS];
  },

  getClientById: async (id) => {
    await delay(500);
    return MOCK_CLIENTS.find((client) => client.id === id);
  },

  createClient: async (clientData) => {
    await delay(1000);
    const newClient = {
      id: `CL-00${MOCK_CLIENTS.length + 1}`,
      ...clientData,
      joined: new Date().toISOString().split("T")[0],
      totalBookings: 0,
    };
    console.log("Mock API: Client Created", newClient);
    return newClient;
  },
};
