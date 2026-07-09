import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

/**
 * Slide-in drawer used to surface extra detail from CTA buttons
 * (Get Started / Book a Free Strategy Call) without leaving the page.
 */
function Drawer({ isOpen, onClose, title, subtitle, icon, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            key="drawer-backdrop"
            className="fixed inset-0 z-[90] bg-[#17171F]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            className="fixed top-0 right-0 z-[100] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 pb-5 pt-7 sm:px-8">
              <div className="flex items-center gap-3">
                {icon && (
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 260,
                      damping: 16,
                    }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F0453D]/10 text-xl text-[#F0453D]"
                  >
                    {icon}
                  </motion.div>
                )}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg font-bold text-[#17171F]"
                  >
                    {title}
                  </motion.h3>
                  {subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-0.5 text-sm text-gray-500"
                    >
                      {subtitle}
                    </motion.p>
                  )}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                whileHover={{
                  rotate: 90,
                  backgroundColor: "#F0453D",
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.9 }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500"
              >
                <FiX />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {children}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
