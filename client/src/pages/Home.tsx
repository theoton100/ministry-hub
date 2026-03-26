import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_TAGLINE, MINISTRY_DESCRIPTION, HERO_IMAGE } from "@/lib/constants";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const latestPosts = trpc.blog.listPublished.useQuery({ limit: 3, offset: 0 });
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setEmail("");
      toast.success("Subscribed! God bless you.");
    },
    onError: (err) => toast.error(err.message || "Something went wrong."),
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
  };

  return (
    <PublicLayout>
      {/* Hero — full bleed with image */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Pastor T.I. Solomon preaching" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #201c1d, rgba(32, 28, 29, 0.6), transparent)' }} />
        </div>
        <div className="container relative z-10 pb-14 pt-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-5">
              {MINISTRY_TAGLINE}
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {MINISTRY_DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/watch">
                <Button className="bg-brand hover:bg-brand-hover text-white font-bold text-sm h-10 px-6 rounded-sm">
                  Watch Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-white/30 text-white hover: font-bold text-sm h-10 px-6 rounded-sm bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Nav Grid — NASA "topics" style */}
      <section className="py-12 md:py-16 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px rounded overflow-hidden border border-white/10" style={{ backgroundColor: '#201c1d' }}>
            {[
              { title: "Watch", desc: "Sermons & Messages", href: "/watch" },
              { title: "Listen", desc: "Podcast Episodes", href: "/listen" },
              { title: "Blog", desc: "Articles & Devotionals", href: "/blog" },
              { title: "Books", desc: "Resources & Store", href: "/store" },
              { title: "Give", desc: "Support the Ministry", href: "/give" },
              { title: "About", desc: "Our Ministry", href: "/about" },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.05)}>
                <Link href={item.href}>
                  <div className="border-r border-b border-white/10 hover:bg-white/5 transition-colors p-6 md:p-8 cursor-pointer group h-full" style={{ backgroundColor: '#201c1d' }}>
                    <h3 className="text-lg md:text-xl font-extrabold text-white mb-1 group-hover:text-brand transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content — editorial style */}
      <section className="py-12 md:py-16 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Latest from the Blog</h2>
              <Link href="/blog" className="text-brand text-sm font-bold hover:underline hidden sm:block">
                View All
              </Link>
            </div>
          </motion.div>

          {latestPosts.data?.posts && latestPosts.data.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.data.posts.map((post: any, i: number) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group cursor-pointer">
                      {post.featuredImage && (
                        <div className="aspect-video rounded overflow-hidden mb-4 ">
                          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand transition-colors leading-snug mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded p-8 text-center">
              <p className="text-white/40 text-sm">Blog posts coming soon. Stay tuned for articles and devotionals.</p>
            </div>
          )}

          <Link href="/blog" className="text-brand text-sm font-bold hover:underline mt-6 block sm:hidden">
            View All
          </Link>
        </div>
      </section>
       {/* Newsletter */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#201c1d' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug text-white mb-6">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </blockquote>
            <p className="text-brand font-bold text-sm">Jeremiah 29:11</p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter — NASA "Explore the Universe" style */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                Get Inspired<br />Every Week
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Subscribe to our newsletter for weekly sermons, devotionals, and encouragement delivered straight to your inbox.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)}>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" border-white/15 text-white placeholder:text-white/30 h-11 text-sm rounded-sm"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm h-10 rounded-sm"
                  disabled={subscribe.isPending}
                >
                  {subscribe.isPending ? "Subscribing..." : "Sign Up"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
