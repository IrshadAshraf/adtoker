import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiCheck,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import { RiSparkling2Fill } from "react-icons/ri";

import topLeftGradient from "@/assets/hero/Ellipse 110.png";
import bottomRightGradient from "@/assets/hero/Ellipse 111.png";
import avatar1 from "@/assets/hero/avatar1.jpg";
import avatar2 from "@/assets/hero/966bdcc20de9d1146da18068833210d399cd593e.jpg";
import avatar3 from "@/assets/hero/8a4c9bfca03871db6fdf728e677e6b5356ed9fa1.jpg";
import image1 from "@/assets/hero/c195f31306666d71261fcaa0d9b094f1bfdbcad2.png";
import image2 from "@/assets/hero/089fa1317f4841a41e9a34a77e20c6f7d6e3df26.png";
import imageTopLeft from "@/assets/hero/image 12.png";

import Drawer from "./Drawer";
import { TrendingUp } from "lucide-react";

const HEADLINE_LINES = [
  ["Grow", "Your", "TikTok"],
  ["Shop", "Faster", "with"],
  ["AdToker"],
];

const CHECKLIST = [
  "Trusted by 500+ Brands",
  "Millions in TikTok Shop Revenue",
  "Expert Growth Team",
];

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22 } },
};

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const wordVariants = {
  hidden: { y: "120%", rotate: 6, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
};

const listItem = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function Counter({ to, suffix = "", prefix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

function MagneticButton({
  children,
  className,
  onClick,
  strength = 16,
  type = "button",
  ...rest
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 16, mass: 0.4 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ children, className, maxTilt = 10, ...rest }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt);
    rotateX.set(-py * maxTilt);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function AvatarStack({ avatars }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex"
    >
      {avatars.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt="Community member"
          initial={{ opacity: 0, scale: 0.5, x: -i * 12 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: hovered ? -i * 12 + i * 16 : -i * 12,
            y: hovered ? -4 : 0,
            zIndex: hovered ? 10 + i : i,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: hovered ? 0 : 0.7 + i * 0.1,
          }}
          className="h-9 w-9 rounded-full border-2 border-[#EF1751] object-cover shadow-sm"
        />
      ))}
    </div>
  );
}

