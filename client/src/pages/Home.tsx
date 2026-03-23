import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HERO_BG, MINISTRY_TAGLINE, MINISTRY_DESCRIPTION, MINISTRY_NAME,
  PASTOR_CUTOUT, PASTOR_PHOTO, MINISTRY_SCENES, MINISTRY_EXTRAS,
} from "@/lib/constants";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Play, BookOpen, Headphones, ArrowRight, Mail, Quote, Youtube, Mic, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { data: featuredSermon, isLoading: sermonLoading } = trpc.sermon.featured.useQuery();
  const { data: blogData, isLoading: blogLoading } = trpc.blog.listPublished.useQuery({ limit: 3, offset: 0 });
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { toast.success("You're subscribed! Check your inbox."); setEmail(""); setFirstName(""); setLastName(""); },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate({ email, firstName: firstName || undefined, lastName: lastName || undefined });
  };

  const galleryImages = [
    MINISTRY_SCENES[0], MINISTRY_SCENES[2], MINISTRY_SCENES[3],
    MINISTRY_EXTRAS[0], MINISTRY_SCENES[4], MINISTRY_EXTRAS[1],
  ];

  return (
    <PublicLayout>
      {/* ─── HERO ─── Joel Osteen style: large bg image, centered text, dark overlay */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />
        <div className="relative z-10 container text-center text-white px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto space-y-5">
            <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
              {MINISTRY_TAGLINE}
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/watch">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white shadow-xl gap-2 text-sm font-semibold tracking-wider px-8 uppercase">
                  Watch Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 text-sm font-semibold tracking-wider px-8 uppercase">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── INLINE NEWSLETTER SIGNUP ─── Like Joel Osteen's "Sign up to receive life changing hope" bar */}
      <section className="bg-navy-800 py-6">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-center text-white text-sm md:text-base font-medium mb-4 tracking-wide">
              Sign up to receive life-changing hope and encouragement!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-3xl mx-auto">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:w-40"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:w-40"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:flex-1"
              />
              <Button type="submit" disabled={subscribeMutation.isPending} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold tracking-wider h-11 px-8 uppercase text-xs w-full sm:w-auto">
                {subscribeMutation.isPending ? "..." : "Sign Up"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED SERMON / MESSAGE ─── Like "Still I Rise" section */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          {sermonLoading ? (
            <div className="max-w-5xl mx-auto">
              <Skeleton className="w-full aspect-video rounded-xl" />
              <Skeleton className="h-8 w-2/3 mt-6 mx-auto" />
            </div>
          ) : featuredSermon ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-5xl mx-auto">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-navy-950">
                <iframe
                  src={`https://www.youtube.com/embed/${featuredSermon.youtubeVideoId}`}
                  title={featuredSermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              </div>
              <div className="text-center mt-8">
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">Latest Message</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{featuredSermon.title}</h2>
                {featuredSermon.description && (
                  <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{featuredSermon.description}</p>
                )}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Link href="/watch">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2 font-semibold tracking-wider text-xs uppercase">
                      <Play className="h-4 w-4" /> Watch Message
                    </Button>
                  </Link>
                  <Link href="/listen">
                    <Button variant="outline" className="gap-2 text-xs font-semibold tracking-wider uppercase">
                      <Headphones className="h-4 w-4" /> Listen on Spotify
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center py-12 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-navy-400" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">Messages Coming Soon</h2>
              <p className="text-muted-foreground">Powerful sermons of hope and faith are on the way. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── LATEST BLOG POSTS ─── Like Joel Osteen's sermon card grid */}
      <section className="py-14 md:py-20 bg-warm-50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">From the Blog</h2>
            <p className="text-muted-foreground mt-2">Devotionals and articles to inspire your faith</p>
          </motion.div>
          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4"><Skeleton className="w-full aspect-[16/10] rounded-lg" /><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-full" /></div>
              ))}
            </div>
          ) : blogData && blogData.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {blogData.posts.map((post, i) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer h-full bg-card">
                      {post.featuredImageUrl ? (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-navy-100 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-navy-300" />
                        </div>
                      )}
                      <CardContent className="p-5 space-y-2">
                        <p className="text-xs text-muted-foreground tracking-wider uppercase">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                        </p>
                        <h3 className="font-serif text-lg font-bold group-hover:text-teal-500 transition-colors line-clamp-2">{post.title}</h3>
                        {post.excerpt && <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>}
                        <span className="inline-flex items-center gap-1 text-teal-500 text-xs font-semibold tracking-wider uppercase pt-1">
                          Read More <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-14 w-14 text-navy-200 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Blog posts coming soon!</p>
            </div>
          )}
          {blogData && blogData.posts.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/blog">
                <Button variant="outline" className="gap-2 font-semibold tracking-wider text-xs uppercase">
                  View All Posts <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── SCRIPTURE QUOTE BANNER ─── Full-width dark navy banner */}
      <section className="py-16 md:py-20 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-400 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-6">Today's Word for You</p>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-white leading-relaxed">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </blockquote>
            <p className="text-teal-400 font-semibold mt-6 text-base tracking-wide">— Jeremiah 29:11</p>
          </motion.div>
        </div>
      </section>

      {/* ─── MINISTRY GALLERY ─── Photo grid like Joel Osteen's community section */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Our Ministry</h2>
            <p className="text-muted-foreground mt-2">Moments of grace, worship, and community</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.05)}
                className={`rounded-lg overflow-hidden ${i === 0 ? "md:row-span-2" : ""}`}
              >
                <img
                  src={img}
                  alt={`Ministry moment ${i + 1}`}
                  className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${i === 0 ? "h-full min-h-[280px]" : "aspect-square"}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WAYS TO CONNECT ─── Three pillars: Watch, Listen, Read */}
      <section className="py-14 md:py-20 bg-navy-900 text-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Ways to Connect</h2>
            <p className="text-white/60 mt-2">Take the ministry with you wherever you go</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Youtube, title: "Watch on YouTube", desc: "Catch up on our latest sermons and messages. Let the Word transform your life.", href: "/watch", color: "bg-red-500/10 text-red-400" },
              { icon: Mic, title: "Listen on Spotify", desc: "Take the ministry with you. Listen to our podcast on Spotify wherever you go.", href: "/listen", color: "bg-green-500/10 text-green-400" },
              { icon: BookOpen, title: "Read the Blog", desc: "Explore devotional blog posts and articles that inspire faith and encourage growth.", href: "/blog", color: "bg-teal-500/10 text-teal-400" },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)}>
                <Link href={item.href}>
                  <div className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-center h-full">
                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-teal-400 text-xs font-semibold tracking-wider uppercase mt-4 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PASTOR SECTION ─── About the pastor with photo */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src={PASTOR_PHOTO} alt="Pastor T.I. Solomon" className="rounded-xl shadow-xl w-full aspect-[4/5] object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.15)} className="space-y-5">
              <p className="text-teal-500 text-xs font-semibold tracking-widest uppercase">Meet the Pastor</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Pastor T.I. Solomon</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pastor Theophilus Solomon is a devoted Christian leader originally from Kogi State, Nigeria, now serving faithfully in Ghana. With a heart ablaze for God and a deep love for His people, Pastor Theo leads a growing church community dedicated to worship, the Word, and service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His preaching style blends the warmth and encouragement of uplifting storytelling with the bold, scripturally grounded authority of sound doctrine. Every message is designed to inspire faith, ignite hope, and equip believers for victorious living.
              </p>
              <Link href="/about">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2 font-semibold tracking-wider text-xs uppercase mt-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM NEWSLETTER CTA ─── Full-width teal banner */}
      <section className="py-14 md:py-20 bg-teal-500 text-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto text-center">
            <Mail className="h-10 w-10 mx-auto mb-5 opacity-80" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Stay Connected</h2>
            <p className="text-white/80 text-base mb-6 leading-relaxed">
              Receive weekly devotionals, sermon highlights, and words of encouragement delivered straight to your inbox.
            </p>
            <Link href="/newsletter">
              <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white shadow-xl text-xs font-semibold tracking-wider px-8 uppercase gap-2">
                Subscribe Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
