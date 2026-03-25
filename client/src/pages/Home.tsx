import { Button } from "@/components/ui/button";
import { MINISTRY_TAGLINE, MINISTRY_DESCRIPTION, HERO_IMAGE } from "@/lib/constants";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, Headphones, Heart, Users, MessageSquare, Info } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

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

  const services = [
    { title: "Watch", desc: "Sermons & Messages", href: "/watch", icon: BookOpen },
    { title: "Listen", desc: "Podcast Episodes", href: "/listen", icon: Headphones },
    { title: "Give", desc: "Support Ministry", href: "/give", icon: Heart },
    { title: "Community", desc: "Connect & Grow", href: "/about", icon: Users },
    { title: "Blog", desc: "Articles & Devotionals", href: "/blog", icon: MessageSquare },
    { title: "Store", desc: "Resources & Books", href: "/store", icon: BookOpen },
  ];

  return (
    <PublicLayout>
      {/* Hero Section — Professional with image overlay */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Pastor T.I. Solomon" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a42] via-[#1a3a42]/70 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6 tracking-tight">
                {MINISTRY_TAGLINE}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl">
                {MINISTRY_DESCRIPTION}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/watch">
                  <Button className="bg-[#df5311] hover:bg-[#c44509] text-white font-bold text-base h-12 px-8 rounded-sm">
                    Watch Sermons
                  </Button>
                </Link>
                <Link href="/give">
                  <Button className="bg-[#318f9e] hover:bg-[#2a7a8a] text-white font-bold text-base h-12 px-8 rounded-sm">
                    Support Ministry
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a3a42] mb-6 leading-tight">
                About Our Ministry
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                T.I. Solomon Ministries is dedicated to bringing the Word of God to every heart through preaching, teaching, and community. We believe in faith, transformation, and serving God with all our hearts.
              </p>
              <div className="flex gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#df5311] mb-2">Sermons</h3>
                  <p className="text-gray-600">Powerful messages for spiritual growth</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#318f9e] mb-2">Community</h3>
                  <p className="text-gray-600">Connect with believers worldwide</p>
                </div>
              </div>
              <Link href="/about">
                <Button className="bg-[#df5311] hover:bg-[#c44509] text-white font-bold text-base h-12 px-8 rounded-sm">
                  Learn More
                </Button>
              </Link>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)}>
              <div className="bg-gradient-to-br from-[#318f9e]/10 to-[#df5311]/10 rounded-lg p-8 border border-[#318f9e]/20">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#df5311] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a3a42] mb-1">Faith-Driven</h4>
                      <p className="text-sm text-gray-600">Grounded in biblical truth and God's love</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#318f9e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a3a42] mb-1">Community-Focused</h4>
                      <p className="text-sm text-gray-600">Building meaningful connections</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#df5311] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a3a42] mb-1">Transformative</h4>
                      <p className="text-sm text-gray-600">Empowering spiritual growth and change</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services/Features Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a3a42] mb-4">
              Explore Our Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access sermons, podcasts, articles, and more to deepen your faith journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.05)}>
                  <Link href={service.href}>
                    <div className="bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group h-full flex flex-col">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#df5311] to-[#318f9e] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1a3a42] mb-2 group-hover:text-[#df5311] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">{service.desc}</p>
                      <div className="mt-4 text-[#df5311] font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Explore →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.data?.posts && latestPosts.data.posts.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-gray-200">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a3a42] mb-4">
                Latest Articles & Devotionals
              </h2>
              <p className="text-lg text-gray-600">
                Stay inspired with our latest teachings and reflections
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
              {latestPosts.data.posts.map((post: any, i: number) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group cursor-pointer h-full flex flex-col">
                      {post.featuredImage && (
                        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
                          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="text-sm font-semibold text-[#318f9e] uppercase tracking-wider mb-3">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <h3 className="text-xl font-bold text-[#1a3a42] group-hover:text-[#df5311] transition-colors leading-snug mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="mt-4 text-[#df5311] font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Read More →
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button className="bg-[#318f9e] hover:bg-[#2a7a8a] text-white font-bold text-base h-12 px-8 rounded-sm">
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#318f9e] to-[#2a7a8a]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Stay Connected
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Subscribe to our newsletter for weekly sermons, devotionals, and ministry updates
              </p>
              
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-sm bg-white text-[#1a3a42] placeholder:text-gray-400 border-0"
                />
                <Button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="bg-[#df5311] hover:bg-[#c44509] text-white font-bold text-base h-12 px-8 rounded-sm whitespace-nowrap"
                >
                  {subscribe.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
