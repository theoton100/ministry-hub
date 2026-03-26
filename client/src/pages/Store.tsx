import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download } from "lucide-react";

function formatPrice(cents: number) {
  return `₵${(cents / 100).toFixed(2)}`;
}

export default function Store() {
  const { data: books = [], isLoading } = trpc.book.listPublished.useQuery();
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [buying, setBuying] = useState(false);

  const purchaseMutation = trpc.payment.initializeBookPurchase.useMutation({
    onSuccess: (data) => {
      window.location.href = data.authorizationUrl;
    },
    onError: (err) => {
      setBuying(false);
      toast.error(err.message || "Payment failed. Please try again.");
    },
  });

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook || !email) return;
    setBuying(true);
    purchaseMutation.mutate({
      email,
      bookId: selectedBook.id,
      customerName: name || undefined,
      callbackUrl: `${window.location.origin}/payment/verify`,
    });
  };

  return (
    <div style={{ backgroundColor: '#201c1d', minHeight: '100vh' }}>
      <PublicLayout>
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Books</h1>
            <p className="text-white/40 text-sm">Digital resources to strengthen your faith. Pay once, download instantly.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(i * 0.08)}
                >
                  <div className="bg-card border border-white/10 rounded overflow-hidden group">
                    {book.coverImageUrl ? (
                      <div className="aspect-[3/4] bg-white/5 overflow-hidden relative">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {book.pdfFileKey && (
                          <div className="absolute top-3 right-3 bg-#201c1d/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5">
                            <Download className="h-3 w-3" />
                            Digital Download
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-[3/4] bg-white/5 flex items-center justify-center relative">
                        <span className="text-white/20 text-6xl font-extrabold">{book.title[0]}</span>
                        {book.pdfFileKey && (
                          <div className="absolute top-3 right-3 bg-#201c1d/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5">
                            <Download className="h-3 w-3" />
                            Digital Download
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{book.title}</h3>
                      {book.description && (
                        <p className="text-white/40 text-sm line-clamp-3 mb-4">{book.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-brand font-extrabold text-xl">{formatPrice(book.priceInCents)}</span>
                        <Button
                          onClick={() => setSelectedBook(book)}
                          className="bg-brand hover:bg-brand-hover text-white font-bold text-sm h-9 px-5 rounded-sm gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Buy & Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-bold text-white mb-3">Books Coming Soon</h2>
              <p className="text-white/40 text-sm">
                New books and resources will be available here. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={(open) => { if (!open) { setSelectedBook(null); setBuying(false); } }}>
        <DialogContent className="bg-card border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">Purchase & Download</DialogTitle>
            <DialogDescription className="text-white/40 text-sm">
              {selectedBook?.title} — {selectedBook ? formatPrice(selectedBook.priceInCents) : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-white/5 border border-white/10 rounded p-3 flex items-start gap-3 mt-1">
            <Download className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-white/80 text-sm font-medium">Digital Download</p>
              <p className="text-white/40 text-xs mt-0.5">
                After payment, you will be redirected to a page where you can download the PDF instantly.
              </p>
            </div>
          </div>

          <form onSubmit={handlePurchase} className="space-y-4 mt-2">
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
            <Button
              type="submit"
              disabled={buying || !email}
              className="w-full bg-brand hover:bg-brand-hover text-white font-bold text-sm h-10 rounded-sm"
            >
              {buying ? "Redirecting to payment..." : `Pay ${selectedBook ? formatPrice(selectedBook.priceInCents) : ""} & Download`}
            </Button>
            <p className="text-white/30 text-xs text-center">
              Secure payment powered by Paystack. You will receive the download link immediately after payment.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </PublicLayout>
    </div>
  );
}
