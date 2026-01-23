import { useState } from "react";
import { ranks } from "../data/stat_related/ranks";
import { accessoriesData } from "../data/stat_related/data";

const statTypes = [
  { key: "strength", label: "Strength", className: "custom-text-strength" },
  { key: "defense", label: "Defense", className: "custom-text-defense" },
  { key: "sword", label: "Sword", className: "custom-text-sword" },
  { key: "special", label: "Special", className: "custom-text-special" },
];

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
    enhanceLevel: 1,
  });

  const [enchant, setEnchant] = useState("");

  const selectedAccessory =
    accessoriesData.find((acc) => acc.id === accessory.selectedId) ||
    accessoriesData[0];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
        <legend className="fieldset-legend font-bold">Base Stats</legend>

        {statTypes.map(({ key, label, className }) => {
          const statKey = key as keyof typeof baseStats;
          const value = baseStats[statKey];
          const accessoryStat = selectedAccessory[statKey] || 0;

          return (
            <div key={statKey} className="mb-6">
              <label className="label">
                <span className={`font-bold ${className}`}>
                  {label} {accessoryStat > 0 && `(${accessoryStat})`}
                </span>
              </label>

              <input
                type="range"
                min="0"
                max="20000"
                value={value}
                onChange={(e) =>
                  setBaseStats((prev) => ({
                    ...prev,
                    [statKey]: Number(e.target.value),
                  }))
                }
                className="range range-sm w-full mb-2"
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="20000"
                  value={value}
                  onChange={(e) => {
                    const val = Math.min(
                      20000,
                      Math.max(0, Number(e.target.value) || 0),
                    );
                    setBaseStats((prev) => ({
                      ...prev,
                      [statKey]: val,
                    }));
                  }}
                  className="input input-bordered flex-1 text-center"
                />

                <select
                  className="select select-bordered"
                  value={ghostStats[statKey]}
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
            </div>
          );
        })}
      </fieldset>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 mt-6">
        <legend className="fieldset-legend font-bold">Accessory</legend>

        <div className="mb-4">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="font-bold">Enhance Level</span>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={accessory.enhanceLevel}
              onChange={(e) => {
                const val = Math.min(
                  10,
                  Math.max(1, Number(e.target.value) || 1),
                );
                setAccessory((prev) => ({
                  ...prev,
                  enhanceLevel: val,
                }));
              }}
              className="input input-bordered w-full text-center"
            />
          </div>

          <div>
            <label className="label">
              <span className="font-bold">Enchant</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={enchant}
              onChange={(e) => setEnchant(e.target.value)}
            >
              <option value="">None</option>
              <option value="ice">Ice</option>
              <option value="fire">Fire</option>
              <option value="bleed">Bleed</option>
              <option value="leech">Leech</option>
              <option value="blessing">Blessing</option>
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Calculator;
