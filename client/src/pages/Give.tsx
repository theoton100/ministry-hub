import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, CheckCircle } from "lucide-react";

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
    <div style={{ backgroundColor: '#201c1d', minHeight: '100vh' }}>
      <PublicLayout>
        {/* Page Header */}
        <section className="pt-10 pb-6 border-b border-white/10">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p variants={fadeUp} className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Support the Mission
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                Give
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/40 text-sm">
                Your generosity fuels the mission. Every gift makes a difference.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl">
              {/* Left: Impact + Scripture */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="lg:col-span-2 space-y-6"
              >
                {/* Scripture */}
                <div className="border border-brand/20 rounded p-6 bg-brand/5">
                  <Heart className="h-6 w-6 text-brand mb-3" />
                  <blockquote className="text-white/70 text-sm italic leading-relaxed mb-3">
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                  </blockquote>
                  <p className="text-brand font-bold text-xs">— 2 Corinthians 9:7</p>
                </div>

                {/* Impact */}
                <div className="border border-white/10 rounded p-6">
                  <h3 className="text-white font-bold text-sm mb-4">Your Gift Makes an Impact</h3>
                  <div className="space-y-3">
                    {impactItems.map((item) => (
                      <div key={item.amount} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                          <span className="text-brand font-bold text-sm">{item.amount}</span>
                          <span className="text-white/50 text-sm"> — {item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right: Donation Form */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpDelay(0.1)}
                className="lg:col-span-3"
              >
                <form onSubmit={handleDonate} className="space-y-6 border border-white/10 rounded p-6 md:p-8">
                  {/* Preset Amounts */}
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-3 uppercase tracking-wider">
                      Select an Amount
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {PRESET_AMOUNTS.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handlePresetClick(amount)}
                          className={`h-12 rounded-sm text-sm font-bold transition-all ${
                            selectedAmount === amount
                              ? "bg-brand text-[#231f20] shadow-lg scale-105"
                              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                          }`}
                        >
                          {formatPrice(amount)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="text-white/60 text-xs font-semibold block mb-1.5 uppercase tracking-wider">
                      Or Enter a Custom Amount (₵)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">₵</span>
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmount}
                        onChange={(e) => handleCustomChange(e.target.value)}
                        placeholder="0.00"
                        className="border-white/15 text-white placeholder:text-white/30 h-11 text-sm rounded-sm pl-7"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <label className="text-white/60 text-xs font-semibold block uppercase tracking-wider">
                      Your Details
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name (optional)"
                      className="border-white/15 text-white placeholder:text-white/30 h-11 text-sm rounded-sm"
                    />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address *"
                      className="border-white/15 text-white placeholder:text-white/30 h-11 text-sm rounded-sm"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <Button
                      type="submit"
                      disabled={donating || displayAmount < 100 || !email}
                      className="w-full bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-12 rounded-sm gap-2"
                    >
                      <Heart className="h-4 w-4 fill-[#231f20]" />
                      {donating
                        ? "Redirecting to payment..."
                        : displayAmount >= 100
                          ? `Give ${formatPrice(displayAmount)}`
                          : "Select an amount to continue"}
                    </Button>
                    <p className="text-white/25 text-xs text-center mt-3">
                      Secure payment powered by Paystack.
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
