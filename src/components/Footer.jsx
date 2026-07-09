import React, { useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import logo from "@/assets/Nav/image 11.png";
import {
  FiSend,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";
import { RiVkLine } from "react-icons/ri";

// Assets
import codesinc from "@/assets/footer/codesinc.png";
import Drawer from "./Drawer";
import { HashLink } from "react-router-hash-link";

/* ------------------------------------------------------------------ */
/*  Physics Helper (Matching Hero & Blogs)                            */
/* ------------------------------------------------------------------ */

function MagneticButton({ children, className, onClick, strength = 12 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 25 });
  const springY = useSpring(y, { stiffness: 350, damping: 25 });

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

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

function Footer() {
  const [drawerType, setDrawerType] = useState(null); // 'started' or 'consult'

  return (
    <footer className="relative mt-40 bg-[#17171F] pt-20 pb-10 px-5 sm:px-10 rounded-t-[3rem] sm:rounded-t-[5rem]">
      {/* 1. TOP RED CTA BOX (Floating & Offset) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute -top-24 left-5 right-5 mx-auto max-w-[1400px] rounded-[2rem] bg-[#EF1751] p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <h2 className="text-xl sm:text-3xl font-bold text-white text-center lg:text-left leading-tight">
          Ready to Scale Your <br /> TikTok Shop?
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <MagneticButton
            onClick={() => setDrawerType("started")}
            className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#111118] transition-shadow hover:shadow-xl"
          >
            Get Started Today
          </MagneticButton>
          <MagneticButton
            onClick={() => setDrawerType("consult")}
            className="rounded-full border-2 border-white/40 px-8 py-4 text-sm font-bold text-white hover:bg-white hover:text-[#EF1751] transition-all"
          >
            Schedule a Free Consultation
          </MagneticButton>
        </div>
      </motion.div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="mx-auto max-w-[1600px] mt-24 sm:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand & Newsletter (Col 5) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white px-4 py-2 rounded-lg inline-block mb-8"
            >
              <HashLink smooth to="#hero">
                <img src={logo} alt="none" className="h-10" />
              </HashLink>
            </motion.div>

            <p className="text-white text-lg sm:text-2xl font-semibold leading-tight max-w-sm mb-10">
              Let's build your next <br />
              <span className="text-gray-500">growth success story.</span>
            </p>

            {/* Newsletter Input */}
            <motion.div
              className="relative max-w-sm group"
              animate={{
                y: [0, -8, 0],
                boxShadow: [
                  "0 8px 30px -10px rgba(239,23,81,0.15)",
                  "0 20px 50px -10px rgba(239,23,81,0.4)",
                  "0 8px 30px -10px rgba(239,23,81,0.15)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Pulse glow ring */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px 0px rgba(239,23,81,0)",
                    "0 0 0px 8px rgba(239,23,81,0.12)",
                    "0 0 0px 0px rgba(239,23,81,0)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#24242D] border border-white/5 rounded-full py-5 px-8 text-white outline-none focus:border-[#EF1751] transition-all"
              />
              <motion.button
                className="absolute right-2 top-2 h-12 w-12 rounded-full bg-[#EF1751] flex items-center justify-center text-white group-hover:rotate-12"
                whileHover={{ scale: 1.1, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiSend size={18} />
              </motion.button>
            </motion.div>
          </div>

          {/* Divider Line */}
          <div className="hidden lg:block lg:col-span-1 h-full w-[1px] bg-white/5 mx-auto" />

          {/* Links Section (Col 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">
                Company
              </h4>
              <ul className="space-y-4">
                {[
                  "About",
                  "Case Studies",
                  "Contact us",
                  "Our Blogs",
                  "Book A Free Call",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 font-medium hover:text-[#EF1751] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">
                Contact
              </h4>
              <ul className="space-y-6">
                <li>
                  <span className="block text-gray-500 text-xs uppercase font-bold mb-1">
                    Phone
                  </span>
                  <p className="text-white font-medium text-lg">
                    +629 555-0129
                  </p>
                </li>
                <li>
                  <span className="block text-gray-500 text-xs uppercase font-bold mb-1">
                    Email
                  </span>
                  <p className="text-white font-medium text-lg">
                    demo@example.com
                  </p>
                </li>
                <li>
                  <span className="block text-gray-500 text-xs uppercase font-bold mb-1">
                    Location
                  </span>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed">
                    1901 Thornridge Cir. Shiloh, <br /> Hawaii 81063
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM BAR */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-500 text-sm">
            © Copyright 2026 by Company.com
          </p>

          {/* Center: Codesinc Logo Link */}
          <motion.a
            href="https://www.codes-inc.com/"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center group"
          >
            <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-2 transition-colors group-hover:text-white">
              Designed and hosted by
            </span>
            <img
              src={codesinc}
              alt="Codesinc"
              className="h-8 object-contain filter brightness-90 group-hover:brightness-110 transition-all"
            />
          </motion.a>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { icon: <FiTwitter />, link: "#" },
              { icon: <FiFacebook />, link: "#" },
              { icon: <FiYoutube />, link: "#" },
              { icon: <RiVkLine />, link: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                whileHover={{ y: -5, backgroundColor: "#EF1751" }}
                className="h-10 w-10 rounded-full bg-[#24242D] flex items-center justify-center text-white transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* --- SIDE DRAWERS --- */}
      <Drawer
        isOpen={drawerType === "started"}
        onClose={() => setDrawerType(null)}
        title="Ready to Scale?"
        subtitle="Our team will handle your TikTok Shop setup."
        icon={<FiArrowRight />}
      >
        <div className="space-y-6 py-4">
          <input
            placeholder="Full Name"
            className="w-full bg-gray-50 border border-black/5 rounded-xl p-4 outline-none focus:border-[#EF1751]"
          />
          <input
            placeholder="Brand URL"
            className="w-full bg-gray-50 border border-black/5 rounded-xl p-4 outline-none focus:border-[#EF1751]"
          />
          <button className="w-full rounded-full bg-[#EF1751] py-4 font-bold text-white shadow-xl">
            Get Your Free Roadmap
          </button>
        </div>
      </Drawer>

      <Drawer
        isOpen={drawerType === "consult"}
        onClose={() => setDrawerType(null)}
        title="Book Your Consultation"
        subtitle="30-min strategy deep dive."
        icon={<FiCalendar />}
      >
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            {["10:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"].map((time) => (
              <button
                key={time}
                className="rounded-xl border border-black/10 p-3 text-sm font-semibold hover:border-[#EF1751] hover:text-[#EF1751]"
              >
                {time}
              </button>
            ))}
          </div>
          <button className="w-full rounded-full bg-[#111118] py-4 font-bold text-white">
            Confirm Booking
          </button>
        </div>
      </Drawer>
    </footer>
  );
}

export default Footer;
