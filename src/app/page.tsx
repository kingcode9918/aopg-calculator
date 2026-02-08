"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="flex flex-col gap-8 items-center p-8">
        <h1 className="text-5xl font-bold text-white mb-8">
          Choose Your Calculator
        </h1>

        <div className="flex gap-8 flex-wrap justify-center">
          {/* AOPG Calculator Card */}
          <Link href="/aopg">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 rounded-2xl p-8 w-80 h-64 flex flex-col items-center justify-center cursor-pointer shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform">
              <h2 className="text-3xl font-bold text-white mb-4">AOPG</h2>
              <p className="text-blue-100 text-center text-lg">
                A One Piece Game Calculator
              </p>
              <div className="mt-6 text-sm text-blue-200">Click to enter →</div>
            </div>
          </Link>

          {/* Verse Calculator Card */}
          <Link href="/verse">
            <div className="bg-gradient-to-br from-purple-600/50 to-purple-800/50 hover:from-purple-500 hover:to-purple-700 transition-all duration-300 rounded-2xl p-8 w-80 h-64 flex flex-col items-center justify-center cursor-pointer shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transform">
              <h2 className="text-3xl font-bold text-white mb-4">Verse</h2>
              <p className="text-purple-100 text-center text-lg">
                Verse Piece Calculator
              </p>
              <div className="mt-6 text-sm text-purple-200">
                Click to enter →
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="text-sm text-gray-400 mb-2">
            Last updated: February 8, 2026
          </div>
          <div className="text-xs text-gray-500">
            Need help? DM me on Discord:{" "}
            <span className="font-semibold text-gray-300">kingcode99</span>
          </div>
        </div>
      </main>
    </div>
  );
}
