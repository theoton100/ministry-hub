import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const PAGE_SIZE = 12;

export default function Blog() {
  const [page, setPage] = useState(0);
  const input = useMemo(() => ({ limit: PAGE_SIZE, offset: page * PAGE_SIZE }), [page]);
  const { data } = trpc.blog.listPublished.useQuery(input);
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <PublicLayout>
      <section className="pt-10 pb-6 border-b border-black/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-2">Blog</h1>
            <p className="text-black/40 text-sm">Articles, devotionals, and teachings to strengthen your faith.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10" style={{backgroundColor: '#ffffff'}}>
        <div className="container">
          {data && data.posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.posts.map((post, i) => (
                  <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.05)}>
                    <Link href={`/blog/${post.slug}`}>
                      <article className="group cursor-pointer">
                        {post.featuredImageUrl ? (
                          <div className="aspect-video rounded overflow-hidden mb-4 bg-white/5">
                            <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="aspect-video rounded overflow-hidden mb-4 bg-white/5" />
                        )}
                        <p className="text-black/30 text-xs font-semibold uppercase tracking-wider mb-2">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                        </p>
                        <h3 className="text-lg font-bold text-black group-hover:text-brand transition-colors leading-snug mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && <p className="text-black/40 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>}
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="text-xs font-bold border-black/20 text-black hover:bg-white/10 bg-transparent rounded-sm"
                  >
                    Previous
                  </Button>
                  <span className="text-black/40 text-xs">
                    Page {page + 1} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages - 1}
                    className="text-xs font-bold border-black/20 text-black hover:bg-white/10 bg-transparent rounded-sm"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-extrabold text-black mb-2">Blog Coming Soon</h2>
              <p className="text-black/40 text-sm">Articles and devotionals are on the way. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
