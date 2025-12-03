"use client";

import { useState } from "react";
import { FiSearch, FiLoader } from "react-icons/fi";

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
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getClassificationColor = (classification: string) => {
    if (classification === "LIKELY_TRUE") return "bg-green-100 text-green-800";
    if (classification === "UNVERIFIABLE")
      return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          🔍 Fake News Detector
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Paste news text or article content to verify its credibility
        </p>

        {/* Input Section */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              News Text / Article
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the news content here..."
              className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source (Optional)
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="News source or URL..."
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
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
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Credibility Score */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border border-blue-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Credibility Score
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-300 dark:text-gray-600"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(result.credibilityScore * 3.77) / 100} 377`}
                      className={`transition-all duration-1000 ${getCredibilityColor(result.credibilityScore)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${getCredibilityColor(result.credibilityScore)}`}
                    >
                      {result.credibilityScore}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Classification
                  </p>
                  <span
                    className={`inline-block px-4 py-2 rounded-full font-bold text-sm ${getClassificationColor(result.classification)}`}
                  >
                    {result.classification.replace(/_/g, " ")}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Confidence: <span className="font-bold">{result.confidence}%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key Findings */}
            {result.keyFindings && result.keyFindings.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
                  ✓ Key Findings
                </h3>
                <ul className="space-y-2">
                  {result.keyFindings.map((finding, i) => (
                    <li
                      key={i}
                      className="text-green-800 dark:text-green-200 flex gap-2"
                    >
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        •
                      </span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Flags */}
            {result.redFlags && result.redFlags.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3">
                  ⚠️ Red Flags
                </h3>
                <ul className="space-y-2">
                  {result.redFlags.map((flag, i) => (
                    <li key={i} className="text-red-800 dark:text-red-200 flex gap-2">
                      <span className="text-red-600 dark:text-red-400 font-bold">
                        •
                      </span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Facts to Verify */}
            {result.factsToVerify && result.factsToVerify.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
                  🔎 Facts to Verify
                </h3>
                <ul className="space-y-2">
                  {result.factsToVerify.map((fact, i) => (
                    <li
                      key={i}
                      className="text-yellow-800 dark:text-yellow-200 flex gap-2"
                    >
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                        •
                      </span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reasoning */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
                📊 Analysis Reasoning
              </h3>
              <p className="text-blue-900 dark:text-blue-200 leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3">
                  💡 Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="text-purple-800 dark:text-purple-200 flex gap-2"
                    >
                      <span className="text-purple-600 dark:text-purple-400 font-bold">
                        •
                      </span>
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
