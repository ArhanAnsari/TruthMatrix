"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>
        <div className="rounded-2xl overflow-hidden border border-slate-700/50">
          <UserProfile appearance={{ baseTheme: dark }} />
        </div>
      </div>
    </div>
  );
}
