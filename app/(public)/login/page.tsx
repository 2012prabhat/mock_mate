"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setErrorMsg(data.error || "Invalid email or password");
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 w-full bg-white/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">Mock Mate</span>
        </Link>
        <div className="hidden md:flex gap-4 items-center">
          <span className="text-on-surface-variant text-sm">New to Mock Mate?</span>
          <Link href="/signup">
            <button className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer">
              Join Now
            </button>
          </Link>
        </div>
      </header>

      {/* Main Grid content */}
      <main className="flex-grow flex items-center justify-center w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-8 pb-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl min-h-[680px] border border-outline-variant/30">
          {/* Left Side: Branding & Testimonial */}
          <div className="relative hidden md:flex flex-col justify-between p-12 bg-primary-container text-white">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                <defs>
                  <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%"></rect>
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-8">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider">Trusted by 50k+ Professionals</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">Master your next high-stakes interview.</h1>
              <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-[480px]">
                Our AI-driven simulation platform provides real-time feedback on your tone, confidence, and technical accuracy.
              </p>
            </div>

            <div className="relative z-10 bg-slate-950/40 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div className="flex gap-1 mb-3 text-secondary text-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <blockquote className="text-sm italic text-slate-200 mb-4 leading-relaxed">
                &quot;The real-time sentiment analysis completely changed how I present myself. I landed my Senior Product Role at a Tier-1 tech firm within two weeks of using Mock Mate.&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                {/* Simulated Sarah Jenkins Avatar */}
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white border border-white/20">
                  SJ
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Sarah Jenkins</p>
                  <p className="text-[10px] text-slate-400">Senior Product Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 bg-surface-container-lowest">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant text-sm">Sign in to continue your preparation journey.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="bg-error/10 border border-error/30 text-error px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-on-surface-variant" htmlFor="email">Professional Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </span>
                  <input
                    className="block w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all duration-200 text-sm text-on-surface placeholder:text-outline-variant/60"
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                  <a className="text-[11px] font-medium text-secondary hover:underline underline-offset-4" href="#">Forgot Password?</a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                    <span className="material-symbols-outlined text-lg">lock</span>
                  </span>
                  <input
                    className="block w-full pl-10 pr-10 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all duration-200 text-sm text-on-surface placeholder:text-outline-variant/60"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label className="ml-2 text-xs text-on-surface-variant cursor-pointer" htmlFor="remember">Keep me logged in for 30 days</label>
              </div>

              <button
                className="w-full bg-primary text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-primary/95 transition-all duration-200 shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    Login to Dashboard
                    <span className="material-symbols-outlined text-lg">login</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-outline-variant/30"></span>
              </div>
              <div className="relative flex justify-center text-xs font-semibold uppercase">
                <span className="bg-surface-container-lowest px-3 text-outline/80">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2.5 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-200 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-xs font-semibold text-on-surface">Google</span>
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2.5 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-200 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
                <span className="text-xs font-semibold text-on-surface">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-10 py-6 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-base font-bold text-primary">Mock Mate</span>
            <span className="text-on-surface-variant/80 text-xs hidden lg:block">© 2024 Mock Mate AI. Elevating career potential through intelligent practice.</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-on-surface-variant/80">
            <a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">About Us</a>
            <a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Privacy Policy</a>
            <a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Terms of Service</a>
            <a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Help Center</a>
            <a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Login;