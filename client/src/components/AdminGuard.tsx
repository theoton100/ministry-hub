import { useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [, navigate] = useLocation();
  const { data, isLoading } = trpc.adminAuth.check.useQuery();

  useEffect(() => {
    if (!isLoading && data && !data.authenticated) {
      navigate("/admin/login", { replace: true });
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#201c1d] flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    );
  }

  if (!data?.authenticated) {
    return null;
  }

  return <>{children}</>;
}
