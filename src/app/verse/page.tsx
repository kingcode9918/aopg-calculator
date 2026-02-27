"use client";
import Calculator from "./views/calculator";
import Navbar from "./views/navbar";

export default function VerseCalculator() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <Navbar />

      <main className="flex flex-col gap-8 items-center sm:items-start p-4">
        <Calculator />

        <div className="fixed bottom-3 right-3 group cursor-help">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Need help?
          </div>
          <div className="absolute bottom-6 right-0 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg w-44">
            If there&apos;s a wrong value, DM me on Discord:
            <span className="font-semibold block mt-1">kingcode99</span>
          </div>
        </div>
      </main>
    </div>
  );
}
