import { features } from "@/app/utils/data";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};
const WhatyouGet = () => {
  return (
    <div>
      {/* ============ WHAT YOU GET ============ */}
      <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-175 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Platform Benefits
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]"
            >
              What You Get with
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                AI CALL BD
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 mt-4 text-base leading-relaxed"
            >
              Affordable rates, powerful features, and zero hassle — everything
              a modern business needs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group bg-white p-7  cursor-pointer rounded-3xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.iconColor} ${feature.hoverBg} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:text-white transition-all duration-500 font-bold text-lg`}>
                  {feature.isText ? (
                    <span>{feature.icon}</span>
                  ) : (
                    <feature.icon className="w-6 h-6" />
                  )}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhatyouGet;
