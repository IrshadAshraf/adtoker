import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPhoneCall,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { RiSparkling2Fill } from "react-icons/ri";

import centerImage from "@/assets/why choose us/1d4e65b1b7ac88774aad822f4c45e8c34b082c689.jpg";
import rightImage from "@/assets/why choose us/2d336d079c6c9362608771a5c7fb3722880457a35f.jpg";
import avatar1 from "@/assets/why choose us/4bade173eb3c4cc93556978e64df46d7bd43514c1.jpg";
import avatar2 from "@/assets/why choose us/38ba207a08e02736b82bf0dfb074e9677fb4c2e71.jpg";
import avatar3 from "@/assets/why choose us/3814f8a4415832f7550e1d09b13381ce20bb580f 1.jpg";
import avatar4 from "@/assets/why choose us/e2b5ae5f40288c40abfc2195b667e93b74db021e.jpg";

import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const SUPPORT_AVATARS = [avatar1, avatar2, avatar3, avatar4];

const FEATURES = {
  clients: {
    title: "5K+ Happy Clients",
    description:
      "Over five thousand brands have trusted us to run their TikTok Shop growth — from first listing to seven-figure months.",
    cta: "get-started",
  },
  certified: {
    title: "Certified TikTok Shop Experts",
    description:
      "Our team holds official TikTok Shop Partner certification, so every recommendation is grounded in the platform's own playbook — not guesswork.",
    cta: "get-started",
  },
  support: {
    title: "End-to-End Support",
    description:
      "From onboarding to daily campaign management, you get a dedicated team on call — rated 4.5/5 by the brands we work with.",
    cta: "book-call",
  },
  reporting: {
    title: "Transparent Reporting",
    description:
      "Weekly dashboards break down revenue, ad spend, and creator performance in plain language — no vanity metrics, no black box.",
    cta: "get-started",
  },
  packages: {
    title: "Affordable Growth Packages",
    description:
      "Flexible packages built around your current revenue stage, so you never pay for more than the growth you actually need right now.",
    cta: "book-call",
  },
};

/* ------------------------------------------------------------------ */
/*  Animated counter — supports decimals, used for every stat here     */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [isInView, value, decimals, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Tilt wrapper for the hero image                                    */
/* ------------------------------------------------------------------ */

function TiltImage({ src, alt, className, children }) {
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 250, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 250, damping: 22 });

  function handleMouseMove(e) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
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
        transformPerspective: 1000,
      }}
      className={className}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer content                                                      */
/* ------------------------------------------------------------------ */

