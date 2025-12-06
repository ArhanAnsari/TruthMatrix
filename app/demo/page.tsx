"use client";
import Link from "next/link";
import { useState } from "react";

export default function Demo() {
  const [selectedFeature, setSelectedFeature] = useState("dashboard");

  const features = [
    {
      id: "dashboard",
      title: "📊 Dashboard with Analytics",
      description: "Track all your analyses with beautiful charts and statistics",
      url: "/dashboard",
      features: ["Total analyses counter", "Type distribution pie chart", "Confidence trend line chart", "Export as CSV", "Favorites system", "Search & filter"],
    },
    {
      id: "learn",
      title: "📚 Educational Resources",
      description: "Learn about deepfakes, misinformation, and detection techniques",
      url: "/learn",
      features: ["How deepfakes work", "Misinformation psychology", "Red flags guide", "Fact-checking steps", "FAQs", "Tips & tricks"],
    },
    {
      id: "metrics",
      title: "⚡ Performance Metrics",
      description: "Real-time system performance and accuracy statistics",
      url: "/metrics",
      features: ["99.2% accuracy rate", "245ms avg response time", "99.97% uptime", "API stats", "Accuracy by type", "SLA info"],
    },
    {
      id: "roadmap",
      title: "🚀 Product Roadmap",
      description: "See what's coming to TruthMatrix in 2025",
      url: "/roadmap",
      features: ["Phase timeline", "Upcoming features", "Q1-Q3 planned releases", "Mobile apps", "Browser extension", "Social integration"],
    },
    {
      id: "sharing",
      title: "🔗 Social Sharing & Export",
      description: "Share your analysis results easily",
      url: "/detector",
      features: ["Copy to clipboard", "Export as JSON", "Print analysis", "Twitter sharing", "LinkedIn sharing", "Email sharing", "WhatsApp sharing"],
    },
  ];

  const quickWins = [
    { emoji: "📋", title: "Copy to Clipboard", description: "Quickly copy analysis results" },
    { emoji: "📥", title: "Export JSON", description: "Download full analysis data" },
    { emoji: "🖨️", title: "Print Function", description: "Print formatted results" },
    { emoji: "🔄", title: "Recent History", description: "All analyses saved locally" },
    { emoji: "⭐", title: "Favorites System", description: "Star important analyses" },
    { emoji: "⌨️", title: "Keyboard Shortcuts", description: "Ctrl+Enter to analyze" },
    { emoji: "📱", title: "Mobile Responsive", description: "Works on all devices" },
    { emoji: "🎨", title: "Dark/Light Theme", description: "Custom theme support" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_80%,transparent_20%)] backdrop-blur-md border-b border-[var(--border-color)] py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              🎉 New Features Demo
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Explore all 20 new features added to TruthMatrix
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/50 rounded-lg hover:bg-[var(--accent-primary)]/30 transition"
          >
            ← Back Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Feature Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                selectedFeature === feature.id
                  ? "bg-[var(--accent-primary)]/20 border-[var(--accent-primary)]"
                  : "bg-[var(--surface)]/50 border-[var(--border-color)] hover:border-[var(--accent-primary)]/50"
              }`}
            >
              <div className="font-semibold text-sm">{feature.title.split(" ")[0]}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{feature.title.split(" ", 2)[1]}</div>
            </button>
          ))}
        </div>

        {/* Feature Details */}
        <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-8 mb-12">
          {features.map((feature) => (
            selectedFeature === feature.id && (
              <div key={feature.id} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{feature.title}</h2>
                  <p className="text-[var(--text-secondary)] text-lg">{feature.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {feature.features.map((f, i) => (
                    <div key={i} className="bg-[var(--surface)]/50 p-4 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition">
                      <div className="flex gap-2">
                        <div className="text-[var(--accent-primary)]">✓</div>
                        <span className="text-sm">{f}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={feature.url}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition"
                >
                  Try It Now →
                </Link>
              </div>
            )
          ))}
        </div>

        {/* Quick Wins */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">⚡ Quick Win Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickWins.map((win, i) => (
              <div
                key={i}
                className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] hover:border-[var(--accent-primary)]/50 transition"
              >
                <div className="text-4xl mb-3">{win.emoji}</div>
                <h3 className="font-bold mb-2">{win.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{win.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 border border-[var(--accent-primary)]/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">🛠️ Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Zustand", desc: "State Management" },
              { name: "React Toastify", desc: "Notifications" },
              { name: "Recharts", desc: "Analytics Charts" },
              { name: "Next.js 16", desc: "Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Appwrite", desc: "Backend" },
              { name: "Google Gemini", desc: "AI Analysis" },
            ].map((tech, i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-[var(--accent-primary)]">{tech.name}</div>
                <div className="text-sm text-[var(--text-secondary)]">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
