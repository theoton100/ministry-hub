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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Pastor T.I. Solomon preaching" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </div>
        
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-white/60 text-xs font-semibold uppercase tracking-[0.3em] mb-6">
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
                <Button className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 px-8 rounded-sm gap-2 group">
                  <Play className="h-5 w-5 fill-white" />
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
      <section className="py-20 md:py-28 bg-white text-[#000000]">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl">
            <p className="text-[#000000]/60 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Core Message</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              From Confusion to Clarity
            </h2>
            <p className="text-[#000000]/70 text-lg leading-relaxed mb-6 font-light">
              Pastor Theo Solomon teaches how to develop deep intimacy with God—the foundation for clarity, purpose, and spiritual transformation. Through organized prayer, hearing God's voice, and understanding vision manifestation, you'll move from confusion to confidence in your faith journey.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-semibold">✓</span>
                </div>
                <span className="text-[#000000]/80 font-light">Deep intimacy with God</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-semibold">✓</span>
                </div>
                <span className="text-[#000000]/80 font-light">Organized prayer life</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-semibold">✓</span>
                </div>
                <span className="text-[#000000]/80 font-light">Hearing God's voice clearly</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ff8c42] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-semibold">✓</span>
                </div>
                <span className="text-[#000000]/80 font-light">Vision to manifestation</span>
              </li>
            </ul>
            <Link href="/about">
              <Button className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 px-8 rounded-sm">
                Learn More About Pastor Theo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CONTENT SECTION */}
      <section className="py-20 md:py-28 bg-[#f5f1e8]">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Latest</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">From the Blog</h2>
              </div>
              <Link href="/blog" className="text-gray-700 text-sm font-semibold hover:underline hidden sm:flex items-center gap-2 group">
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
                    <article className="group cursor-pointer h-full border border-[#f5f1e8] rounded-lg overflow-hidden hover:border-[#f5f1e8] transition-all duration-300 bg-[#f5f1e8] hover:bg-[#f5f1e8] hover:shadow-lg">
                      {post.featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-[#000000]/60 text-xs font-semibold uppercase tracking-wider mb-3">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <h3 className="text-xl font-semibold text-[#000000] group-hover:text-[#000000]/80 transition-colors leading-snug mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#000000]/60 text-sm leading-relaxed line-clamp-2 mb-4 font-light">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-[#000000]/60 text-sm font-semibold group-hover:gap-3 transition-all">
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
            <div className="border border-gray-200 rounded-lg p-12 text-center">
              <BookOpen className="h-12 w-12 text-[#000000]/20 mx-auto mb-4" />
              <p className="text-[#000000]/40 text-lg font-light">Blog posts coming soon. Stay tuned for articles and devotionals.</p>
            </div>
          )}

          <Link href="/blog" className="text-[#000000]/60 text-sm font-semibold hover:underline mt-8 flex items-center gap-2 sm:hidden">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* EXPLORE MINISTRY SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-[#000000]/60 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Explore</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000]">Navigate the Ministry</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0)}>
              <Link href="/watch">
                <div className="bg-white rounded-lg p-8 text-[#000000] hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border border-gray-200">
                  <Play className="h-10 w-10 text-[#000000]/40 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#000000]/80 transition-colors">Watch</h3>
                  <p className="text-[#000000]/70 text-sm font-light mb-4">Explore sermons and messages</p>
                  <span className="text-[#000000]/60 font-semibold flex items-center gap-2">Explore <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)}>
              <Link href="/listen">
                <div className="bg-white rounded-lg p-8 text-[#000000] hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border border-gray-200">
                  <Headphones className="h-10 w-10 text-[#000000]/40 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#000000]/80 transition-colors">Listen</h3>
                  <p className="text-[#000000]/70 text-sm font-light mb-4">Podcast episodes and audio messages</p>
                  <span className="text-[#000000]/60 font-semibold flex items-center gap-2">Explore <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.2)}>
              <Link href="/store">
                <div className="bg-white rounded-lg p-8 text-[#000000] hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border border-gray-200">
                  <ShoppingBag className="h-10 w-10 text-[#000000]/40 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#000000]/80 transition-colors">Store</h3>
                  <p className="text-[#000000]/70 text-sm font-light mb-4">Books, resources, and digital products</p>
                  <span className="text-[#000000]/60 font-semibold flex items-center gap-2">Explore <ArrowRight className="h-4 w-4" /></span>
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
              <Button className="bg-white hover:bg-white/90 text-[#000000] font-semibold text-base h-12 px-10 rounded-sm gap-2">
                <Heart className="h-5 w-5 fill-[#ff8c42]" />
                Give Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-20 md:py-28 bg-black">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[#000000]/60 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Stay Connected</p>
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
                  className="w-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 rounded-sm"
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
