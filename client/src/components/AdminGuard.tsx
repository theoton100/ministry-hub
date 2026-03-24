import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { lazy, Suspense } from "react";

const Admin = lazy(() => import("@/pages/Admin"));

export default function AdminGuard() {
  const [, navigate] = useLocation();
  const { data, isLoading } = trpc.adminAuth.check.useQuery();

  useEffect(() => {
    if (!isLoading && data && !data.authenticated) {
      window.location.href = "/admin/login";
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    );
  }

  if (!data?.authenticated) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="text-white/40 text-sm">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
          <div className="text-white/40 text-sm">Loading dashboard...</div>
        </div>
      }
    >
      <Admin />
    </Suspense>
  );
}
