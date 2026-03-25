import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export default function PaymentVerify() {
  const search = useSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const reference = params.get("reference") || params.get("trxref") || "";

  const { data, isLoading } = trpc.payment.verifyPayment.useQuery(
    { reference },
    { enabled: !!reference, retry: false }
  );

  return (
    <PublicLayout>
      <section className="py-20">
        <div className="container max-w-lg text-center">
          {!reference ? (
            <div>
              <h1 className="text-3xl font-extrabold text-black mb-4">No Payment Reference</h1>
              <p className="text-black/40 text-sm mb-8">
                It looks like you arrived here without a valid payment reference.
              </p>
              <Link href="/">
                <Button className="bg-brand hover:bg-brand-hover text-black font-bold text-sm h-10 px-6 rounded-sm">
                  Return Home
                </Button>
              </Link>
            </div>
          ) : isLoading ? (
            <div>
              <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h1 className="text-2xl font-extrabold text-black mb-2">Verifying Payment</h1>
              <p className="text-black/40 text-sm">Please wait while we confirm your transaction...</p>
            </div>
          ) : data?.verified ? (
            <div>
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-black mb-3">Thank You!</h1>
              <p className="text-black/50 text-sm mb-2">
                Your payment was successful. God bless you for your generosity.
              </p>
              <p className="text-black/30 text-xs mb-6">
                Reference: {reference}
              </p>

              {/* Download section for book purchases */}
              {data.bookId && (
                <DownloadSection bookId={data.bookId} reference={reference} />
              )}

              <div className="flex gap-3 justify-center mt-6">
                <Link href="/">
                  <Button className="bg-brand hover:bg-brand-hover text-black font-bold text-sm h-10 px-6 rounded-sm">
                    Return Home
                  </Button>
                </Link>
                <Link href="/store">
                  <Button className="bg-brand hover:bg-brand-hover text-white font-bold text-sm h-10 px-6 rounded-sm">
                    Browse More Books
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-black mb-3">Payment Not Completed</h1>
              <p className="text-black/50 text-sm mb-8">
                {data?.message || "The payment could not be verified. If you were charged, please contact us."}
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/">
                  <Button className="bg-brand hover:bg-brand-hover text-black font-bold text-sm h-10 px-6 rounded-sm">
                    Return Home
                  </Button>
                </Link>
                <Link href="/give">
                  <Button className="bg-brand hover:bg-brand-hover text-white font-bold text-sm h-10 px-6 rounded-sm">
                    Try Again
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

function DownloadSection({ bookId, reference }: { bookId: number; reference: string }) {
  const [downloading, setDownloading] = useState(false);

  const { data: downloadData, isLoading: loadingUrl } = trpc.book.getDownloadUrl.useQuery(
    { bookId, reference },
    { retry: false }
  );

  const handleDownload = () => {
    if (!downloadData?.downloadUrl) return;
    setDownloading(true);
    // Open the download URL
    const a = document.createElement("a");
    a.href = downloadData.downloadUrl;
    a.download = downloadData.fileName || "book.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Download started!");
    setTimeout(() => setDownloading(false), 2000);
  };

  if (loadingUrl) {
    return (
      <div className="bg-white/5 border border-black/10 rounded p-5 mb-2">
        <Loader2 className="h-5 w-5 animate-spin text-brand mx-auto mb-2" />
        <p className="text-black/40 text-sm">Preparing your download...</p>
      </div>
    );
  }

  if (!downloadData?.downloadUrl) {
    return null;
  }

  return (
    <div className="bg-white/5 border border-brand/30 rounded p-5 mb-2">
      <Download className="h-8 w-8 text-brand mx-auto mb-3" />
      <h3 className="text-black font-bold text-lg mb-1">Your Book is Ready</h3>
      <p className="text-black/40 text-sm mb-4">
        Click the button below to download your PDF.
      </p>
      <Button
        onClick={handleDownload}
        disabled={downloading}
        className="bg-brand hover:bg-brand-hover text-black font-bold text-sm h-11 px-8 rounded-sm gap-2"
      >
        {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {downloading ? "Downloading..." : `Download ${downloadData.fileName || "PDF"}`}
      </Button>
    </div>
  );
}
