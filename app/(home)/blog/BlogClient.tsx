/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Sparkles,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts, blogCategories } from "@/app/utils/data";

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      <section className="relative bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] pt-40 pb-24 text-white text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-100 h-100 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            KNOWLEDGE HUB
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Business Communication <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Knowledge Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Practical guides about Cloud PBX, IP calling, business phone
            systems, voice campaigns, customer communication, and call center
            technology in Bangladesh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md pl-12 pr-4 py-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-400/50 focus:bg-white/15 transition-all"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">Blog</span>
          </motion.div>
        </div>
      </section>

      {/* ==================== CATEGORY FILTER ==================== */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Browse Categories
            </h3>
            <span className="text-xs text-slate-400">
              {filteredPosts.length} article
              {filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-linear-to-r from-primary to-[#0F1E55] text-white shadow-lg shadow-primary/20"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white hover:border-primary/20 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ==================== BLOG GRID ==================== */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <Search className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1">
              No articles found
            </p>
            <p className="text-xs text-slate-500">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border shadow-sm `}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col grow justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      {post.date}
                    </p>
                    <h2 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-primary transition duration-200 leading-snug mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-50">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs md:text-sm font-bold text-primary hover:text-blue-800 transition group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* ==================== BLOG CTA ==================== */}
      <section className="relative bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] text-white py-20 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-125 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <MessageSquare className="w-6 h-6 text-orange-400" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight leading-[1.15]">
            Need help choosing a <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              business communication solution?
            </span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Talk to an aicall.bd specialist. We'll help you find the right setup
            for your business.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary hover:bg-slate-100 px-8 py-4 font-bold text-sm transition-all duration-300 shadow-xl"
          >
            Talk to a Specialist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
