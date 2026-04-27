import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Zap, Heart } from "lucide-react";

export default function Home() {
  const [resetEmail, setResetEmail] = useState("");
  const [systemEmail, setSystemEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const resetFormRef = useRef<HTMLDivElement>(null);

  const [, setLocation] = useLocation();

  // Mailchimp subscription for 7-Day Reset
  const resetSubscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setResetEmail("");
      toast.success("Redirecting to your 7-Day Reset...");
      // Redirect to download page after successful signup
      setTimeout(() => setLocation("/reset-download"), 500);
    },
    onError: (err) => toast.error(err.message || "Something went wrong."),
  });

  const handleResetSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setSubscribing(true);
    resetSubscribe.mutate({ email: resetEmail });
    // Note: setSubscribing(false) will be called after redirect
  };

  const handleHeroResetClick = () => {
    // Scroll to the 7-Day Reset form
    resetFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSystemSignup = () => {
    // This will redirect to Paystack checkout
    setLocation("/checkout/structured-walk");
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
      color: "from-orange-400 to-orange-500",
    },
    {
      step: "2",
      title: "Structure",
      subtitle: "Consistency",
      description: "Join the Structured Walk System",
      color: "from-cyan-400 to-cyan-500",
    },
    {
      step: "3",
      title: "Stability",
      subtitle: "Maturity",
      description: "Grow into a steady, grounded life with God",
      color: "from-blue-400 to-blue-500",
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
      {/* HERO SECTION - Light Mode with Yellow Gradient */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight text-gray-900 mb-6">
              Faith Was Never Meant to Feel Confusing.
            </motion.h1>
            <motion.p variants={fadeUpDelay(0.1)} className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 font-light max-w-2xl mx-auto">
              If your spiritual life feels inconsistent, overwhelming, or like you're always restarting… there is a simpler, more stable way to walk with God.
            </motion.p>
            <motion.div variants={fadeUpDelay(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleHeroResetClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-11 px-8 rounded-sm gap-2"
              >
                Start 7-Day Reset
              </Button>
              <Button
                onClick={handleSystemSignup}
                className="border-2 border-gray-900 text-gray-900 bg-transparent hover:bg-gray-100 font-semibold text-sm h-11 px-8 rounded-sm gap-2"
              >
                Join Structured Walk System
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION - Light Background */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">If this feels familiar…</h2>
            <p className="text-gray-600 text-base font-light">Many believers experience the same struggles. You're not alone.</p>
          </motion.div>

          <div className="space-y-4">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.08)}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-900 text-base font-light">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION - Light Gray Background */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">You don't need more pressure. You need structure.</h2>
            <p className="text-gray-600 text-base leading-relaxed font-light">
              This platform is designed to guide you step-by-step into a clear, consistent, and peaceful walk with God—without overwhelm or confusion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PATHWAY SECTION - Colorful Cards (Orange, Cyan, Blue) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Path to Stability</h2>
            <p className="text-gray-600 text-base font-light">Three simple steps to transform your spiritual life</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathway.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.1)}
                className={`bg-gradient-to-br ${item.color} rounded-lg p-8 text-white text-center shadow-lg`}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-white/90 text-sm font-semibold mb-3">{item.subtitle}</p>
                <p className="text-white/80 text-sm font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-DAY RESET SECTION */}
      <section ref={resetFormRef} className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Start Here: 7-Day Spiritual Reset</h2>
            <p className="text-gray-600 text-base leading-relaxed font-light">
              A simple, guided reset to help you regain clarity, calm your mind, and rebuild consistency with God in just a few minutes each day.
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpDelay(0.1)}
            onSubmit={handleResetSignup}
            className="bg-white rounded-lg p-8 shadow-lg border border-gray-200"
          >
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-2">Your Email</label>
                <Input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 text-sm rounded-sm"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={subscribing}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-11 rounded-sm"
            >
              {subscribing ? "Sending..." : "Get Free Reset"}
            </Button>
            <p className="text-gray-500 text-xs text-center mt-4">We'll send the PDF directly to your email. No spam, ever.</p>
          </motion.form>
        </div>
      </section>

      {/* STRUCTURED WALK SYSTEM SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Build a Consistent Walk With God</h2>
            <p className="text-gray-600 text-base leading-relaxed font-light">
              This is a guided audio-based system that helps you move from inconsistency and emotional faith into a structured, stable, and practical daily walk with God.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpDelay(0.1)}
            className="bg-gray-50 rounded-lg p-8 md:p-12 mb-12 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">What You Get</h3>
            <div className="space-y-4">
              {[
                "Weekly audio teachings (5–10 minutes)",
                "Simple daily action steps",
                "WhatsApp community access",
                "Lifetime access to all materials",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
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
            <p className="text-gray-600 text-base font-light mb-6">
              <strong className="text-gray-900">Investment: ₵30</strong> — A one-time payment for lifetime access
            </p>
            <Button
              onClick={handleSystemSignup}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-11 px-8 rounded-sm gap-2"
            >
              Join Now <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-base font-light">Simple steps to get started</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(i * 0.1)}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About This Platform</h2>
            <p className="text-gray-600 text-base leading-relaxed font-light mb-6">
              This platform was created to help believers move from confusion and inconsistency into a structured, stable, and peaceful walk with God. 
              Whether you're struggling with doubt, overwhelm, or inconsistency, there's a path forward.
            </p>
            <p className="text-gray-600 text-base leading-relaxed font-light">
              Start with the free 7-Day Reset to experience clarity, then join the Structured Walk System to build lasting stability in your faith journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="container max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stop Restarting Your Spiritual Life</h2>
            <p className="text-gray-800 text-base leading-relaxed font-light mb-8">
              Choose clarity. Choose consistency. Choose a stable walk with God.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleHeroResetClick}
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-sm h-11 px-8 rounded-sm"
              >
                Start Free Reset
              </Button>
              <Button
                onClick={handleSystemSignup}
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold text-sm h-11 px-8 rounded-sm"
              >
                Join System
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
