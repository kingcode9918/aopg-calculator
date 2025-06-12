"use client";

import { useState } from "react";
import Navbar from "./views/navbar";
import GenericTable from "./views/table";
import AccessorySelector from "./views/accselector";
import BuffCardList from "./views/card";
import BuffListAccordion from "./views/list";
import { raceBuffsData } from "./data/racebuff";
import {
  Accessories,
  headAccData,
  topAccData,
  armAccData,
  backAccData,
  waistAccData,
  legsAccData,
} from "./data/accessories";
import Calculator from "./views/calculator";

const accessoryDataMap = {
  head: headAccData,
  top: topAccData,
  arm: armAccData,
  back: backAccData,
  waist: waistAccData,
  legs: legsAccData,
};

export default function Home() {
  const [pageSelected, setPageSelected] = useState<
    "home" | "title" | "races" | "accessories" | "calculator"
  >("home");
  const [accessorySelected, setAccessorySelected] = useState<
    "head" | "top" | "arm" | "back" | "waist" | "legs"
  >("head");

  // Helper to get filtered accessory data
  const getAccessoryData = () =>
    accessoryDataMap[accessorySelected]?.filter((buff) => buff.id !== 0) ?? [];

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar onSelect={setPageSelected} selected={pageSelected} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {pageSelected === "home" && (
          <div className="hero">
            <div className="hero-content text-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-primary">
                  🏴‍☠️ A One Piece Game Damage Calculator
                </h1>
                <p className="py-4 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  This site is your ultimate tool for mastering damage output in{" "}
                  <strong>A One Piece Game</strong> on Roblox. Whether you're
                  optimizing your build, testing different stats, or comparing
                  gear—our{" "}
                  <span className="font-semibold text-primary">
                    damage calculator
                  </span>{" "}
                  helps you find the perfect setup to maximize your power.
                </p>
                <p className="pb-6 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  You'll also find helpful information on{" "}
                  <strong>titles</strong>, <strong>races</strong>, and{" "}
                  <strong>accessories</strong> to support your character
                  decisions. These features are here to guide you, but the
                  calculator remains the heart of the site.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => setPageSelected("calculator")}
                  >
                    Open Calculator
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      const modal = document.getElementById(
                        "update_modal"
                      ) as HTMLDialogElement | null;
                      if (modal) modal.showModal();
                    }}
                  >
                    Update Log
                  </button>
                  <dialog id="update_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        AOPG Calculator v1.0
                      </h3>
                      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                        <div>
                          <h1 className="text-3xl font-bold text-indigo-600">
                            🧾 Update Log — Initial Release (v1.0.0)
                          </h1>
                          <p className="text-sm text-gray-500 mt-1">
                            📅 Release Date: June 8, 2025
                          </p>
                          <h2 className="text-xl font-semibold mt-4">
                            🔥 Damage Calculator for A One Piece Game — First
                            Launch!
                          </h2>
                        </div>
                        <div className="space-y-3 text-gray-700 dark:text-gray-300">
                          <p>
                            This site is your ultimate tool for mastering damage
                            output in{" "}
                            <span className="font-medium">
                              A One Piece Game
                            </span>{" "}
                            on Roblox. Whether you're optimizing your build,
                            testing different stats, or comparing gear—our
                            damage calculator helps you find the perfect setup
                            to maximize your power.
                          </p>
                          <p>
                            You'll also find helpful information on titles,
                            races, and accessories to support your character
                            decisions. These features are here to guide you, but
                            the calculator remains the heart of the site.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-600 mb-2">
                            ✅ New Features (v1.0.0)
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
                            <li>
                              <strong>🌐 Weapon & Move System</strong>: Full
                              weapon data with all associated moves and scaling
                              types.
                            </li>
                            <li>
                              <strong>⚔️ Mode-Based Damage Scaling</strong>:
                              Toggle between modes like Base and Awakened to
                              preview damage changes.
                            </li>
                            <li>
                              <strong>🧮 Real-Time Damage Calculation</strong>:
                              Input your stats and instantly view adjusted
                              damage.
                            </li>
                            <li>
                              <strong>📊 Clean UI</strong>: Fully responsive
                              interface optimized for both desktop and mobile.
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                            🛠️ Coming Soon
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
                            <li>Build presets</li>
                            <li>Damage Over Time Computation</li>
                            <li>Save/load stats with local storage</li>
                            <li>Mobile-optimized UX improvements</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-600 mb-2">
                            🧠 Feedback & Suggestions
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            Have ideas or find a bug? Use the{" "}
                            <span className="font-semibold">feedback form</span>{" "}
                            on the site or message the dev directly on Discord.
                          </p>
                        </div>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        )}

        {pageSelected === "accessories" && (
          <>
            <AccessorySelector
              onSelect={setAccessorySelected}
              selected={accessorySelected}
            />
            <GenericTable<Accessories> data={getAccessoryData()} />
          </>
        )}

        {pageSelected === "title" && <BuffListAccordion />}

        {pageSelected === "races" && (
          <BuffCardList data={raceBuffsData.filter((buff) => buff.id !== 0)} />
        )}

        {pageSelected === "calculator" && <Calculator />}
      </main>
    </div>
  );
}
