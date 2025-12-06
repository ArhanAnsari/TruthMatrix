"use client";
import Link from "next/link";

export default function Roadmap() {
  const phases = [
    {
      phase: "Phase 1: Foundation",
      status: "✅ Completed",
      color: "from-green-500/20 to-green-600/20",
      items: [
        "Core deepfake detection engine",
        "News misinformation detection",
        "Web interface with Tailwind CSS",
        "Appwrite backend integration",
        "API endpoints for detection",
      ],
    },
    {
      phase: "Phase 2: Enhancement",
      status: "🔄 In Progress",
      color: "from-blue-500/20 to-blue-600/20",
      items: [
        "Video deepfake detection",
        "Dashboard with analytics",
        "User authentication & history",
        "Multi-language support",
        "Performance metrics",
      ],
    },
    {
      phase: "Phase 3: Scale & Monetize",
      status: "📅 Planned (Q1 2025)",
      color: "from-purple-500/20 to-purple-600/20",
      items: [
        "Browser extension for Chrome/Firefox",
        "Mobile app (iOS & Android)",
        "Commercial API with pricing tiers",
        "Team collaboration features",
        "Scheduled batch processing",
      ],
    },
    {
      phase: "Phase 4: Advanced AI",
      status: "🚀 Future (Q2 2025)",
      color: "from-pink-500/20 to-pink-600/20",
      items: [
        "Custom AI model training",
        "Real-time video stream detection",
        "Audio deepfake detection",
        "Integration with social platforms",
        "Blockchain verification system",
      ],
    },
  ];

  const upcomingFeatures = [
    {
      icon: "🎬",
      title: "Real-time Stream Detection",
      description: "Detect deepfakes in live video streams and webcam feeds",
      eta: "Q1 2025",
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description: "Native iOS and Android applications with offline support",
      eta: "Q1 2025",
    },
    {
      icon: "🔌",
      title: "Browser Extension",
      description: "One-click detection directly from your browser",
      eta: "Q1 2025",
    },
    {
      icon: "🤝",
      title: "Team Collaboration",
      description: "Share analyses and collaborate with team members",
      eta: "Q1 2025",
    },
    {
      icon: "🌐",
      title: "Social Media Integration",
      description: "Detect content directly from Twitter, TikTok, Instagram",
      eta: "Q2 2025",
    },
    {
      icon: "🔐",
      title: "Blockchain Verification",
      description: "Cryptographically verify content authenticity",
      eta: "Q2 2025",
    },
    {
      icon: "🎤",
      title: "Voice Deepfake Detection",
      description: "Detect AI-generated audio and voice synthesis",
      eta: "Q2 2025",
    },
    {
      icon: "⚡",
      title: "Custom Models",
      description: "Train custom detection models for specific use cases",
      eta: "Q3 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_80%,transparent_20%)] backdrop-blur-md border-b border-[var(--border-color)] py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Product Roadmap
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              See what's coming to TruthMatrix
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12">Development Timeline</h2>
          <div className="space-y-8">
            {phases.map((phaseData, i) => (
              <div key={i} className={`bg-gradient-to-r ${phaseData.color} border border-[var(--border-color)] rounded-xl p-8`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{phaseData.phase}</h3>
                    <p className="text-[var(--text-secondary)] mt-1">{phaseData.status}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phaseData.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="text-[var(--accent-primary)] mt-1">✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Features */}
        <div>
          <h2 className="text-3xl font-bold mb-12">Upcoming Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] hover:border-[var(--accent-primary)]/50 transition"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-4">{feature.description}</p>
                <div className="inline-block px-3 py-1 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs font-semibold rounded-full">
                  {feature.eta}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback CTA */}
        <div className="mt-16 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Have a Feature Idea?</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            We'd love to hear what you think! Share your feature requests and feedback with us.
          </p>
          <a
            href="mailto:arhanansari2009@gmail.com?subject=TruthMatrix%20Feature%20Request&body=Hi%20TruthMatrix%20Team%2C%0A%0AI%20would%20like%20to%20suggest%20the%20following%20feature%3A%0A%0A%5BPlease%20describe%20your%20feature%20idea%20here%5D%0A%0AThank%20you!"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition"
          >
            Send Feedback →
          </a>
        </div>
      </div>
    </div>
  );
}
