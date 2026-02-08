"use client";
import Calculator from "./views/calculator";
import GenericTable from "./views/table";
import { useState } from "react";
import AccessorySelector from "./views/accselector";
import BuffSelector, { BuffCategory } from "./views/buffselector";
import MoveSelector, { MoveCategory } from "./views/moveselector";
import Navbar from "./views/navbar";
import UpdateModal from "../components/UpdateModal";
import {
  type Accessories,
  headAccData,
  topAccData,
  armAccData,
  backAccData,
  waistAccData,
  legsAccData,
} from "./data/accessories";
import { titleBuffsData, raceBuffsData } from "./data/buffs/passive";
import {
  armamentActiveBuffs,
  blacksmithActiveBuffs,
  conquerorsActiveBuffs,
  fightingActiveBuffs,
  fruitActiveBuffs,
  giantActiveBuffs,
  gunActiveBuffs,
  suitActiveBuffs,
  supportActiveBuffs,
  swordActiveBuffs,
} from "./data/buffs/active";
import {
  devilFruitMoveDamage,
  fightingStyleMoveDamage,
  gunStyleMoveDamage,
  hakiMoveDamage,
  supportStyleMoveDamage,
  swordStyleMoveDamage,
  getMoveTotal,
} from "./data/moves";

type Page = "build" | "accessory" | "buff" | "move";

const accessoryDataMap = {
  head: headAccData,
  top: topAccData,
  arm: armAccData,
  back: backAccData,
  waist: waistAccData,
  legs: legsAccData,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buffDataMap: Record<BuffCategory, any[]> = {
  title: titleBuffsData,
  race: raceBuffsData,
  fruit: fruitActiveBuffs,
  fighting: fightingActiveBuffs,
  gun: gunActiveBuffs,
  sword: swordActiveBuffs,
  armament: armamentActiveBuffs,
  conqueror: conquerorsActiveBuffs,
  blacksmith: blacksmithActiveBuffs,
  giant: giantActiveBuffs,
  suit: suitActiveBuffs,
  support: supportActiveBuffs,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moveDataMap: Record<MoveCategory, any[]> = {
  fighting: fightingStyleMoveDamage,
  sword: swordStyleMoveDamage,
  gun: gunStyleMoveDamage,
  support: supportStyleMoveDamage,
  fruit: devilFruitMoveDamage,
  haki: hakiMoveDamage,
};

export default function AopgCalculator() {
  const [currentPage, setCurrentPage] = useState<Page>("build");
  const [accessorySelected, setAccessorySelected] = useState<
    "head" | "top" | "arm" | "back" | "waist" | "legs"
  >("head");
  const [buffSelected, setBuffSelected] = useState<BuffCategory>("title");
  const [moveSelected, setMoveSelected] = useState<MoveCategory>("support");
  const getAccessoryData = () =>
    accessoryDataMap[accessorySelected]?.filter((buff) => buff.id !== 0) ?? [];
  const getBuffData = () =>
    buffDataMap[buffSelected]?.filter((buff) => buff.id !== 0) ?? [];
  const getMoveData = () =>
    (moveDataMap[moveSelected] ?? [])
      .filter(
        (move) => !move.name?.toLowerCase().includes("title"), // hide moves with "title" in text
      )
      .map((move) => ({
        ...move,
        total: getMoveTotal(move),
      }))
      .sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <Navbar
        selected={currentPage}
        onSelect={(page) => setCurrentPage(page as Page)}
      />

      <main className="flex flex-col gap-8 items-center sm:items-start p-4">
        {currentPage === "build" && <Calculator />}

        {currentPage === "accessory" && (
          <>
            <AccessorySelector
              selected={accessorySelected}
              onSelect={setAccessorySelected}
            />
            <GenericTable<Accessories> data={getAccessoryData()} />
          </>
        )}

        {currentPage === "buff" && (
          <>
            <BuffSelector selected={buffSelected} onSelect={setBuffSelected} />
            <GenericTable data={getBuffData()} />
          </>
        )}

        {currentPage === "move" && (
          <>
            <MoveSelector selected={moveSelected} onSelect={setMoveSelected} />
            <GenericTable data={getMoveData()} />
          </>
        )}

        {/* Footer / info */}
        <div className="fixed bottom-3 left-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>AOPG Calculator v1.1.1.1 | Last updated: January 27, 2026</span>
          <UpdateModal
            updates={[
              {
                version: "v1.1.2.0",
                date: "February 8, 2026",
                changes: ["Added Shanks Update", "Added Imu's Update"],
              },
              {
                version: "v1.1.1.1",
                date: "January 27, 2026",
                changes: [
                  "Added Final Soul Damage",
                  "Added Final Soul Buff",
                  "Added new suit called Mother's Kimono",
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
