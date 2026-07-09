import React, { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "../components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import Faqs from "@/components/Faqs";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

/* Reveal wrapper — fades + slides in once per section when scrolled into view */
function RevealSection({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Nav />

          <RevealSection id="hero">
            <Hero />
          </RevealSection>

          <RevealSection id="about">
            <About />
          </RevealSection>

          <RevealSection id="services">
            <Services />
          </RevealSection>

          <RevealSection id="how-it-works">
            <HowItWorks />
          </RevealSection>

          <RevealSection id="why-choose-us">
            <WhyChooseUs />
          </RevealSection>

          <RevealSection id="stats">
            <Stats />
          </RevealSection>

          <RevealSection id="faqs">
            <Faqs />
          </RevealSection>

          <RevealSection id="testimonials">
            <Testimonials />
          </RevealSection>

          <RevealSection id="blogs">
            <Blogs />
          </RevealSection>

          <RevealSection id="footer">
            <Footer />
          </RevealSection>
        </motion.div>
      )}
    </>
  );
}

export default Home;
