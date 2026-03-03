const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_AGENTS = [
  {
    id: "CL-001",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 801 234 5678",
    status: "Active",
    joined: "2025-11-20",
    totalBookings: 12,
    reports: 2,
  },
  {
    id: "CL-002",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 905 555 0101",
    status: "Inactive",
    joined: "2026-01-15",
    totalBookings: 0,
    reports: 0,
  },
  {
    id: "CL-003",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 703 111 2233",
    status: "Suspended",
    joined: "2026-02-10",
    totalBookings: 5,
    reports: 20,
  },
  {
    id: "CL-004",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
    reports: 0,
  },
  {
    id: "CL-005",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
    reports: 0,
  },
  {
    id: "CL-006",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
    reports: 0,
  },
  {
    id: "CL-007",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
    reports: 0,
  },
  {
    id: "CL-008",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
    reports: 0,
  },
  {
    id: "CL-009",
    name: "Mock Data",
    email: "mockData@example.com",
    phone: "+234 812 000 9988",
    status: "Pending",
    joined: "2026-02-28",
    totalBookings: 1,
    reports: 0,
  },
];

export const agentService = {
  getAllAgents: async () => {
    await delay(800);
    return [...MOCK_AGENTS];
  },

  getAgentById: async (id) => {
    await delay(500);
    return MOCK_AGENTS.find((agent) => agent.id === id);
  },

  createAgent: async (agentData) => {
    await delay(1000);
    const newAgent = {
      id: `CL-00${MOCK_AGENTS.length + 1}`,
      ...agentData,
      joined: new Date().toISOString().split("T")[0],
      totalBookings: 0,
    };
    console.log("Mock API: agent Created", newAgent);
    return newAgent;
  },
};
