"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiAlertCircle,
  FiZap,
  FiShield,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            TruthMatrix
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/detector"
              className="hover:text-blue-400 transition font-medium"
            >
              Detector
            </Link>
            <a href="#features" className="hover:text-blue-400 transition font-medium">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-400 transition font-medium">
              How It Works
            </a>
            <Link
              href="/detector"
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-4">
            <Link href="/detector" className="block hover:text-blue-400 transition">
              Detector
            </Link>
            <a href="#features" className="block hover:text-blue-400 transition">
              Features
            </a>
            <a href="#how-it-works" className="block hover:text-blue-400 transition">
              How It Works
            </a>
            <Link
              href="/detector"
              className="block bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg font-bold text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Effects - Enhanced */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight animate-neon-glow">
              Trust the Truth
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Advanced AI-powered detection for fake news and deepfakes. Protect
              yourself from misinformation in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Link
              href="/detector"
              className="group relative px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Start Detecting Now</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition"></div>
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 text-lg font-bold border-2 border-slate-400 rounded-xl hover:border-blue-400 hover:text-blue-400 transition"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { number: "99.2%", label: "Accuracy Rate" },
              { number: "0.5s", label: "Analysis Time" },
              { number: "10K+", label: "Analyses Daily" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-slate-700 rounded-lg p-6 hover:bg-white/10 transition card-glow animate-scale-pop"
                style={{animationDelay: `${i * 0.15}s`}}
              >
                <div className="text-3xl font-bold text-blue-400 animate-pulse">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/50"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold animate-neon-glow">
              Powerful Detection Features
            </h2>
            <p className="text-slate-400 text-lg">
              Our AI-powered system analyzes multiple factors to detect
              misinformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fake News Detection */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/60 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 transition card-glow animate-slide-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FiAlertCircle className="text-blue-400 text-2xl animate-pulse-glow" />
                </div>
                <h3 className="text-2xl font-bold">Fake News Detector</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Analyze news articles, social media posts, and claims with
                advanced NLP to detect misinformation patterns.
              </p>
              <ul className="space-y-3">
                {[
                  "Logical consistency analysis",
                  "Language pattern recognition",
                  "Emotional manipulation detection",
                  "Source verification",
                  "Fact-checking integration",
                ].map((feature, i) => (
                  <li key={i} className="flex gap-2 text-slate-300">
                    <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deepfake Detection */}
            <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/60 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition card-glow animate-slide-right">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <FiShield className="text-purple-400 text-2xl animate-pulse-glow" />
                </div>
                <h3 className="text-2xl font-bold">Deepfake Detector</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Upload images to identify deepfakes, AI-generated content, and
                digital manipulations with pixel-level analysis.
              </p>
              <ul className="space-y-3">
                {[
                  "Facial anomaly detection",
                  "Lighting consistency check",
                  "AI generation fingerprints",
                  "Texture analysis",
                  "Compression artifact detection",
                ].map((feature, i) => (
                  <li key={i} className="flex gap-2 text-slate-300">
                    <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold animate-neon-glow">How It Works</h2>
            <p className="text-slate-400 text-lg">
              Simple, fast, and incredibly accurate analysis powered by Gemini AI
            </p>
          </div>

          {/* Circular Steps with Central Hub */}
          <div className="relative w-full h-96 flex items-center justify-center">
            {/* SVG for curved connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Curved line top-left to center */}
              <path d="M 100 100 Q 350 150, 450 180" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
              
              {/* Curved line top-right to center */}
              <path d="M 900 100 Q 650 150, 550 180" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
              
              {/* Curved line bottom-left to center */}
              <path d="M 150 320 Q 350 280, 450 240" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
              
              {/* Curved line bottom-right to center */}
              <path d="M 850 320 Q 650 280, 550 240" fill="none" stroke="url(#lineGradient)" strokeWidth="2" />

              {/* Center circle */}
              <circle cx="500" cy="200" r="60" fill="none" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" />
              <circle cx="500" cy="200" r="55" fill="url(#lineGradient)" opacity="0.08" />
            </svg>

            {/* Steps Container - Circular arrangement */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Step 1 - Top Left */}
              <div className="absolute animate-scale-pop" style={{ left: "5%", top: "10%", animationDelay: "0s" }}>
                <div className="relative group">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-sm z-40 shadow-lg">
                    1
                  </div>
                  
                  {/* Card */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 w-48 hover:border-blue-400/50 hover:bg-slate-800/90 transition-all duration-300 relative">
                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-bl-lg opacity-80"></div>
                    
                    <div className="text-4xl mb-3">📤</div>
                    <h3 className="text-lg font-bold mb-2 text-white">Upload Content</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Paste news text or upload an image to analyze</p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Top Right */}
              <div className="absolute animate-scale-pop" style={{ right: "5%", top: "10%", animationDelay: "0.15s" }}>
                <div className="relative group">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-sm z-40 shadow-lg">
                    2
                  </div>
                  
                  {/* Card */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 w-48 hover:border-blue-400/50 hover:bg-slate-800/90 transition-all duration-300 relative">
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-purple-500 to-pink-500 rounded-bl-lg opacity-80"></div>
                    
                    <div className="text-4xl mb-3">🤖</div>
                    <h3 className="text-lg font-bold mb-2 text-white">AI Analysis</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Gemini AI processes your content in seconds</p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Bottom Left */}
              <div className="absolute animate-scale-pop" style={{ left: "5%", bottom: "10%", animationDelay: "0.3s" }}>
                <div className="relative group">
                  {/* Step number badge */}
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-sm z-40 shadow-lg">
                    3
                  </div>
                  
                  {/* Card */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 w-48 hover:border-blue-400/50 hover:bg-slate-800/90 transition-all duration-300 relative">
                    {/* Corner accent */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-tr-lg opacity-80"></div>
                    
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-lg font-bold mb-2 text-white">Detailed Report</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Get comprehensive analysis with key findings</p>
                  </div>
                </div>
              </div>

              {/* Step 4 - Bottom Right */}
              <div className="absolute animate-scale-pop" style={{ right: "5%", bottom: "10%", animationDelay: "0.45s" }}>
                <div className="relative group">
                  {/* Step number badge */}
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-sm z-40 shadow-lg">
                    4
                  </div>
                  
                  {/* Card */}
                  <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 w-48 hover:border-blue-400/50 hover:bg-slate-800/90 transition-all duration-300 relative">
                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-purple-500 to-pink-500 rounded-tl-lg opacity-80"></div>
                    
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="text-lg font-bold mb-2 text-white">Take Action</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Use insights to make informed decisions</p>
                  </div>
                </div>
              </div>

              {/* Center Gemini AI Hub */}
              <div className="absolute z-50">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full border-2 border-blue-400/60 flex items-center justify-center animate-pulse-glow shadow-2xl shadow-blue-500/30">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🎯</div>
                    <p className="text-xs font-bold text-blue-200">Gemini AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-slate-700">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold animate-neon-glow">
              Stop Misinformation Today
            </h2>
            <p className="text-xl text-slate-300">
              Join thousands of users protecting themselves from fake news and
              deepfakes
            </p>
          </div>
          <Link
            href="/detector"
            className="inline-block px-10 py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105 active:scale-95"
          >
            Start Detecting Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                TruthMatrix
              </h3>
              <p className="text-slate-400 text-sm">
                Powered by Gemini AI to fight misinformation
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="/detector" className="hover:text-blue-400 transition">
                    Detector
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-400 transition">
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>© 2025 TruthMatrix. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ by <a href="https://www.arhanansari.me/" className="hover:text-blue-400 transition">Arhan Ansari</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
