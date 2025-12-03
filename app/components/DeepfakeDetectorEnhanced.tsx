"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { FiUpload, FiLoader, FiX, FiCheckCircle, FiAlertTriangle, FiChevronDown, FiPlay } from "react-icons/fi";
import ReactPlayer from "react-player";
import Image from "next/image";
import RichContentRenderer from "./RichContentRenderer";
import { appwriteService } from "@/app/lib/appwrite";

interface DeepfakeAnalysis {
  authenticityScore: number;
  classification: string;
  confidence: number;
  mediaType: 'image' | 'video';
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

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB for video, 100MB for image

export default function DeepfakeDetectorEnhanced() {
  const { user, isSignedIn } = useUser();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeepfakeAnalysis | null>(null);
  const [error, setError] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("indicators");
  const [savingToAppwrite, setSavingToAppwrite] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Determine file type
    const isImage = selectedFile.type.startsWith("image/");
    const isVideo = selectedFile.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setError("Please select a valid image or video file");
      return;
    }

    // Check file size
    const maxSize = isVideo ? 500 * 1024 * 1024 : 100 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError(`File too large. Max size: ${isVideo ? "500MB" : "100MB"}`);
      return;
    }

    // Supported formats
    const supportedImage = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const supportedVideo = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];

    if (isImage && !supportedImage.includes(selectedFile.type)) {
      setError("Unsupported image format. Use: JPG, PNG, WebP, GIF");
      return;
    }

    if (isVideo && !supportedVideo.includes(selectedFile.type)) {
      setError("Unsupported video format. Use: MP4, WebM, MOV, AVI");
      return;
    }

    setFile(selectedFile);
    setMediaType(isImage ? "image" : "video");
    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file to analyze");
      return;
    }

    if (!isSignedIn) {
      setError("Please sign in to analyze media");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const endpoint = mediaType === "image" ? "/api/detect-deepfake" : "/api/detect-deepfake-video";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: base64,
          description,
          mediaType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze media");
      }

      const data = await response.json();
      const analysisResult = {
        ...data.analysis,
        mediaType,
      };

      setResult(analysisResult);

      // Save to Appwrite if user is signed in
      if (user?.id && mediaType) {
        try {
          setSavingToAppwrite(true);
          const saveResult = await appwriteService.saveAnalysis(user.id, analysisResult, mediaType);
          if (!saveResult.success) {
            console.warn("Analysis not saved to Appwrite:", saveResult.error);
          }
        } catch (saveError) {
          console.error("Failed to save analysis to Appwrite:", saveError);
          // Don't show error to user - analysis still succeeded
        } finally {
          setSavingToAppwrite(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const getAuthenticityColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getClassificationColor = (classification: string) => {
    if (classification === "AUTHENTIC") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (classification === "PARTIALLY_MANIPULATED")
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  if (!isSignedIn) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur text-center">
          <FiAlertTriangle className="mx-auto text-yellow-400 text-5xl mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-slate-400 mb-6">
            Please sign in to use the Deepfake Detector with video support and analysis history.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur">
        <div className="flex items-center gap-3 mb-2">
          <FiUpload className="text-purple-400 text-3xl" />
          <h2 className="text-3xl font-bold text-white">
            Advanced Deepfake Detector
          </h2>
        </div>
        <p className="text-slate-400 mb-8">
          Upload images or videos (up to 500MB) to detect deepfakes and AI-generated content
        </p>

        {/* File Input Section */}
        <div className="space-y-4 mb-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-500/5 transition"
          >
            <FiUpload className="mx-auto text-purple-400 text-4xl mb-3" />
            <p className="text-white font-semibold mb-1">Drop file here or click to select</p>
            <p className="text-slate-400 text-sm">
              Supported: Images (JPG, PNG, WebP, GIF) and Videos (MP4, WebM, MOV, AVI)
            </p>
            <p className="text-slate-500 text-xs mt-2">Max: 100MB for images, 500MB for videos</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
          </div>

          {selectedFile && mediaType && (
            <div className="relative bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setFile(null);
                  setMediaType(null);
                }}
                className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/30 p-2 rounded text-red-400"
              >
                <FiX />
              </button>

              {mediaType === "image" ? (
                <div className="relative h-40 w-full">
                  <Image
                    src={selectedFile}
                    alt="Selected"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-40 bg-slate-800 rounded flex items-center justify-center">
                  <ReactPlayer
                    url={selectedFile}
                    width="100%"
                    height="100%"
                    controls
                    light
                  />
                </div>
              )}

              <p className="text-slate-300 text-sm mt-3">
                {mediaType === "image" ? "📷 Image" : "🎬 Video"} • {file?.name}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add context about the media..."
              className="w-full h-24 p-3 border-2 border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Analyzing {mediaType === "video" ? "Video" : "Image"}...
              </>
            ) : (
              <>
                <FiUpload />
                Analyze Media
              </>
            )}
          </button>

          {savingToAppwrite && (
            <div className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-3 rounded-lg flex gap-2 items-center">
              <FiLoader className="animate-spin flex-shrink-0" />
              Saving to your history...
            </div>
          )}
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
            {/* Authenticity Score */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">
                Authenticity Score
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#334155"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(result.authenticityScore / 100) * 440} 440`}
                      className={getAuthenticityColor(result.authenticityScore)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getAuthenticityColor(result.authenticityScore)}`}>
                      {result.authenticityScore}%
                    </span>
                    <span className="text-slate-400 text-xs mt-1">Authentic</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getClassificationColor(result.classification)}`}>
                      {result.classification.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="text-slate-300">
                    <span className="font-semibold">Confidence:</span> {result.confidence}%
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    {result.mediaType === "video" ? "🎬" : "📷"} {result.mediaType === "video" ? "Video" : "Image"} Analysis
                  </p>
                </div>
              </div>
            </div>

            {/* Deepfake Indicators */}
            {result.deepfakeIndicators?.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === "indicators" ? null : "indicators")}
                className="w-full bg-red-500/10 border border-red-500/30 p-6 rounded-xl hover:bg-red-500/20 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2">
                    <FiAlertTriangle /> Deepfake Indicators
                  </h3>
                  <FiChevronDown className={`transition-transform ${expandedSection === "indicators" ? "rotate-180" : ""}`} />
                </div>
                {expandedSection === "indicators" && (
                  <div className="mt-4 space-y-3">
                    {result.deepfakeIndicators.map((indicator, i) => (
                      <div key={i} className="text-red-300 flex gap-3">
                        <span className="text-red-400 font-bold flex-shrink-0">⚠</span>
                        <div className="flex-1">
                          <RichContentRenderer content={indicator} className="prose-invert max-w-none text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            )}

            {/* AI Generation Signs */}
            {result.aiGenerationSigns?.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === "generation" ? null : "generation")}
                className="w-full bg-orange-500/10 border border-orange-500/30 p-6 rounded-xl hover:bg-orange-500/20 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-orange-300 flex items-center gap-2">
                    🤖 AI Generation Signs
                  </h3>
                  <FiChevronDown className={`transition-transform ${expandedSection === "generation" ? "rotate-180" : ""}`} />
                </div>
                {expandedSection === "generation" && (
                  <div className="mt-4 space-y-3">
                    {result.aiGenerationSigns.map((sign, i) => (
                      <div key={i} className="text-orange-300 flex gap-3">
                        <span className="text-orange-400 font-bold flex-shrink-0">•</span>
                        <div className="flex-1">
                          <RichContentRenderer content={sign} className="prose-invert max-w-none text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            )}

            {/* Manipulation Signs */}
            {result.manipulationSigns?.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === "manipulation" ? null : "manipulation")}
                className="w-full bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl hover:bg-yellow-500/20 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2">
                    ✂️ Manipulation Signs
                  </h3>
                  <FiChevronDown className={`transition-transform ${expandedSection === "manipulation" ? "rotate-180" : ""}`} />
                </div>
                {expandedSection === "manipulation" && (
                  <div className="mt-4 space-y-3">
                    {result.manipulationSigns.map((sign, i) => (
                      <div key={i} className="text-yellow-300 flex gap-3">
                        <span className="text-yellow-400 font-bold flex-shrink-0">•</span>
                        <div className="flex-1">
                          <RichContentRenderer content={sign} className="prose-invert max-w-none text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            )}

            {/* Detailed Analysis */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                🔍 Detailed Analysis
              </h3>
              <RichContentRenderer content={result.reasoning} className="prose-invert max-w-none" />
            </div>

            {/* Recommendations */}
            {result.recommendations?.length > 0 && (
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-green-300 mb-3">
                  💡 Recommendations
                </h3>
                <RichContentRenderer content={result.recommendations.join("\n- ")} className="prose-invert max-w-none" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
