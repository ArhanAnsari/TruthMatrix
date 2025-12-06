"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    avgResponseTime: 245,
    accuracy: 99.2,
    uptime: 99.97,
    queriesProcessed: 15420,
  });

  const performanceData = [
    { time: "12:00", responseTime: 245, accuracy: 99.2, requests: 120 },
    { time: "12:15", responseTime: 238, accuracy: 99.1, requests: 135 },
    { time: "12:30", responseTime: 251, accuracy: 99.3, requests: 128 },
    { time: "12:45", responseTime: 242, accuracy: 99.2, requests: 142 },
    { time: "13:00", responseTime: 249, accuracy: 99.4, requests: 155 },
    { time: "13:15", responseTime: 239, accuracy: 99.1, requests: 131 },
    { time: "13:30", responseTime: 248, accuracy: 99.3, requests: 148 },
  ];

  const accuracyByType = [
    { type: "Image Deepfakes", accuracy: 99.8, samples: 5240 },
    { type: "Video Deepfakes", accuracy: 98.9, samples: 3120 },
    { type: "News Text", accuracy: 99.1, samples: 7060 },
  ];

  const features = [
    { label: "Average Response Time", value: "245ms", icon: "⚡" },
    { label: "Overall Accuracy", value: "99.2%", icon: "🎯" },
    { label: "System Uptime", value: "99.97%", icon: "✅" },
    { label: "Total Queries Processed", value: "15,420", icon: "📊" },
    { label: "Active Users (24h)", value: "2,341", icon: "👥" },
    { label: "API Calls Today", value: "487,234", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_80%,transparent_20%)] backdrop-blur-md border-b border-[var(--border-color)] py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Performance Metrics
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Real-time system performance and accuracy statistics
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[var(--surface-hover)] to-[var(--surface)]/50 border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--accent-primary)]/50 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{feature.icon}</div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm mb-2">{feature.label}</p>
              <p className="text-3xl font-bold">{feature.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Response Time Chart */}
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Response Time Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="time" tick={{ fill: "var(--text-secondary)" }} />
                <YAxis tick={{ fill: "var(--text-secondary)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-color)",
                  }}
                />
                <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Accuracy Trend */}
          <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Accuracy Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="time" tick={{ fill: "var(--text-secondary)" }} />
                <YAxis tick={{ fill: "var(--text-secondary)" }} domain={[98.5, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-color)",
                  }}
                />
                <Area type="monotone" dataKey="accuracy" fill="#a855f7" stroke="#a855f7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy by Type */}
        <div className="bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl p-6 mb-12">
          <h3 className="text-xl font-bold mb-6">Accuracy by Detection Type</h3>
          <div className="space-y-4">
            {accuracyByType.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{item.type}</span>
                  <span className="text-[var(--accent-primary)] font-bold">{item.accuracy.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[var(--surface)]/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] h-full transition-all"
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{item.samples.toLocaleString()} samples tested</p>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Info */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Service Level Agreement (SLA)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-[var(--text-secondary)] text-sm mb-2">Uptime Guarantee</p>
              <p className="text-3xl font-bold text-green-500">99.99%</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] text-sm mb-2">Max Response Time</p>
              <p className="text-3xl font-bold text-green-500">500ms</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] text-sm mb-2">Support Response</p>
              <p className="text-3xl font-bold text-green-500">&lt;1 hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
