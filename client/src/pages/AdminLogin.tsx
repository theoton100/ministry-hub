import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MINISTRY_NAME, LOGO_DARK } from "@/lib/constants";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: () => {
      toast.success("Welcome back, Pastor!");
      navigate("/admin");
    },
    onError: (err) => {
      toast.error(err.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-[#111] border-black/10">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <img src={LOGO_DARK} alt={MINISTRY_NAME} className="w-10 h-16 object-contain" />
          </div>
          <CardTitle className="text-black text-lg font-bold tracking-tight">
            Admin Sign In
          </CardTitle>
          <p className="text-black/40 text-xs">
            {MINISTRY_NAME} Ministry Dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black/60 text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-white/50 border-black/10 text-black placeholder:text-black/20 h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black/60 text-xs">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="bg-white/50 border-black/10 text-black placeholder:text-black/20 h-10"
              />
            </div>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-brand hover:bg-brand-hover text-black font-bold h-10"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
