import { useState } from "react";
import {
  ranks,
  accessoriesData,
  traitsData,
  passiveTraitsData,
} from "../data/stat_related";
import {
  titlesData,
  racesData,
  hakisData,
  relicsData,
  abilitiesData,
  prestigesData,
  wispsData,
} from "../data/passive";
import {
  swordsData,
  fruitsData,
  fightingsData,
  specsData,
} from "../data/moves";
import type { MoveSlot } from "../data/moves/types";
const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
  }
  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
  }
  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
  }
  if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2).replace(/\.00$/, "") + "k";
  }
  return num.toFixed(2);
};

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
  const [relicId, setRelicId] = useState(0);
  const [abilityId, setAbilityId] = useState(0);
  const [prestigeId, setPrestigeId] = useState(0);
  const [wispId, setWispId] = useState(0);
  const [moveType, setMoveType] = useState<
    "sword" | "fruit" | "fighting" | "spec"
  >("sword");
  const [moveState, setMoveState] = useState({
    selectedId: 0,
    enhanceLevel: 0,
    blessing: false,
  });

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

  const selectedRelic =
    relicsData.find((r) => r.id === relicId) || relicsData[0];

  const selectedAbility =
    abilitiesData.find((a) => a.id === abilityId) || abilitiesData[0];

  const selectedPrestige =
    prestigesData.find((p) => p.id === prestigeId) || prestigesData[0];

  const selectedWisp =
    wispsData.find((w) => w.id === wispId) || prestigesData[0];

  const getMoveData = () => {
    switch (moveType) {
      case "sword":
        return swordsData;
      case "fruit":
        return fruitsData;
      case "fighting":
        return fightingsData;
      case "spec":
        return specsData;
    }
  };
  const currentMoveData = getMoveData();
  const selectedMove =
    currentMoveData.find((m) => m.id === moveState.selectedId) ||
    currentMoveData[0];

  // Get the stat key based on move type
  const getMoveStatKey = (): "strength" | "sword" | "special" => {
    switch (moveType) {
      case "fighting":
        return "strength";
      case "sword":
        return "sword";
      case "fruit":
      case "spec":
        return "special";
    }
  };
  const calculateHitDamage = (
    damage: number,
    multiplier = 1,
    enhanceMult = 2.5,
  ) => {
    const statKey = getMoveStatKey();
    const baseStat = baseStats[statKey];
    const ghostStat = ghostStats[statKey];
    const accessoryStat =
      (selectedAccessory[statKey] || 0) +
      (selectedAccessory.increment
        ? selectedAccessory.increment * accessory.enhanceLevel
        : 0);
    const traitStat = selectedTrait[statKey] || 0;

    const totalStat =
      baseStat > 0 ? baseStat + ghostStat + accessoryStat + traitStat : 0;

    const damageMultiplier = getStatMultiplier(statKey);

    // Apply sword enhance to base damage
    let baseWithEnhance = damage * multiplier;
    if (moveType === "sword") {
      baseWithEnhance += moveState.enhanceLevel * enhanceMult;
    }

    let finalDamage =
      baseWithEnhance * (1 + totalStat / 75) * damageMultiplier;

    // Apply blessing
    if (moveType !== "fruit" && moveState.blessing) {
      finalDamage *= 2.5;
    }

    return finalDamage;
  };

  const renderMoveDamage = (input: number | MoveSlot | undefined) => {
    if (input === undefined) return null;

    if (typeof input === "number") {
      return formatNumber(calculateHitDamage(input, 1, 2.5));
    }

    if (!input.hits || input.hits.length === 0) {
      return input.desc || "0";
    }

    const defaultUpgrade = input.upgrade ?? 2.5;

    const totalDamage = input.hits.reduce((sum, hit) => {
      const hitUpgrade = hit.upgrade ?? defaultUpgrade;
      return (
        sum + calculateHitDamage(hit.damage, hit.multiplier || 1, hitUpgrade)
      );
    }, 0);

    if (input.hits.length === 1) {
      return formatNumber(totalDamage);
    }

    const firstHitUpgrade = input.hits[0].upgrade ?? defaultUpgrade;
    const firstHit = calculateHitDamage(
      input.hits[0].damage,
      input.hits[0].multiplier || 1,
      firstHitUpgrade,
    );

    return `${formatNumber(firstHit)} - ${formatNumber(totalDamage)} | ${
      input.hits.length
    } hits`;
  };

  const baseDmgMult =
    (selectedTrait.dmgMult || 1) + (selectedPassiveTrait.dmgMult || 0);

  const getStatMultiplier = (statKey: string) => {
    let titleMult = 1;
    let raceMult = 1;
    let hakiMult = 1;
    let relicMult = 1;
    let abilityMult = 1;
    let prestigeMult = 1;
    let wispMult = 1;
    if (statKey === "strength") {
      titleMult = selectedTitle.strengthBuff || 1;
      raceMult = selectedRace.strengthBuff || 1;
      hakiMult = selectedHaki.strengthBuff || 1;
      relicMult = selectedRelic.strengthBuff || 1;
      abilityMult = selectedAbility.strengthBuff || 1;
      prestigeMult = selectedPrestige.strengthBuff || 1;
      wispMult = selectedWisp.strengthBuff || 1;
    }
    if (statKey === "sword") {
      titleMult = selectedTitle.swordBuff || 1;
      raceMult = selectedRace.swordBuff || 1;
      hakiMult = selectedHaki.swordBuff || 1;
      relicMult = selectedRelic.swordBuff || 1;
      abilityMult = selectedAbility.swordBuff || 1;
      prestigeMult = selectedPrestige.swordBuff || 1;
      wispMult = selectedWisp.swordBuff || 1;
    }
    if (statKey === "special") {
      titleMult = selectedTitle.specialBuff || 1;
      raceMult = selectedRace.specialBuff || 1;
      hakiMult = selectedHaki.specialBuff || 1;
      relicMult = selectedRelic.specialBuff || 1;
      abilityMult = selectedAbility.specialBuff || 1;
      prestigeMult = selectedPrestige.specialBuff || 1;
      wispMult = selectedWisp.specialBuff || 1;
    }
    return (
      baseDmgMult *
      titleMult *
      raceMult *
      hakiMult *
      relicMult *
      abilityMult *
      prestigeMult *
      wispMult
    );
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

  const handleBestBuff = (statKey: "strength" | "sword" | "special") => {
    const buffKey = `${statKey}Buff` as
      | "strengthBuff"
      | "swordBuff"
      | "specialBuff";

    // Find best passive buffs
    const bestTitle = titlesData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );
    const bestRace = racesData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );
    const bestHaki = hakisData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );
    const bestRelic = relicsData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );
    const bestAbility = abilitiesData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );

    const bestPrestige = prestigesData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );

    const bestWisp = wispsData.reduce((best, current) =>
      (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
    );

    // Find best accessory for this stat
    const bestAccessory = accessoriesData.reduce((best, current) =>
      (current[statKey] || 0) > (best[statKey] || 0) ? current : best,
    );

    // Find best trait (highest dmgMult)
    const bestTrait = traitsData.reduce((best, current) =>
      (current.dmgMult || 1) > (best.dmgMult || 1) ? current : best,
    );

    // Find best passive trait (highest dmgMult)
    const bestPassiveTrait = passiveTraitsData.reduce((best, current) =>
      (current.dmgMult || 1) > (best.dmgMult || 1) ? current : best,
    );

    // Find best rank (highest value)
    const bestRank = ranks.reduce((best, current) =>
      current.value > best.value ? current : best,
    );

    // Set all passive buffs
    setTitleId(bestTitle.id);
    setRaceId(bestRace.id);
    setHakiId(bestHaki.id);
    setRelicId(bestRelic.id);
    setAbilityId(bestAbility.id);
    setPrestigeId(bestPrestige.id);
    setWispId(bestWisp.id);

    // Set accessory with max enhance
    setAccessory({ selectedId: bestAccessory.id, enhanceLevel: 10 });

    // Set trait and passive trait
    setTrait({ selectedId: bestTrait.id, passiveId: bestPassiveTrait.id });

    // Set ghost rank for this stat
    setGhostStats((prev) => ({ ...prev, [statKey]: bestRank.value }));

    // Max the base stat
    handleMaxStat(statKey);
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

                {statKey !== "defense" && (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      handleBestBuff(
                        statKey as "strength" | "sword" | "special",
                      )
                    }
                  >
                    Best
                  </button>
                )}
              </div>
            );
          })}

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
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 mt-6">
          <legend className="fieldset-legend font-bold">Moves</legend>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="label">
                <span className="font-bold">Move Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={moveType}
                onChange={(e) => {
                  setMoveType(e.target.value as typeof moveType);
                  setMoveState((prev) => ({ ...prev, selectedId: 0 }));
                }}
              >
                <option value="sword">Sword</option>
                <option value="fruit">Fruit</option>
                <option value="fighting">Fighting</option>
                <option value="spec">Spec</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="label">
                <span className="font-bold">Select Style</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={moveState.selectedId}
                onChange={(e) =>
                  setMoveState((prev) => ({
                    ...prev,
                    selectedId: Number(e.target.value),
                  }))
                }
              >
                {currentMoveData.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(moveType === "sword" ||
            moveType === "fighting" ||
            moveType === "spec") && (
            <div className="flex gap-4 mb-4">
              {moveType === "sword" && (
                <div className="flex-1">
                  <label className="label">
                    <span className="font-bold">Enhance Level</span>
                  </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={moveState.enhanceLevel}
                      onChange={(e) => {
                        const val = Math.min(
                          10,
                          Math.max(0, Number(e.target.value) || 0),
                        );
                        setMoveState((prev) => ({
                          ...prev,
                          enhanceLevel: val,
                        }));
                      }}
                      className="input input-bordered w-full text-center"
                    />
                </div>
              )}

              <div className="flex-1">
                <label className="label">
                  <span className="font-bold">Blessing</span>
                </label>
                <div className="input input-bordered w-full flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={moveState.blessing}
                    onChange={(e) =>
                      setMoveState((prev) => ({
                        ...prev,
                        blessing: e.target.checked,
                      }))
                    }
                  />
                  <span>{moveState.blessing ? "x2.5 DMG" : "Off"}</span>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Move</th>
                  {/* <th>Base DMG</th> */}
                  <th>Final DMG</th>
                </tr>
              </thead>
              <tbody>
                {(["M1", "Z", "X", "C", "V", "F"] as const).map((move) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const moveValue = (selectedMove as any)[move];
                  if (moveValue === undefined) return null;

                  return (
                    <tr key={move}>
                      <td className="font-bold">{move}</td>
                      <td className="text-success font-semibold">
                        {renderMoveDamage(moveValue)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Relic
                {selectedRelic.strengthBuff > 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedRelic.strengthBuff}x
                  </span>
                )}
                {selectedRelic.swordBuff > 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedRelic.swordBuff}x
                  </span>
                )}
                {selectedRelic.specialBuff > 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedRelic.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={relicId}
              onChange={(e) => setRelicId(Number(e.target.value))}
            >
              {relicsData.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Ability
                {selectedAbility.strengthBuff > 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedAbility.strengthBuff}x
                  </span>
                )}
                {selectedAbility.swordBuff > 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedAbility.swordBuff}x
                  </span>
                )}
                {selectedAbility.specialBuff > 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedAbility.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={abilityId}
              onChange={(e) => setAbilityId(Number(e.target.value))}
            >
              {abilitiesData.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Prestige
                {selectedPrestige.strengthBuff > 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedPrestige.strengthBuff}x
                  </span>
                )}
                {selectedPrestige.swordBuff > 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedPrestige.swordBuff}x
                  </span>
                )}
                {selectedPrestige.specialBuff > 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedPrestige.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={prestigeId}
              onChange={(e) => setPrestigeId(Number(e.target.value))}
            >
              {prestigesData.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="font-bold flex items-center gap-2 flex-wrap">
                Select Wisp
                {selectedWisp.strengthBuff > 1 && (
                  <span className="custom-text-strength">
                    💪 {selectedWisp.strengthBuff}x
                  </span>
                )}
                {selectedWisp.swordBuff > 1 && (
                  <span className="custom-text-sword">
                    ⚔️ {selectedWisp.swordBuff}x
                  </span>
                )}
                {selectedWisp.specialBuff > 1 && (
                  <span className="custom-text-special">
                    ✨ {selectedWisp.specialBuff}x
                  </span>
                )}
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={wispId}
              onChange={(e) => setWispId(Number(e.target.value))}
            >
              {wispsData.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
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
