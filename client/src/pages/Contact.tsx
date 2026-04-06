import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sendContact = trpc.contact.sendMessage.useMutation({
    onSuccess: () => {
      toast.success("Message sent! I'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to send message. Please try again.");
      setSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    sendContact.mutate({ name, email, subject, message });
    setTimeout(() => setSubmitting(false), 2000);
  };

  return (
    <PublicLayout>
      <div className="bg-white min-h-screen py-12 md:py-20">
        <div className="container max-w-4xl">
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
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Get in Touch</h1>
            <p className="text-[#000000]/70 text-lg font-light max-w-2xl mx-auto">
              Have questions about the 7-Day Reset or Structured Walk System? Want to collaborate or invite me to speak? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#f5f1e8] rounded-lg p-6"
            >
              <Mail className="h-8 w-8 text-[#ff8c42] mb-4" />
              <h3 className="text-lg font-semibold text-[#000000] mb-2">Email</h3>
              <p className="text-[#000000]/70 text-sm font-light">
                <a href="mailto:info@tisolomon.com" className="hover:text-[#ff8c42] transition">
                  info@tisolomon.com
                </a>
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelay(0.1)}
              className="bg-[#f5f1e8] rounded-lg p-6"
            >
              <Phone className="h-8 w-8 text-[#ff8c42] mb-4" />
              <h3 className="text-lg font-semibold text-[#000000] mb-2">Phone</h3>
              <p className="text-[#000000]/70 text-sm font-light">
                <a href="tel:+233123456789" className="hover:text-[#ff8c42] transition">
                  +233 (0) 123 456 789
                </a>
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelay(0.2)}
              className="bg-[#f5f1e8] rounded-lg p-6"
            >
              <MapPin className="h-8 w-8 text-[#ff8c42] mb-4" />
              <h3 className="text-lg font-semibold text-[#000000] mb-2">Location</h3>
              <p className="text-[#000000]/70 text-sm font-light">Accra, Ghana</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#f5f1e8] rounded-lg p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-[#000000] mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#000000]/60 text-sm font-semibold block mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
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
              </div>

              <div>
                <label className="text-[#000000]/60 text-sm font-semibold block mb-2">Subject</label>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                  className="border-gray-300 text-[#000000] placeholder:text-[#000000]/30 h-11 text-base rounded-sm"
                  required
                />
              </div>

              <div>
                <label className="text-[#000000]/60 text-sm font-semibold block mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  rows={6}
                  className="w-full border border-gray-300 rounded-sm px-4 py-3 text-[#000000] placeholder:text-[#000000]/30 text-base font-light focus:outline-none focus:ring-2 focus:ring-[#ff8c42]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitting || sendContact.isPending}
                className="w-full bg-gradient-to-r from-[#ff8c42] to-[#8b5cf6] hover:from-[#ff7a2a] hover:to-[#7a4cc6] text-white font-semibold text-base h-12 rounded-sm"
              >
                {submitting || sendContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 text-center"
          >
            <p className="text-[#000000]/60 text-sm font-light">
              I typically respond to messages within 24-48 hours. Thank you for reaching out!
            </p>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
