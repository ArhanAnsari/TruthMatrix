"use client";

import { useState } from "react";
import { FiSearch, FiLoader, FiChevronDown, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

interface NewsAnalysis {
  credibilityScore: number;
  classification: string;
  confidence: number;
  keyFindings: string[];
  redFlags: string[];
  factsToVerify: string[];
  reasoning: string;
  recommendations: string[];
}

export default function NewsDetector() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NewsAnalysis | null>(null);
  const [error, setError] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("findings");

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter text to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/detect-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze news");
      }

      const data = await response.json();
      setResult(data.analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while analyzing"
      );
    } finally {
      setLoading(false);
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getClassificationColor = (classification: string) => {
    if (classification === "LIKELY_TRUE") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (classification === "UNVERIFIABLE")
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur">
        <div className="flex items-center gap-3 mb-2">
          <FiSearch className="text-blue-400 text-3xl" />
          <h2 className="text-3xl font-bold text-white">
            Fake News Detector
          </h2>
        </div>
        <p className="text-slate-400 mb-8">
          Paste news text or article content to verify its credibility
        </p>

        {/* Input Section */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              News Text / Article
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the news content here..."
              className="w-full h-32 p-4 border-2 border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Source (Optional)
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="News source or URL..."
              className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FiSearch />
                Analyze News
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex gap-2">
            <FiAlertTriangle className="flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-4 animate-fadeIn">
            {/* Credibility Score */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">
                Credibility Score
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-700"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(result.credibilityScore * 4.4) / 100} 439.8`}
                      className={`transition-all duration-1000 ${getCredibilityColor(result.credibilityScore)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-4xl font-bold ${getCredibilityColor(result.credibilityScore)}`}
                    >
                      {result.credibilityScore}%
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-400 mb-3">
                    Classification
                  </p>
                  <span
                    className={`inline-block px-4 py-2 rounded-full font-bold text-sm border ${getClassificationColor(result.classification)}`}
                  >
                    {result.classification.replace(/_/g, " ")}
                  </span>
                  <p className="text-sm text-slate-400 mt-4">
                    Confidence: <span className="font-bold text-slate-200">{result.confidence}%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key Findings */}
            {result.keyFindings && result.keyFindings.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === "findings" ? null : "findings")}
                className="w-full bg-green-500/10 border border-green-500/30 p-6 rounded-xl hover:bg-green-500/20 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2">
                    <FiCheckCircle /> Key Findings
                  </h3>
                  <FiChevronDown className={`transition-transform ${expandedSection === "findings" ? "rotate-180" : ""}`} />
                </div>
                {expandedSection === "findings" && (
                  <ul className="space-y-2 mt-4">
                    {result.keyFindings.map((finding, i) => (
                      <li key={i} className="text-green-300 flex gap-2">
                        <span className="text-green-400 font-bold">✓</span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            )}

            {/* Red Flags */}
            {result.redFlags && result.redFlags.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === "flags" ? null : "flags")}
                className="w-full bg-red-500/10 border border-red-500/30 p-6 rounded-xl hover:bg-red-500/20 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2">
                    <FiAlertTriangle /> Red Flags
                  </h3>
                  <FiChevronDown className={`transition-transform ${expandedSection === "flags" ? "rotate-180" : ""}`} />
                </div>
                {expandedSection === "flags" && (
                  <ul className="space-y-2 mt-4">
                    {result.redFlags.map((flag, i) => (
                      <li key={i} className="text-red-300 flex gap-2">
                        <span className="text-red-400 font-bold">⚠</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            )}

            {/* Facts to Verify */}
            {result.factsToVerify && result.factsToVerify.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === "facts" ? null : "facts")}
                className="w-full bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl hover:bg-yellow-500/20 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-yellow-300">
                    🔎 Facts to Verify
                  </h3>
                  <FiChevronDown className={`transition-transform ${expandedSection === "facts" ? "rotate-180" : ""}`} />
                </div>
                {expandedSection === "facts" && (
                  <ul className="space-y-2 mt-4">
                    {result.factsToVerify.map((fact, i) => (
                      <li key={i} className="text-yellow-300 flex gap-2">
                        <span className="text-yellow-400 font-bold">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            )}

            {/* Reasoning */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-indigo-300 mb-3">
                📊 Analysis Reasoning
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">
                  💡 Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="text-purple-300 flex gap-2"
                    >
                      <span className="text-purple-400 font-bold">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
