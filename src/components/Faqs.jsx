import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiArrowUpRight,
  FiSearch,
  FiMessageCircle,
  FiCalendar,
  FiHelpCircle,
} from "react-icons/fi";
import { RiSparkling2Fill } from "react-icons/ri";

// Assets
import faqImage from "@/assets/faqs/a1bfeab4a0ef3bfc9f894880f49594e096ec0732.jpg";
import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Helper Components (Matching Hero.jsx Logic)                        */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Data Constants                                                     */
/* ------------------------------------------------------------------ */

const MAIN_FAQS = [
  {
    id: 1,
    question: "What age groups do you accept?",
    answer:
      "We welcome dancers of all ages! Our programs are categorized into Kids (5-12), Teens (13-17), and Adults (18+).",
  },
  {
    id: 2,
    question: "Do I need prior dance experience to join?",
    answer:
      "Not at all! We have beginner, intermediate, and advanced-level batches so you can start wherever you're comfortable.",
  },
  {
    id: 3,
    question: "Can I take a trial class before enrolling?",
    answer:
      "Absolutely! We offer a complimentary 30-minute trial session for all new students.",
  },
  {
    id: 4,
    question: "What dance styles do you teach?",
    answer:
      "Our repertoire includes Contemporary, Hip-Hop, Ballet, Jazz, and Urban Dance styles.",
  },
  {
    id: 5,
    question: "How long is each class session?",
    answer: "Standard classes run for 60 to 90 minutes depending on the level.",
  },
  {
    id: 6,
    question: "How long is each dance session?",
    answer:
      "A typical season runs for 12 weeks, culminating in a showcase performance.",
  },
];

const EXTENDED_FAQS = [
  {
    id: 7,
    question: "Are there any registration fees?",
    answer:
      "Yes, there is a one-time annual registration fee of $50 which covers insurance and administrative costs.",
  },
  {
    id: 8,
    question: "What is the dress code for classes?",
    answer:
      "We recommend comfortable athletic wear. Specific footwear is required depending on the style.",
  },
  {
    id: 9,
    question: "Do you offer private lessons?",
    answer:
      "Yes, we offer 1-on-1 coaching for competitive preparation and personalized technique improvement.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-Component: Accordion Item                                      */
/* ------------------------------------------------------------------ */

const AccordionItem = ({ faq, isOpen, toggle, isCompact = false }) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-[#F0453D]/20 bg-white shadow-[0_15px_30px_-10px_rgba(240,69,61,0.1)]"
          : "border-transparent bg-[#FAF5F5]/60 hover:bg-white hover:shadow-md"
      }`}
    >
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between p-5 text-left sm:p-6"
      >
        <span className="flex items-center gap-4">
          <span
            className={`font-bold transition-colors ${isOpen ? "text-[#F0453D]" : "text-[#17171F]"} ${isCompact ? "text-base" : "text-lg"}`}
          >
            {faq.id}.
          </span>
          <span
            className={`font-bold text-[#17171F] ${isCompact ? "text-sm" : "text-base sm:text-lg"}`}
          >
            {faq.question}
          </span>
        </span>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
            backgroundColor: isOpen ? "#17171F" : "#F0453D15",
          }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "text-white" : "text-[#F0453D]"}`}
        >
          {isOpen ? <FiMinus /> : <FiPlus />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`px-6 pb-6 pt-0 leading-relaxed text-gray-500 sm:px-16 ${isCompact ? "text-xs" : "text-sm sm:text-base"}`}
            >
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

function Faqs() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [activeDrawerIdx, setActiveDrawerIdx] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [strategyCallOpen, setStrategyCallOpen] = useState(false);

  return (
    <section
      id="faqs"
      className="relative overflow-hidden bg-white px-5 py-24 sm:px-10"
    >
      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FAF5F5] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#17171F]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F0453D] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F0453D]"></span>
              </span>
              FAQ
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-[2.5rem] font-extrabold leading-[1.1] text-[#111118] sm:text-6xl"
            >
              Frequently Asked <br />
              <span className="text-[#F0453D]">Questions</span>
            </motion.h2>

            <MagneticButton
              onClick={() => setViewAllOpen(true)}
              whileHover={{
                scale: 1.07,
                boxShadow: "0 18px 40px -10px rgba(240,69,61,0.65)",
              }}
              whileTap={{ scale: 0.94 }}
              className="group flex items-center gap-2 rounded-full bg-[#F0453D] px-8 py-4 font-bold text-white shadow-lg"
            >
              View All FAQ's <FiArrowUpRight size={18} />
            </MagneticButton>

            <TiltCard maxTilt={8} className="relative mt-16 w-full max-w-2xl">
              <motion.div
                whileHover={{ y: -6 }}
                className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl"
              >
                <img
                  src={faqImage}
                  alt="Dashboard"
                  className="w-full object-cover"
                />
              </motion.div>
            </TiltCard>
          </div>

          {/* Right Column */}
          <div className="w-full lg:pt-10">
            {MAIN_FAQS.map((faq) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={activeIndex === faq.id}
                toggle={() =>
                  setActiveIndex(activeIndex === faq.id ? null : faq.id)
                }
              />
            ))}

            <div className="mt-10">
              <MagneticButton
                onClick={() => setStrategyCallOpen(true)}
                whileHover={{
                  scale: 1.07,
                  borderColor: "#F0453D",
                  color: "#F0453D",
                  y: -3,
                }}
                whileTap={{ scale: 0.94 }}
                className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-white p-6 font-bold text-[#17171F] transition-colors sm:w-auto"
              >
                <span className="flex items-center gap-3">
                  <FiCalendar /> Book a Free Strategy Call
                </span>
                <FiArrowUpRight />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* View All FAQ's Drawer - RESTORED LOGIC */}
      <Drawer
        isOpen={viewAllOpen}
        onClose={() => setViewAllOpen(false)}
        title="Knowledge Center"
        subtitle="Full list of common questions."
        icon={<FiHelpCircle />}
      >
        <div className="flex flex-col gap-1">
          {[...MAIN_FAQS, ...EXTENDED_FAQS].map((faq) => (
            <AccordionItem
              key={`drawer-${faq.id}`}
              faq={faq}
              isCompact
              isOpen={activeDrawerIdx === faq.id}
              toggle={() =>
                setActiveDrawerIdx(activeDrawerIdx === faq.id ? null : faq.id)
              }
            />
          ))}
        </div>
      </Drawer>

      {/* Strategy Call Drawer */}
      <Drawer
        isOpen={strategyCallOpen}
        onClose={() => setStrategyCallOpen(false)}
        title="Strategy Call"
        icon={<RiSparkling2Fill />}
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Pick a time that works best for you:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Mon 10am", "Tue 2pm", "Wed 11am", "Thu 4pm"].map((slot) => (
              <button
                key={slot}
                className="rounded-xl border border-black/10 p-3 text-sm font-semibold hover:border-[#F0453D] hover:text-[#F0453D]"
              >
                {slot}
              </button>
            ))}
          </div>
          <MagneticButton
            whileHover={{ scale: 1.02 }}
            className="w-full rounded-full bg-[#F0453D] py-4 font-bold text-white shadow-lg"
          >
            Confirm Booking
          </MagneticButton>
        </div>
      </Drawer>
    </section>
  );
}

export default Faqs;
