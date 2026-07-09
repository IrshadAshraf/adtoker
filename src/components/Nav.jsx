import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import logo from "@/assets/Nav/image 11.png";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiMenu,
  FiX,
  FiArrowRight,
  FiCheckCircle,
  FiUser,
  FiMail,
} from "react-icons/fi";
import Drawer from "./Drawer";

const NAV_LINKS = [
  { label: "Home", to: "#hero" },
  { label: "About Us", to: "#about" },
  { label: "Services", to: "#services" },
  { label: "How It Works", to: "#how-it-works" },
  { label: "FAQs", to: "#faqs" },
  { label: "Contact Us", to: "#footer" },
];

function MagneticButton({
  children,
  className,
  onClick,
  strength = 18,
  ...rest
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{
        scale: 1.06,
        boxShadow: "0 14px 34px -8px rgba(239,23,81,0.65)",
      }}
      whileTap={{ scale: 0.94 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [hoveredId, setHoveredId] = useState(null);

  // Shrink / add shadow to the bar once the page scrolls.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.to.slice(1)),
    ).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-[0_8px_30px_-12px_rgba(23,23,31,0.15)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10">
          {/* Logo */}
          <HashLink
            smooth
            to="#hero"
            className="flex items-center gap-1 text-lg font-bold tracking-tight"
          >
            <img src={logo} alt="none" className="h-12 mix-blend-multiply" />
          </HashLink>

          {/* Desktop links */}
          <ul
            onMouseLeave={() => setHoveredId(null)}
            className="hidden items-center gap-9 md:flex"
          >
            {NAV_LINKS.map((link, i) => {
              const id = link.to.slice(1);
              const isActive = activeId === id;
              const showUnderline = hoveredId ? hoveredId === id : isActive;
              return (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                  onMouseEnter={() => setHoveredId(id)}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <HashLink
                      smooth
                      to={link.to}
                      className={`relative text-sm font-medium transition-colors ${
                        isActive || hoveredId === id
                          ? "text-[#17171F]"
                          : "text-[#4B4B57] hover:text-[#17171F]"
                      }`}
                    >
                      {link.label}
                    </HashLink>
                  </motion.div>
                  {showUnderline && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-[#EF1751]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={() => setDrawerOpen(true)}
              className="hidden items-center gap-2 rounded-full bg-[#EF1751] px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex"
            >
              Get Started
            </MagneticButton>

            <motion.button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#17171F] shadow-sm ring-1 ring-black/5 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-white/95 backdrop-blur-lg md:hidden"
            >
              <ul className="flex flex-col gap-1 px-5 pb-5 pt-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <HashLink
                      smooth
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#17171F] hover:bg-[#EF1751]/5"
                    >
                      {link.label}
                    </HashLink>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.06 }}
                  className="mt-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setDrawerOpen(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#EF1751] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Get Started
                    <FiArrowRight />
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Let's grow your TikTok Shop"
        subtitle="Tell us a bit about your brand and we'll reach out within 24 hours."
        icon={<FiArrowRight />}
      >
        <NavGetStartedForm onDone={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}

function NavGetStartedForm({ onDone }) {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-10 text-center"
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
            You're on the list!
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            A growth strategist will reach out shortly.
          </p>
          <button
            type="button"
            onClick={onDone}
            className="mt-6 rounded-full bg-[#17171F] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Close
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
            Full name
            <span className="flex items-center gap-2 rounded-xl border border-black/10 px-3.5 py-2.5 focus-within:border-[#EF1751]">
              <FiUser className="text-gray-400" />
              <input
                required
                type="text"
                placeholder="Jane Cooper"
                className="w-full bg-transparent text-sm outline-none"
              />
            </span>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#17171F]">
            Work email
            <span className="flex items-center gap-2 rounded-xl border border-black/10 px-3.5 py-2.5 focus-within:border-[#EF1751]">
              <FiMail className="text-gray-400" />
              <input
                required
                type="email"
                placeholder="jane@brand.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </span>
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
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default Nav;
