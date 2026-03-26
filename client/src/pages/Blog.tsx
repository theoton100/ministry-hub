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

  return (
    <div style={{ backgroundColor: '#201c1d', minHeight: '100vh' }}>
      <PublicLayout>
        {/* Page Header */}
        <section className="pt-10 pb-6 border-b border-white/10">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p variants={fadeUp} className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Articles & Devotionals
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                Blog
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/40 text-sm">
                Articles, devotionals, and teachings to strengthen your faith.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-10">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-video rounded bg-white/5 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-1/3" />
                    <div className="h-5 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                  </div>
                ))}
              </div>
            ) : data && data.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.posts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUpDelay(i * 0.05)}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <article className="group cursor-pointer h-full border border-white/0 hover:border-white/10 rounded transition-all duration-300 p-1 hover:bg-white/3">
                          {post.featuredImageUrl ? (
                            <div className="aspect-video rounded overflow-hidden mb-4">
                              <img
                                src={post.featuredImageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video rounded overflow-hidden mb-4 bg-brand/5 flex items-center justify-center">
                              <BookOpen className="h-10 w-10 text-brand/30" />
                            </div>
                          )}
                          <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-2">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : ""}
                          </p>
                          <h3 className="text-lg font-bold text-white group-hover:text-brand transition-colors leading-snug mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                          )}
                          <div className="mt-3 flex items-center gap-1 text-brand/0 group-hover:text-brand transition-all text-xs font-bold">
                            <span>Read more</span>
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="text-xs font-bold border-white/20 text-white hover:bg-white/10 bg-transparent rounded-sm gap-1"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Previous
                    </Button>
                    <span className="text-white/40 text-xs px-2">
                      Page {page + 1} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page >= totalPages - 1}
                      className="text-xs font-bold border-white/20 text-white hover:bg-white/10 bg-transparent rounded-sm gap-1"
                    >
                      Next
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-center py-20 border border-white/10 rounded"
              >
                <BookOpen className="h-14 w-14 text-white/15 mx-auto mb-4" />
                <h2 className="text-2xl font-extrabold text-white mb-2">Blog Coming Soon</h2>
                <p className="text-white/40 text-sm max-w-sm mx-auto">
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
