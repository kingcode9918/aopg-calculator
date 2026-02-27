"use client";
import Link from "next/link";
import UpdateModal from "./components/UpdateModal";

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
          <span className="text-sm text-gray-400 mb-2">
            Last updated: February 27, 2026
          </span>
          <UpdateModal
            updates={[
              {
                version: "v1.2.1.0 | Verse Piece",
                date: "February 27, 2026",
                changes: ["Added Multiple Enchance Buff for damage"],
              },
              {
                version: "v1.2.0.0 | AOPG",
                date: "February 27, 2026",
                changes: [
                  "Added Love Fruit",
                  "Added Love Goddess",
                  "Added Yandere",
                ],
              },
              {
                version: "v1.1.9.0 | Verse Piece",
                date: "February 22, 2026",
                changes: [
                  "Enable the moves damage and table",
                  "Currently got the damage for Combat and Yuji",
                  "Will add the other moves damage soon",
                ],
              },
              {
                version: "v1.1.8.0 | Verse Piece",
                date: "February 17, 2026",
                changes: ["Added Yuta Update"],
              },
              {
                version: "v1.1.7.0 | Verse Piece",
                date: "February 8, 2026",
                changes: ["Added Chainsaw Update", "Added Black Clover"],
              },
              {
                version: "v1.1.6.0 | Verse Piece",
                date: "January 28, 2026",
                changes: [
                  "Added Race",
                  "Added Trait",
                  "Added Title",
                  "Added Haki",
                ],
              },
              {
                version: "v1.1.5.0 | Verse Piece",
                date: "January 27, 2026",
                changes: [
                  "Initial release",
                  "Added base stats calculator with 80,000 total cap",
                  "Added accessory selector with enhancement system",
                  "Added 78 accessories with increment values",
                ],
              },
              {
                version: "v1.1.4.0 | AOPG",
                date: "February 22, 2026",
                changes: [
                  "Updated the Suits Buff",
                  "Updated the Support Styles Buff",
                ],
              },
              {
                version: "v1.1.3.0 | AOPG",
                date: "February 17, 2026",
                changes: ["Added Yuta Update"],
              },
              {
                version: "v1.1.2.0 | AOPG",
                date: "February 8, 2026",
                changes: ["Added Shanks Update", "Added Imu's Update"],
              },
              {
                version: "v1.1.1.0 | AOPG",
                date: "January 27, 2026",
                changes: [
                  "Added Final Soul Damage",
                  "Added Final Soul Buff",
                  "Added new suit called Mother's Kimono",
                ],
              },
            ]}
          />
          <div className="text-xs text-gray-500">
            Need help? DM me on Discord:{" "}
            <span className="font-semibold text-gray-300">kingcode99</span>
          </div>
        </div>
      </main>
    </div>
  );
}
