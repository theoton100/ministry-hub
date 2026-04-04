import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, CheckCircle, Gift, Users, Zap } from "lucide-react";

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000]; // in cents

function formatPrice(cents: number) {
  return `₵${(cents / 100).toFixed(2)}`;
}

const impactItems = [
  { amount: "₵10", desc: "Helps print a devotional booklet" },
  { amount: "₵25", desc: "Supports one week of online ministry" },
  { amount: "₵50", desc: "Funds a community outreach event" },
  { amount: "₵100+", desc: "Sponsors a full sermon production" },
];

const reasons = [
  {
    icon: Users,
    title: "Reach More Hearts",
    desc: "Your gift helps us extend the Gospel to more people through digital platforms and media.",
  },
  {
    icon: Gift,
    title: "Free Resources",
    desc: "Support the creation of free devotionals, articles, and teaching materials.",
  },
  {
    icon: Zap,
    title: "Community Impact",
    desc: "Enable community outreach events, prayer meetings, and ministry activities.",
  },
];

export default function Give() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(2500);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [donating, setDonating] = useState(false);

  const donateMutation = trpc.payment.initializeDonation.useMutation({
    onSuccess: (data) => {
      window.location.href = data.authorizationUrl;
    },
    onError: (err) => {
      setDonating(false);
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const getAmountInCents = (): number => {
    if (selectedAmount) return selectedAmount;
    const parsed = parseFloat(customAmount);
    if (isNaN(parsed) || parsed < 1) return 0;
    return Math.round(parsed * 100);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountInCents = getAmountInCents();
    if (amountInCents < 100) {
      toast.error("Minimum donation is ₵1.00");
      return;
    }
    if (!email) return;
    setDonating(true);
    donateMutation.mutate({
      email,
      amountInCents,
      customerName: name || undefined,
      callbackUrl: `${window.location.origin}/payment/verify`,
    });
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const displayAmount = getAmountInCents();

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <PublicLayout>
        {/* PAGE HERO */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-[#000000] to-[#6b2d9e]">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.p variants={fadeUp} className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Support the Mission
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Give & Make an Impact
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#f5f1e8]/80 text-lg leading-relaxed max-w-2xl">
                Your generosity fuels our mission to help people move from confusion to clarity through deep intimacy with God. Every gift, big or small, makes an eternal difference.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* WHY GIVE SECTION */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <p className="text-[#000000]/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">Why Give?</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#000000]">Your Gift Matters</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)} className="bg-[#000000] rounded-lg p-8 hover:shadow-xl transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                      <Icon className="h-7 w-7 text-white/60" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {reason.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DONATION SECTION */}
        <section className="py-20 md:py-28 bg-[#000000]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl">
              {/* Left: Scripture + Impact */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2 space-y-6">
                {/* Scripture */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-white/20 transition-colors">
                  <Heart className="h-8 w-8 text-white/60 mb-4" />
                  <blockquote className="text-white/80 text-lg italic leading-relaxed mb-4">
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                  </blockquote>
                  <p className="text-white/60 font-bold text-sm">— 2 Corinthians 9:7</p>
                </div>


              </motion.div>

              {/* Right: Donation Form */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)} className="lg:col-span-3">
                <form onSubmit={handleDonate} className="space-y-8 bg-white/5 border border-white/10 rounded-lg p-8 hover:border-white/20 transition-colors">
                  {/* Preset Amounts */}
                  <div>
                    <label className="text-white/70 text-xs font-bold block mb-4 uppercase tracking-wider">
                      Select an Amount
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {PRESET_AMOUNTS.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handlePresetClick(amount)}
                          className={`h-12 rounded-sm text-sm font-bold transition-all duration-300 ${
                            selectedAmount === amount
                              ? "bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] text-white shadow-lg scale-105"
                              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 hover:border-[#ff8c42]/50"
                          }`}
                        >
                          {formatPrice(amount)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="text-white/70 text-xs font-bold block mb-2 uppercase tracking-wider">
                      Or Enter a Custom Amount (₵)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-base font-bold">₵</span>
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmount}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        placeholder="0.00"
                        className="border-white/15 bg-white/5 text-white placeholder:text-white/40 h-12 text-base rounded-sm pl-8"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <label className="text-white/70 text-xs font-bold block uppercase tracking-wider">
                      Your Details
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name (optional)"
                      className="border-white/15 bg-white/5 text-white placeholder:text-white/40 h-12 text-base rounded-sm"
                    />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address *"
                      className="border-white/15 bg-white/5 text-white placeholder:text-white/40 h-12 text-base rounded-sm"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <Button
                      type="submit"
                      disabled={donating || displayAmount < 100 || !email}
                      className="w-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-bold text-base h-12 rounded-sm gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Heart className="h-5 w-5 fill-white" />
                      {donating
                        ? "Redirecting to payment..."
                        : displayAmount >= 100
                          ? `Give ${formatPrice(displayAmount)}`
                          : "Select an amount to continue"}
                    </Button>
                    <p className="text-white/40 text-xs text-center mt-4">
                      Secure payment powered by Paystack. Your donation helps us reach more hearts with the Gospel.
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </div>
  );
}
