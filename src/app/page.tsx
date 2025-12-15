"use client";
import Calculator from "./views/calculator";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* <Navbar onSelect={setPageSelected} selected={pageSelected} /> */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* {pageSelected === "home" && (
          <div className="hero">
            <div className="hero-content text-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-primary">
                  🏴‍☠️ A One Piece Game Damage Calculator
                </h1>
                <p className="py-4 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  This site is your ultimate tool for mastering damage output in{" "}
                  <strong>A One Piece Game</strong> on Roblox. Whether
                  you&apos;re optimizing your build, testing different stats, or
                  comparing gear—our{" "}
                  <span className="font-semibold text-primary">
                    damage calculator
                  </span>
                  helps you find the perfect setup to maximize your power.
                </p>
                <p className="pb-6 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  You&apos;ll also find helpful information on
                  <strong>titles</strong>, <strong>races</strong>, and
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
                        AOPG Calculator v1.4.0
                      </h3>
                      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                        <div>
                          <h1 className="text-3xl font-bold text-indigo-600">
                            🧾 Update Log — Dev Mode Overhaul (v1.4.0)
                          </h1>
                          <p className="text-sm text-gray-500 mt-1">
                            📅 Release Date: July 10, 2025
                          </p>
                          <h2 className="text-xl font-semibold mt-4">
                            🔥 Damage Calculator for A One Piece Game — Dev Mode
                            Overhaul
                          </h2>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-600 mb-2">
                            ✅ New Features & Improvements (v1.4.0)
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
                            <li>
                              <strong>📝 Per-Move Scale Selection:</strong> In
                              Dev Mode, you can now select a specific scale
                              (Fruit, Sword, Gun, Strength) for each move. The
                              calculator computes each move&apos;s damage based
                              on its selected scale.
                            </li>
                            <li>
                              <strong>📊 Saved Computations Table:</strong> All
                              saved computations are now displayed in a sortable
                              table (Damage Table tab). You can sort by title,
                              total damage, or any move&apos;s base, scaled, or
                              scale type.
                            </li>
                            <li>
                              <strong>
                                🏷️ Computation Title & Attack Type:
                              </strong>
                              You can add a custom title and select the attack
                              type for each computation. Selecting an attack
                              type automatically disables the corresponding
                              buff.
                            </li>
                            <li>
                              <strong>
                                💾 Save & Manage Multiple Records:
                              </strong>
                              Save multiple computations to local storage, each
                              with its own title, per-move scale, and all
                              move/base/scaled values. You can also delete all
                              saved records at once.
                            </li>
                            <li>
                              <strong>🔄 Best Build Integration:</strong>{" "}
                              Clicking a Best Build button now sets all move
                              scales to match the selected build&apos;s type.
                            </li>
                            <li>
                              <strong>🗑️ Delete All:</strong> Added a button to
                              clear all saved computations from local storage.
                            </li>
                            <li>
                              <strong>🪄 Quality of Life:</strong> Table now
                              shows the scale used for each move, and total
                              damage is always shown as the last column.
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                            🛠️ Coming Soon
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
                            <li>Damage of other weapons</li>
                            <li>Damage Over Time Computation</li>
                            <li>Mobile-optimized UX improvements</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-600 mb-2">
                            🧠 Feedback & Suggestions
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            Have ideas or find a bug? Contact me on Discord:{" "}
                            <span className="font-semibold">kingcode99</span> (
                            <span className="font-semibold">KingCode</span>)
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
        )} */}

        {/* {pageSelected === "accessories" && (
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
        )} */}

        {/* {pageSelected === "calculator" && <Calculator />} */}
        <Calculator />

        {/* Floating UI Elements */}
        <div className="fixed bottom-3 left-3 text-xs text-gray-500 dark:text-gray-400">
          v125 | Last updated: December 15, 2025
        </div>

        <div className="fixed bottom-3 right-3 group cursor-help">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Need help?
          </div>

          {/* Hover tooltip */}
          <div className="absolute bottom-6 right-0 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg w-44">
            If there&apos;s a wrong value, DM me on Discord:
            <span className="font-semibold block mt-1">kingcode99</span>
          </div>
        </div>

        {/* {pageSelected === "damagetable" && <DamageTable />} */}
      </main>
    </div>
  );
}
