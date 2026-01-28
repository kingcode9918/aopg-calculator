import { useState } from "react";
import {
  ranks,
  accessoriesData,
  traitsData,
  passiveTraitsData,
} from "../data/stat_related";
import { titlesData, racesData, hakisData } from "../data/passive";

const statTypes = [
  {
    key: "strength",
    label: "Strength",
    className: "custom-text-strength",
    emoji: "\u{1F4AA}",
  },
  {
    key: "defense",
    label: "Defense",
    className: "custom-text-defense",
    emoji: "\u{1F6E1}\u{FE0F}",
  },
  {
    key: "sword",
    label: "Sword",
    className: "custom-text-sword",
    emoji: "\u{2694}\u{FE0F}",
  },
  {
    key: "special",
    label: "Special",
    className: "custom-text-special",
    emoji: "\u{2728}",
  },
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

  const [trait, setTrait] = useState({
    selectedId: 0,
    passiveId: 0,
  });

  const [titleId, setTitleId] = useState(0);
  const [raceId, setRaceId] = useState(0);
  const [hakiId, setHakiId] = useState(0);

  const selectedAccessory =
    accessoriesData.find((acc) => acc.id === accessory.selectedId) ||
    accessoriesData[0];

  const selectedTrait =
    traitsData.find((t) => t.id === trait.selectedId) || traitsData[0];

  const selectedPassiveTrait =
    passiveTraitsData.find((p) => p.id === trait.passiveId) ||
    passiveTraitsData[0];

  const selectedTitle =
    titlesData.find((t) => t.id === titleId) || titlesData[0];

  const selectedRace = racesData.find((r) => r.id === raceId) || racesData[0];

  const selectedHaki = hakisData.find((h) => h.id === hakiId) || hakisData[0];

  const baseDmgMult =
    (selectedTrait.dmgMult || 1) * (selectedPassiveTrait.dmgMult || 1);

  const getStatMultiplier = (statKey: string) => {
    let titleMult = 1;
    let raceMult = 1;
    let hakiMult = 1;
    if (statKey === "strength") {
      titleMult = selectedTitle.strengthBuff || 1;
      raceMult = selectedRace.strengthBuff || 1;
      hakiMult = selectedHaki.strengthBuff || 1;
    }
    if (statKey === "sword") {
      titleMult = selectedTitle.swordBuff || 1;
      raceMult = selectedRace.swordBuff || 1;
      hakiMult = selectedHaki.swordBuff || 1;
    }
    if (statKey === "special") {
      titleMult = selectedTitle.specialBuff || 1;
      raceMult = selectedRace.specialBuff || 1;
      hakiMult = selectedHaki.specialBuff || 1;
    }
    return baseDmgMult * titleMult * raceMult * hakiMult;
  };

  const totalBaseStats = Object.values(baseStats).reduce(
    (sum, val) => sum + val,
    0,
  );
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

  const handleStatChange = (
    statKey: keyof typeof baseStats,
    newValue: number,
  ) => {
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
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Column - Stats, Accessory, Trait */}
      <div className="flex-1">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
          <legend className="fieldset-legend font-bold">Base Stats</legend>

          {statTypes.map(({ key, label, className, emoji }) => {
            const statKey = key as keyof typeof baseStats;
            const value = baseStats[statKey];
            const rankValue = ghostStats[statKey];
            const accessoryBaseStat = selectedAccessory[statKey] || 0;
            const accessoryEnhancedStat =
              accessoryBaseStat +
              (selectedAccessory.increment
                ? selectedAccessory.increment * accessory.enhanceLevel
                : 0);
            const traitStat = selectedTrait[statKey] || 0;

            return (
              <div key={statKey} className="flex items-center gap-3 mb-4">
                <div
                  className={`flex items-center gap-2 min-w-[180px] font-bold ${className}`}
                >
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
                  onChange={(e) =>
                    handleStatChange(statKey, Number(e.target.value) || 0)
                  }
                  className="input input-bordered w-28 text-center"
                />

                {accessoryEnhancedStat > 0 && (
                  <span className="text-success font-semibold">
                    (+{accessoryEnhancedStat.toLocaleString()})
                  </span>
                )}

                {traitStat > 0 && (
                  <span className="text-info font-semibold">
                    (+{traitStat.toLocaleString()})
                  </span>
                )}

                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() =>
                    setBaseStats((prev) => ({ ...prev, [statKey]: 0 }))
                  }
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

                {statKey !== "defense" && getStatMultiplier(statKey) > 1 && (
                  <span className="text-warning font-semibold">
                    x{getStatMultiplier(statKey).toFixed(2)}
                  </span>
                )}
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

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 mt-6">
          <legend className="fieldset-legend font-bold">Trait</legend>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="label">
                <span className="font-bold">Select Trait</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={trait.selectedId}
                onChange={(e) =>
                  setTrait((prev) => ({
                    ...prev,
                    selectedId: Number(e.target.value),
                  }))
                }
              >
                {traitsData.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}{" "}
                    {t.dmgMult && t.dmgMult > 1 ? `(x${t.dmgMult})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="label">
                <span className="font-bold">Passive Trait</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={trait.passiveId}
                onChange={(e) =>
                  setTrait((prev) => ({
                    ...prev,
                    passiveId: Number(e.target.value),
                  }))
                }
              >
                {passiveTraitsData.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}{" "}
                    {p.dmgMult > 1
                      ? `(${((p.dmgMult - 1) * 100).toFixed(0)}% DMG)`
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Right Column - Title */}
      <div className="lg:w-80">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
          <legend className="fieldset-legend font-bold">Passive</legend>

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Title
                {selectedTitle.strengthBuff > 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedTitle.strengthBuff}x
                  </span>
                )}
                {selectedTitle.swordBuff > 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedTitle.swordBuff}x
                  </span>
                )}
                {selectedTitle.specialBuff > 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedTitle.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={titleId}
              onChange={(e) => setTitleId(Number(e.target.value))}
            >
              {titlesData.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Race
                {selectedRace.strengthBuff !== 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedRace.strengthBuff}x
                  </span>
                )}
                {selectedRace.swordBuff !== 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedRace.swordBuff}x
                  </span>
                )}
                {selectedRace.specialBuff !== 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedRace.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={raceId}
              onChange={(e) => setRaceId(Number(e.target.value))}
            >
              {racesData.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Haki
                {selectedHaki.strengthBuff > 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedHaki.strengthBuff}x
                  </span>
                )}
                {selectedHaki.swordBuff > 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedHaki.swordBuff}x
                  </span>
                )}
                {selectedHaki.specialBuff > 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedHaki.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={hakiId}
              onChange={(e) => setHakiId(Number(e.target.value))}
            >
              {hakisData.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Calculator;
