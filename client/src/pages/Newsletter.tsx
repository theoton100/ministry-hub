import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("You have been subscribed! God bless you.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email, firstName: firstName || undefined, lastName: lastName || undefined });
  };

  return (
    <PublicLayout>
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Subscribe</h1>
            <p className="text-white/40 text-sm">Weekly devotionals, sermon highlights, and encouragement in your inbox.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {/* Left: Info */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                Get Inspired<br />Every Week
              </h2>
              <div className="space-y-5 text-white/50 text-sm leading-relaxed">
                <p>Join our growing community of believers who receive weekly encouragement straight to their inbox.</p>
                <div className="space-y-3">
                  <div className="border-l-2 border-brand pl-4">
                    <h4 className="text-white font-bold text-sm mb-1">Weekly Devotionals</h4>
                    <p>Short, powerful devotionals to start your week with faith.</p>
                  </div>
                  <div className="border-l-2 border-brand pl-4">
                    <h4 className="text-white font-bold text-sm mb-1">Blog Highlights</h4>
                    <p>The best articles and teachings, curated just for you.</p>
                  </div>
                  <div className="border-l-2 border-brand pl-4">
                    <h4 className="text-white font-bold text-sm mb-1">Sermon Updates</h4>
                    <p>Be the first to know when new sermons and episodes drop.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              {submitted ? (
                <div className="border border-white/10 rounded p-8 text-center">
                  <h2 className="text-2xl font-extrabold text-white mb-3">Welcome to the Family!</h2>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Thank you for subscribing. You will receive our next newsletter with inspiring content to strengthen your faith. God bless you abundantly!
                  </p>
                </div>
              ) : (
                <div className="border border-white/10 rounded p-7">
                  <h3 className="text-xl font-extrabold text-white mb-1">Sign Up</h3>
                  <p className="text-white/40 text-xs mb-6">Join our community and never miss a word of encouragement.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-white/60 text-xs">First Name</Label>
                        <Input id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-white/5 border-white/15 text-white placeholder:text-white/25 h-10 text-sm rounded-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-white/60 text-xs">Last Name</Label>
                        <Input id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-white/5 border-white/15 text-white placeholder:text-white/25 h-10 text-sm rounded-sm" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-white/60 text-xs">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/5 border-white/15 text-white placeholder:text-white/25 h-10 text-sm rounded-sm" />
                    </div>
                    <Button type="submit" className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm h-10 rounded-sm" disabled={subscribe.isPending}>
                      {subscribe.isPending ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                    <p className="text-white/25 text-[11px] text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
