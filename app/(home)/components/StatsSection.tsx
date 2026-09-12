export default function StatsSection() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "40p", label: "Per Minute Rate" },
    { value: "24/7", label: "Customer Support" },
    { value: "1s", label: "Pulse Billing" },
  ];

  return (
    <section className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8">
      <div
        className="
          mx-auto w-full max-w-7xl
          rounded-2xl md:rounded-3xl
          bg-white
          p-6 sm:p-10 lg:p-14
          shadow-[0_20px_50px_-12px_rgba(9,21,64,0.3)]
          border border-slate-200
        ">
        <div
          className="
            grid grid-cols-2 gap-y-10
            md:grid-cols-4 md:gap-y-0
            divide-y divide-slate-200
            md:divide-y-0 md:divide-x md:divide-slate-200
          "
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                group flex cursor-pointer flex-col
                items-center justify-center
                px-2 pt-6
                transition-transform duration-300
                hover:-translate-y-1
                md:pt-0
              "
            >
              <span
                className="
                  text-4xl font-extrabold tracking-tight text-black
                  transition-colors duration-300
                  sm:text-5xl lg:text-6xl
                  group-hover:text-orange-400
                "
              >
                {stat.value}
              </span>

              <span
                className="
                  mt-3 text-center
                  text-[10px] font-bold uppercase
                  tracking-[0.15em] text-slate-400
                  sm:text-xs
                "
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}