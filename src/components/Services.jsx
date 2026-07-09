import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiScissors,
  FiShare2,
  FiUsers,
} from "react-icons/fi";
import { RiSparkling2Fill } from "react-icons/ri";
import { HashLink } from "react-router-hash-link";

import image1 from "@/assets/services/0d21cd01c8f039af170d27dba634e6a4f9778be7.jpg";
import image2 from "@/assets/services/1c079eee7990eca72659dd9441258401193c0455.jpg";
import image3 from "@/assets/services/a8eee2f3c2cc2480f777a3ebc11e528d79720a53.jpg";
import image4 from "@/assets/services/b6ee40e043f64469c9edb173287ed002b7d75e2b.jpg";
import image5 from "@/assets/services/f554acf01f94dc76f30b94364177c8954cb5076b.jpg";
import image6 from "@/assets/services/fefa59707d524083499f32f1b39060ece6179a48.jpg";

import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    id: "shop-management",
    label: "TikTok Shop Management",
    icon: FiScissors,
    image: image1,
    description:
      "We run your storefront day to day — listings, pricing, inventory sync, and campaign scheduling — so every product is primed to convert.",
    features: [
      "Store setup & optimization",
      "Campaign scheduling",
      "Inventory & pricing sync",
    ],
  },
  {
    id: "influencer-marketing",
    label: "Influencer Marketing",
    icon: FiShare2,
    image: image2,
    description:
      "We match your brand with creators whose audience already buys — briefing, negotiating, and managing every collab end to end.",
    features: [
      "Creator sourcing & vetting",
      "Briefs & contracts",
      "Performance tracking",
    ],
  },
  {
    id: "affiliate-program",
    label: "Affiliate Program Management",
    icon: FiUsers,
    image: image3,
    description:
      "We build and run your affiliate roster — recruiting partners, setting commissions, and keeping payouts on autopilot.",
    features: [
      "Affiliate recruitment",
      "Commission structuring",
      "Payout automation",
    ],
  },
  {
    id: "content-creation",
    label: "Content Creation",
    icon: FiScissors,
    image: image4,
    description:
      "Scroll-stopping video, shot and edited for the TikTok Shop feed — from UGC-style unboxings to polished product films.",
    features: ["UGC-style video", "Product photography", "Hooks & scripting"],
  },
  {
    id: "live-shopping",
    label: "Live Shopping",
    icon: FiShare2,
    image: image5,
    description:
      "We plan, produce, and host live shopping events that turn viewers into checkout carts in real time.",
    features: ["Live show planning", "On-camera hosts", "Real-time offers"],
  },
  {
    id: "performance-marketing",
    label: "Performance Marketing",
    icon: FiUsers,
    image: image6,
    description:
      "Paid media across TikTok and beyond, tuned weekly against real revenue — not just clicks.",
    features: [
      "Paid social management",
      "Creative testing",
      "Weekly reporting",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Heading word-mask reveal (mirrors the motif used in Hero)          */
/* ------------------------------------------------------------------ */

const HEADLINE_LINES = [
  ["Everything", "You", "Need", "to"],
  ["Grow", "on", "TikTok", "Shop"],
];

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const wordVariants = {
  hidden: { y: "110%", rotate: 5, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

/* ------------------------------------------------------------------ */
/*  Service card — tilts toward the cursor, reveals a CTA on hover      */
/* ------------------------------------------------------------------ */

function ServiceCard({ service, onOpen }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = service.icon;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  function handleMouseMove(e) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  }
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(service)}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.94 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
      }}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      whileTap={{ scale: 0.97 }}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[28px] text-left shadow-[0_18px_45px_-20px_rgba(23,23,31,0.35)]"
    >
      <motion.img
        src={service.image}
        alt={service.label}
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={shouldReduceMotion ? {} : { scale: 1.12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* darken-on-hover overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"
        initial={{ opacity: 0.35 }}
        whileHover={{ opacity: 0.55 }}
        transition={{ duration: 0.4 }}
      />

      {/* arrow badge, top right — appears on hover */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white text-[#17171F] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
      >
        <FiArrowUpRight />
      </motion.span>

      {/* label pill */}
      <motion.div
        className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl bg-[#FBEAEA]/95 px-4 py-3.5 backdrop-blur-sm"
        whileHover={shouldReduceMotion ? {} : { y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#17171F]"
          whileHover={shouldReduceMotion ? {} : { rotate: 18, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          <Icon />
        </motion.span>
        <span className="text-sm font-semibold text-[#17171F]">
          {service.label}
        </span>
      </motion.div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer contents                                                     */
/* ------------------------------------------------------------------ */

function ServiceDetails({ service, onGetStarted, onBookCall }) {
  if (!service) return null;
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-gray-600">
        {service.description}
      </p>

      <ul className="flex flex-col gap-2.5">
        {service.features.map((feature, i) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
            className="flex items-center gap-2.5 text-sm text-[#4B4B57]"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F0453D]/10 text-[#F0453D]">
              <FiCheck size={11} />
            </span>
            {feature}
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 border-t border-black/5 pt-5">
        <motion.button
          type="button"
          onClick={onGetStarted}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 12px 28px -10px rgba(240,69,61,0.55)",
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 rounded-full bg-[#F0453D] px-6 py-3 text-sm font-semibold text-white"
        >
          Get Started
          <FiArrowRight />
        </motion.button>
        <motion.button
          type="button"
          onClick={onBookCall}
          whileHover={{ scale: 1.02, borderColor: "#F0453D", color: "#F0453D" }}
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
          <FiCheckCircle className="mb-4 text-6xl text-[#F0453D]" />
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
          className="rounded-xl border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[#F0453D]"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
        Work email
        <input
          required
          type="email"
          placeholder="you@brand.com"
          className="rounded-xl border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[#F0453D]"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
        Which service are you interested in?
        <select className="rounded-xl border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-[#F0453D]">
          {SERVICES.map((s) => (
            <option key={s.id}>{s.label}</option>
          ))}
        </select>
      </label>
      <motion.button
        type="submit"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 12px 28px -10px rgba(240,69,61,0.55)",
        }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#F0453D] px-6 py-3 text-sm font-semibold text-white"
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
          <FiCheckCircle className="mb-4 text-6xl text-[#F0453D]" />
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
                    ? "border-[#F0453D] bg-[#F0453D] text-white"
                    : "border-black/10 text-[#4B4B57] hover:border-[#F0453D]/50"
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
                boxShadow: "0 12px 28px -10px rgba(240,69,61,0.55)",
              }
            : {}
        }
        whileTap={selectedSlot ? { scale: 0.97 } : {}}
        className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity ${
          selectedSlot ? "bg-[#F0453D]" : "cursor-not-allowed bg-[#F0453D]/40"
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

function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [activeService, setActiveService] = useState(null);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  function openGetStarted() {
    setActiveService(null);
    setGetStartedOpen(true);
  }
  function openBookCall() {
    setActiveService(null);
    setBookCallOpen(true);
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-5 py-24 sm:px-10"
    >
      {/* ambient blobs, consistent with the rest of the page */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 rounded-full bg-[#F0453D]/10 blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center gap-2 rounded-full bg-[#F0453D]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#F0453D]"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#F0453D]"
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
            Services
          </motion.span>

          <motion.h2
            variants={lineContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-5 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-[#17171F] sm:text-4xl"
          >
            {HEADLINE_LINES.map((words) => (
              <motion.span
                key={words.join(" ")}
                variants={wordContainer}
                className="mb-1 flex flex-wrap justify-center gap-x-2.5 overflow-hidden"
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
          </motion.h2>
        </div>

        {/* grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpen={setActiveService}
            />
          ))}
        </motion.div>

        {/* quiet link out, in case a visitor wants a human first */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 text-center text-sm text-gray-500"
        >
          Not sure where to start?{" "}
          <HashLink
            smooth
            to="#contact"
            className="font-semibold text-[#F0453D] underline-offset-2 hover:underline"
          >
            Talk to a strategist
          </HashLink>
        </motion.p>
      </div>

      {/* service detail drawer */}
      <Drawer
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        icon={activeService ? <activeService.icon /> : null}
        title={activeService?.label}
        subtitle="What's included"
      >
        <ServiceDetails
          service={activeService}
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

export default Services;
