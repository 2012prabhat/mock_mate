"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const startInterview = () => {
    router.push("/dashboard/interview");
  };

  const initials = user?.name 
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) 
    : "AK";
  const firstName = user?.name ? user.name.split(" ")[0] : "Alex";

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col selection:bg-secondary/20 selection:text-secondary">
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 w-full max-w-[1440px] mx-auto bg-white/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Mock Mate</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-semibold text-secondary border-b-2 border-secondary pb-0.5" href="/dashboard">Overview</Link>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
        </nav>
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-85 cursor-pointer"
          >
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-xs">
              {initials}
            </div>
            <span className="hidden sm:inline">{user?.name || "Alex Kumar"}</span>
            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 top-10 w-48 bg-white border border-outline-variant/30 rounded-lg shadow-xl py-2 z-50 text-sm">
              <a className="block px-4 py-2 hover:bg-surface-container-low transition-colors" href="#">My Profile</a>
              <a className="block px-4 py-2 hover:bg-surface-container-low transition-colors" href="#">Subscription Plan</a>
              <hr className="border-outline-variant/20 my-1" />
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-error hover:bg-error-container/20 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-grow flex w-full max-w-[1440px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-outline-variant/30 px-6 py-8 gap-6 bg-surface-container-lowest shrink-0">
          <div className="flex flex-col gap-2">
            <Link className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg text-sm font-semibold" href="/dashboard">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span>Overview</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors text-sm font-medium" href="/dashboard/interview">
              <span className="material-symbols-outlined text-lg">video_chat</span>
              <span>Mock Interviews</span>
            </Link>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors text-sm font-medium" href="#">
              <span className="material-symbols-outlined text-lg">analytics</span>
              <span>Feedback</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors text-sm font-medium" href="#">
              <span className="material-symbols-outlined text-lg">query_stats</span>
              <span>Skill Analytics</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors text-sm font-medium" href="#">
              <span className="material-symbols-outlined text-lg">settings</span>
              <span>Settings</span>
            </a>
          </div>

          {/* Current Plan Widget */}
          <div className="mt-auto p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Current Plan</p>
            <p className="text-base font-bold text-primary mb-3">Pro Career</p>
            <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-3/4"></div>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-2">12/15 sessions used</p>
          </div>
        </aside>

        {/* Dashboard Content stage */}
        <main className="flex-grow p-6 md:p-10 overflow-y-auto">
          {/* Welcome Banner */}
          <section className="relative overflow-hidden rounded-2xl bg-primary-container p-8 md:p-10 mb-8 border border-outline-variant/20 shadow-md">
            <div className="relative z-10 max-w-2xl text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome back, {firstName}. Ready to ace your next role?</h1>
              <p className="text-sm md:text-base text-slate-300 mb-6 max-w-lg">
                Your communication score improved by 14% this week. Keep the momentum going with a targeted session.
              </p>
              <button 
                onClick={startInterview}
                className="flex items-center gap-2 px-6 py-3.5 bg-secondary text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span>Start New Mock Interview</span>
              </button>
            </div>
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-secondary/40 to-transparent"></div>
          </section>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Summary Card */}
            <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-primary">Recent Performance Scores</h2>
                <button className="text-secondary text-xs font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  Full Analysis 
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Confidence</span>
                  <span className="text-2xl font-bold text-primary">88%</span>
                  <span className="text-[10px] text-secondary font-semibold mt-1">+4% ↑</span>
                </div>
                <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Tone</span>
                  <span className="text-2xl font-bold text-primary">76%</span>
                  <span className="text-[10px] text-on-surface-variant mt-1">Stable</span>
                </div>
                <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Clarity</span>
                  <span className="text-2xl font-bold text-primary">92%</span>
                  <span className="text-[10px] text-secondary font-semibold mt-1">+12% ↑</span>
                </div>
                <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Pacing</span>
                  <span className="text-2xl font-bold text-primary">81%</span>
                  <span className="text-[10px] text-error font-semibold mt-1">-2% ↓</span>
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="mt-4 flex-grow min-h-[180px] bg-surface-container-low rounded-xl relative overflow-hidden flex items-end px-6 py-4 border border-outline-variant/20">
                <div className="flex items-end gap-4 w-full h-[90%]">
                  <div className="flex-grow bg-secondary/20 rounded-t-lg h-[78%] relative group transition-all hover:bg-secondary/35 cursor-pointer">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">78%</div>
                  </div>
                  <div className="flex-grow bg-secondary/20 rounded-t-lg h-[52%] relative group transition-all hover:bg-secondary/35 cursor-pointer">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">52%</div>
                  </div>
                  <div className="flex-grow bg-secondary/20 rounded-t-lg h-[65%] relative group transition-all hover:bg-secondary/35 cursor-pointer">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">65%</div>
                  </div>
                  <div className="flex-grow bg-secondary rounded-t-lg h-[92%] relative group transition-all hover:brightness-110 cursor-pointer shadow-lg shadow-secondary/25">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">92%</div>
                  </div>
                  <div className="flex-grow bg-secondary/20 rounded-t-lg h-[84%] relative group transition-all hover:bg-secondary/35 cursor-pointer">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">84%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions Card */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-primary">Upcoming Practice</h2>
                <span className="material-symbols-outlined text-on-surface-variant text-lg">calendar_today</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer group bg-surface-container-lowest">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-secondary-container text-secondary text-[10px] font-semibold">Tech Lead</span>
                    <span className="text-[10px] text-on-surface-variant">Today, 2:00 PM</span>
                  </div>
                  <h3 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">Behavioral Assessment</h3>
                  <p className="text-xs text-on-surface-variant mt-2">Focus: Team leadership & Conflict resolution</p>
                </div>
                
                <div className="p-4 rounded-xl border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer group bg-surface-container-lowest opacity-75">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold">Product Manager</span>
                    <span className="text-[10px] text-on-surface-variant">Tomorrow, 10:00 AM</span>
                  </div>
                  <h3 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">Case Study Practice</h3>
                  <p className="text-xs text-on-surface-variant mt-2">Focus: Market entry & Strategy</p>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-outline text-center hover:bg-surface-container-low transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-outline mb-1 text-lg">add</span>
                  <p className="text-xs font-semibold text-on-surface-variant">Schedule New Session</p>
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="lg:col-span-3 glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center bg-gradient-to-br from-surface-container-lowest to-surface-container-low shadow-sm">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 overflow-hidden border border-secondary/20">
                {/* Visual icon representation of AI Mentor */}
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-white text-[9px] font-bold uppercase tracking-wider">Daily Insight</span>
                  <h3 className="text-sm font-bold text-primary">Improve your &apos;Situation&apos; descriptions</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  In your last 3 sessions, your STAR method intros were slightly long. Try to condense the &apos;Situation&apos; phase to under 45 seconds to leave more room for &apos;Action&apos; and &apos;Result&apos;.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-4 py-2.5 rounded-lg border border-secondary text-secondary text-xs font-semibold hover:bg-secondary/5 transition-all cursor-pointer">
                  View Tutorial
                </button>
                <button 
                  onClick={startInterview}
                  className="px-4 py-2.5 rounded-lg bg-secondary text-white text-xs font-semibold hover:opacity-90 transition-all shadow-md cursor-pointer"
                >
                  Try Drill
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-4 px-10 py-6 w-full max-w-[1440px] mx-auto border-t border-outline-variant/30">
        <span className="text-xs text-on-surface-variant">© 2024 Mock Mate AI. Elevating career potential through practice.</span>
        <div className="flex gap-6 text-xs text-on-surface-variant">
          <a className="hover:underline" href="#">Help Center</a>
          <a className="hover:underline" href="#">Terms</a>
          <a className="hover:underline" href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
