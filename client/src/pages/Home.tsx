import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HERO_BG, MINISTRY_TAGLINE, MINISTRY_DESCRIPTION } from "@/lib/constants";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Play, BookOpen, Headphones, ArrowRight, Mail, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: featuredSermon, isLoading: sermonLoading } = trpc.sermon.featured.useQuery();
  const { data: blogData, isLoading: blogLoading } = trpc.blog.listPublished.useQuery({ limit: 3, offset: 0 });

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 container text-center text-white px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto space-y-6">
            <motion.p variants={fadeUp} className="text-gold-300 font-medium tracking-widest uppercase text-sm">
              Welcome to Our Ministry
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {MINISTRY_TAGLINE}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {MINISTRY_DESCRIPTION}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/watch">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl gap-2 text-base px-8">
                  <Play className="h-5 w-5" /> Watch Sermons
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 text-base px-8">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Latest Message</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">This Week's Sermon</h2>
          </motion.div>
          {sermonLoading ? (
            <div className="max-w-4xl mx-auto">
              <Skeleton className="w-full aspect-video rounded-2xl" />
              <Skeleton className="h-8 w-2/3 mt-6 mx-auto" />
            </div>
          ) : featuredSermon ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${featuredSermon.youtubeVideoId}`}
                  title={featuredSermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              </div>
              <div className="text-center mt-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground">{featuredSermon.title}</h3>
                {featuredSermon.description && (
                  <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{featuredSermon.description}</p>
                )}
                <Link href="/watch">
                  <Button variant="outline" className="mt-6 gap-2">View All Sermons <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Play className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Sermons coming soon. Stay tuned!</p>
              <p className="text-muted-foreground/60 text-sm mt-2">Check back for powerful messages of hope and faith.</p>
            </div>
          )}
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-primary/40 mx-auto mb-6" />
            <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-relaxed">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </blockquote>
            <p className="text-primary font-semibold mt-6 text-lg">Jeremiah 29:11</p>
          </motion.div>
        </div>
      </section>

      {/* Ministry Pillars */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Explore</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Ways to Connect</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Play, title: "Watch", desc: "Catch up on our latest sermons and messages. Let the Word transform your life.", href: "/watch", color: "bg-red-50 text-red-600" },
              { icon: Headphones, title: "Listen", desc: "Take the ministry with you. Listen to our podcast on Spotify wherever you go.", href: "/listen", color: "bg-purple-50 text-purple-600" },
              { icon: BookOpen, title: "Read", desc: "Explore devotional blog posts and articles that inspire faith and encourage growth.", href: "/blog", color: "bg-blue-50 text-blue-600" },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)}>
                <Link href={item.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 cursor-pointer h-full">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">From the Blog</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Words of Encouragement</h2>
          </motion.div>
          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4"><Skeleton className="w-full aspect-[16/10] rounded-xl" /><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-full" /></div>
              ))}
            </div>
          ) : blogData && blogData.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {blogData.posts.map((post, i) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 cursor-pointer h-full">
                      {post.featuredImageUrl && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <CardContent className="p-6 space-y-3">
                        <p className="text-xs text-muted-foreground">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                        </p>
                        <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                        {post.excerpt && <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>}
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">Read More <ArrowRight className="h-3.5 w-3.5" /></span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Blog posts coming soon!</p>
              <p className="text-muted-foreground/60 text-sm mt-2">Inspiring articles and devotionals are on the way.</p>
            </div>
          )}
          {blogData && blogData.posts.length > 0 && (
            <div className="text-center mt-10">
              <Link href="/blog"><Button variant="outline" className="gap-2">View All Posts <ArrowRight className="h-4 w-4" /></Button></Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto text-center text-primary-foreground">
            <Mail className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Receive Daily Inspiration</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Sign up for our newsletter and receive weekly devotionals, sermon highlights, and words of encouragement delivered straight to your inbox.
            </p>
            <Link href="/newsletter">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl text-base px-8 gap-2">
                Subscribe Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
