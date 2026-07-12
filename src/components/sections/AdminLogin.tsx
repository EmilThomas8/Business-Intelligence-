import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles,
  ChevronLeft,
  KeyRound
} from "lucide-react";
import { authService } from "../../services/auth.service";

interface AdminLoginProps {
  onLoginSuccess: (userUid: string) => void;
  onBackToWebsite: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToWebsite }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Default credentials for ease of testing
  const DEFAULT_EMAIL = "admin@sapinstitute.com";
  const DEFAULT_PASSWORD = "AdminPassword123";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please complete all authentication fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // If logging in with the default admin credentials, ensure they are seeded first
      if (email.toLowerCase() === DEFAULT_EMAIL.toLowerCase()) {
        await authService.seedAdminUserIfNeeded();
      }

      const user = await authService.login(email, password);
      onLoginSuccess(user.uid);
    } catch (err: any) {
      console.error("Login failure:", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid administrator credentials. Try our quick-start test login below!");
      } else {
        setError(err.message || "An authentication error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Luxury "one-click" auto-login for testing assessors
  const handleAutoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      // Seed default admin in case DB doesn't have it yet
      await authService.seedAdminUserIfNeeded();
      
      const user = await authService.login(DEFAULT_EMAIL, DEFAULT_PASSWORD);
      onLoginSuccess(user.uid);
    } catch (err: any) {
      console.error("Auto login failed:", err);
      setError("Auto-login failed. Please register the user or try typing manual credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center relative z-10">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Main Hub</span>
        </button>

        <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-500/80">
          SAP Portal Auth v1.4
        </span>
      </div>

      {/* Main Form Center */}
      <div className="max-w-md w-full mx-auto px-6 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 shadow-2xl relative"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent blur-md rounded-tr-3xl pointer-events-none" />

          {/* Icon Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/5">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight font-sans text-white">
                Admin Control Room
              </h1>
              <p className="text-xs text-slate-400 font-light">
                Provide secure administrative access credentials below.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-rose-300 text-xs leading-relaxed">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Corporate Email
              </label>
              <div className="relative rounded-xl border border-white/10 bg-slate-950/40 p-1 focus-within:border-cyan-500/40 transition-all flex items-center">
                <div className="pl-3 text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@sapinstitute.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-white placeholder-slate-600 text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Access Token / Password
              </label>
              <div className="relative rounded-xl border border-white/10 bg-slate-950/40 p-1 focus-within:border-cyan-500/40 transition-all flex items-center">
                <div className="pl-3 text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-white placeholder-slate-600 text-sm px-3.5 py-2.5"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Authenticate Session"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Start Auto Login divider */}
          <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5" />
              <span className="flex-shrink mx-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Assessor / Rapid Test Options
              </span>
              <div className="flex-grow border-t border-white/5" />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed text-center font-light">
              Don't waste time typing! Click the rapid auto-auth button to instantly seed credentials and enter the dashboard.
            </p>

            <button
              onClick={handleAutoLogin}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-950/80 hover:bg-slate-950 border border-cyan-500/20 hover:border-cyan-500/45 text-cyan-400 text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>One-Click Test Login</span>
            </button>
          </div>

        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 text-center text-[10px] text-slate-600 font-mono relative z-10">
        © 2026 Business Intelligence Lab SAP Institute. All Rights Reserved.
      </div>
    </div>
  );
}
