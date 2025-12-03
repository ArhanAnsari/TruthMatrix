"use client";

import { useState } from "react";
import Link from "next/link";
import NewsDetector from "@/app/components/NewsDetector";
import DeepfakeDetector from "@/app/components/DeepfakeDetector";
import { FiArrowLeft } from "react-icons/fi";

export default function DetectorPage() {
  const [activeTab, setActiveTab] = useState<"news" | "deepfake">("news");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <FiArrowLeft />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Detection Tools
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-4">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-3 font-bold rounded-lg transition ${
                activeTab === "news"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              🔍 Fake News Detector
            </button>
            <button
              onClick={() => setActiveTab("deepfake")}
              className={`px-6 py-3 font-bold rounded-lg transition ${
                activeTab === "deepfake"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
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
