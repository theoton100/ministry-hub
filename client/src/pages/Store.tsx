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
    <PublicLayout>
      {/* PAGE HEADER */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Books & Store</h1>
            <p className="text-gray-600 text-base max-w-2xl">Browse through our collection of books, resources, and digital products to deepen your faith journey.</p>
          </motion.div>
        </div>
      </section>

      {/* BOOKS GRID SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Books</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">Browse through our product catalog</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(i * 0.08)}
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
                    {book.coverImageUrl ? (
                      <div className="aspect-[3/4] bg-gray-900 overflow-hidden relative">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {book.pdfFileKey && (
                          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded">
                            Digital Download
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-[3/4] bg-gray-900 flex items-center justify-center relative">
                        <span className="text-gray-700 text-6xl font-extrabold">{book.title[0]}</span>
                        {book.pdfFileKey && (
                          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded">
                            Digital Download
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
                      {book.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 font-light">{book.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-bold text-lg">{formatPrice(book.priceInCents)}</span>
                        <Button
                          onClick={() => setSelectedBook(book)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm h-9 px-4 rounded-sm gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Books Coming Soon</h2>
              <p className="text-gray-600 text-sm">
                New books and resources will be available here. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={(open) => { if (!open) { setSelectedBook(null); setBuying(false); } }}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-lg font-bold">Purchase & Download</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              {selectedBook?.title} — {selectedBook ? formatPrice(selectedBook.priceInCents) : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="border border-gray-200 rounded p-3 flex items-start gap-3 mt-1">
            <Download className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-900 text-sm font-medium">Digital Download</p>
              <p className="text-gray-600 text-xs mt-0.5">
                After payment, you will be redirected to a page where you can download the PDF instantly.
              </p>
            </div>
          </div>

          <form onSubmit={handlePurchase} className="space-y-4 mt-2">
            <div>
              <label className="text-gray-700 text-xs font-semibold block mb-1.5">Your Name (optional)</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-10 text-sm rounded-sm"
              />
            </div>
            <div>
              <label className="text-gray-700 text-xs font-semibold block mb-1.5">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-10 text-sm rounded-sm"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={buying || !email}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm h-10 rounded-sm"
            >
              {buying ? "Redirecting to payment..." : `Pay ${selectedBook ? formatPrice(selectedBook.priceInCents) : ""} & Download`}
            </Button>
            <p className="text-gray-500 text-xs text-center">
              Secure payment powered by Paystack. You will receive the download link immediately after payment.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
