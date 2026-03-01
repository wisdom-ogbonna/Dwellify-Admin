export const fetchStatsData = async () => {
  console.log("Service: Fetching stats from API...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    { label: "Total Revenue", val: "N1,240,000" },
    { label: "Net Profit", val: "N920,000" },
    { label: "Agents", val: "80.2k" },
    { label: "Clients", val: "340k" },
  ];
};
