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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#201c1d' }}>
      <Card className="w-full max-w-sm border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <img src={LOGO_DARK} alt={MINISTRY_NAME} className="w-10 h-16 object-contain" />
          </div>
          <CardTitle className="text-white text-lg font-bold tracking-tight">
            Admin Sign In
          </CardTitle>
          <p className="text-white/40 text-xs">
            {MINISTRY_NAME} Ministry Dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/60 text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="border-white/10 text-white placeholder:text-white/20 h-10" style={{ backgroundColor: 'rgba(32, 28, 29, 0.5)' }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/60 text-xs">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="border-white/10 text-white placeholder:text-white/20 h-10" style={{ backgroundColor: 'rgba(32, 28, 29, 0.5)' }}
              />
            </div>
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-brand hover:bg-brand-hover text-white font-bold h-10"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
