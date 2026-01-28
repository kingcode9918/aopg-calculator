"use client";
import Calculator from "./views/calculator";
import Navbar from "./views/navbar";
import UpdateModal from "../components/UpdateModal";

export default function VerseCalculator() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <Navbar />

      <main className="flex flex-col gap-8 items-center sm:items-start p-4">
        <Calculator />

        {/* Footer / info */}
        <div className="fixed bottom-3 left-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>
            Verse Calculator v1.1.1.1 | Last updated: January 27, 2026
          </span>
          <UpdateModal
            updates={[
              {
                version: "v1.1.1.2",
                date: "January 28, 2026",
                changes: [
                  "Added Race",
                  "Added Trait",
                  "Added Title",
                  "Added Haki",
                ],
              },
              {
                version: "v1.1.1.1",
                date: "January 27, 2026",
                changes: [
                  "Initial release",
                  "Added base stats calculator with 80,000 total cap",
                  "Added accessory selector with enhancement system",
                  "Added 78 accessories with increment values",
                ],
              },
            ]}
          />
        </div>

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
