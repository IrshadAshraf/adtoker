import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { HashLink } from "react-router-hash-link";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Static content — swap in real copy / images whenever ready         */
/* ------------------------------------------------------------------ */

const CUSTOMER_AVATARS = [
  { id: 1, name: "Amir K.", src: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Priya S.", src: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Leah M.", src: "https://i.pravatar.cc/150?img=32" },
];

const REVIEWER_AVATARS = [
  { id: 1, name: "Daniyal R.", src: "https://i.pravatar.cc/150?img=68" },
  { id: 2, name: "Sara T.", src: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Musa H.", src: "https://i.pravatar.cc/150?img=59" },
];

const PILLARS = [
  {
    id: "mission",
    icon: HiOutlineSparkles,
    title: "Our Mission",
    copy: "To empower businesses with innovative TikTok Shop marketing solutions",
    drawerCopy:
      "We build the content, creator pipelines, and paid strategy that turn a TikTok Shop storefront into a brand's biggest growth channel — from first video to first seven figures.",
  },
  {
    id: "vision",
    icon: HiOutlineArrowPathRoundedSquare,
    title: "Our Vision",
    copy: "To become the leading global TikTok Shop growth partner",
    drawerCopy:
      "We're building the playbook every brand reaches for first — a single partner that plans, produces, and optimizes TikTok Shop performance in every market we touch.",
  },
];

/* ------------------------------------------------------------------ */
/*  Small reusable pieces                                              */
/* ------------------------------------------------------------------ */

// Counts up from 0 whenever it scrolls into view — used for the "25+" stat.
function AnimatedCounter({ value, suffix = "", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

// Button that leans toward the cursor. Wrap any pill/CTA in this.
function MagneticButton({ children, className, onClick, ...props }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMouseMove(e) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [toast, setToast] = useState(false);

  function openDrawer(pillar) {
    setActivePillar(pillar);
    setDrawerOpen(true);
  }

  function handleRate(n) {
    setRating(n);
    setToast(true);
    window.clearTimeout(handleRate._t);
    handleRate._t = window.setTimeout(() => setToast(false), 2200);
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-5 py-24 sm:px-10"
    >
      {/* ambient background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#EF1751]/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#1D4E5F]/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14">
        {/* ---------------------------------------------------------- */}
        {/* LEFT — image collage                                       */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          className="relative mx-auto h-[340px] w-full max-w-md sm:h-[420px] lg:h-[480px]"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* back image */}
          <motion.div
            className="absolute left-0 top-0 h-[260px] w-[230px] overflow-hidden rounded-[100px] border-2 border-[#1D4E5F]/40 shadow-xl sm:h-[290px] sm:w-[250px]"
            whileHover={shouldReduceMotion ? {} : { y: -10, rotate: -2 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
              alt="Two teammates reviewing TikTok Shop analytics together"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* front image */}
          <motion.div
            className="absolute bottom-0 right-0 h-[380px] w-[300px] overflow-hidden rounded-[140px] border-2 border-[#EF1751]/50 shadow-2xl sm:h-[430px] sm:w-[330px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -10, rotate: 2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=700&auto=format&fit=crop"
              alt="Creator filming a live TikTok Shop unboxing"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* floating "happy customers" card */}
          <motion.button
            type="button"
            onClick={() => handleRate(rating)}
            className="group absolute bottom-6 left-2 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_-8px_rgba(23,23,31,0.25)] sm:left-4"
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                    y: shouldReduceMotion ? 0 : [30, 0, -6, 0],
                  }
                : {}
            }
            transition={{
              opacity: { duration: 0.5, delay: 0.55 },
              scale: {
                duration: 0.5,
                delay: 0.55,
                type: "spring",
                stiffness: 200,
              },
              y: {
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
                delay: 1.2,
              },
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="-space-x-3 flex">
              {CUSTOMER_AVATARS.map((a, i) => (
                <motion.img
                  key={a.id}
                  src={a.src}
                  alt={a.name}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  style={{ zIndex: CUSTOMER_AVATARS.length - i }}
                  whileHover={{ scale: 1.2, zIndex: 20, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                />
              ))}
            </span>
            <span className="text-left text-sm font-semibold text-[#17171F]">
              10K+ Happy customers
            </span>
          </motion.button>

          {/* tiny orbiting accent dot */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden
              className="absolute right-8 top-4 h-3 w-3 rounded-full bg-[#EF1751]"
              animate={{ y: [0, -14, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* RIGHT — copy                                                */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.span
            variants={itemVariants}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#EF1751]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#EF1751]"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#EF1751]"
              animate={
                shouldReduceMotion
                  ? {}
                  : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            About Us
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-5 max-w-lg text-[1.75rem] font-bold leading-[1.15] text-[#17171F] sm:text-4xl"
          >
            Empowering Brands to Win on TikTok Shop
          </motion.h2>

          {/* mission / vision */}
          <div className="mt-8 flex flex-col divide-y divide-[#17171F]/10 sm:max-w-md">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.button
                  type="button"
                  key={pillar.id}
                  variants={itemVariants}
                  onClick={() => openDrawer(pillar)}
                  className="group flex items-start gap-4 py-4 text-left first:pt-0 last:pb-0"
                  whileHover={shouldReduceMotion ? {} : { x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#EF1751] text-lg text-white"
                    whileHover={
                      shouldReduceMotion ? {} : { rotate: 180, scale: 1.08 }
                    }
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon />
                  </motion.span>
                  <span>
                    <span className="flex items-center gap-1.5 text-base font-bold text-[#17171F]">
                      {pillar.title}
                      <FiArrowUpRight className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-500">
                      {pillar.copy}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* stat — always visible, right-aligned on desktop */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-end gap-6 border-t border-[#17171F]/10 pt-6"
          >
            <div className="flex-1" />
            <StatBlock
              isInView={isInView}
              shouldReduceMotion={shouldReduceMotion}
            />
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap items-center gap-8"
          >
            <MagneticButton
              onClick={() => openDrawer(null)}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#EF1751] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#EF1751]/30"
            >
              <span className="relative z-10">More About Us</span>
              <FiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
            </MagneticButton>

            {/* reviewer avatars + rating */}
            <div className="flex items-center gap-3">
              <span className="-space-x-3 flex">
                {REVIEWER_AVATARS.map((a, i) => (
                  <motion.img
                    key={a.id}
                    src={a.src}
                    alt={a.name}
                    title={a.name}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                    style={{ zIndex: REVIEWER_AVATARS.length - i }}
                    whileHover={{ scale: 1.25, zIndex: 20, y: -4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 12 }}
                  />
                ))}
              </span>
              <div>
                <div
                  className="flex gap-0.5"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.button
                      key={n}
                      type="button"
                      aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                      onMouseEnter={() => setHoverRating(n)}
                      onClick={() => handleRate(n)}
                      initial={{ opacity: 0, scale: 0, rotate: -60 }}
                      animate={
                        isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                      }
                      transition={{
                        delay: 0.7 + n * 0.07,
                        type: "spring",
                        stiffness: 260,
                        damping: 14,
                      }}
                      whileHover={{ scale: 1.3, rotate: 8 }}
                      whileTap={{ scale: 0.85 }}
                      className="text-sm"
                    >
                      <FaStar
                        className={
                          n <= (hoverRating || rating || 5)
                            ? "text-[#EF1751]"
                            : "text-gray-200"
                        }
                      />
                    </motion.button>
                  ))}
                </div>
                <HashLink
                  smooth
                  to="#testimonials"
                  className="mt-0.5 block text-xs text-gray-500 underline-offset-2 hover:text-[#EF1751] hover:underline"
                >
                  Client Satisfaction Rate
                </HashLink>
              </div>
            </div>
          </motion.div>
        </motion.div>


      </div>

      {/* toast for the star-rating micro interaction */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-8 left-1/2 z-[110] rounded-full bg-[#17171F] px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            Thanks for the rating! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      {/* drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        icon={activePillar ? <activePillar.icon /> : <HiOutlineSparkles />}
        title={activePillar ? activePillar.title : "About Veriday"}
        subtitle={
          activePillar
            ? "Why this drives everything we build"
            : "Empowering brands to win on TikTok Shop"
        }
      >
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-gray-600">
            {activePillar
              ? activePillar.drawerCopy
              : "We're a growth partner for brands selling on TikTok Shop — combining content, creators, and performance media into one system built to compound."}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {PILLARS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(p)}
                className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-colors ${
                  activePillar?.id === p.id
                    ? "border-[#EF1751] bg-[#EF1751]/5 text-[#EF1751]"
                    : "border-gray-200 text-gray-500 hover:border-[#EF1751]/40"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-2xl font-bold text-[#17171F]">
              <AnimatedCounter value={25} suffix="+" />
              <span className="ml-1 text-sm font-medium text-gray-500">
                brand partners scaled
              </span>
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setDrawerOpen(false);
              setToast(true);
              window.setTimeout(() => setToast(false), 2200);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#17171F] px-6 py-3.5 text-sm font-bold text-white"
          >
            <HiOutlineCalendarDays className="text-base" />
            Book a Free Strategy Call
          </motion.button>
        </div>
      </Drawer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat block (used in both the mobile and desktop positions)         */
/* ------------------------------------------------------------------ */

function StatBlock({ isInView, shouldReduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "top" }}
    >
      <p className="text-4xl font-bold text-[#17171F] sm:text-5xl">
        <AnimatedCounter value={25} suffix="+" />
      </p>
      <p className="mt-1 max-w-[9rem] text-sm text-gray-500">
        Brand Partners Served &amp; Scaled
      </p>
    </motion.div>
  );
}
