"use client";
import Link from "next/link";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";

export default function APIDocumentation() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("✓ Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const endpoints = [
    {
      id: "deepfake-image",
      method: "POST",
      path: "/api/detect-deepfake",
      title: "Detect Image Deepfakes",
      description: "Analyze an image for deepfake indicators, AI generation, and manipulation signs.",
      params: [
        { name: "file", type: "File", required: true, description: "Image file (PNG, JPG, GIF, max 10MB)" },
        { name: "description", type: "String", required: false, description: "Optional context about the image" },
      ],
      response: {
        authenticityScore: "number (0-100)",
        classification: "AUTHENTIC | LIKELY_FAKE | AI_GENERATED | SUSPICIOUS",
        confidence: "number (0-100)",
        deepfakeIndicators: "string[]",
        aiGenerationSigns: "string[]",
        manipulationSigns: "string[]",
        reasoning: "string",
        recommendations: "string[]",
      },
      example: `curl -X POST http://localhost:3000/api/detect-deepfake \
  -F "file=@image.jpg" \
  -F "description=Person in photo"`,
    },
    {
      id: "deepfake-video",
      method: "POST",
      path: "/api/detect-deepfake-video",
      title: "Detect Video Deepfakes",
      description: "Analyze a video for deepfake indicators, frame inconsistencies, and synthetic content.",
      params: [
        { name: "file", type: "File", required: true, description: "Video file (MP4, WebM, Ogg, max 500MB)" },
        { name: "description", type: "String", required: false, description: "Optional context about the video" },
      ],
      response: {
        authenticityScore: "number (0-100)",
        classification: "AUTHENTIC | LIKELY_FAKE | AI_GENERATED | SUSPICIOUS",
        confidence: "number (0-100)",
        deepfakeIndicators: "string[]",
        reasoning: "string",
        videoInfo: "{ filename, size, duration, frameCount }",
      },
      example: `curl -X POST http://localhost:3000/api/detect-deepfake-video \
  -F "file=@video.mp4" \
  -F "description=News broadcast"`,
    },
    {
      id: "news-detection",
      method: "POST",
      path: "/api/detect-news",
      title: "Detect Fake News",
      description: "Analyze text for misinformation, bias, credibility score, and fact-checking recommendations.",
      params: [
        { name: "text", type: "String", required: true, description: "News article or text to analyze (max 5000 chars)" },
        { name: "source", type: "String", required: false, description: "Original source URL or publication" },
      ],
      response: {
        credibilityScore: "number (0-100)",
        misinformationRisk: "LOW | MEDIUM | HIGH",
        confidence: "number (0-100)",
        suspiciousIndicators: "string[]",
        factCheckLinks: "string[]",
        recommendations: "string[]",
      },
      example: `curl -X POST http://localhost:3000/api/detect-news \
  -H "Content-Type: application/json" \
  -d '{"text":"Article content here","source":"example.com"}'`,
    },
  ];

  const rateLimiting = [
    { tier: "Free", requests: "100/hour", responsesPerMinute: "10", maxFileSize: "10MB" },
    { tier: "Pro", requests: "10,000/hour", responsesPerMinute: "100", maxFileSize: "500MB" },
    { tier: "Enterprise", requests: "Unlimited", responsesPerMinute: "1000+", maxFileSize: "5GB" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_80%,transparent_20%)] backdrop-blur-md border-b border-[var(--border-color)] py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Build with TruthMatrix - Integrate AI-powered detection into your applications
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
        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">🚀 Quick Start</h2>
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 space-y-4">
            <p className="text-[var(--text-secondary)]">
              To use the TruthMatrix API, you need an API key. Get one free at the dashboard.
            </p>
            <div className="bg-[var(--surface)]/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <span className="text-[var(--text-secondary)]">Authorization: Bearer YOUR_API_KEY</span>
            </div>
            <p className="text-[var(--text-secondary)]">
              All requests must include your API key in the Authorization header.
            </p>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">📡 API Endpoints</h2>
          <div className="space-y-8">
            {endpoints.map((endpoint) => (
              <div key={endpoint.id} className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`px-4 py-2 rounded-lg font-bold text-white ${endpoint.method === "POST" ? "bg-blue-600" : "bg-green-600"}`}>
                    {endpoint.method}
                  </div>
                  <div>
                    <code className="font-mono text-[var(--accent-primary)]">{endpoint.path}</code>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">{endpoint.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] mb-4">{endpoint.description}</p>

                {/* Parameters */}
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Parameters:</h4>
                  <div className="space-y-2">
                    {endpoint.params.map((param, i) => (
                      <div key={i} className="bg-[var(--surface)]/50 p-3 rounded border border-[var(--border-color)]">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-[var(--accent-primary)]">{param.name}</code>
                          <span className="text-xs bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] px-2 py-1 rounded">
                            {param.type}
                          </span>
                          {param.required && <span className="text-xs text-red-500">required</span>}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example */}
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Example Request:</h4>
                  <div className="bg-[var(--surface)]/50 p-4 rounded border border-[var(--border-color)] relative">
                    <pre className="font-mono text-sm overflow-x-auto">{endpoint.example}</pre>
                    <button
                      onClick={() => copyToClipboard(endpoint.example, endpoint.id)}
                      className="absolute top-2 right-2 p-2 hover:bg-[var(--surface-hover)] rounded transition"
                    >
                      {copiedId === endpoint.id ? <FiCheck className="text-green-500" /> : <FiCopy />}
                    </button>
                  </div>
                </div>

                {/* Response */}
                <div>
                  <h4 className="font-bold mb-2">Response Format:</h4>
                  <div className="bg-[var(--surface)]/50 p-4 rounded border border-[var(--border-color)]">
                    <pre className="font-mono text-sm overflow-x-auto text-[var(--text-secondary)]">
                      {JSON.stringify(
                        {
                          analysis: endpoint.response,
                          timestamp: "2025-12-06T12:34:56Z",
                          modelUsed: "Gemini 2.5 Flash",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rate Limiting */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">⚙️ Rate Limiting</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--surface)]/50 border-b border-[var(--border-color)]">
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-left">Requests/Hour</th>
                  <th className="px-4 py-3 text-left">Max File Size</th>
                  <th className="px-4 py-3 text-left">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {rateLimiting.map((tier, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[var(--surface)]/30">
                    <td className="px-4 py-3 font-bold">{tier.tier}</td>
                    <td className="px-4 py-3">{tier.requests}</td>
                    <td className="px-4 py-3">{tier.maxFileSize}</td>
                    <td className="px-4 py-3">&lt; 1 second</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">❌ Error Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { code: 400, message: "Bad Request", desc: "Invalid parameters or malformed request" },
              { code: 401, message: "Unauthorized", desc: "Invalid or missing API key" },
              { code: 403, message: "Forbidden", desc: "API key doesn't have permission" },
              { code: 429, message: "Too Many Requests", desc: "Rate limit exceeded" },
              { code: 500, message: "Server Error", desc: "Internal server error" },
              { code: 503, message: "Service Unavailable", desc: "Server temporarily down" },
            ].map((error, i) => (
              <div key={i} className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-4">
                <div className="text-red-500 font-bold mb-1">{error.code}</div>
                <div className="font-semibold">{error.message}</div>
                <p className="text-[var(--text-secondary)] text-sm mt-2">{error.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Integrate?</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Get your API key and start building with TruthMatrix today
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition"
          >
            Get API Key →
          </Link>
        </div>
      </div>
    </div>
  );
}
