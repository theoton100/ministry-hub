import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const PAGE_SIZE = 9;

export default function Blog() {
  const [page, setPage] = useState(0);
  const input = useMemo(() => ({ limit: PAGE_SIZE, offset: page * PAGE_SIZE }), [page]);
  const { data, isLoading } = trpc.blog.listPublished.useQuery(input);

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <PublicLayout>
      <section className="bg-navy-900 text-white py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-3">Blog</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Words of Encouragement</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Devotional articles, reflections, and teachings to strengthen your faith and inspire your walk with God.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4"><Skeleton className="w-full aspect-[16/10] rounded-xl" /><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-full" /></div>
              ))}
            </div>
          ) : data && data.posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {data.posts.map((post, i) => (
                  <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.06)}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer h-full bg-card">
                        {post.featuredImageUrl ? (
                          <div className="aspect-[16/10] overflow-hidden">
                            <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="aspect-[16/10] bg-navy-100 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-navy-300" />
                          </div>
                        )}
                        <CardContent className="p-5 space-y-2">
                          <p className="text-xs text-muted-foreground tracking-wider uppercase">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                          </p>
                          <h3 className="font-serif text-lg font-bold group-hover:text-teal-500 transition-colors line-clamp-2">{post.title}</h3>
                          {post.excerpt && <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>}
                          <span className="inline-flex items-center gap-1 text-teal-500 text-xs font-semibold tracking-wider uppercase pt-1">
                            Read More <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)} className="text-xs font-semibold tracking-wider uppercase">Previous</Button>
                  <span className="text-sm text-muted-foreground px-4">Page {page + 1} of {totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="text-xs font-semibold tracking-wider uppercase">Next</Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-navy-400" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Blog Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Inspiring articles and devotionals are being prepared. Check back soon for words of encouragement.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
