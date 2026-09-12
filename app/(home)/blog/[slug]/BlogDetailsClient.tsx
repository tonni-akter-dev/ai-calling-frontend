"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Quote,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import { getBlogPostBySlug, getRelatedPosts } from "@/app/utils/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedArticles = getRelatedPosts(slug, post.category, 3);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <section className="relative bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] pt-40 pb-24 text-white text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute -bottom-40 right-0 w-100 h-100 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto mb-6 leading-[1.15]"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              {post.title}
            </span>
          </motion.h1>

          {/* Excerpt as subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium truncate max-w-45">
              {post.category}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ============ ARTICLE ============ */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-8">
          {post.sections.map((section, idx) => {
            if (section.type === "heading") {
              return (
                <motion.h2
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="text-2xl font-bold text-slate-900 mb-4 mt-12 leading-tight"
                >
                  {section.content}
                </motion.h2>
              );
            }

            /* ---- PARAGRAPH ---- */
            if (section.type === "paragraph") {
              return (
                <motion.p
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="text-lg text-slate-600 leading-relaxed"
                >
                  {section.content}
                </motion.p>
              );
            }

            /* ---- LIST ---- */
            if (section.type === "list") {
              return (
                <motion.ul
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="space-y-3 list-none"
                >
                  {section.items?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-600 leading-relaxed"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              );
            }

            /* ---- TABLE ---- */
            if (section.type === "table") {
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="overflow-x-auto border border-slate-200 rounded-lg my-8"
                >
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        {section.headers?.map((header, i) => (
                          <th
                            key={i}
                            className="text-left p-3 font-semibold text-slate-900"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows?.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t border-slate-200"
                        >
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={`p-3 ${
                                j === 0
                                  ? "font-medium text-slate-900"
                                  : "text-slate-600"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              );
            }

            /* ---- QUOTE ---- */
            if (section.type === "quote") {
              return (
                <motion.blockquote
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="relative my-10 rounded-2xl bg-linear-to-br from-primary to-[#0F1E55] p-8 text-white overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
                  <Quote className="w-7 h-7 text-orange-400 mb-3 relative z-10" />
                  <p className="text-lg font-semibold leading-relaxed relative z-10">
                    {section.content}
                  </p>
                </motion.blockquote>
              );
            }

            return null;
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-slate-200"
        >
          <p className="text-slate-600 mb-4 leading-relaxed">
            Ready to get started? Visit our{" "}
            <Link
              href="/pricing"
              className="text-primary hover:underline font-medium"
            >
              pricing page
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              contact us
            </Link>{" "}
            for a free consultation.
          </p>
        </motion.div>
      </article>

      {/* ============ RELATED ARTICLES ============ */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Related Articles
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-5">
                Continue Reading
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition p-5 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="font-semibold text-primary">
                      {article.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary transition leading-snug mb-4 line-clamp-2 flex-1">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ BACK TO BLOG ============ */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to All Articles
          </Link>
        </div>
      </section>
    </div>
  );
}