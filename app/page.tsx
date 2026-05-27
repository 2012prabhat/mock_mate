import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary/20 selection:text-secondary min-h-screen flex flex-col font-sans">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <nav className="flex items-center justify-between px-6 md:px-10 py-4 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3">
            {/* Mock Mate Logo placeholder / Icon */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">Mock Mate</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-secondary border-b-2 border-secondary pb-1" href="/">Home</Link>
            <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="#pricing">Pricing</a>
            <Link className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors" href="/login">Login</Link>
          </div>
          <Link href="/signup">
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:scale-[0.98] transition-transform shadow-md cursor-pointer">
              Join Now
            </button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Trusted by 50,000+ Professionals</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                Master Your Next Interview with <span className="text-secondary">AI-Powered Practice.</span>
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-[540px]">
                Stop guessing and start performing. Mock Mate provides personalized coaching, real-time feedback, and hyper-realistic simulations to turn your anxiety into confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup">
                  <button className="w-full sm:w-auto h-12 px-8 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                    Start Free Trial
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <button className="w-full h-12 px-8 bg-surface-container-low text-secondary border border-secondary/20 rounded-lg font-semibold text-sm hover:bg-surface-container-high transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    Watch Demo
                  </button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-2xl p-4 shadow-2xl overflow-hidden border border-outline-variant/30">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                  {/* Styled interface simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-[10px] text-white font-medium">Session Live</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-secondary text-white text-[10px] font-semibold">Pacing: Perfect</span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-semibold">Volume: Good</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center my-4 py-6">
                      <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-secondary mb-3">
                        <span className="material-symbols-outlined text-secondary text-2xl animate-pulse">mic</span>
                      </div>
                      <p className="text-white text-xs text-center max-w-[280px] font-medium opacity-90">
                        &quot;I designed the system architecture to handle over 10,000 concurrent requests by utilizing horizontal scaling...&quot;
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full border-t border-white/10 pt-3">
                      <span className="text-[10px] text-slate-400 font-medium">Topic: Technical System Design</span>
                      <span className="text-[10px] text-slate-400 font-medium">Duration: 12:45 / 30:00</span>
                    </div>
                  </div>
                </div>
                
                {/* Float Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-outline-variant/20 flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">AI Confidence Score</p>
                    <p className="text-lg font-bold text-primary">87% <span className="text-secondary text-xs font-normal ml-1">+12% vs last session</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-outline-variant/20 bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto px-10">
            <p className="text-center text-xs font-bold text-on-surface-variant/60 mb-8 uppercase tracking-[0.2em]">Our Alumni Work At</p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale contrast-125 select-none font-bold text-2xl tracking-tighter text-on-surface">
              <span>GOOGLE</span>
              <span>META</span>
              <span>AMAZON</span>
              <span>APPLE</span>
              <span>NETFLIX</span>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto scroll-mt-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Everything You Need to Ace the Interview</h2>
            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">Advanced technology designed to replicate the pressure of real interviews while providing the safety to fail and learn.</p>
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            {/* Feature 1: AI Coaching */}
            <div className="md:col-span-8 group relative overflow-hidden bg-white border border-outline-variant/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[320px]">
              <div className="absolute top-0 right-0 p-8">
                <span className="material-symbols-outlined text-[48px] text-secondary/30 group-hover:text-secondary transition-colors">psychology</span>
              </div>
              <div className="mt-12 space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-primary">Real-Time AI Coaching</h3>
                <p className="text-sm text-on-surface-variant max-w-md">Get instant nudges during your practice sessions. Our AI detects filler words, awkward silences, and weak phrasing as they happen.</p>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary text-xs font-semibold">Pacing</span>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary text-xs font-semibold">Tone</span>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary text-xs font-semibold">Filler Words</span>
              </div>
            </div>
            {/* Feature 2: Detailed Analytics */}
            <div className="md:col-span-4 bg-primary text-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[320px]">
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-white">In-Depth Feedback</h3>
                <p className="text-sm opacity-80">Post-interview reports that break down your performance across 15+ behavioral metrics.</p>
              </div>
              <div className="mt-8 relative z-10 bg-white/10 p-4 rounded-xl backdrop-blur-md">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Clarity</span>
                      <span>92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[92%]"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Confidence</span>
                      <span>88%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[88%]"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Pacing</span>
                      <span>81%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[81%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 blur-[40px] rounded-full"></div>
            </div>
            {/* Feature 3: Realistic Simulations */}
            <div className="md:col-span-4 bg-surface-container rounded-3xl p-8 flex flex-col justify-between min-h-[280px]">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-secondary text-2xl">videocam</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary">Realistic Simulations</h3>
                <p className="text-sm text-on-surface-variant">Customized interviewer personas with various moods and questioning style for technical, behavioral, and leadership rounds.</p>
              </div>
            </div>
            {/* Feature 4: Industry Benchmarking */}
            <div className="md:col-span-8 bg-surface-container-highest/50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden min-h-[280px]">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-primary">Industry Benchmarking</h3>
                <p className="text-sm text-on-surface-variant">Compare your scores against thousands of candidates for roles at top-tier companies. Know exactly how you rank before entering the room.</p>
              </div>
              <div className="flex-1 w-full bg-slate-900/10 p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex justify-between text-xs text-on-surface font-semibold">
                  <span>Score percentile</span>
                  <span className="text-secondary">Top 12%</span>
                </div>
                <div className="flex gap-2 items-end h-24 pt-4 border-b border-outline-variant/50">
                  <div className="bg-secondary/40 w-full h-[40%] rounded-t"></div>
                  <div className="bg-secondary/40 w-full h-[65%] rounded-t"></div>
                  <div className="bg-secondary w-full h-[88%] rounded-t shadow"></div>
                  <div className="bg-secondary/40 w-full h-[55%] rounded-t"></div>
                  <div className="bg-secondary/40 w-full h-[70%] rounded-t"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto text-center">
          <div className="bg-primary rounded-[40px] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to Land Your Dream Job?</h2>
              <p className="text-base md:text-lg text-white/70">Join thousands of job seekers who have mastered their interview skills with Mock Mate.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup" className="w-full sm:w-auto">
                  <button className="w-full h-14 px-10 bg-secondary text-white rounded-full font-semibold hover:brightness-110 transition-all shadow-xl shadow-secondary/20 cursor-pointer">
                    Start Your Free Trial
                  </button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <button className="w-full h-14 px-10 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all cursor-pointer">
                    View Features
                  </button>
                </a>
              </div>
              <p className="text-white/50 text-xs">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-container-low border-t border-outline-variant/50">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 px-10 py-16 w-full max-w-[1440px] mx-auto">
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <span className="text-base font-bold text-primary">Mock Mate</span>
            </div>
            <p className="text-sm text-on-surface-variant/80">
              Elevating career potential through intelligent practice.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Platform</p>
              <ul className="space-y-2 text-sm text-on-surface-variant/80">
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Features</a></li>
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Pricing</a></li>
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Careers</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Company</p>
              <ul className="space-y-2 text-sm text-on-surface-variant/80">
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">About Us</a></li>
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Support</p>
              <ul className="space-y-2 text-sm text-on-surface-variant/80">
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Help Center</a></li>
                <li><a className="hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-outline-variant/20 py-8 px-10 text-center max-w-[1440px] mx-auto">
          <p className="text-xs text-on-surface-variant/60">© 2024 Mock Mate AI. Elevating career potential through intelligent practice.</p>
        </div>
      </footer>
    </div>
  );
}
