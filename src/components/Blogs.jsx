import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiArrowUpRight,
  FiBookOpen,
} from "react-icons/fi";

// Assets
import image1 from "@/assets/blogs/image 3681.png";
import image2 from "@/assets/blogs/a1bfeab4a0ef3bfc9f894880f49594e096ec07321.jpg";
import Drawer from "./Drawer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BLOGS_DATA = [
  {
    id: 1,
    day: "03",
    date: "March 3, 2026",
    author: "Naim",
    title: "Five Ways That Can Develop Your Business Website",
    image: image1,
    summary:
      "In the rapidly evolving digital landscape of 2026, staying ahead requires more than just a presence. We explore the five core pillars of modern web development that turn browsers into buyers.",
  },
  {
    id: 2,
    day: "03",
    date: "March 3, 2026",
    author: "Naim",
    title: "How UX/UI Design Impacts Your Website’s Success",
    image: image2,
    summary:
      "User experience is the heartbeat of conversion. This deep dive looks at how subtle interface improvements can lead to significant revenue growth for scaling brands.",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Helper to open drawer
  const openDrawer = (e, post) => {
    e.stopPropagation(); // Prevent conflicts
    setSelectedBlog(post);
  };

  return (
    <section id="blogs" className="relative bg-white px-5 py-24 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Header Section */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F9EDF2] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17171F]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#EF1751]" />
            Blogs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[1.75rem] font-bold text-[#111118] sm:text-4xl lg:text-5xl"
          >
            View Our Latest Updates
          </motion.h2>
        </div>

        {/* Blog Cards Grid - Added bottom padding to accommodate the offset cards */}
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-2 lg:gap-x-12 pb-16">
          {BLOGS_DATA.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              {/* 1. Main Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-lg">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Day Badge (Top-Left) */}
                <div className="absolute left-8 top-8 z-20 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white shadow-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                  <span className="text-4xl font-bold text-[#111118]">
                    {post.day}
                  </span>
                </div>
              </div>

              {/* 2. Floating Content Box (OFFSET Logic) */}
              {/* 'bottom-[-3rem]' pushes it out of the image container to match your design */}
              <motion.div
                whileHover={{ y: -8 }}
                onClick={(e) => openDrawer(e, post)}
                className="absolute -bottom-10 left-6 right-6 z-30 cursor-pointer overflow-hidden rounded-[2rem] bg-[#1a1a1a]/85 p-6 shadow-2xl backdrop-blur-xl border border-white/5 transition-all duration-300 group-hover:bg-[#1a1a1a]/95 sm:-bottom-12 sm:left-8 sm:right-8 sm:rounded-[2.5rem] sm:p-8"
              >
                {/* Meta Info */}
                <div className="mb-4 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-[#EF1751]">
                    <FiCalendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/50">
                    <FiUser size={12} /> By {post.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-8 text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                  {post.title}
                </h3>

                {/* Footer Action */}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-xs font-bold text-white transition-opacity group-hover:opacity-100 opacity-70">
                    Read More
                  </span>

                  {/* Functional Red Arrow Button */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EF1751] text-white shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <FiArrowRight size={22} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
      </div>

      {/* --- DRAWER --- */}
      <Drawer
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        title={selectedBlog?.title}
        subtitle={`${selectedBlog?.date} • By ${selectedBlog?.author}`}
        icon={<FiBookOpen />}
      >
        <div className="flex flex-col gap-6">
          <img
            src={selectedBlog?.image}
            className="rounded-3xl shadow-xl"
            alt="Featured"
          />
          <p className="text-base leading-relaxed text-gray-500">
            {selectedBlog?.summary}
            <br />
            <br />
            In this in-depth guide, we break down how strategic design and
            modern technology combine to create high-performing digital
            experiences that scale.
          </p>
          <button className="w-full rounded-full bg-[#EF1751] py-4 font-bold text-white shadow-xl transition-all hover:brightness-110">
            Read Full Case Study
          </button>
        </div>
      </Drawer>
    </section>
  );
}

export default Blogs;
