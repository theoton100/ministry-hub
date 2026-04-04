import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_TAGLINE, MINISTRY_DESCRIPTION, HERO_IMAGE, LOGO_LIGHT } from "@/lib/constants";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Play, Headphones, BookOpen, ShoppingBag, Heart, Users, ArrowRight } from "lucide-react";

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

  // Impact statistics
  const stats = [
    { number: "50K+", label: "Lives Touched" },
    { number: "500+", label: "Sermons Shared" },
    { number: "12+", label: "Years in Ministry" },
    { number: "100%", label: "Committed to Truth" },
  ];

  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Pastor T.I. Solomon preaching" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e27] via-[#0a0e27]/80 to-[#0a0e27]/40" />
        </div>
        
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-[#ff8c42] text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              T.I. Solomon Ministries
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
              {MINISTRY_TAGLINE}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[#f5f1e8]/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
              {MINISTRY_DESCRIPTION}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/watch">
                <Button className="bg-[#ff8c42] hover:bg-[#ff7a2a] text-[#0a0e27] font-semibold text-base h-12 px-8 rounded-sm gap-2 group">
                  <Play className="h-5 w-5 fill-[#0a0e27]" />
                  Watch Now
                </Button>
              </Link>
              <Link href="/about">
                <Button className="border-2 border-white text-white hover:bg-white/10 font-semibold text-base h-12 px-8 rounded-sm bg-transparent gap-2">
                  Learn More
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED SPEAKER SECTION */}
      <section className="py-20 md:py-28 bg-white text-[#0a0e27]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[#ff8c42] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Core Message</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                From Confusion to Clarity
              </h2>
              <p className="text-[#0a0e27]/70 text-lg leading-relaxed mb-6 font-light">
                Pastor Theo Solomon teaches how to develop deep intimacy with God—the foundation for clarity, purpose, and spiritual transformation. Through organized prayer, hearing God's voice, and understanding vision manifestation, you'll move from confusion to confidence in your faith journey.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-semibold">✓</span>
                  </div>
                  <span className="text-[#0a0e27]/80 font-light">Deep intimacy with God</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-semibold">✓</span>
                  </div>
                  <span className="text-[#0a0e27]/80 font-light">Organized prayer life</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-semibold">✓</span>
                  </div>
                  <span className="text-[#0a0e27]/80 font-light">Hearing God's voice clearly</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-semibold">✓</span>
                  </div>
                  <span className="text-[#0a0e27]/80 font-light">Vision to manifestation</span>
                </li>
              </ul>
              <Link href="/about">
                <Button className="bg-[#ff8c42] hover:bg-[#ff7a2a] text-[#0a0e27] font-semibold text-base h-12 px-8 rounded-sm">
                  Learn More About Pastor Theo
                </Button>
              </Link>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)} className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img src={HERO_IMAGE} alt="Pastor T.I. Solomon" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ff8c42] rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS */}
      <section className="py-16 md:py-24 bg-[#0a0e27]">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-[#ff8c42] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Impact</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Transforming Lives Globally</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#ff8c42] mb-3">{stat.number}</div>
                <p className="text-white/70 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CONTENT SECTION */}
      <section className="py-20 md:py-28 bg-[#0a0e27]">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[#ff8c42] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Latest</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white">From the Blog</h2>
              </div>
              <Link href="/blog" className="text-[#ff8c42] text-sm font-semibold hover:underline hidden sm:flex items-center gap-2 group">
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {latestPosts.data?.posts && latestPosts.data.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.data.posts.map((post: any, i: number) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group cursor-pointer h-full border border-white/10 rounded-lg overflow-hidden hover:border-[#ff8c42] transition-all duration-300 bg-[#0a0e27]/50 hover:bg-[#0a0e27] hover:shadow-xl">
                      {post.featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-[#ff8c42] text-xs font-semibold uppercase tracking-wider mb-3">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#ff8c42] transition-colors leading-snug mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4 font-light">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-[#ff8c42] text-sm font-semibold group-hover:gap-3 transition-all">
                          <span>Read more</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg p-12 text-center">
              <BookOpen className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-lg font-light">Blog posts coming soon. Stay tuned for articles and devotionals.</p>
            </div>
          )}

          <Link href="/blog" className="text-[#ff8c42] text-sm font-semibold hover:underline mt-8 flex items-center gap-2 sm:hidden">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* EXPLORE MINISTRY SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-[#ff8c42] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Explore</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0e27]">Navigate the Ministry</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0)}>
              <Link href="/watch">
                <div className="bg-[#0a0e27] rounded-lg p-8 text-white hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <Play className="h-10 w-10 text-[#ff8c42] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#ff8c42] transition-colors">Watch</h3>
                  <p className="text-white/70 mb-4 font-light">Watch sermons and messages from Pastor Theo</p>
                  <span className="text-[#ff8c42] font-semibold flex items-center gap-2">Explore <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)}>
              <Link href="/listen">
                <div className="bg-[#0a0e27] rounded-lg p-8 text-white hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <Headphones className="h-10 w-10 text-[#ff8c42] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#ff8c42] transition-colors">Listen</h3>
                  <p className="text-white/70 mb-4 font-light">Podcast episodes and audio teachings</p>
                  <span className="text-[#ff8c42] font-semibold flex items-center gap-2">Explore <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.2)}>
              <Link href="/store">
                <div className="bg-[#0a0e27] rounded-lg p-8 text-white hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <ShoppingBag className="h-10 w-10 text-[#ff8c42] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#ff8c42] transition-colors">Store</h3>
                  <p className="text-white/70 mb-4 font-light">Digital books and resources</p>
                  <span className="text-[#ff8c42] font-semibold flex items-center gap-2">Explore <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GIVE CTA SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-[#6b2d9e] to-[#ff8c42]">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto text-center">
            <Heart className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Support the Ministry</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-10 font-light">
              Your generosity helps us reach more hearts with the Gospel and provide free resources to help people move from confusion to clarity. Every gift, big or small, makes an eternal difference.
            </p>
            <Link href="/give">
              <Button className="bg-white hover:bg-white/90 text-[#ff8c42] font-semibold text-base h-12 px-10 rounded-sm gap-2">
                <Heart className="h-5 w-5 fill-[#ff8c42]" />
                Give Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-20 md:py-28 bg-[#0a0e27]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[#ff8c42] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Stay Connected</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Get Inspired<br />Every Week
              </h2>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                Subscribe to our newsletter for weekly sermons, devotionals, and encouragement delivered straight to your inbox.
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)}>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/40 h-12 text-base rounded-sm"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#ff8c42] hover:bg-[#ff7a2a] text-[#0a0e27] font-semibold text-base h-12 rounded-sm"
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
