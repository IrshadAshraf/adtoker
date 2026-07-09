import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const STATS = [
  { id: "brands", value: 500, suffix: "+", label: "Brands Served" },
  { id: "views", value: 50, suffix: "M+", label: "Views Generated" },
  { id: "revenue", value: 10, suffix: "M+", label: "Revenue Driven" },
  { id: "satisfaction", value: 95, suffix: "%", label: "Satisfaction" },
];

// Fixed (not random-per-render) particle layout so the background is
// consistent across renders instead of reshuffling every time.
const PARTICLES = [
  { left: "4%", size: 5, delay: 0, duration: 5.5 },
  { left: "11%", size: 3, delay: 1.1, duration: 6.5 },
  { left: "19%", size: 6, delay: 2.4, duration: 5 },
  { left: "27%", size: 4, delay: 0.6, duration: 7 },
  { left: "35%", size: 3, delay: 3, duration: 6 },
  { left: "43%", size: 5, delay: 1.8, duration: 5.8 },
  { left: "52%", size: 4, delay: 0.3, duration: 6.4 },
  { left: "60%", size: 6, delay: 2.1, duration: 5.2 },
  { left: "68%", size: 3, delay: 1.4, duration: 7.2 },
  { left: "76%", size: 5, delay: 2.7, duration: 5.6 },
  { left: "84%", size: 4, delay: 0.9, duration: 6.8 },
  { left: "92%", size: 3, delay: 3.3, duration: 5.4 },
];

/* ------------------------------------------------------------------ */
/*  Animated counter with a permanent idle pulse once it lands          */
/* ------------------------------------------------------------------ */

function AnimatedStat({ value, suffix, duration = 2, shouldReduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      setDone(true);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <motion.p
      ref={ref}
      className="text-4xl font-extrabold leading-none text-white sm:text-5xl"
      animate={
        done && !shouldReduceMotion
          ? {
              scale: [1, 1.045, 1],
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 18px rgba(255,255,255,0.55)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }
          : {}
      }
      transition={
        done ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}
      }
    >
      {display}
      {suffix}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/*  Aggressive, permanently-looping background                         */
/* ------------------------------------------------------------------ */

function StatsBackground({ shouldReduceMotion }) {
  if (shouldReduceMotion) {
    return <div className="absolute inset-0 bg-[#F0453D]" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F0453D]">
      {/* fast diagonal marching stripes */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 2px, transparent 2px, transparent 34px)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPositionX: [0, 240],
          backgroundPositionY: [0, 240],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* slow counter-moving stripe layer for depth */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-135deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1.5px, transparent 1.5px, transparent 26px)",
        }}
        animate={{
          backgroundPositionX: [0, -220],
          backgroundPositionY: [0, 220],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* roaming glow */}
      <motion.div
        aria-hidden
        className="absolute -top-1/2 h-[140%] w-72 rounded-full bg-white/20 blur-3xl"
        animate={{ left: ["-10%", "110%", "-10%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* rising particles */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute bottom-0 rounded-full bg-white/70"
          style={{ left: p.left, width: p.size, height: p.size }}
          animate={{ y: ["10%", "-420%"], opacity: [0, 0.9, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                        */
/* ------------------------------------------------------------------ */

function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[1600px] overflow-hidden rounded-tl-[64px] rounded-tr-2xl rounded-bl-2xl rounded-br-[64px] shadow-[0_25px_60px_-20px_rgba(240,69,61,0.45)]"
      >
        <StatsBackground shouldReduceMotion={shouldReduceMotion} />

        <div className="relative grid grid-cols-2 gap-y-10 px-8 py-12 sm:grid-cols-4 sm:gap-y-0 sm:px-14 sm:py-14">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative px-2 sm:px-6 ${
                i > 0 ? "sm:border-l sm:border-white/20" : ""
              }`}
            >
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                shouldReduceMotion={shouldReduceMotion}
              />
              <p className="mt-2 text-sm text-white/75">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Stats;
