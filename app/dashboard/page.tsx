"use client";
import { useAnalysisStore, Analysis, AnalysisStats } from "@/app/lib/store";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiDownload, FiTrash2, FiStar, FiFilter, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { getAnalyses, getStats, removeAnalysis, toggleFavorite } = useAnalysisStore();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [stats, setStats] = useState<AnalysisStats>({
    total: 0,
    byType: { image: 0, video: 0, text: 0 },
    avgConfidence: 0,
  });
  const [filter, setFilter] = useState<"all" | "image" | "video" | "text">("all");
  const [sortBy, setSortBy] = useState<"recent" | "confidence">("recent");

  useEffect(() => {
    const allAnalyses = getAnalyses();
    setAnalyses(allAnalyses);
    setStats(getStats());
  }, [getAnalyses, getStats]);

  const filteredAnalyses = analyses
    .filter((a) => (filter === "all" ? true : a.type === filter))
    .sort((a, b) => {
      if (sortBy === "recent") return b.timestamp - a.timestamp;
      return b.confidence - a.confidence;
    });

  const chartData = analyses.map((a) => ({
    date: new Date(a.timestamp).toLocaleDateString(),
    confidence: a.confidence,
  }));

  const typeData = [
    { name: "Images", value: stats.byType.image || 0, color: "#3b82f6" },
    { name: "Videos", value: stats.byType.video || 0, color: "#a855f7" },
    { name: "Text", value: stats.byType.text || 0, color: "#ec4899" },
  ];

  const exportAsCSV = () => {
    const headers = ["ID", "Type", "Filename", "Confidence", "Date"];
    const rows = analyses.map((a) => [
      a.id,
      a.type,
      a.fileName,
      a.confidence.toFixed(2),
      new Date(a.timestamp).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `truthmatrix-analyses-${Date.now()}.csv`;
    a.click();
    toast.success("✅ CSV exported successfully!");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_80%,transparent_20%)] backdrop-blur-md border-b border-[var(--border-color)] py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                Your Dashboard
              </h1>
              <p className="text-[var(--text-secondary)] mt-2">
                Track and analyze your detection history
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] transition">
            <p className="text-[var(--text-secondary)] text-sm">Total Analyses</p>
            <p className="text-4xl font-bold text-[var(--accent-primary)] mt-2">{stats.total}</p>
          </div>
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] transition">
            <p className="text-[var(--text-secondary)] text-sm">Images Analyzed</p>
            <p className="text-4xl font-bold text-[var(--accent-secondary)] mt-2">{stats.byType.image || 0}</p>
          </div>
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] transition">
            <p className="text-[var(--text-secondary)] text-sm">Videos Analyzed</p>
            <p className="text-4xl font-bold text-[var(--accent-tertiary)] mt-2">{stats.byType.video || 0}</p>
          </div>
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:bg-[var(--surface-hover)] transition">
            <p className="text-[var(--text-secondary)] text-sm">Avg. Confidence</p>
            <p className="text-4xl font-bold text-[var(--accent-primary)] mt-2">
              {(stats.avgConfidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Confidence Over Time */}
          <div className="md:col-span-2 bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Confidence Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="date" tick={{ fill: "var(--text-secondary)" }} />
                <YAxis tick={{ fill: "var(--text-secondary)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-color)",
                  }}
                />
                <Line type="monotone" dataKey="confidence" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Analysis Distribution */}
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Analysis Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {typeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters & Export */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-[var(--surface)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)]"
          >
            <option value="all">All Types</option>
            <option value="image">Images Only</option>
            <option value="video">Videos Only</option>
            <option value="text">Text Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-[var(--surface)] border border-[var(--border-color)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)]"
          >
            <option value="recent">Most Recent</option>
            <option value="confidence">Highest Confidence</option>
          </select>

          <button
            onClick={exportAsCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/80 transition"
          >
            <FiDownload /> Export CSV
          </button>
        </div>

        {/* Analysis History */}
        <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--surface)]/50 border-b border-[var(--border-color)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">File</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Confidence</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {filteredAnalyses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                      No analyses yet. Start by <Link href="/detector" className="text-[var(--accent-primary)] hover:underline">uploading content</Link>
                    </td>
                  </tr>
                ) : (
                  filteredAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-[var(--surface-hover)]/30 transition">
                      <td className="px-6 py-4 text-sm truncate">{analysis.fileName}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full text-xs font-semibold">
                          {analysis.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {(analysis.confidence * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                        {new Date(analysis.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right flex gap-2 justify-end">
                        <button
                          onClick={() => toggleFavorite(analysis.id)}
                          className="p-2 hover:bg-[var(--surface-hover)] rounded-lg transition"
                          title={analysis.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <FiStar
                            fill={analysis.isFavorite ? "currentColor" : "none"}
                            className={analysis.isFavorite ? "text-yellow-500" : ""}
                          />
                        </button>
                        <button
                          onClick={() => {
                            removeAnalysis(analysis.id);
                            setAnalyses(analyses.filter((a) => a.id !== analysis.id));
                            toast.success("❌ Analysis deleted");
                          }}
                          className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
