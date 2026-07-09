import React from "react";
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

function Home() {
  return (
    <>
      <Nav />
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="why-choose-us">
        <WhyChooseUs />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="faqs">
        <Faqs />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="blogs">
        <Blogs />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </>
  );
}

export default Home;
