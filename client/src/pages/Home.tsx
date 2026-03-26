import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_TAGLINE, MINISTRY_DESCRIPTION, HERO_IMAGE } from "@/lib/constants";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Play, Headphones, BookOpen, ShoppingBag, Heart, Users, ArrowRight } from "lucide-react";

const navItems = [
  { title: "Watch", desc: "Sermons & Messages", href: "/watch", icon: Play },
  { title: "Listen", desc: "Podcast Episodes", href: "/listen", icon: Headphones },
  { title: "Blog", desc: "Articles & Devotionals", href: "/blog", icon: BookOpen },
  { title: "Books", desc: "Resources & Store", href: "/store", icon: ShoppingBag },
  { title: "Give", desc: "Support the Ministry", href: "/give", icon: Heart },
  { title: "About", desc: "Our Ministry", href: "/about", icon: Users },
];

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
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Pastor T.I. Solomon preaching" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #201c1d 10%, rgba(32, 28, 29, 0.7) 50%, rgba(32,28,29,0.2) 100%)' }} />
        </div>
        <div className="container relative z-10 pb-16 pt-40">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-4">
              T.I. Solomon Ministries
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-5">
              {MINISTRY_TAGLINE}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {MINISTRY_DESCRIPTION}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/watch">
                <Button className="bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-11 px-7 rounded-sm gap-2 group">
                  <Play className="h-4 w-4 fill-[#231f20] group-hover:scale-110 transition-transform" />
                  Watch Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold text-sm h-11 px-7 rounded-sm bg-transparent gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Nav Grid */}
      <section className="py-12 md:py-16 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
            <h2 className="text-xl font-extrabold text-white/60 uppercase tracking-widest text-sm">Explore the Ministry</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px rounded overflow-hidden border border-white/10">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.06)}>
                  <Link href={item.href}>
                    <div className="border-r border-b border-white/10 hover:bg-white/5 transition-all duration-300 p-6 md:p-8 cursor-pointer group h-full" style={{ backgroundColor: '#201c1d' }}>
                      <div className="w-10 h-10 rounded-sm bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                        <Icon className="h-5 w-5 text-brand" />
                      </div>
                      <h3 className="text-lg md:text-xl font-extrabold text-white mb-1 group-hover:text-brand transition-colors">{item.title}</h3>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                      <div className="mt-4 flex items-center gap-1 text-brand/0 group-hover:text-brand/70 transition-all text-xs font-bold">
                        <span>Explore</span>
                        <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-14 md:py-20 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-6">Word of God</p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug text-white mb-6">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </blockquote>
            <p className="text-brand font-bold text-sm">— Jeremiah 29:11</p>
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-12 md:py-16 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-2">From the Blog</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Latest Articles</h2>
              </div>
              <Link href="/blog" className="text-brand text-sm font-bold hover:underline hidden sm:flex items-center gap-1 group">
                View All
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {latestPosts.data?.posts && latestPosts.data.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.data.posts.map((post: any, i: number) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group cursor-pointer h-full border border-white/0 hover:border-white/10 rounded transition-all duration-300 p-1 hover:bg-white/3">
                      {post.featuredImage && (
                        <div className="aspect-video rounded overflow-hidden mb-4">
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
                      <div className="mt-3 flex items-center gap-1 text-brand/0 group-hover:text-brand transition-all text-xs font-bold">
                        <span>Read more</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 rounded p-10 text-center">
              <BookOpen className="h-10 w-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Blog posts coming soon. Stay tuned for articles and devotionals.</p>
            </div>
          )}

          <Link href="/blog" className="text-brand text-sm font-bold hover:underline mt-6 flex items-center gap-1 sm:hidden">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Give CTA */}
      <section className="py-14 md:py-20 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="h-10 w-10 text-brand mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Support the Ministry</h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Your generosity helps us reach more hearts with the Gospel. Every gift, big or small, makes an eternal difference.
              </p>
              <Link href="/give">
                <Button className="bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-11 px-8 rounded-sm gap-2">
                  <Heart className="h-4 w-4 fill-[#231f20]" />
                  Give Today
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 md:py-20" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">Stay Connected</p>
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
                  className="border-white/15 text-white placeholder:text-white/30 h-11 text-sm rounded-sm"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-11 rounded-sm"
                  disabled={subscribe.isPending}
                >
                  {subscribe.isPending ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
