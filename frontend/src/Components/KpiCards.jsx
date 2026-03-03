function KpiCards({ kpiInfo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {kpiInfo.map((kpi, i) => (
        <div
          key={i}
          className={`${kpi.color} border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              {kpi.label}
            </span>
            {kpi.icon}
          </div>
          <div className="text-3xl font-black">{kpi.val}</div>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;
