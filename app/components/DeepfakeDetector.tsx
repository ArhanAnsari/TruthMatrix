"use client";

import { useState, useRef } from "react";
import { FiUpload, FiLoader } from "react-icons/fi";
import Image from "next/image";

interface DeepfakeAnalysis {
  authenticityScore: number;
  classification: string;
  confidence: number;
  deepfakeIndicators: string[];
  aiGenerationSigns: string[];
  manipulationSigns: string[];
  analysisDetails: {
    faceAnalysis: string;
    textureAnalysis: string;
    lightingAnalysis: string;
    eyeAnalysis: string;
    hairAnalysis: string;
    shadowAnalysis: string;
    backgroundAnalysis: string;
  };
  reasoning: string;
  recommendations: string[];
}

export default function DeepfakeDetector() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeepfakeAnalysis | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select an image to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);

      const response = await fetch("/api/detect-deepfake", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
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

  const getAuthenticityColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getClassificationColor = (classification: string) => {
    if (classification === "AUTHENTIC") return "bg-green-100 text-green-800";
    if (classification === "LIKELY_FAKE") return "bg-red-100 text-red-800";
    if (classification === "AI_GENERATED")
      return "bg-orange-100 text-orange-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          🎭 Deepfake Detector
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Upload an image to detect deepfakes, AI-generated content, and
          manipulations
        </p>

        {/* Upload Section */}
        <div className="space-y-4 mb-6">
          {/* File Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
            <FiUpload className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain bg-gray-100 dark:bg-gray-800"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Context (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Person's name, context, or any known details..."
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FiUpload />
                Analyze Image
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
            {/* Authenticity Score */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border border-purple-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Authenticity Score
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
                      strokeDasharray={`${(result.authenticityScore * 3.77) / 100} 377`}
                      className={`transition-all duration-1000 ${getAuthenticityColor(result.authenticityScore)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${getAuthenticityColor(result.authenticityScore)}`}
                    >
                      {result.authenticityScore}%
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

            {/* Deepfake Indicators */}
            {result.deepfakeIndicators && result.deepfakeIndicators.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3">
                  🎭 Deepfake Indicators
                </h3>
                <ul className="space-y-2">
                  {result.deepfakeIndicators.map((indicator, i) => (
                    <li
                      key={i}
                      className="text-red-800 dark:text-red-200 flex gap-2"
                    >
                      <span className="text-red-600 dark:text-red-400 font-bold">
                        •
                      </span>
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Generation Signs */}
            {result.aiGenerationSigns && result.aiGenerationSigns.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-3">
                  🤖 AI Generation Signs
                </h3>
                <ul className="space-y-2">
                  {result.aiGenerationSigns.map((sign, i) => (
                    <li
                      key={i}
                      className="text-orange-800 dark:text-orange-200 flex gap-2"
                    >
                      <span className="text-orange-600 dark:text-orange-400 font-bold">
                        •
                      </span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Manipulation Signs */}
            {result.manipulationSigns && result.manipulationSigns.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
                  ⚠️ Manipulation Signs
                </h3>
                <ul className="space-y-2">
                  {result.manipulationSigns.map((sign, i) => (
                    <li
                      key={i}
                      className="text-yellow-800 dark:text-yellow-200 flex gap-2"
                    >
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                        •
                      </span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Analysis */}
            {result.analysisDetails && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
                  🔬 Detailed Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(result.analysisDetails).map(([key, value]) => (
                    <div key={key} className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold text-blue-900 dark:text-blue-300 capitalize mb-1">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reasoning */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
                📊 Analysis Reasoning
              </h3>
              <p className="text-indigo-900 dark:text-indigo-200 leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
                  💡 Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="text-green-800 dark:text-green-200 flex gap-2"
                    >
                      <span className="text-green-600 dark:text-green-400 font-bold">
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
