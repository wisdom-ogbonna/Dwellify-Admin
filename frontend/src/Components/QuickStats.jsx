function QuickStats({quikStats}) {

  return (
    <section className="mt-2 pt-8 border-t border-gray-100">
      <h2 className="text-sm font-bold uppercase mb-4 text-gray-400 tracking-widest">
        Quick Stats
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quikStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-[10px] uppercase font-bold opacity-60 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black tracking-tight">{stat.val}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickStats;
