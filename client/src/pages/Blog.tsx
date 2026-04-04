import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 12;

export default function Blog() {
  const [page, setPage] = useState(0);
  const input = useMemo(() => ({ limit: PAGE_SIZE, offset: page * PAGE_SIZE }), [page]);
  const { data, isLoading } = trpc.blog.listPublished.useQuery(input);
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const featuredPost = data?.posts?.[0];

  return (
    <div style={{ backgroundColor: '#0a0e27', minHeight: '100vh' }}>
      <PublicLayout>
        {/* PAGE HEADER */}
        <section className="py-16 md:py-24 bg-[#0a0e27]">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p variants={fadeUp} className="text-[#ff8c42] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Articles & Devotionals
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                Blog
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-2xl">
                Inspiring articles, devotionals, and teachings to strengthen your faith and deepen your intimacy with God.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FEATURED POST SECTION */}
        {!isLoading && featuredPost && (
          <section className="py-20 md:py-28 bg-white">
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <p className="text-[#ff8c42] text-xs font-bold uppercase tracking-[0.3em] mb-4">Featured Article</p>
              </motion.div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)} className="group cursor-pointer">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {featuredPost.featuredImageUrl && (
                      <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                        <img
                          src={featuredPost.featuredImageUrl}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <p className="text-[#ff8c42] text-xs font-bold uppercase tracking-wider mb-4">
                        {featuredPost.publishedAt
                          ? new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a0e27] leading-tight mb-6 group-hover:text-[#ff8c42] transition-colors">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <p className="text-[#0a0e27]/70 text-lg leading-relaxed mb-8">{featuredPost.excerpt}</p>
                      )}
                      <div className="flex items-center gap-2 text-[#ff8c42] font-bold group-hover:gap-3 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </section>
        )}

        {/* BLOG GRID SECTION */}
        <section className="py-20 md:py-28 bg-[#0a0e27]">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-video rounded-lg bg-white/5 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-1/3" />
                    <div className="h-6 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                  </div>
                ))}
              </div>
            ) : data && data.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.posts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUpDelay(i * 0.08)}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <article className="group cursor-pointer h-full border border-white/10 rounded-lg overflow-hidden hover:border-[#ff8c42] transition-all duration-300 bg-[#0a0e27]/50 hover:bg-[#0a0e27] hover:shadow-xl">
                          {post.featuredImageUrl ? (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={post.featuredImageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video bg-[#ff8c42]/10 flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-[#ff8c42]/30" />
                            </div>
                          )}
                          <div className="p-6">
                            <p className="text-[#ff8c42] text-xs font-bold uppercase tracking-wider mb-3">
                              {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : ""}
                            </p>
                            <h3 className="text-xl font-bold text-white group-hover:text-[#ff8c42] transition-colors leading-snug mb-3 line-clamp-2">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                            )}
                            <div className="flex items-center gap-2 text-[#ff8c42] text-sm font-bold group-hover:gap-3 transition-all">
                              <span>Read more</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-16">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="text-sm font-bold border-white/20 text-white hover:bg-white/10 hover:text-[#ff8c42] bg-transparent rounded-sm gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-white/60 text-sm px-4">
                      Page {page + 1} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page >= totalPages - 1}
                      className="text-sm font-bold border-white/20 text-white hover:bg-white/10 hover:text-[#ff8c42] bg-transparent rounded-sm gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-center py-24 border border-white/10 rounded-lg"
              >
                <BookOpen className="h-16 w-16 text-white/20 mx-auto mb-6" />
                <h2 className="text-3xl font-extrabold text-white mb-4">Blog Coming Soon</h2>
                <p className="text-white/60 text-lg max-w-sm mx-auto">
                  Articles and devotionals are on the way. Check back soon for inspiring content.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </PublicLayout>
    </div>
  );
}
