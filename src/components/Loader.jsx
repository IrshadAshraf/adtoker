import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return p + Math.random() * 14 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0A0A0D]"
        >
          {/* Ambient blobs */}
          <motion.div
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#EF1751]/20 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#EF1751]/10 blur-[100px]"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12 flex flex-col items-center gap-4"
          >
            {/* Spinning ring */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute h-28 w-28 rounded-full border-2 border-[#EF1751]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute h-20 w-20 rounded-full border-2 border-dashed border-[#EF1751]/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              {/* Pulse rings */}
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-14 w-14 rounded-full bg-[#EF1751]/20"
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.9,
                    ease: "easeOut",
                  }}
                />
              ))}
              {/* Logo pill */}
              <div className="relative z-10 rounded-2xl bg-white px-4 py-2 shadow-lg">
                <span className="text-2xl font-bold tracking-tighter">
                  <span className="text-[#EF1751]">AD</span>
                  <span className="text-[#16213E]">TOKER</span>
                </span>
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm font-medium tracking-widest text-white/40 uppercase"
            >
              Grow Your TikTok Shop
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-64"
          >
            <div className="h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#EF1751] to-[#ff6b9d]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                Loading
              </span>
              <motion.span
                className="text-[10px] font-bold text-[#EF1751]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.span>
            </div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#EF1751]"
              style={{
                left: `${15 + i * 14}%`,
                bottom: "15%",
              }}
              animate={{
                y: ["0%", "-300%"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
