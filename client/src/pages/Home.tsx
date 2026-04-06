import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Zap, Heart } from "lucide-react";

export default function Home() {
  const [resetEmail, setResetEmail] = useState("");
  const [systemEmail, setSystemEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  // Mailchimp subscription for 7-Day Reset
  const resetSubscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setResetEmail("");
      toast.success("Check your email for the 7-Day Reset PDF!");
    },
    onError: (err) => toast.error(err.message || "Something went wrong."),
  });

  const handleResetSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setSubscribing(true);
    resetSubscribe.mutate({ email: resetEmail });
    setSubscribing(false);
  };

  const handleSystemSignup = () => {
    // This will redirect to Paystack checkout
    window.location.href = "/checkout/structured-walk";
  };

  const problems = [
    "You feel close to God sometimes, then distant again",
    "You restart your spiritual life often",
    "You feel overwhelmed trying to 'do everything right'",
    "Your faith feels emotional, not stable",
  ];

  const pathway = [
    {
      step: "1",
      title: "Reset",
      subtitle: "Clarity",
      description: "Start with the free 7-Day Reset",
    },
    {
      step: "2",
      title: "Structure",
      subtitle: "Consistency",
      description: "Join the Structured Walk System",
    },
    {
      step: "3",
      title: "Stability",
      subtitle: "Maturity",
      description: "Grow into a steady, grounded life with God",
    },
  ];

  const howItWorks = [
    "Join the system",
    "Get access via WhatsApp",
    "Receive weekly audio guidance",
    "Follow simple daily steps",
  ];

  return (
    <PublicLayout>
      {/* HERO SECTION - Conversion Focused */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#201c1d] to-[#000000]">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] tracking-tight text-white mb-6">
              Faith Was Never Meant to Feel Confusing.
            </motion.h1>
            <motion.p variants={fadeUpDelay(0.1)} className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-2xl mx-auto">
              If your spiritual life feels inconsistent, overwhelming, or like you're always restarting… there is a simpler, more stable way to walk with God.
            </motion.p>
            <motion.div variants={fadeUpDelay(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleResetSignup}
                className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 px-8 rounded-sm gap-2"
              >
                Start 7-Day Reset
              </Button>
              <Button
                onClick={handleSystemSignup}
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold text-base h-12 px-8 rounded-sm gap-2"
              >
                Join Structured Walk System
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">If this feels familiar…</h2>
            <p className="text-[#000000]/60 text-lg font-light">Many believers experience the same struggles. You're not alone.</p>
          </motion.div>

          <div className="space-y-4">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.08)}
                className="flex items-start gap-4 p-4 bg-[#f5f1e8] rounded-lg"
              >
                <CheckCircle2 className="h-6 w-6 text-[#ff8c42] flex-shrink-0 mt-0.5" />
                <p className="text-[#000000] text-lg font-light">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 md:py-28 bg-[#f5f1e8]">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">You don't need more pressure. You need structure.</h2>
            <p className="text-[#000000]/70 text-lg leading-relaxed font-light">
              This platform is designed to guide you step-by-step into a clear, consistent, and peaceful walk with God—without overwhelm or confusion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PATHWAY SECTION - Visual Journey */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Your Path to Stability</h2>
            <p className="text-[#000000]/60 text-lg font-light">Three simple steps to transform your spiritual life</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathway.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.1)}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#000000] mb-1">{item.title}</h3>
                  <p className="text-[#ff8c42] text-sm font-semibold mb-3">{item.subtitle}</p>
                  <p className="text-[#000000]/70 text-base font-light">{item.description}</p>
                </div>
                {i < pathway.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#ff8c42] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-DAY RESET SECTION */}
      <section className="py-20 md:py-28 bg-[#f5f1e8]">
        <div className="container max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Start Here: 7-Day Spiritual Reset</h2>
            <p className="text-[#000000]/70 text-lg leading-relaxed font-light">
              A simple, guided reset to help you regain clarity, calm your mind, and rebuild consistency with God in just a few minutes each day.
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpDelay(0.1)}
            onSubmit={handleResetSignup}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[#000000]/60 text-sm font-semibold block mb-2">Your Email</label>
                <Input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="border-gray-300 text-[#000000] placeholder:text-[#000000]/30 h-11 text-base rounded-sm"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={subscribing}
              className="w-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 rounded-sm"
            >
              {subscribing ? "Sending..." : "Get Free Reset"}
            </Button>
            <p className="text-[#000000]/50 text-xs text-center mt-4">We'll send the PDF directly to your email. No spam, ever.</p>
          </motion.form>
        </div>
      </section>

      {/* STRUCTURED WALK SYSTEM SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Build a Consistent Walk With God</h2>
            <p className="text-[#000000]/70 text-lg leading-relaxed font-light">
              This is a guided audio-based system that helps you move from inconsistency and emotional faith into a structured, stable, and practical daily walk with God.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpDelay(0.1)}
            className="bg-[#f5f1e8] rounded-lg p-8 md:p-12 mb-12"
          >
            <h3 className="text-2xl font-bold text-[#000000] mb-6">What You Get</h3>
            <div className="space-y-4">
              {[
                "Weekly audio teachings (5–10 minutes)",
                "Simple daily guidance",
                "Practical life application (decisions, stress, discipline)",
                "A clear structure to stay consistent",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(0.1 + i * 0.05)}
                  className="flex items-start gap-3"
                >
                  <Zap className="h-5 w-5 text-[#ff8c42] flex-shrink-0 mt-0.5" />
                  <p className="text-[#000000] text-base font-light">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpDelay(0.2)}
            className="text-center"
          >
            <Button
              onClick={handleSystemSignup}
              className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 px-12 rounded-sm gap-2"
            >
              Join Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-[#000000]/50 text-sm mt-4">Secure payment via Paystack. Access via WhatsApp.</p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 md:py-28 bg-[#f5f1e8]">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">How It Works</h2>
            <p className="text-[#000000]/60 text-lg font-light">Simple steps to get started</p>
          </motion.div>

          <div className="space-y-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.08)}
                className="flex items-center gap-4 bg-white p-6 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-[#000000] text-lg font-light">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Mission Focused */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">Why This Exists</h2>
            <p className="text-[#000000]/70 text-lg leading-relaxed font-light">
              This was created to solve a real problem: many believers love God but feel stuck, inconsistent, or overwhelmed. This system brings clarity, structure, and stability into everyday faith.
            </p>
            <p className="text-[#000000]/60 text-base leading-relaxed font-light mt-6">
              Your spiritual life doesn't have to feel like an endless cycle of starting over. It can be simple, steady, and sustainable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-[#6b2d9e] to-[#ff8c42]">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto text-center">
            <Heart className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Stop Restarting Your Spiritual Life.</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-10 font-light">Start building something stable.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleResetSignup}
                className="bg-white hover:bg-white/90 text-[#000000] font-semibold text-base h-12 px-8 rounded-sm"
              >
                Start 7-Day Reset
              </Button>
              <Button
                onClick={handleSystemSignup}
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold text-base h-12 px-8 rounded-sm"
              >
                Join Structured Walk System
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
