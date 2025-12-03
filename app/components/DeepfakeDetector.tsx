"use client";

import { useState, useRef } from "react";
import { FiUpload, FiLoader, FiX, FiCheckCircle, FiAlertTriangle, FiChevronDown } from "react-icons/fi";
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
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeepfakeAnalysis | null>(null);
  const [error, setError] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("indicators");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isImage = selectedFile.type.startsWith("image/");
    const isVideo = selectedFile.type.startsWith("video/");

    if (mediaType === 'image' && !isImage) {
      setError("Please select a valid image file");
      return;
    }

    if (mediaType === 'video' && !isVideo) {
      setError("Please select a valid video file");
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (mediaType === 'image') {
        setSelectedImage(event.target?.result as string);
        setSelectedVideo(null);
      } else {
        setSelectedVideo(event.target?.result as string);
        setSelectedImage(null);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length === 0) return;

    const droppedFile = droppedFiles[0];
    const isImage = droppedFile.type.startsWith("image/");
    const isVideo = droppedFile.type.startsWith("video/");

    if (mediaType === 'image' && !isImage) {
      setError("Please drop a valid image file");
      return;
    }

    if (mediaType === 'video' && !isVideo) {
      setError("Please drop a valid video file");
      return;
    }

    setFile(droppedFile);
    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (mediaType === 'image') {
        setSelectedImage(event.target?.result as string);
        setSelectedVideo(null);
      } else {
        setSelectedVideo(event.target?.result as string);
        setSelectedImage(null);
      }
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      const fileType = mediaType === 'image' ? 'image' : 'video';
      setError(`Please select a ${fileType} to analyze`);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);

      const endpoint = mediaType === 'video' ? "/api/detect-deepfake-video" : "/api/detect-deepfake";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze ${mediaType}`);
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
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getClassificationColor = (classification: string) => {
    if (classification === "AUTHENTIC") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (classification === "LIKELY_FAKE") return "bg-red-500/20 text-red-300 border-red-500/30";
    if (classification === "AI_GENERATED")
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur">
        <div className="flex items-center gap-3 mb-2">
          <FiUpload className="text-purple-400 text-3xl" />
          <h2 className="text-3xl font-bold text-white">
            🎭 {mediaType === 'video' ? 'Video' : 'Image'} Deepfake Detector
          </h2>
        </div>
        <p className="text-slate-400 mb-8">
          Upload an image or video to detect deepfakes, AI-generated content, and
          manipulations
        </p>

        {/* Media Type Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setMediaType('image');
              setSelectedImage(null);
              setSelectedVideo(null);
              setFile(null);
              setError("");
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              mediaType === 'image'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🖼️ Image
          </button>
          <button
            onClick={() => {
              setMediaType('video');
              setSelectedImage(null);
              setSelectedVideo(null);
              setFile(null);
              setError("");
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              mediaType === 'video'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🎬 Video
          </button>
        </div>

        {/* Upload Section */}
        <div className="space-y-4 mb-6">
          {/* File Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              isDragging
                ? "border-purple-400 bg-purple-500/10"
                : "border-slate-600 hover:border-purple-400 hover:bg-purple-500/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={mediaType === 'video' ? 'video/*' : 'image/*'}
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
            <FiUpload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-300 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-slate-500 text-sm">
              {mediaType === 'video' ? 'MP4, WebM, Ogg up to 500MB' : 'PNG, JPG, GIF up to 10MB'}
            </p>
          </div>

          {/* Media Preview */}
          {(selectedImage || selectedVideo) && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-slate-600 bg-slate-700/50">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              )}
              {selectedVideo && (
                <video
                  src={selectedVideo}
                  controls
                  className="w-full h-full object-contain"
                />
              )}
              {file && (
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedVideo(null);
                    setFile(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-2 transition"
                >
                  <FiX className="text-white" />
                </button>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Additional Context (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Person's name, context, or any known details..."
              className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FiUpload />
                {mediaType === 'video' ? 'Analyze Video' : 'Analyze Image'}
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
                      strokeDasharray={`${(result.authenticityScore * 4.4) / 100} 439.8`}
                      className={`transition-all duration-1000 ${getAuthenticityColor(result.authenticityScore)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-4xl font-bold ${getAuthenticityColor(result.authenticityScore)}`}
                    >
                      {result.authenticityScore}%
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
