import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiStar, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";

// Assets
import mainImage from "@/assets/testimonials/c2e1cd1d673ef61b8543ab7712cc7bdc0afa28a9.jpg";
import avatar1 from "@/assets/testimonials/7431a849a3a9225b704531958e1e5d942fda4822.jpg";
import avatar2 from "@/assets/testimonials/fa08e50bb875bd624e491ba385beaa79ed9c903a1.jpg";
import avatar3 from "@/assets/testimonials/fa08e50bb875bd624e491ba385beaa79ed9c903a.jpg";

import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Helper Physics Components                                         */
/* ------------------------------------------------------------------ */

function MagneticButton({ children, className, onClick, strength = 14 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 16, mass: 0.4 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * strength);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ children, className, maxTilt = 8 }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt);
    rotateX.set(-py * maxTilt);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

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
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const REVIEWS = [
  {
    id: 1,
    name: "Jane Cooper",
    role: "Founder & Lead Coach",
    avatar: avatar1,
    floatDelay: 0,
    quote:
      "The practical tools & mindset shifts I gain during coach helped me become a more effective leader & communicator. I highly recommend this coaching.",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    role: "Career Professional",
    avatar: avatar2,
    floatDelay: 0.5,
    quote:
      "The practical tools & mindset shifts I gain during coach helped me become a more effective leader & communicator. I highly recommend this coaching.",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#FEFCFB] px-5 py-24 sm:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FAF5F5] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#17171F]"
          >
            <span className="h-2 w-2 rounded-full bg-[#F0453D] animate-pulse" />
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-4xl font-extrabold leading-[1.1] text-[#111118] sm:text-6xl"
          >
            What Our Happy <br /> Clients Says
          </motion.h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Card 1: Featured Image + Floating Rating */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <TiltCard className="group relative h-full min-h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img
                src={mainImage}
                alt="Main"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <motion.div
                animate={{ y: [0, 8, 0], scale: [1, 1.02, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FaGoogle className="text-xl text-[#4285F4]" />
                    <span className="text-xl font-extrabold text-[#111118]">
                      4.9/5
                    </span>
                  </div>
                  <div className="flex gap-0.5 text-[#F0453D]">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" size={14} />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Global Trusted Partner
                </p>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* Cards 2 & 3: Testimonial Cards with Perpetual Floating */}
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: review.floatDelay,
              }}
            >
              <div className="flex h-full flex-col justify-between rounded-[2.5rem] bg-[#FDF9F3] p-10 transition-all hover:shadow-2xl hover:shadow-[#F0453D]/10">
                <div>
                  <div className="mb-8 flex gap-1 text-[#F0453D]">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" size={20} />
                    ))}
                  </div>
                  <div className="relative">
                    <RiDoubleQuotesL className="absolute -left-6 -top-4 text-4xl text-[#F0453D]/10" />
                    <p className="relative text-lg leading-relaxed text-[#111118]">
                      “{review.quote}”
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-4 border-t border-black/5 pt-8">
                  {/* Floating & Hoverable Avatar */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.25,
                      rotate: 0,
                      borderColor: "#F0453D",
                    }}
                    className="h-14 w-14 cursor-pointer overflow-hidden rounded-full border-2 border-white shadow-lg transition-colors"
                  >
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="text-base font-bold text-[#111118]">
                      {review.name}
                    </h4>
                    <p className="text-sm font-medium text-gray-500">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar Review Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-center gap-8 border-t border-black/5 pt-12 lg:flex-row lg:gap-14"
        >
          {/* Avatar Stack with Hover Logic */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[avatar1, avatar2, avatar3].map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  whileHover={{ scale: 1.4, zIndex: 10, y: -5 }}
                  className="h-11 w-11 cursor-pointer rounded-full border-2 border-white object-cover shadow-md transition-all"
                  alt="client"
                />
              ))}
            </div>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.2 }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F0453D] text-white shadow-lg"
            >
              <FiArrowRight size={18} />
            </motion.div>
          </div>

          <p className="max-w-md text-center text-sm font-medium text-[#111118] lg:text-left">
            Where smart design and clean energy come together powerfully —
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="ml-2 font-black text-[#F0453D] transition-opacity hover:opacity-70"
            >
              View All Reviews
            </button>
          </p>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <span className="text-lg font-black text-[#111118]">4.9/5</span>
            <div className="flex gap-0.5 text-[#F0453D]">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill="currentColor" size={14} />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Over 4200 Reviews
            </span>
          </div>
        </motion.div>
      </div>

      {/* Reviews Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Client Success Stories"
        subtitle="Trusted by over 4,200 businesses globally."
        icon={<FiCheckCircle />}
      >
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-gray-600">
            Explore why brands choose us for their high-performance strategies.
            From conversion optimization to brand scaling, our clients speak for
            themselves.
          </p>
          <MagneticButton
            onClick={() => setIsDrawerOpen(false)}
            className="w-full rounded-full bg-[#111118] py-4 font-bold text-white shadow-xl transition-all hover:bg-[#F0453D]"
          >
            Book My Strategy Call
          </MagneticButton>
        </div>
      </Drawer>
    </section>
  );
}

export default Testimonials;
