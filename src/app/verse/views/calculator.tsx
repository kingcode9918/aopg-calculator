import { useState } from "react";
import { ranks } from "../data/stat_related/ranks";
import { accessoriesData } from "../data/stat_related/data";

const statTypes = [
  { key: "strength", label: "Strength", className: "custom-text-strength", emoji: "\u{1F4AA}" },
  { key: "defense", label: "Defense", className: "custom-text-defense", emoji: "\u{1F6E1}\u{FE0F}" },
  { key: "sword", label: "Sword", className: "custom-text-sword", emoji: "\u{2694}\u{FE0F}" },
  { key: "special", label: "Special", className: "custom-text-special", emoji: "\u{2728}" },
];

const MAX_TOTAL_STATS = 80000;
const MAX_SINGLE_STAT = 27500;

const Calculator = () => {
  const [baseStats, setBaseStats] = useState({
    strength: 0,
    defense: 0,
    sword: 0,
    special: 0,
  });

  const [ghostStats, setGhostStats] = useState({
    strength: 0,
    defense: 0,
    sword: 0,
    special: 0,
  });

  const [accessory, setAccessory] = useState({
    selectedId: 0,
    enhanceLevel: 0,
  });

  const selectedAccessory =
    accessoriesData.find((acc) => acc.id === accessory.selectedId) ||
    accessoriesData[0];

  const totalBaseStats = Object.values(baseStats).reduce((sum, val) => sum + val, 0);
  const remainingStats = MAX_TOTAL_STATS - totalBaseStats;

  const handleMaxStat = (statKey: keyof typeof baseStats) => {
    const currentValue = baseStats[statKey];
    const maxByTotal = currentValue + remainingStats;
    const maxAllowed = Math.min(MAX_SINGLE_STAT, maxByTotal);
    setBaseStats((prev) => ({
      ...prev,
      [statKey]: maxAllowed,
    }));
  };

  const handleStatChange = (statKey: keyof typeof baseStats, newValue: number) => {
    const currentValue = baseStats[statKey];
    const otherStatsTotal = totalBaseStats - currentValue;
    const maxByTotal = MAX_TOTAL_STATS - otherStatsTotal;
    const maxAllowed = Math.min(MAX_SINGLE_STAT, maxByTotal);
    const clampedValue = Math.min(maxAllowed, Math.max(0, newValue));
    setBaseStats((prev) => ({
      ...prev,
      [statKey]: clampedValue,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
        <legend className="fieldset-legend font-bold">
          Base Stats ({totalBaseStats.toLocaleString()} / {MAX_TOTAL_STATS.toLocaleString()})
        </legend>

        {statTypes.map(({ key, label, className, emoji }) => {
          const statKey = key as keyof typeof baseStats;
          const value = baseStats[statKey];
          const rankValue = ghostStats[statKey];
          const accessoryBaseStat = selectedAccessory[statKey] || 0;
          const accessoryEnhancedStat =
            accessoryBaseStat + selectedAccessory.increment * accessory.enhanceLevel;

          return (
            <div key={statKey} className="flex items-center gap-3 mb-4">
              <div className={`flex items-center gap-2 min-w-[180px] font-bold ${className}`}>
                <span className="text-xl">{emoji}</span>
                <span>{label}</span>
                <select
                  className="select select-bordered select-sm"
                  value={rankValue}
                  onChange={(e) =>
                    setGhostStats((prev) => ({
                      ...prev,
                      [statKey]: Number(e.target.value),
                    }))
                  }
                >
                  {ranks.map((rank) => (
                    <option key={rank.label} value={rank.value}>
                      {rank.label}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="number"
                min="0"
                value={value}
                onChange={(e) => handleStatChange(statKey, Number(e.target.value) || 0)}
                className="input input-bordered w-28 text-center"
              />

              {accessoryEnhancedStat > 0 && (
                <span className="text-success font-semibold min-w-[90px]">
                  (+{accessoryEnhancedStat.toLocaleString()})
                </span>
              )}

              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => setBaseStats((prev) => ({ ...prev, [statKey]: 0 }))}
                disabled={value === 0}
              >
                Min
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => handleMaxStat(statKey)}
                disabled={remainingStats === 0 || value === MAX_SINGLE_STAT}
              >
                Max
              </button>
            </div>
          );
        })}
      </fieldset>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 mt-6">
        <legend className="fieldset-legend font-bold">Accessory</legend>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="label">
              <span className="font-bold">Select Accessory</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={accessory.selectedId}
              onChange={(e) =>
                setAccessory((prev) => ({
                  ...prev,
                  selectedId: Number(e.target.value),
                }))
              }
            >
              {accessoriesData.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-24">
            <label className="label">
              <span className="font-bold">Enhance</span>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={accessory.enhanceLevel}
              onChange={(e) => {
                const val = Math.min(
                  10,
                  Math.max(0, Number(e.target.value) || 0),
                );
                setAccessory((prev) => ({
                  ...prev,
                  enhanceLevel: val,
                }));
              }}
              className="input input-bordered w-full text-center"
            />
          </div>
        </div>

      </fieldset>
    </div>
  );
};

export default Calculator;