function FeatureDetails({ feature, onGetStarted, onBookCall }) {
  if (!feature) return null;
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-gray-600">
        {feature.description}
      </p>
      <div className="flex flex-col gap-3 border-t border-black/5 pt-5">
        <motion.button
          type="button"
          onClick={onGetStarted}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 12px 28px -10px rgba(239,23,81,0.55)",
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 rounded-full bg-[#EF1751] px-6 py-3 text-sm font-semibold text-white"
        >
          Get Started
          <FiArrowRight />
        </motion.button>
        <motion.button
          type="button"
          onClick={onBookCall}
          whileHover={{ scale: 1.02, borderColor: "#EF1751", color: "#EF1751" }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#17171F] transition-colors"
        >
          <FiCalendar />
          Book a Free Strategy Call
        </motion.button>
      </div>
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

/* ------------------------------------------------------------------ */
/*  Main section                                                        */
/* ------------------------------------------------------------------ */

const colVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [activeFeatureKey, setActiveFeatureKey] = useState(null);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  const activeFeature = activeFeatureKey ? FEATURES[activeFeatureKey] : null;

  function openFeature(key) {
    setActiveFeatureKey(key);
  }
  function openGetStarted() {
    setActiveFeatureKey(null);
    setGetStartedOpen(true);
  }
  function openBookCall() {
    setActiveFeatureKey(null);
    setBookCallOpen(true);
  }

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-5 py-24 sm:px-10"
    >
      <div className="relative mx-auto max-w-[1600px]">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#EF1751]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#EF1751]"
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
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[1.5rem] font-bold leading-tight text-[#17171F] sm:text-3xl lg:text-4xl"
          >
            Why Choose AdToker?
          </motion.h2>
        </div>

        {/* three column layout */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* left column */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col divide-y divide-black/5 rounded-3xl bg-[#FDE8EF] p-6 lg:col-span-3"
          >
            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => openFeature("clients")}
              whileHover={shouldReduceMotion ? {} : { x: 4 }}
              className="pb-5 text-left"
            >
              <p className="text-3xl font-bold text-[#17171F] sm:text-4xl">
                <AnimatedCounter value={5} suffix="K+" />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Happy Clients served with dedication and trust.
              </p>
            </motion.button>

            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => openFeature("certified")}
              whileHover={shouldReduceMotion ? {} : { x: 4 }}
              className="group flex items-start gap-3 py-5 text-left"
            >
              <motion.span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EF1751] text-white"
                whileHover={
                  shouldReduceMotion ? {} : { rotate: 180, scale: 1.1 }
                }
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <FiAward size={15} />
              </motion.span>
              <span>
                <span className="block text-sm font-bold text-[#17171F]">
                  Certified TikTok Shop Experts
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-gray-600">
                  Our certified specialists understand the TikTok Shop ecosystem
                </span>
              </span>
            </motion.button>

            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => openFeature("support")}
              whileHover={shouldReduceMotion ? {} : { x: 4 }}
              className="pt-5 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="-space-x-3 flex">
                  {SUPPORT_AVATARS.map((src, i) => (
                    <motion.img
                      key={src}
                      src={src}
                      alt="Client avatar"
                      className="h-9 w-9 rounded-full border-2 border-[#FDE8EF] object-cover"
                      style={{ zIndex: SUPPORT_AVATARS.length - i }}
                      whileHover={{ scale: 1.2, zIndex: 10, y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 14,
                      }}
                    />
                  ))}
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-[#17171F]">
                  <FaStar className="text-[#EF1751]" size={13} />
                  <AnimatedCounter value={4.5} decimals={1} />
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#17171F]">
                End-to-End Support
              </p>
            </motion.button>
          </motion.div>

          {/* center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <TiltImage
              src={centerImage}
              alt="Marketer managing TikTok Shop, Instagram, and Facebook campaigns from one dashboard"
              className="h-[320px] w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_-20px_rgba(23,23,31,0.35)] sm:h-[420px] lg:h-full lg:min-h-[500px]"
            />
          </motion.div>

          {/* right column */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col gap-6 lg:col-span-3"
          >
            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => openFeature("reporting")}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="group relative overflow-hidden rounded-3xl bg-[#EF1751] p-6 text-left text-white shadow-[0_20px_45px_-18px_rgba(239,23,81,0.55)]"
            >
              <motion.span
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#EF1751]"
                whileHover={
                  shouldReduceMotion ? {} : { rotate: 180, scale: 1.1 }
                }
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <FiAward size={18} />
              </motion.span>
              <p className="mt-4 text-lg font-bold leading-snug">
                Transparent Reporting
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Stay informed with clear performance reports and real-time
                insights
              </p>
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: -6 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                Learn more <FiArrowRight />
              </motion.span>
            </motion.button>

            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => openFeature("packages")}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl text-left shadow-[0_20px_45px_-18px_rgba(23,23,31,0.35)] lg:aspect-auto lg:flex-1"
            >
              <motion.img
                src={rightImage}
                alt="Growth packages for TikTok Shop brands"
                className="absolute inset-0 h-full w-full object-cover"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-3">
                <motion.span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EF1751] text-white"
                  whileHover={
                    shouldReduceMotion ? {} : { rotate: 180, scale: 1.1 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FiAward size={15} />
                </motion.span>
                <span className="text-sm font-bold leading-snug text-white">
                  Affordable Growth Packages
                </span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* bottom call bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            className="flex items-center gap-3 rounded-full bg-[#17171F] py-2 pl-2 pr-6 shadow-lg"
          >
            <motion.span
              className="flex items-center gap-1.5 rounded-full bg-[#EF1751] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
              animate={
                shouldReduceMotion ? {} : { rotate: [0, -10, 10, -6, 0] }
              }
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4 }}
            >
              <FiPhoneCall size={13} />
              Call
            </motion.span>
            <span className="text-sm text-white/70">
              Let's make something great work together.{" "}
              <button
                type="button"
                onClick={openBookCall}
                className="font-semibold text-[#EF1751] underline underline-offset-2 hover:text-[#EF1751]"
              >
                Book A Free call
              </button>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* feature detail drawer */}
      <Drawer
        isOpen={!!activeFeature}
        onClose={() => setActiveFeatureKey(null)}
        title={activeFeature?.title}
        subtitle="Why it matters"
        icon={<FiAward />}
      >
        <FeatureDetails
          feature={activeFeature}
          onGetStarted={openGetStarted}
          onBookCall={openBookCall}
        />
      </Drawer>

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
    </section>
  );
}

export default WhyChooseUs;
