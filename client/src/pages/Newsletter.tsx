import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { fadeUp } from "@/lib/animations";
import { Mail, CheckCircle, Heart, BookOpen, Headphones } from "lucide-react";
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
      <section className="bg-navy-900 text-white py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-3">Newsletter</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Stay Inspired</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Receive weekly devotionals, sermon highlights, and words of encouragement delivered straight to your inbox.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            {submitted ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-10 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold">Welcome to the Family!</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Thank you for subscribing. You will receive our next newsletter with inspiring content to strengthen your faith. God bless you abundantly!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border-0">
                <CardContent className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-teal-500" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold">Sign Up for Inspiration</h2>
                    <p className="text-muted-foreground text-sm mt-2">Join our community and never miss a word of encouragement.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg font-semibold tracking-wider uppercase" size="lg" disabled={subscribe.isPending}>
                      {subscribe.isPending ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                    <p className="text-xs text-muted-foreground/60 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-16 md:py-20 bg-navy-900 text-white">
        <div className="container max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">What You'll Receive</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Weekly Devotionals", desc: "Short, powerful devotionals to start your week with faith and encouragement.", color: "bg-red-500/10 text-red-400" },
              { icon: BookOpen, title: "Blog Highlights", desc: "The best articles and teachings from our blog, curated just for you.", color: "bg-teal-500/10 text-teal-400" },
              { icon: Headphones, title: "Sermon Updates", desc: "Be the first to know when new sermons and podcast episodes are available.", color: "bg-blue-500/10 text-blue-400" },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-3">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
