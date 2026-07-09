import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { RiSparkling2Fill } from "react-icons/ri";

import background from "@/assets/how it works/background.png";
import image1 from "@/assets/how it works/b6ee40e043f64469c9edb173287ed002b7d75e2b1.jpg";
import image2 from "@/assets/how it works/1c079eee7990eca72659dd9441258401193c04551.jpg";
import image3 from "@/assets/how it works/private safe supportive session young women group warm tones community empowerment.png";

import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const MARQUEE_IMAGES = [
  { src: image1, alt: "Team behind a TikTok Shop live sell" },
  { src: image2, alt: "Creator filming affiliate product content" },
  { src: image3, alt: "Strategist reviewing performance dashboards" },
];

const STEPS = [
  {
    id: "consultation",
    num: "01",
    title: "Book a Free Consultation",
    summary: "Tell us about your business goals.",
    details:
      "A 30-minute call with a growth strategist to understand your brand, catalog, and current TikTok Shop setup — no pitch, just a real assessment.",
    action: "book-call",
  },
  {
    id: "strategy",
    num: "02",
    title: "Strategy Planning",
    summary:
      "We create a custom TikTok Shop growth plan tailored to your brand.",
    details:
      "We map creators, content cadence, and paid spend into a 90-day plan built around your specific catalog and margins — not a generic template.",
    action: "detail",
  },
  {
    id: "launch",
    num: "03",
    title: "Launch & Optimize",
    summary: "Our team launches campaigns, manages creators",
    details:
      "We handle shop setup, creator outreach, and content production, then optimize weekly based on what's actually converting in your feed.",
    action: "detail",
  },
  {
    id: "scale",
    num: "04",
    title: "Scale Your Sales",
    summary: "Watch your TikTok Shop grow with measurable results.",
    details:
      "Once the engine is working, we scale spend and creator volume against the channels proven to drive revenue — reported to you every week.",
    action: "detail",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Vertical auto-scrolling image marquee                              */
/* ------------------------------------------------------------------ */

function ImageMarquee() {
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  // Render the list twice back-to-back so the loop point is invisible.
  const track = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden rounded-[28px] sm:h-[520px] lg:h-[640px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes howitworks-marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
      <div
        className="flex flex-col gap-4"
        style={{
          animation: "howitworks-marquee-vertical 26s linear infinite",
          animationPlayState:
            paused || shouldReduceMotion ? "paused" : "running",
        }}
      >
        {track.map((img, i) => (
          <div
            key={i}
            className="h-[190px] w-full shrink-0 overflow-hidden rounded-[24px] sm:h-[230px] lg:h-[260px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* soft fade at top/bottom so images don't hard-cut against the loop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0A0D] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0A0D] to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step card                                                           */
/* ------------------------------------------------------------------ */

function StepCard({ step, onOpen }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      variants={cardVariants}
      onClick={() => onOpen(step)}
      whileHover={
        shouldReduceMotion ? {} : { y: -6, borderColor: "rgba(239,23,81,0.5)" }
      }
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#17171C] p-6 text-left transition-colors sm:p-7"
    >
      {/* glow that blooms on hover */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#EF1751]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#EF1751]/20"
      />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="max-w-[10rem] text-lg font-bold leading-snug text-white sm:text-xl">
          {step.title}
        </h3>
        <motion.span
          aria-hidden
          className="select-none text-5xl font-bold leading-none text-[#EF1751]/25 sm:text-6xl"
          whileHover={
            shouldReduceMotion
              ? {}
              : { scale: 1.08, color: "rgba(239,23,81,0.5)" }
          }
        >
          {step.num}
        </motion.span>
      </div>

      <p className="relative mt-3 max-w-xs text-sm leading-relaxed text-white/50">
        {step.summary}
      </p>

      <motion.span
        aria-hidden
        initial={{ opacity: 0, x: -6 }}
        whileHover={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
        className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#EF1751] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        Learn more <FiArrowRight />
      </motion.span>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer contents                                                     */
/* ------------------------------------------------------------------ */

function StepDetails({ step, onGetStarted, onBookCall }) {
  if (!step) return null;
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-gray-600">{step.details}</p>

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

function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState(null);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  function handleOpenStep(step) {
    if (step.action === "book-call") {
      setBookCallOpen(true);
    } else {
      setActiveStep(step);
    }
  }
  function openGetStarted() {
    setActiveStep(null);
    setGetStartedOpen(true);
  }
  function openBookCall() {
    setActiveStep(null);
    setBookCallOpen(true);
  }

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0D] px-5 py-24 sm:px-10"
    >
      {/* decorative wireframe sphere */}
      <motion.img
        src={background}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6rem] top-1/2 hidden w-[560px] -translate-y-1/2 select-none opacity-40 lg:block"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#EF1751]/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* left — scrolling image column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageMarquee />
        </motion.div>

        {/* right — copy + step grid */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#EF1751]"
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
            Simple Steps
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[1.5rem] font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
          >
            How It Works
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {STEPS.map((step) => (
              <StepCard key={step.id} step={step} onOpen={handleOpenStep} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* step detail drawer */}
      <Drawer
        isOpen={!!activeStep}
        onClose={() => setActiveStep(null)}
        title={activeStep?.title}
        subtitle={activeStep ? `Step ${activeStep.num}` : ""}
        icon={<RiSparkling2Fill />}
      >
        <StepDetails
          step={activeStep}
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

export default HowItWorks;
