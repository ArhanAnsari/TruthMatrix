"use client";

import { useState } from "react";
import Link from "next/link";
import NewsDetector from "@/app/components/NewsDetector";
import DeepfakeDetector from "@/app/components/DeepfakeDetector";
import { FiArrowLeft } from "react-icons/fi";

export default function DetectorPage() {
  const [activeTab, setActiveTab] = useState<"news" | "deepfake">("news");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition transform hover:scale-105">
            <FiArrowLeft />
            Back Home
          </Link>
          <h1 className="text-3xl font-bold text-white animate-neon-glow">
            Detection Tools
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-4">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-3 font-bold rounded-lg transition transform hover:scale-105 ${
                activeTab === "news"
                  ? "bg-blue-500/20 text-blue-300 border-b-2 border-blue-400 shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🔍 Fake News Detector
            </button>
            <button
              onClick={() => setActiveTab("deepfake")}
              className={`px-6 py-3 font-bold rounded-lg transition transform hover:scale-105 ${
                activeTab === "deepfake"
                  ? "bg-purple-500/20 text-purple-300 border-b-2 border-purple-400 shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🎭 Deepfake Detector
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === "news" && <NewsDetector />}
        {activeTab === "deepfake" && <DeepfakeDetector />}
      </main>
    </div>
  );
}
