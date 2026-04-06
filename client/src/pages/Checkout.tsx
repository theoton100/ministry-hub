import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Checkout() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  const systemPrice = 3000; // ₵30.00 in cents
  const systemPriceDisplay = "₵30.00";

  const initializePayment = trpc.payment.initializeStructuredWalkPurchase.useMutation({
    onSuccess: (data) => {
      window.location.href = data.authorizationUrl;
    },
    onError: (err) => {
      toast.error(err.message || "Payment initialization failed");
      setProcessing(false);
    },
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !whatsappNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    setProcessing(true);
    initializePayment.mutate({
      email,
      name,
      whatsappNumber,
      callbackUrl: `${window.location.origin}/payment/verify`,
    });
  };

  const features = [
    "Weekly audio teachings (5–10 minutes)",
    "Simple daily guidance via WhatsApp",
    "Practical life application",
    "Clear structure to stay consistent",
    "Lifetime access to all materials",
  ];

  return (
    <PublicLayout>
      <div className="bg-white min-h-screen py-12 md:py-20">
        <div className="container max-w-2xl">
          {/* Back Button */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
            <Link href="/">
              <button className="flex items-center gap-2 text-[#000000]/60 hover:text-[#000000] font-light text-sm">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Structured Walk System</h1>
            <p className="text-[#000000]/70 text-lg font-light">
              Join the guided audio-based system for a consistent, stable walk with God.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Features */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="bg-[#f5f1e8] rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">What You Get</h2>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUpDelay(i * 0.05)}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#ff8c42] flex-shrink-0 mt-0.5" />
                      <p className="text-[#000000] text-base font-light">{feature}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Price Box */}
                <div className="mt-8 pt-8 border-t border-[#000000]/10">
                  <p className="text-[#000000]/60 text-sm font-semibold uppercase tracking-wider mb-2">One-time payment</p>
                  <p className="text-5xl font-bold text-[#000000]">{systemPriceDisplay}</p>
                  <p className="text-[#000000]/60 text-sm mt-2 font-light">Lifetime access to all materials</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Checkout Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelay(0.1)}
            >
              <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label className="text-[#000000]/60 text-sm font-semibold block mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="border-gray-300 text-[#000000] placeholder:text-[#000000]/30 h-11 text-base rounded-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-[#000000]/60 text-sm font-semibold block mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="border-gray-300 text-[#000000] placeholder:text-[#000000]/30 h-11 text-base rounded-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-[#000000]/60 text-sm font-semibold block mb-2">WhatsApp Number</label>
                  <Input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+233 XX XXX XXXX"
                    className="border-gray-300 text-[#000000] placeholder:text-[#000000]/30 h-11 text-base rounded-sm"
                    required
                  />
                  <p className="text-[#000000]/50 text-xs mt-2 font-light">We'll use this to send you access to the WhatsApp group.</p>
                </div>

                <div className="bg-[#f5f1e8] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-[#ff8c42] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#000000] text-sm font-semibold">What happens next?</p>
                      <p className="text-[#000000]/60 text-xs mt-1 font-light">
                        After payment, you'll receive an email with your WhatsApp group link. Join to start receiving weekly audio teachings.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing || initializePayment.isPending}
                  className="w-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 rounded-sm"
                >
                  {processing || initializePayment.isPending ? "Processing..." : `Pay ${systemPriceDisplay}`}
                </Button>

                <p className="text-[#000000]/40 text-xs text-center">
                  Secure payment powered by Paystack. Your data is encrypted and safe.
                </p>
              </form>
            </motion.div>
          </div>

          {/* FAQ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-20 pt-12 border-t border-gray-200"
          >
            <h3 className="text-2xl font-bold text-[#000000] mb-8 text-center">Common Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#000000] mb-2">How do I access the system?</h4>
                <p className="text-[#000000]/70 text-sm font-light">
                  After payment, you'll receive an email with a WhatsApp group link. Join the group to start receiving weekly audio teachings and daily guidance.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#000000] mb-2">Is this a subscription?</h4>
                <p className="text-[#000000]/70 text-sm font-light">
                  No. It's a one-time payment for lifetime access to all materials. No recurring charges.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#000000] mb-2">Can I get a refund?</h4>
                <p className="text-[#000000]/70 text-sm font-light">
                  Yes. If you're not satisfied within 7 days, contact us for a full refund. No questions asked.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#000000] mb-2">What if I don't have WhatsApp?</h4>
                <p className="text-[#000000]/70 text-sm font-light">
                  WhatsApp is free to download on any smartphone. It's the easiest way to receive daily guidance and connect with the community.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
