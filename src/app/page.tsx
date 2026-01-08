"use client";
import Calculator from "./views/calculator";
import GenericTable from "./views/table";
import { useState } from "react";
import AccessorySelector from "./views/accselector";
import BuffSelector, { BuffCategory } from "./views/buffselector";
import MoveSelector, { MoveCategory } from "./views/moveselector";
import Navbar from "./views/navbar";
import {
  Accessories,
  headAccData,
  topAccData,
  armAccData,
  backAccData,
  waistAccData,
  legsAccData,
} from "./data/accessories";
import { titleBuffsData } from "./data/titlebuff";
import { raceBuffsData } from "./data/racebuff";
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
} from "./data/activebuff";
import { gunStyleMoveDamage } from "./data/gunstyleMoveDamage";
import { swordStyleMoveDamage } from "./data/swordstyleMoveDamage";
import { fightingStyleMoveDamage } from "./data/fightingstyleMoveDamage";
import { supportStyleMoveDamage } from "./data/supportstyleMoveDamage";
import { devilFruitMoveDamage } from "./data/devilfruitMoveDamage";
import { hakiMoveDamage } from "./data/hakiMoveDamage";
import { getMoveTotal } from "./data/move";

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

export default function Home() {
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
      .map((move) => ({
        ...move,
        total: getMoveTotal(move), // add total damage
      }))
      .sort((a, b) => b.total - a.total); // sort descending by total

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
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
        <div className="fixed bottom-3 left-3 text-xs text-gray-500 dark:text-gray-400">
          v125 | Last updated: December 21, 2025
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