function Hero() {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FCE8EF] via-[#FBE8EF] to-white pb-20 pt-36 sm:pt-40">
      {/* Decorative floating gradient blobs */}
      <motion.img
        src={topLeftGradient}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-16 w-[420px] select-none opacity-80"
        animate={{ y: [0, 22, 0], x: [0, 12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bottomRightGradient}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 w-[460px] select-none opacity-80"
        animate={{ y: [0, -20, 0], x: [0, -14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-16 px-5 sm:px-10 lg:grid-cols-2 lg:gap-14">
        {/* Left column */}
        <div>
          <motion.h1
            variants={lineContainer}
            initial="hidden"
            animate="visible"
            className="text-[2rem] font-bold leading-[1.1] tracking-tight text-[#111118] sm:text-5xl lg:text-6xl"
          >
            {HEADLINE_LINES.map((words) => (
              <motion.span
                key={words.join(" ")}
                variants={wordContainer}
                className="mb-1 flex flex-wrap gap-x-3 overflow-hidden"
              >
                {words.map((word) => (
                  <span
                    key={word}
                    className="inline-block overflow-hidden py-1"
                  >
                    <motion.span
                      variants={wordVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-6 max-w-md text-base leading-relaxed text-[#6B6B76]"
          >
            Scale your brand with data-driven TikTok Shop management, influencer
            marketing, affiliate partnerships, and high-converting content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              onClick={() => setGetStartedOpen(true)}
              whileHover={{
                scale: 1.07,
                boxShadow: "0 18px 40px -10px rgba(239,23,81,0.65)",
              }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#EF1751] px-5 py-3 text-sm font-semibold text-white"
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "220%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
              />
              <span className="relative">Get Started</span>
              <motion.span
                className="relative inline-flex"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <FiArrowRight />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              onClick={() => setBookCallOpen(true)}
              whileHover={{
                scale: 1.07,
                borderColor: "#EF1751",
                color: "#EF1751",
                y: -3,
              }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#17171F] transition-colors"
            >
              <motion.span
                className="inline-flex"
                animate={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <FiCalendar />
              </motion.span>
              Book a Free Strategy Call
            </MagneticButton>
          </motion.div>

          <motion.ul
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col gap-3.5"
          >
            {CHECKLIST.map((item) => (
              <motion.li
                key={item}
                variants={listItem}
                className="group flex items-center gap-3"
              >
                <motion.span
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EF1751] text-white"
                >
                  <FiCheck size={13} />
                </motion.span>
                <span className="text-sm font-medium text-[#3A3A44]">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right column - image / stats composition */}
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
          <div className="grid gap-4">
            {/* Stat card */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, rotate: -1 }}
              className="relative flex flex-col rounded-3xl bg-[#EF1751] p-5 text-white shadow-[0_20px_45px_-15px_rgba(239,23,81,0.55)]"
            >
              <AvatarStack avatars={[avatar1, avatar2, avatar3]} />

              <div className="mt-6">
                <p className="text-3xl font-bold leading-none">
                  <Counter to={245} suffix="k +" />
                </p>
                <p className="mt-2 text-xs font-medium text-white/80">
                  More Then 2000 Peoples Joins Us
                </p>
              </div>
            </motion.div>

            {/* Top-right image */}
            <TiltCard
              maxTilt={12}
              initial={{ opacity: 0, x: 40, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl shadow-[0_20px_45px_-15px_rgba(23,23,31,0.25)]"
            >
              <motion.img
                src={image1}
                alt="TikTok Shop live styling session"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1,
                  type: "spring",
                  stiffness: 240,
                  damping: 16,
                }}
                whileHover={{ scale: 1.05 }}
                className="absolute right-3 top-3 flex items-center gap-2 rounded-2xl bg-black/40 px-3 py-2 text-white shadow-lg backdrop-blur-md"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#17171F]">
                  <FiTrendingUp size={13} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold">
                    <Counter to={324} prefix="+" suffix="%" />
                  </span>
                  <span className="block text-[10px] font-medium text-white/75">
                    Revenue Growth
                  </span>
                </span>
              </motion.div>
            </TiltCard>

            {/* Growth badge floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.75,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="relative flex items-center gap-3 rounded-3xl bg-[#EF1751] p-5 text-white shadow-[0_20px_45px_-15px_rgba(239,23,81,0.55)]"
            >
              <div className="flex items-end gap-1">
                {[10, 18, 26, 34].map((h, i) => (
                  <motion.span
                    key={h}
                    className="w-1.5 rounded-full bg-white/90"
                    initial={{ height: 0 }}
                    animate={{ height: h }}
                    transition={{
                      delay: 1 + i * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
              <div>
                <p className="text-lg font-bold leading-none">
                  <Counter to={324} prefix="+" suffix="%" />
                </p>
                <p className="mt-1 text-[11px] font-medium text-white/80">
                  Revenue Growth
                </p>
              </div>
            </motion.div>

            {/* Bottom image spanning both columns */}
            <TiltCard
              maxTilt={8}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="col-span-2 overflow-hidden rounded-3xl shadow-[0_20px_45px_-15px_rgba(23,23,31,0.25)]"
            >
              <motion.img
                src={image2}
                alt="Marketing strategy team collaborating"
                className="h-52 w-full object-cover sm:h-60"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </TiltCard>
          </div>

          {/* Connector icon with radar pulse - signature element */}
          <div className="absolute left-0 top-[38%] -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative grid h-16 w-16 place-items-center">
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-full bg-[#EF1751]/40"
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 1.1,
                    ease: "easeOut",
                  }}
                />
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  opacity: { delay: 0.9, duration: 0.5 },
                  scale: {
                    delay: 0.9,
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                className="absolute -left-12 -bottom-12 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-[#EF1751]/10"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EF1751]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white shadow-sm">
                    <FiTrendingUp className="text-[#EF1751] text-2xl" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started drawer */}
      <Drawer
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
        title="Let's grow your TikTok Shop"
        subtitle="Share a few details and a strategist will follow up within 24 hours."
        icon={<RiSparkling2Fill />}
      >
        <GetStartedForm onDone={() => setGetStartedOpen(false)} />
      </Drawer>

      {/* Book a Free Strategy Call drawer */}
      <Drawer
        isOpen={bookCallOpen}
        onClose={() => setBookCallOpen(false)}
        title="Book a Free Strategy Call"
        subtitle="30 minutes with our growth team, no strings attached."
        icon={<FiCalendar />}
      >
        <BookCallContent onDone={() => setBookCallOpen(false)} />
      </Drawer>
    </div>
  );
}

function GetStartedForm({ onDone }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            delay: 0.1,
          }}
        >
          <FiCheckCircle className="mb-4 text-6xl text-[#EF1751]" />
        </motion.div>
        <h4 className="text-lg font-bold text-[#17171F]">Request received!</h4>
        <p className="mt-1 text-sm text-gray-500">
          We'll email you a tailored growth plan shortly.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-6 rounded-full bg-[#17171F] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
        Brand name
        <input
          required
          type="text"
          placeholder="Your TikTok Shop brand"
          className="rounded-xl border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[#EF1751]"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
        Work email
        <input
          required
          type="email"
          placeholder="you@brand.com"
          className="rounded-xl border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[#EF1751]"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
        Monthly revenue (optional)
        <select className="rounded-xl border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[#EF1751]">
          <option>Just getting started</option>
          <option>$10k - $50k</option>
          <option>$50k - $200k</option>
          <option>$200k+</option>
        </select>
      </label>
      <motion.button
        type="submit"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 12px 28px -10px rgba(239,23,81,0.55)",
        }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#EF1751] px-6 py-3 text-sm font-semibold text-white"
      >
        Send request
        <FiArrowRight />
      </motion.button>
    </form>
  );
}

const CALL_SLOTS = [
  "Mon · 10:00 AM",
  "Tue · 1:30 PM",
  "Wed · 3:00 PM",
  "Thu · 11:00 AM",
  "Fri · 4:00 PM",
];
const CALL_TOPICS = [
  "Growth & revenue audit",
  "Content + influencer strategy",
  "90-day roadmap",
];

function BookCallContent({ onDone }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            delay: 0.1,
          }}
        >
          <FiCheckCircle className="mb-4 text-6xl text-[#EF1751]" />
        </motion.div>
        <h4 className="text-lg font-bold text-[#17171F]">
          Call booked for {selectedSlot}
        </h4>
        <p className="mt-1 text-sm text-gray-500">
          A calendar invite is on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-6 rounded-full bg-[#17171F] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-[#17171F]">
          What we'll cover
        </h4>
        <ul className="flex flex-col gap-2.5">
          {CALL_TOPICS.map((topic) => (
            <li
              key={topic}
              className="flex items-center gap-2.5 text-sm text-[#4B4B57]"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#EF1751]/10 text-[#EF1751]">
                <FiCheck size={11} />
              </span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#17171F]">
          <FiClock /> Pick a time
        </h4>
        <div className="flex flex-wrap gap-2">
          {CALL_SLOTS.map((slot) => {
            const active = selectedSlot === slot;
            return (
              <motion.button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#EF1751] bg-[#EF1751] text-white"
                    : "border-black/10 text-[#4B4B57] hover:border-[#EF1751]/50"
                }`}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.button
        type="button"
        disabled={!selectedSlot}
        onClick={() => setConfirmed(true)}
        whileHover={
          selectedSlot
            ? {
                scale: 1.02,
                boxShadow: "0 12px 28px -10px rgba(239,23,81,0.55)",
              }
            : {}
        }
        whileTap={selectedSlot ? { scale: 0.97 } : {}}
        className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity ${
          selectedSlot ? "bg-[#EF1751]" : "cursor-not-allowed bg-[#EF1751]/40"
        }`}
      >
        Confirm call
        <FiArrowRight />
      </motion.button>
    </div>
  );
}

export default Hero;
