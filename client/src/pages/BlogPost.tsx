import PublicLayout from "@/components/PublicLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { fadeUp } from "@/lib/animations";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Streamdown } from "streamdown";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug: params.slug ?? "" });

  return (
    <PublicLayout>
      {/* Dark header bar for blog post */}
      <section className="bg-navy-900 py-8">
        <div className="container max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2 text-white/60 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="w-full aspect-[16/9] rounded-xl" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : post ? (
            <motion.article initial="hidden" animate="visible" variants={fadeUp}>
              <header className="mb-8">
                <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">{post.title}</h1>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-4">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : ""}
                </p>
              </header>

              {post.featuredImageUrl && (
                <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                  <img src={post.featuredImageUrl} alt={post.title} className="w-full aspect-[16/9] object-cover" />
                </div>
              )}

              <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-teal-500 prose-blockquote:border-teal-500 prose-blockquote:text-foreground/70 prose-blockquote:italic">
                <Streamdown>{post.content || ""}</Streamdown>
              </div>

              <div className="mt-16 pt-8 border-t border-border">
                <Link href="/blog">
                  <Button variant="outline" className="gap-2 text-xs font-semibold tracking-wider uppercase">
                    <ArrowLeft className="h-4 w-4" /> More Articles
                  </Button>
                </Link>
              </div>
            </motion.article>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-navy-400" />
              </div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-3">Post Not Found</h2>
              <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist or has been removed.</p>
              <Link href="/blog"><Button variant="outline" className="gap-2 text-xs font-semibold tracking-wider uppercase"><ArrowLeft className="h-4 w-4" /> Back to Blog</Button></Link>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
