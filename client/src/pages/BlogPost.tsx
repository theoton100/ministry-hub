import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { fadeUp } from "@/lib/animations";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Streamdown } from "streamdown";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post } = trpc.blog.getBySlug.useQuery({ slug: params.slug ?? "" });

  return (
    <PublicLayout>
      <section className="pt-6 pb-4 border-b border-black/10">
        <div className="container max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="text-black/40 hover:text-black hover:bg-black/10 text-xs font-bold rounded-sm px-3">
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container max-w-3xl mx-auto">
          {post ? (
            <motion.article initial="hidden" animate="visible" variants={fadeUp}>
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-black tracking-tight">{post.title}</h1>
                <p className="text-black/30 text-xs font-semibold uppercase tracking-wider mt-4">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : ""}
                </p>
              </header>

              {post.featuredImageUrl && (
                <div className="rounded overflow-hidden mb-10">
                  <img src={post.featuredImageUrl} alt={post.title} className="w-full aspect-[16/9] object-cover" />
                </div>
              )}

              <div className="prose prose-lg max-w-none prose-invert prose-headings:font-extrabold prose-headings:tracking-tight prose-p:text-black/70 prose-p:leading-relaxed prose-a:text-brand prose-blockquote:border-brand prose-blockquote:text-black/60 prose-strong:text-black">
                <Streamdown>{post.content || ""}</Streamdown>
              </div>

              <div className="mt-16 pt-8 border-t border-black/10">
                <Link href="/blog">
                  <Button variant="outline" className="text-xs font-bold border-black/20 text-black hover:bg-black/10 bg-transparent rounded-sm">
                    More Articles
                  </Button>
                </Link>
              </div>
            </motion.article>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-extrabold text-black mb-2">Post Not Found</h2>
              <p className="text-black/40 text-sm mb-6">The blog post you are looking for does not exist or has been removed.</p>
              <Link href="/blog">
                <Button variant="outline" className="text-xs font-bold border-black/20 text-black hover:bg-black/10 bg-transparent rounded-sm">
                  Back to Blog
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
