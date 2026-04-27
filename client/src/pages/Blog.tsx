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
    <PublicLayout>
      {/* PAGE HEADER */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-gray-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Articles & Devotionals
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Blog
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-600 text-base max-w-2xl">
              Inspiring articles, devotionals, and teachings to strengthen your faith and deepen your intimacy with God.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED POST SECTION */}
      {!isLoading && featuredPost && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Featured Article</p>
            </motion.div>

            <Link href={`/blog/${featuredPost.slug}`}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)} className="group cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {featuredPost.featuredImageUrl && (
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={featuredPost.featuredImageUrl}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-4">
                      {featuredPost.publishedAt
                        ? new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 group-hover:text-gray-700 transition-colors">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-gray-600 text-base leading-relaxed mb-8">{featuredPost.excerpt}</p>
                    )}
                    <div className="flex items-center gap-2 text-gray-700 font-bold group-hover:gap-3 transition-all">
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
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-video rounded-lg bg-gray-200 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
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
                      <article className="group cursor-pointer h-full border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-lg">
                        {post.featuredImageUrl ? (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.featuredImageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-100 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                        <div className="p-6">
                          <p className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-3">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : ""}
                          </p>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                          )}
                          <div className="flex items-center gap-2 text-gray-700 text-sm font-bold group-hover:gap-3 transition-all">
                            <span>Read more</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16">
                  <Button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-10 px-4 rounded-sm disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-gray-700 text-sm font-medium">
                    Page {page + 1} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page === totalPages - 1}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-10 px-4 rounded-sm disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-base">No articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
