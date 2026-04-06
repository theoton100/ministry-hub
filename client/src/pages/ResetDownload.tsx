import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Download, ArrowLeft, CheckCircle2 } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

export default function ResetDownload() {
  const pdfUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463671851/gZ92zyhVJEHyGACHaMfmui/7_Day_Spiritual_Reset_TISolomon_16b8053e.pdf";

  const handleDownload = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <PublicLayout>
      {/* CONFIRMATION SECTION */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#201c1d] to-[#000000] min-h-screen flex items-center">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8 flex justify-center"
            >
              <div className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] p-4 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              You're In! 🙏
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed"
            >
              Welcome to your 7-Day Spiritual Reset. This guide is designed to help you find clarity, consistency, and peace in your walk with God.
            </motion.p>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 px-8 rounded-sm gap-2 inline-flex items-center"
              >
                <Download className="w-5 h-5" />
                Download Your 7-Day Reset PDF
              </Button>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-lg p-8 mb-12"
            >
              <h3 className="text-white font-semibold text-lg mb-4">What's Inside:</h3>
              <ul className="text-white/70 text-sm space-y-3 text-left max-w-md mx-auto">
                <li className="flex gap-3">
                  <span className="text-[#ff8c42] font-bold">•</span>
                  <span>7 daily teachings on clarity, consistency, and peace</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff8c42] font-bold">•</span>
                  <span>Scripture verses and reflection questions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff8c42] font-bold">•</span>
                  <span>Practical action steps (10-15 minutes per day)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff8c42] font-bold">•</span>
                  <span>Introduction to the Structured Walk System</span>
                </li>
              </ul>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-[#ff8c42]/10 to-[#8b5cf6]/10 border border-[#ff8c42]/20 rounded-lg p-8 mb-12"
            >
              <h3 className="text-white font-semibold text-lg mb-4">After Your 7-Day Reset:</h3>
              <p className="text-white/70 text-sm mb-6">
                You'll be ready for the next phase: the <strong>Structured Walk System</strong>. This guided audio program provides weekly teachings, daily WhatsApp guidance, and lifetime access to all materials.
              </p>
              <Link href="/checkout/structured-walk">
                <Button className="bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 px-8 rounded-sm">
                  Learn About Structured Walk System
                </Button>
              </Link>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/">
                <Button variant="ghost" className="text-white/70 hover:text-white gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
