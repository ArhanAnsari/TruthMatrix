"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FiLoader, FiTrash2, FiDownload, FiBarChart } from "react-icons/fi";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { appwriteService } from "@/app/lib/appwrite";

interface AnalysisRecord {
  $id: string;
  userId: string;
  authenticityScore: number;
  classification: string;
  mediaType: 'image' | 'video';
  timestamp: string;
  reasoning: string;
}

export default function DashboardPage() {
  const { user, isSignedIn } = useUser();
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    authenticCount: 0,
    manipulatedCount: 0,
    deepfakeCount: 0,
    avgScore: 0,
  });

  useEffect(() => {
    if (isSignedIn && user?.id) {
      loadHistory();
    }
  }, [isSignedIn, user?.id]);

  const loadHistory = async () => {
    try {
      const data = await appwriteService.getAnalysisHistory(user!.id, 50);
      setHistory(data);

      // Calculate statistics
      if (data.length > 0) {
        const authenticated = data.filter((d) => d.classification === "AUTHENTIC").length;
        const manipulated = data.filter((d) => d.classification === "PARTIALLY_MANIPULATED").length;
        const deepfake = data.filter((d) => d.classification === "DEEPFAKE").length;
        const avgScore = Math.round(
          data.reduce((sum, d) => sum + d.authenticityScore, 0) / data.length
        );

        setStats({
          totalAnalyses: data.length,
          authenticCount: authenticated,
          manipulatedCount: manipulated,
          deepfakeCount: deepfake,
          avgScore,
        });
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await appwriteService.deleteAnalysis(id);
      setHistory(history.filter((h) => h.$id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleExport = () => {
    const csv = [
      ["Timestamp", "Media Type", "Classification", "Authenticity Score", "Reasoning"],
      ...history.map((h) => [
        new Date(h.timestamp).toLocaleDateString(),
        h.mediaType,
        h.classification.replace(/_/g, " "),
        h.authenticityScore,
        h.reasoning.substring(0, 50) + "...",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis-history.csv";
    a.click();
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center text-slate-400">
          <p className="text-lg">Please sign in to view your dashboard</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FiLoader className="text-4xl text-blue-400 animate-spin" />
          <p className="text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user?.firstName || user?.primaryEmailAddress?.emailAddress}</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 p-6 rounded-xl">
            <p className="text-slate-400 text-sm mb-2">Total Analyses</p>
            <p className="text-3xl font-bold text-blue-300">{stats.totalAnalyses}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 p-6 rounded-xl">
            <p className="text-slate-400 text-sm mb-2">Authentic</p>
            <p className="text-3xl font-bold text-green-300">{stats.authenticCount}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 p-6 rounded-xl">
            <p className="text-slate-400 text-sm mb-2">Manipulated</p>
            <p className="text-3xl font-bold text-yellow-300">{stats.manipulatedCount}</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 p-6 rounded-xl">
            <p className="text-slate-400 text-sm mb-2">Deepfakes</p>
            <p className="text-3xl font-bold text-red-300">{stats.deepfakeCount}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 p-6 rounded-xl">
            <p className="text-slate-400 text-sm mb-2">Avg Score</p>
            <p className="text-3xl font-bold text-purple-300">{stats.avgScore}%</p>
          </div>
        </div>

        {/* Charts */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Classification Distribution */}
            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiBarChart /> Classification Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Authentic", value: stats.authenticCount },
                    { name: "Manipulated", value: stats.manipulatedCount },
                    { name: "Deepfake", value: stats.deepfakeCount },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Authenticity Trend */}
            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Authenticity Scores Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history.slice(-10).reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                  <Line type="monotone" dataKey="authenticityScore" stroke="#3b82f6" dot={{ fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Analysis History Table */}
        <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
            {history.length > 0 && (
              <button
                onClick={handleExport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <FiDownload /> Export CSV
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No analyses yet. Start detecting now!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-300">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Classification</th>
                    <th className="text-left py-3 px-4">Score</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record) => (
                    <tr key={record.$id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                      <td className="py-3 px-4">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">
                          {record.mediaType === "video" ? "🎬 Video" : "📷 Image"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.classification === "AUTHENTIC"
                              ? "bg-green-500/20 text-green-300"
                              : record.classification === "PARTIALLY_MANIPULATED"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {record.classification.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-blue-300">
                        {record.authenticityScore}%
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(record.$id)}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded transition"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
