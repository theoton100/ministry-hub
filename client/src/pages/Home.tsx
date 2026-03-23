import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_NAME, MINISTRY_TAGLINE, MINISTRY_DESCRIPTION } from "@/lib/constants";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Link } from "wouter";
import { Video, Headphones, BookOpen, User, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const navCards = [
  {
    icon: Video,
    title: "Watch",
    desc: "Stream our latest sermons and messages on YouTube.",
    href: "/watch",
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    icon: Headphones,
    title: "Listen",
    desc: "Catch our podcast episodes on Spotify wherever you go.",
    href: "/listen",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: BookOpen,
    title: "Blog",
    desc: "Read articles and devotionals to strengthen your faith.",
    href: "/blog",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: User,
    title: "About",
    desc: "Learn about Pastor T.I. Solomon and the ministry vision.",
    href: "/about",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    icon: Mail,
    title: "Subscribe",
    desc: "Get weekly devotionals and encouragement in your inbox.",
    href: "/newsletter",
    color: "bg-red-500/10 text-red-400",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
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
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-24 md:py-36">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {MINISTRY_TAGLINE}
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              {MINISTRY_DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/watch">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold tracking-wider text-xs uppercase gap-2 px-8">
                  Watch Now <Video className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold tracking-wider text-xs uppercase gap-2 px-8">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inline Newsletter Bar */}
      <section className="bg-navy-800 py-5">
        <div className="container">
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-2xl mx-auto">
            <p className="text-white/80 text-sm font-semibold whitespace-nowrap">Sign up to receive life-changing hope and encouragement!</p>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-9 text-sm"
                required
              />
              <Button type="submit" size="sm" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-xs uppercase tracking-wider whitespace-nowrap px-6" disabled={subscribe.isPending}>
                {subscribe.isPending ? "..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-teal-500 font-semibold tracking-widest uppercase text-xs mb-3">Explore</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ways to Connect</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {navCards.map((card, i) => (
              <motion.div key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}>
                <Link href={card.href}>
                  <div className="group p-6 rounded-xl border border-border hover:border-teal-500/30 hover:shadow-lg transition-all cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-teal-500 transition-colors">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                    <div className="flex items-center gap-1 text-teal-500 text-xs font-semibold tracking-wider uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="bg-navy-900 text-white py-16 md:py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-6">Scripture of the Day</p>
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed italic text-white/90 mb-6">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </blockquote>
            <p className="text-teal-400 font-semibold text-sm tracking-wider">Jeremiah 29:11 (NIV)</p>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container text-center max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Our Community</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Whether you are seeking encouragement, growing in faith, or looking for a church family — you are welcome here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/newsletter">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold tracking-wider text-xs uppercase gap-2 px-8">
                  Subscribe <Mail className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/watch">
                <Button size="lg" variant="outline" className="font-semibold tracking-wider text-xs uppercase gap-2 px-8">
                  Watch a Sermon <Video className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
