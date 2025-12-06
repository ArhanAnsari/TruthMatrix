"use client";
import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiCheckCircle } from "react-icons/fi";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("deepfakes");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const deepfakeContent = [
    {
      title: "What is a Deepfake?",
      description:
        "Deepfakes are synthetic media created by AI that can manipulate faces, voices, and entire bodies in videos. The term combines 'deep learning' and 'fake.' They can make it appear that someone said or did something they never did.",
    },
    {
      title: "How Are They Made?",
      description:
        "Deepfakes are typically created using generative AI models like GANs (Generative Adversarial Networks) and autoencoders. They require thousands of images of a face to train the model, then the AI learns to generate realistic-looking videos by swapping faces or manipulating expressions.",
    },
    {
      title: "Why Are They Dangerous?",
      description:
        "Deepfakes can spread misinformation, damage reputations, influence elections, and cause financial harm. They're becoming harder to detect and can be used for fraud, blackmail, and political manipulation.",
    },
    {
      title: "How Can You Spot Them?",
      description:
        "Look for: Unnatural blinking patterns, strange facial expressions, lighting inconsistencies, audio-visual sync issues, strange eye movements, and flickering around face edges. However, AI-generated content is becoming more realistic daily.",
    },
  ];

  const misinformationContent = [
    {
      title: "Understanding Misinformation",
      description:
        "Misinformation is false information spread regardless of intent. Disinformation is deliberately false information spread with harmful intent. Both can damage trust in institutions and influence public opinion.",
    },
    {
      title: "Psychological Tactics",
      description:
        "Misinformation exploits cognitive biases like confirmation bias (believing info that confirms existing beliefs), emotional appeal (using fear or anger), and social proof (believing something because many do). Understanding these helps you stay critical.",
    },
    {
      title: "Red Flags to Watch For",
      description:
        "Watch for: All-caps headlines, emotional language, lack of credible sources, grammatical errors, requests to share before reading, contradictions with trusted sources, and posts from unverified accounts.",
    },
    {
      title: "Fact-Checking Steps",
      description:
        "1. Check the source - Is it reputable? 2. Cross-reference - Do other sources agree? 3. Check the date - Is the info current? 4. Look for author - Is there a credible author? 5. Check for bias - Is the outlet neutral?",
    },
  ];

  const faqItems = [
    {
      question: "How accurate is TruthMatrix?",
      answer:
        "TruthMatrix achieves 99.2% accuracy on our benchmark datasets. However, no detection system is 100% accurate. We recommend combining automated detection with critical thinking and cross-referencing.",
    },
    {
      question: "Can TruthMatrix detect all deepfakes?",
      answer:
        "While we detect most deepfakes, highly sophisticated AI-generated content created with cutting-edge models may sometimes bypass detection. This is an ongoing arms race between deepfake creators and detectors.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "For images: PNG, JPG, GIF. For videos: MP4, WebM, Ogg. Maximum sizes: Images 10MB, Videos 500MB.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes, your analysis data is stored locally in your browser. We don't send your files to external servers except to Gemini AI for analysis. All communications are encrypted.",
    },
    {
      question: "Can I use TruthMatrix for commercial purposes?",
      answer:
        "Please contact us at arhanansari2009@gmail.com to discuss commercial licensing options.",
    },
  ];

  const tips = [
    "🔍 Always verify information from multiple sources",
    "⏰ Check when the content was created - older content taken out of context spreads easily",
    "📸 Reverse image search can help find the original source",
    "🔊 Listen for audio anomalies and sync issues in videos",
    "😊 Be skeptical of emotional manipulation and outrage-inducing content",
    "👤 Check author credentials and look for author bias",
    "📰 Prefer established news outlets with editorial standards",
    "🤖 Use AI detection tools as a supplement, not a replacement for critical thinking",
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_80%,transparent_20%)] backdrop-blur-md border-b border-[var(--border-color)] py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Learn & Educate
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Understand misinformation and deepfakes
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
        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("deepfakes")}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === "deepfakes"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            🎬 Deepfakes
          </button>
          <button
            onClick={() => setActiveTab("misinformation")}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === "misinformation"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            📰 Misinformation
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === "tips"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            💡 Tips & Tricks
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === "faq"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            ❓ FAQ
          </button>
        </div>

        {/* Content */}
        {activeTab === "deepfakes" && (
          <div className="space-y-6">
            {deepfakeContent.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] transition"
              >
                <h3 className="text-xl font-bold mb-3 text-[var(--accent-primary)]">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "misinformation" && (
          <div className="space-y-6">
            {misinformationContent.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] transition"
              >
                <h3 className="text-xl font-bold mb-3 text-[var(--accent-secondary)]">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 border border-[var(--accent-primary)]/30 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="text-2xl flex-shrink-0">{tip.split(" ")[0]}</div>
                <p className="text-[var(--text-secondary)]">{tip.slice(2)}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-[var(--surface-hover)] transition"
                >
                  <h3 className="font-semibold text-left">{item.question}</h3>
                  <FiChevronDown
                    className={`flex-shrink-0 transition ${expandedFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 py-4 bg-[var(--surface)]/50 border-t border-[var(--border-color)] text-[var(--text-secondary)]">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Detecting?</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Put your knowledge to the test with real-time AI-powered detection
          </p>
          <Link
            href="/detector"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition"
          >
            Try Detector Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
