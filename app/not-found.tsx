"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* 404 Animation */}
        <div className="space-y-4">
          <h1 className="text-9xl font-black bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-4xl font-bold">Page Not Found</h2>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <p className="text-xl text-[var(--text-secondary)]">
            Looks like this page disappeared into the void like a poorly detected deepfake!
          </p>
          <p className="text-[var(--text-secondary)]">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <Link
            href="/"
            className="p-6 bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl hover:bg-[var(--surface-hover)] transition text-center"
          >
            <div className="text-3xl mb-2">🏠</div>
            <span className="font-semibold">Home</span>
          </Link>
          <Link
            href="/detector"
            className="p-6 bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl hover:bg-[var(--surface-hover)] transition text-center"
          >
            <div className="text-3xl mb-2">🔍</div>
            <span className="font-semibold">Detector</span>
          </Link>
          <Link
            href="/dashboard"
            className="p-6 bg-[var(--surface-hover)]/50 border border-[var(--border-color)] rounded-xl hover:bg-[var(--surface-hover)] transition text-center"
          >
            <div className="text-3xl mb-2">📊</div>
            <span className="font-semibold">Dashboard</span>
          </Link>
        </div>

        {/* CTA */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-bold hover:shadow-lg transition"
          >
            Return Home
          </Link>
          <a
            href="mailto:arhanansari2009@gmail.com?subject=TruthMatrix%20Issue%20Report&body=Hi%20TruthMatrix%20Team%2C%0A%0AI%20encountered%20a%20404%20error%20on%20the%20following%20page%3A%0A%0A%5BPlease%20describe%20the%20page%20or%20URL%20here%5D%0A%0APlease%20look%20into%20this.%0A%0AThank%20you!"
            className="px-8 py-3 border-2 border-[var(--border-color)] rounded-lg font-bold hover:border-[var(--accent-primary)] transition"
          >
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}
