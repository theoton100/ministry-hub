import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#201c1d' }}>
      <div className="text-center px-4">
        <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-white/60 mb-4">Page Not Found</h2>
        <p className="text-white/40 text-sm mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist.<br />
          It may have been moved or deleted.
        </p>
        <Button
          onClick={handleGoHome}
          className="bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-10 px-6 rounded-sm"
        >
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
