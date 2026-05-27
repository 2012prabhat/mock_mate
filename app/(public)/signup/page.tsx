"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setErrorMsg(data.error || "Signup failed");
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex flex-col">
      {/* Main Container */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden min-h-screen">
        {/* Left Side: Visual Branding & Value Prop */}
        <section className="hidden md:flex relative w-1/2 bg-primary-container items-center justify-center p-12 overflow-hidden text-white">
          {/* Backdrop gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-primary to-black opacity-95"></div>
          
          <div className="relative z-10 max-w-lg space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 text-primary-fixed-dim">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/20">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Mock Mate</span>
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Elevate your potential with intelligent practice.
            </h1>
            
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-md">
              Join a community of career-driven professionals using AI-powered insights to master their next big opportunity.
            </p>

            {/* Simulated Live Analytics glass card */}
            <div className="glass-card rounded-xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-lg">query_stats</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Real-time Analysis</p>
                  <p className="text-[10px] text-on-surface-variant">&quot;Your confidence score increased by 14%&quot;</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-3/4"></div>
                </div>
                <div className="flex justify-between text-[10px] font-semibold text-on-surface-variant">
                  <span>Tone Balance</span>
                  <span>Professional</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Sign Up Form */}
        <section className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-20 bg-surface">
          <div className="w-full max-w-md space-y-6">
            {/* Mobile Logo Header */}
            <div className="md:hidden flex items-center gap-2 text-primary mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Mock Mate</span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Create your account</h2>
              <p className="text-sm text-on-surface-variant">
                Already have an account? <Link className="text-secondary font-semibold hover:underline" href="/login">Log in</Link>
              </p>
            </div>

            {/* Social Cluster */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 border border-outline-variant py-2.5 px-4 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all duration-200 cursor-pointer active:scale-95"
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
                className="flex items-center justify-center gap-2 border border-outline-variant py-2.5 px-4 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all duration-200 cursor-pointer active:scale-95"
              >
                <svg className="w-4 h-4 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
                <span className="text-xs font-semibold text-on-surface">LinkedIn</span>
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink mx-3 text-[10px] font-semibold text-on-surface-variant/80 uppercase tracking-wider">Or continue with email</span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>

            {/* Registration Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="bg-error/10 border border-error/30 text-error px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface ml-1" htmlFor="full-name">Full Name</label>
                <input
                  className="w-full h-11 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-surface-container-lowest outline-none transition-all duration-200 text-sm text-on-surface"
                  id="full-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface ml-1" htmlFor="email">Professional Email</label>
                <input
                  className="w-full h-11 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-surface-container-lowest outline-none transition-all duration-200 text-sm text-on-surface"
                  id="email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface ml-1" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    className="w-full h-11 pl-4 pr-10 rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-surface-container-lowest outline-none transition-all duration-200 text-sm text-on-surface"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-secondary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
                <p className="text-[10px] text-on-surface-variant/80 mt-1 px-1">Must be at least 8 characters.</p>
              </div>

              <div className="pt-2">
                <button
                  className="w-full h-12 bg-primary text-white font-semibold text-sm rounded-lg shadow-sm hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            {/* Policy */}
            <p className="text-xs text-center text-on-surface-variant leading-relaxed">
              By clicking Create Account, you agree to our &quot;
              <a className="text-secondary font-medium hover:underline underline-offset-2" href="#">Terms of Service</a>
              &quot; and &quot;
              <a className="text-secondary font-medium hover:underline underline-offset-2" href="#">Privacy Policy</a>
              &quot;.
            </p>

            {/* Verification Badge */}
            <div className="flex items-center justify-center gap-1.5 pt-4 border-t border-outline-variant/20 text-on-surface-variant/60 text-xs">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Secure 256-bit SSL encrypted</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
