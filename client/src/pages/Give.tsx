import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000]; // in cents

function formatPrice(cents: number) {
  return `₵${(cents / 100).toFixed(2)}`;
}

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
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Give</h1>
            <p className="text-white/40 text-sm">Your generosity fuels the mission. Every gift makes a difference.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            {/* Scripture */}
            <div className="mb-8 p-6 bg-card border border-white/10 rounded">
              <blockquote className="text-white/70 text-sm italic leading-relaxed">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </blockquote>
              <p className="text-brand font-bold text-xs mt-3">2 Corinthians 9:7</p>
            </div>
          </motion.div>

          <form onSubmit={handleDonate} className="space-y-6">
            {/* Preset Amounts */}
            <motion.div initial="hidden" animate="visible" variants={fadeUpDelay(0.1)}>
              <label className="text-white/60 text-xs font-semibold block mb-3">Select an Amount</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePresetClick(amount)}
                    className={`h-12 rounded-sm text-sm font-bold transition-all ${
                      selectedAmount === amount
                        ? "bg-brand text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    {formatPrice(amount)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Custom Amount */}
            <motion.div initial="hidden" animate="visible" variants={fadeUpDelay(0.15)}>
              <label className="text-white/60 text-xs font-semibold block mb-1.5">Or Enter a Custom Amount (₵)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">₵</span>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  placeholder="0.00"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 h-11 text-sm rounded-sm pl-7"
                />
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial="hidden" animate="visible" variants={fadeUpDelay(0.2)} className="space-y-3">
              <div>
                <label className="text-white/60 text-xs font-semibold block mb-1.5">Your Name (optional)</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 h-10 text-sm rounded-sm"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs font-semibold block mb-1.5">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 h-10 text-sm rounded-sm"
                  required
                />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div initial="hidden" animate="visible" variants={fadeUpDelay(0.25)}>
              <Button
                type="submit"
                disabled={donating || displayAmount < 100 || !email}
                className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm h-12 rounded-sm"
              >
                {donating
                  ? "Redirecting to payment..."
                  : displayAmount >= 100
                    ? `Give ${formatPrice(displayAmount)}`
                    : "Select an amount"}
              </Button>
              <p className="text-white/30 text-xs text-center mt-3">
                Secure payment powered by Paystack. All donations are in USD.
              </p>
            </motion.div>
          </form>
        </div>
      </section>
    </PublicLayout>
    </div>
  );
}
