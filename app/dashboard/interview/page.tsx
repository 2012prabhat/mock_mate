"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  category: string;
  expectedDuration: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tell me about a time you resolved a major conflict on a technical project. What was the situation, and how did you approach it?",
    category: "Conflict Resolution",
    expectedDuration: "2-3 minutes",
  },
  {
    id: 2,
    text: "Describe a complex technical challenge you faced recently. How did you structure the solution, and what were the trade-offs?",
    category: "System Design",
    expectedDuration: "3-4 minutes",
  },
  {
    id: 3,
    text: "Why are you interested in joining our team as a Tech Lead, and what value do you hope to bring to our engineering culture?",
    category: "Role Fit & Leadership",
    expectedDuration: "2 minutes",
  },
  {
    id: 4,
    text: "How do you handle underspecified requirements from product managers while maintaining delivery timelines?",
    category: "Behavioral & Process",
    expectedDuration: "2-3 minutes",
  },
];

const AIInterviewRoom: React.FC = () => {
  const router = useRouter();
  
  // State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [aiTipVisible, setAiTipVisible] = useState(true);
  const [sessionActive, setSessionActive] = useState(true);
  
  // Real-time metrics states
  const [speechPacing, setSpeechPacing] = useState(135); // simulated WPM
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [fillerCounts, setFillerCounts] = useState({ um: 1, like: 2, actually: 0 });
  const [coachAdvice, setCoachAdvice] = useState("AI is analyzing... speak clearly and structure using the STAR method.");
  const [aiStatus, setAiStatus] = useState<"speaking" | "listening" | "evaluating">("listening");
  
  // Video and audio references
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameId = useRef<number | null>(null);
  
  const currentQuestion = QUESTIONS[currentIdx];

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  // Request Webcam stream and Audio Analyser
  useEffect(() => {
    async function startMedia() {
      try {
        if (!cameraActive) {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: true
        });
        
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Web Audio API setup for voice level monitoring
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          analyserRef.current = analyser;

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const checkVolume = () => {
            if (!analyserRef.current || isMuted) {
              setIsUserSpeaking(false);
              animationFrameId.current = requestAnimationFrame(checkVolume);
              return;
            }
            
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Calculate simple average amplitude
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            
            // Threshold for user speaking
            if (average > 15) {
              setIsUserSpeaking(true);
              setAiStatus("listening");
            } else {
              setIsUserSpeaking(false);
            }
            
            animationFrameId.current = requestAnimationFrame(checkVolume);
          };

          checkVolume();
        }
      } catch (err) {
        console.warn("Camera/Mic permissions denied or unavailable:", err);
      }
    }

    startMedia();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [cameraActive, isMuted]);

  // Simulate Coach Real-Time Feedback and Pacing changes
  useEffect(() => {
    if (!sessionActive) return;
    
    const interval = setInterval(() => {
      // Alter speech WPM pace slightly
      setSpeechPacing((prev) => {
        const diff = Math.floor(Math.random() * 20) - 10;
        const next = Math.max(90, Math.min(190, prev + diff));
        
        // Update coach advice based on pacing
        if (next > 165) {
          setCoachAdvice("Warning: speaking pace is too fast (WPM > 165). Slow down slightly and pause between thoughts.");
        } else if (next < 105) {
          setCoachAdvice("Tip: Pace is slightly slow. Ensure energy level is confident and engaging.");
        } else {
          setCoachAdvice("Great pacing! Keep speaking at this rate (120-150 WPM is ideal). Good eye contact.");
        }
        return next;
      });

      // Chance to increment filler words if user is speaking
      if (isUserSpeaking && Math.random() > 0.75) {
        const fillers = ["um", "like", "actually"] as const;
        const chosen = fillers[Math.floor(Math.random() * fillers.length)];
        setFillerCounts((prev) => ({
          ...prev,
          [chosen]: prev[chosen] + 1
        }));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [sessionActive, isUserSpeaking]);

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMuted; // Toggle track enabled state
      });
    }
  };

  const handleCameraToggle = () => {
    const nextState = !cameraActive;
    setCameraActive(nextState);
  };

  const handleNextQuestion = () => {
    setAiStatus("speaking");
    // Simulate AI thinking and reading new question
    setCoachAdvice("AI is asking the next question. Listen carefully.");
    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setAiStatus("listening");
      } else {
        // Wrap up session
        setSessionActive(false);
        setAiStatus("evaluating");
        setCoachAdvice("Session completed! AI is compiling final feedback analytics.");
      }
    }, 1500);
  };

  const handleEndSession = () => {
    setSessionActive(false);
    // Redirect to dashboard overview
    router.push("/dashboard");
  };

  // Format Elapsed Time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-[#0b121f] text-slate-100 font-sans min-h-screen flex flex-col selection:bg-secondary/35 selection:text-white">
      {/* Top Header Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-[#0d1627]/90 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="text-xs font-semibold">Exit Room</span>
          </Link>
          <span className="text-slate-600">|</span>
          <h1 className="text-sm font-bold tracking-wide text-slate-200">Session Room - Senior Product Role</h1>
        </div>

        {/* Live indicator & Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-950/60 border border-red-800/40 px-3 py-1 rounded-full text-red-400 font-semibold text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span>LIVE RECORDING</span>
          </div>
          <span className="text-slate-300 font-mono text-sm">{formatTime(timeElapsed)}</span>
        </div>
      </header>

      {/* Main Split Screen stage */}
      <main className="flex-grow flex flex-col lg:flex-row gap-6 p-6 max-w-[1440px] mx-auto w-full">
        {/* Left Side: Video Containers */}
        <div className="flex-grow flex flex-col gap-6 lg:w-[65%]">
          
          {/* Split Screen Video Frame Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow min-h-[360px] md:min-h-[480px]">
            
            {/* 1. AI Coach container */}
            <div className="rounded-2xl bg-[#0d1627] border border-slate-800 p-6 flex flex-col justify-between items-center relative overflow-hidden group shadow-lg">
              
              {/* Header Info */}
              <div className="w-full flex justify-between items-center relative z-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Coach (Interviewer)</span>
                
                {/* AI status Pill */}
                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm ${
                  aiStatus === "speaking" ? "bg-secondary/20 text-secondary border border-secondary/40" :
                  aiStatus === "listening" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse" :
                  "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    aiStatus === "speaking" ? "bg-secondary animate-ping" :
                    aiStatus === "listening" ? "bg-emerald-400" :
                    "bg-amber-400"
                  }`}></div>
                  <span>{aiStatus}</span>
                </div>
              </div>

              {/* Avatar Center Panel */}
              <div className="flex flex-col items-center justify-center relative my-auto">
                <div className={`w-28 h-28 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border-4 ${
                  aiStatus === "speaking" ? "border-secondary/40 scale-105 transition-all shadow-lg shadow-secondary/10" : "border-slate-700"
                }`}>
                  <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                
                {/* Simulated Audio Wave Animation */}
                {aiStatus === "speaking" && (
                  <div className="flex items-center gap-1 mt-4 h-6">
                    <span className="w-1 bg-secondary rounded h-2 animate-[bounce_0.8s_infinite]"></span>
                    <span className="w-1 bg-secondary rounded h-5 animate-[bounce_0.5s_infinite_0.1s]"></span>
                    <span className="w-1 bg-secondary rounded h-3 animate-[bounce_0.7s_infinite_0.2s]"></span>
                    <span className="w-1 bg-secondary rounded h-6 animate-[bounce_0.4s_infinite_0.3s]"></span>
                    <span className="w-1 bg-secondary rounded h-2 animate-[bounce_0.6s_infinite_0.4s]"></span>
                  </div>
                )}
                {aiStatus === "listening" && (
                  <p className="text-[11px] text-emerald-400/80 font-medium tracking-wide mt-4">Listening for response...</p>
                )}
                {aiStatus === "evaluating" && (
                  <p className="text-[11px] text-amber-400/80 font-medium tracking-wide mt-4">Analyzing transcript...</p>
                )}
              </div>

              {/* Coach details bottom */}
              <div className="w-full text-center relative z-10">
                <p className="text-sm font-bold text-slate-300">Sophia (Tech Lead Evaluator)</p>
                <p className="text-[10px] text-slate-500">Corporate System Design Persona</p>
              </div>

              {/* Grid abstract texture */}
              <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#fff_1px,transparent_0)] [background-size:16px_16px]"></div>
            </div>

            {/* 2. User live feed container */}
            <div className={`rounded-2xl bg-[#0d1627] border p-1 transition-all duration-300 flex flex-col justify-between items-center relative overflow-hidden group shadow-lg ${
              isUserSpeaking ? "border-secondary shadow-lg shadow-secondary/10" : "border-slate-800"
            }`}>
              
              {/* Header Info */}
              <div className="w-full flex justify-between items-center p-3 relative z-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Feed (You)</span>
                
                {isUserSpeaking && (
                  <div className="bg-secondary/20 border border-secondary/40 px-2 py-0.5 rounded-full text-secondary text-[10px] font-bold tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] animate-pulse">volume_up</span>
                    <span>TALKING</span>
                  </div>
                )}
              </div>

              {/* Camera Video Stream */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                {cameraActive ? (
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted // mute output so user doesn't hear feedback
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-5xl mb-2">videocam_off</span>
                    <span className="text-xs font-medium">Camera Feed Disabled</span>
                  </div>
                )}
              </div>

              {/* User bottom label */}
              <div className="w-full p-3 flex justify-between items-center relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-xl mt-auto">
                <p className="text-xs font-semibold text-slate-300">Alex Kumar (Candidate)</p>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-sm">{isMuted ? "mic_off" : "mic"}</span>
                  <span className="material-symbols-outlined text-slate-400 text-sm">{cameraActive ? "videocam" : "videocam_off"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt / Question Panel */}
          <div className="rounded-2xl bg-[#0d1627] border border-slate-800 p-6 flex flex-col gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-secondary-container text-secondary text-[10px] font-bold uppercase tracking-wider">
                {currentQuestion.category}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 text-xs">Question {currentIdx + 1} of {QUESTIONS.length}</span>
            </div>
            <p className="text-base md:text-lg font-bold text-slate-200 leading-relaxed">
              &quot;{currentQuestion.text}&quot;
            </p>
            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-800">
              <span>Suggested Answer Time: {currentQuestion.expectedDuration}</span>
              <span className="text-secondary font-medium">Focus Area: STAR Method Structure</span>
            </div>
          </div>
        </div>

        {/* Right Side: Real-time AI Coaching Panel */}
        <div className="lg:w-[35%] flex flex-col gap-6">
          
          {/* Real-time coaching panel */}
          {aiTipVisible && (
            <div className="rounded-2xl bg-[#0d1627] border border-slate-800 p-6 flex flex-col gap-6 shadow-md flex-grow">
              <div>
                <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-1">AI Coaching Assistant</h2>
                <p className="text-xs text-slate-500">Real-time behavior analysis and metric suggestions.</p>
              </div>

              {/* WPM Pacing Indicator */}
              <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-300">Speaking Pace</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    speechPacing > 160 ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                    speechPacing < 110 ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                    "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}>
                    {speechPacing} WPM • {speechPacing > 160 ? "Too Fast" : speechPacing < 110 ? "Too Slow" : "Perfect Pace"}
                  </span>
                </div>
                
                {/* Horizontal range bar */}
                <div className="relative h-2 w-full bg-slate-800 rounded-full">
                  {/* Perfect range highlight */}
                  <div className="absolute left-[30%] right-[30%] top-0 bottom-0 bg-emerald-500/20 rounded"></div>
                  
                  {/* Active WPM indicator pin */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-white transition-all duration-500"
                    style={{ left: `${Math.max(5, Math.min(95, ((speechPacing - 80) / 120) * 100))}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                  <span>Slow</span>
                  <span>Target Range (110-160 WPM)</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Filler Words Panel */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 tracking-wide uppercase">Filler Word Frequency</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">&quot;Um/Uh&quot;</span>
                    <span className="text-lg font-bold text-slate-200">{fillerCounts.um}</span>
                    <span className="text-[9px] text-slate-600 mt-1">Goal: &lt; 3</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">&quot;Like&quot;</span>
                    <span className="text-lg font-bold text-slate-200">{fillerCounts.like}</span>
                    <span className="text-[9px] text-slate-600 mt-1">Goal: &lt; 4</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">&quot;Actually&quot;</span>
                    <span className="text-lg font-bold text-slate-200">{fillerCounts.actually}</span>
                    <span className="text-[9px] text-slate-600 mt-1">Goal: &lt; 2</span>
                  </div>
                </div>
              </div>

              {/* Coach Live Advice Alert Card */}
              <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-xl flex items-start gap-3 mt-auto">
                <span className="material-symbols-outlined text-secondary shrink-0 text-xl">psychology</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 mb-1">Real-time Coaching Tip</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {coachAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Metrics Checklist Card */}
          <div className="rounded-2xl bg-[#0d1627] border border-slate-800 p-6 flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-bold tracking-wider text-slate-200 uppercase">STAR Checklist</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Situation (Describe challenge context)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Task (Define objectives/responsibilities)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="material-symbols-outlined text-base text-slate-600">radio_button_unchecked</span>
                <span>Action (Detail steps you took)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="material-symbols-outlined text-base text-slate-600">radio_button_unchecked</span>
                <span>Result (Quantify achievements)</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Control bar */}
      <footer className="border-t border-slate-800 bg-[#0d1627]/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-40">
        
        {/* Left Side: Session status */}
        <div className="text-xs text-slate-400 font-semibold text-center sm:text-left">
          <span>Interviewer: </span>
          <span className="text-slate-200">Sophia (Tech Lead Evaluator)</span>
        </div>

        {/* Center: Control buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleMute}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMuted ? "bg-red-500 text-white hover:bg-red-600" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            <span className="material-symbols-outlined text-lg">{isMuted ? "mic_off" : "mic"}</span>
          </button>

          <button 
            onClick={handleCameraToggle}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !cameraActive ? "bg-red-500 text-white hover:bg-red-600" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title={cameraActive ? "Disable Camera" : "Enable Camera"}
          >
            <span className="material-symbols-outlined text-lg">{cameraActive ? "videocam" : "videocam_off"}</span>
          </button>

          <button 
            onClick={() => setAiTipVisible(!aiTipVisible)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !aiTipVisible ? "bg-slate-700 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title="Toggle AI Coach View"
          >
            <span className="material-symbols-outlined text-lg">visibility</span>
          </button>
        </div>

        {/* Right Side: Navigation CTAs */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {sessionActive ? (
            <button 
              onClick={handleNextQuestion}
              className="flex-grow sm:flex-grow-0 bg-secondary text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Next Question</span>
              <span className="material-symbols-outlined text-xs">skip_next</span>
            </button>
          ) : null}

          <button 
            onClick={handleEndSession}
            className="flex-grow sm:flex-grow-0 bg-red-600 text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Finish Session</span>
            <span className="material-symbols-outlined text-xs">logout</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AIInterviewRoom;
