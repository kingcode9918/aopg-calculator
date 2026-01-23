import { useState, useEffect, useMemo } from "react";
import {
  type Accessories,
  headAccData,
  topAccData,
  backAccData,
  armAccData,
  waistAccData,
  legsAccData,
} from "../data/accessories";
import {
  fightingActiveBuffs,
  gunActiveBuffs,
  swordActiveBuffs,
  fruitActiveBuffs,
  suitActiveBuffs,
  armamentActiveBuffs,
  conquerorsActiveBuffs,
  blacksmithActiveBuffs,
  giantActiveBuffs,
  supportActiveBuffs,
  artifactActiveBuffs,
} from "../data/buffs/active";
import { type BaseBuff } from "../data/buffs";
import { titleBuffsData, raceBuffsData } from "../data/buffs/passive";
import {
  type MoveDamage,
  type DamageScale,
  type MoveKey,
  devilFruitMoveDamage,
  fightingStyleMoveDamage,
  gunStyleMoveDamage,
  hakiMoveDamage,
  supportStyleMoveDamage,
  swordStyleMoveDamage,
} from "../data/moves";

const accKeys = [
  {
    key: "selectedHeadAcc",
    label: "Head",
    data: headAccData,
    color: "select-primary",
  },
  {
    key: "selectedTopAcc",
    label: "Top",
    data: topAccData,
    color: "select-secondary",
  },
  {
    key: "selectedArmAcc",
    label: "Arm",
    data: armAccData,
    color: "select-accent",
  },
  {
    key: "selectedBackAcc",
    label: "Back",
    data: backAccData,
    color: "select-info",
  },
  {
    key: "selectedWaistAcc",
    label: "Waist",
    data: waistAccData,
    color: "select-error",
  },
  {
    key: "selectedLegsAcc",
    label: "Legs",
    data: legsAccData,
    color: "select-warning",
  },
];

const scaleTypes = [
  { key: "fruitBuff", label: "Fruit", className: "custom-text-fruit" },
  { key: "swordBuff", label: "Sword", className: "custom-text-sword" },
  { key: "gunBuff", label: "Gun", className: "custom-text-gun" },
  { key: "strengthBuff", label: "Strength", className: "custom-text-strength" },
  { key: "hakiBuff", label: "Haki", className: "custom-text-haki" },
];

const Calculator = () => {
  // const dev = useDevMode();

  const pickBestAccessory = (
    data: Accessories[],
    stat: keyof Accessories,
  ): number => {
    return data.reduce((best, cur) =>
      (cur[stat] ?? 0) > (best[stat] ?? 0) ? cur : best,
    ).id;
  };

  const pickBestBuff = (data: BaseBuff[], scale: DamageScale): number => {
    return data.reduce((best, cur) =>
      (cur[scale] ?? 1) > (best[scale] ?? 1) ? cur : best,
    ).id;
  };

  // Stats and Accessories
  const [acc, setAcc] = useState({
    selectedHeadAcc: 0,
    selectedTopAcc: 0,
    selectedBackAcc: 0,
    selectedArmAcc: 0,
    selectedWaistAcc: 0,
    selectedLegsAcc: 0,
  });
  const [accBonus, setAccBonus] = useState({
    strength: 0,
    stamina: 0,
    defense: 0,
    sword: 0,
    gun: 0,
    haki: 0,
    fruit: 0,
  });

  // Buffs
  const [buffs, setBuffs] = useState({
    fightingBuff: 0,
    gunSBuff: 0,
    swordSBuff: 0,
    fruitSBuff: 0,
    suitBuff: 0,
    titleBuff: 0,
    raceBuff: 0,
    armamentBuff: 0,
    conquerorsBuff: 0,
    blacksmithBuff: 0,
    giantBuff: 0,
    supportBuff: 0,
    hakiBuff: 0,
    artifactBuff: 0,
  });
  const [damageBuffs, setDamageBuffs] = useState({
    fruitBuff: 1,
    swordBuff: 1,
    gunBuff: 1,
    strengthBuff: 1,
    hakiBuff: 1,
  });
  type MoveSource = "fighting" | "fruit" | "support" | "gun" | "sword" | "haki";

  const allMoves = useMemo(() => {
    let idCounter = 0;
    return [
      ...hakiMoveDamage.map((m) => ({
        ...m,
        id: idCounter++,
        source: "haki" as MoveSource,
      })),
      ...devilFruitMoveDamage.map((m) => ({
        ...m,
        id: idCounter++,
        source: "fruit" as MoveSource,
      })),
      ...fightingStyleMoveDamage.map((m) => ({
        ...m,
        id: idCounter++,
        source: "fighting" as MoveSource,
      })),
      ...gunStyleMoveDamage.map((m) => ({
        ...m,
        id: idCounter++,
        source: "gun" as MoveSource,
      })),
      ...supportStyleMoveDamage.map((m) => ({
        ...m,
        id: idCounter++,
        source: "support" as MoveSource,
      })),
      ...swordStyleMoveDamage.map((m) => ({
        ...m,
        id: idCounter++,
        source: "sword" as MoveSource,
      })),
    ];
  }, []);

  const [selectedMoveId, setSelectedMoveId] = useState<number>(0);
  const [selectedScale, setSelectedScale] = useState<DamageScale>("fruitbuff");

  const selectedMove = useMemo(
    () => allMoves.find((m) => m.id === selectedMoveId),
    [allMoves, selectedMoveId]
  );

  const scaleToBuffKey: Record<DamageScale, keyof typeof damageBuffs> = {
    fruitbuff: "fruitBuff",
    swordbuff: "swordBuff",
    gunbuff: "gunBuff",
    strengthbuff: "strengthBuff",
    hakibuff: "hakiBuff",
  };

  const sourceToBuffKey: Record<MoveSource, keyof typeof buffs> = useMemo(
    () => ({
      fighting: "fightingBuff",
      fruit: "fruitSBuff",
      support: "supportBuff",
      gun: "gunSBuff",
      sword: "swordSBuff",
      haki: "hakiBuff",
    }),
    [],
  );

  const sourceToDamageScale: Record<MoveSource, DamageScale> = useMemo(
    () => ({
      fighting: "strengthbuff",
      support: "strengthbuff",
      fruit: "fruitbuff",
      sword: "swordbuff",
      gun: "gunbuff",
      haki: "hakibuff",
    }),
    [],
  );

  // Determine the active scale: use move's scale if specified, otherwise use source's default scale, fallback to selectedScale
  const activeScale: DamageScale = selectedMove
    ? selectedMove.scale || sourceToDamageScale[selectedMove.source]
    : selectedScale;

  const moveKeys: (keyof MoveDamage)[] = [
    "M1",
    "Q",
    "E",
    "R",
    "F",
    "G",
    "T",
    "U",
    "Y",
  ];

  // Damage

  // Handlers
  const handleAccChange = (key: string, value: number) =>
    setAcc((a) => ({ ...a, [key]: value }));
  const handleBuffChange = (key: string, value: number) =>
    setBuffs((b) => ({ ...b, [key]: value }));

  const buildAutoBest = (scaleKey: DamageScale) => {
    const useDefenseForGun = scaleKey === "gunbuff";
    // ===== Accessories =====
    setAcc({
      selectedHeadAcc: pickBestAccessory(
        headAccData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        scaleKey.replace("buff", "") as any,
      ),
      selectedTopAcc: pickBestAccessory(
        topAccData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        scaleKey.replace("buff", "") as any,
      ),
      selectedBackAcc: pickBestAccessory(
        backAccData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDefenseForGun ? "defense" : (scaleKey.replace("buff", "") as any),
      ),
      selectedArmAcc: pickBestAccessory(
        armAccData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDefenseForGun ? "defense" : (scaleKey.replace("buff", "") as any),
      ),
      selectedWaistAcc: pickBestAccessory(
        waistAccData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        useDefenseForGun ? "defense" : (scaleKey.replace("buff", "") as any),
      ),
      selectedLegsAcc: pickBestAccessory(
        legsAccData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        scaleKey.replace("buff", "") as any,
      ),
    });

    const disabledBuff = selectedMove && sourceToBuffKey[selectedMove.source];

    // ===== Buffs =====
    setBuffs((prev) => ({
      ...prev,
      fightingBuff:
        disabledBuff === "fightingBuff"
          ? 0
          : pickBestBuff(fightingActiveBuffs, scaleKey),

      gunSBuff:
        disabledBuff === "gunSBuff"
          ? 0
          : pickBestBuff(gunActiveBuffs, scaleKey),

      swordSBuff:
        disabledBuff === "swordSBuff"
          ? 0
          : pickBestBuff(swordActiveBuffs, scaleKey),

      fruitSBuff:
        disabledBuff === "fruitSBuff"
          ? 0
          : pickBestBuff(fruitActiveBuffs, scaleKey),

      supportBuff:
        disabledBuff === "supportBuff"
          ? 0
          : pickBestBuff(supportActiveBuffs, scaleKey),
      suitBuff: pickBestBuff(suitActiveBuffs, scaleKey),
      titleBuff: selectedMove?.name?.toLowerCase().includes("title")
        ? 0
        : pickBestBuff(titleBuffsData, scaleKey),
      raceBuff: pickBestBuff(raceBuffsData, scaleKey),
      armamentBuff: pickBestBuff(armamentActiveBuffs, scaleKey),
      conquerorsBuff: 3,
      blacksmithBuff: pickBestBuff(blacksmithActiveBuffs, scaleKey),
      giantBuff: pickBestBuff(giantActiveBuffs, scaleKey),
      artifactBuff: pickBestBuff(artifactActiveBuffs, scaleKey),
    }));

    // ===== Base Stats =====
    setBaseStats({
      fruit: 14285,
      sword: 14285,
      gun: 14285,
      strength: 14285,
      haki: 14285,
    });
  };

  const [baseStats, setBaseStats] = useState({
    fruit: 1,
    sword: 1,
    gun: 1,
    strength: 1,
    haki: 1,
  });

  const getScaledAccBonus = (scale: DamageScale) => {
    switch (scale) {
      case "fruitbuff":
        return accBonus.fruit;
      case "swordbuff":
        return accBonus.sword;
      case "gunbuff":
        return accBonus.gun;
      case "strengthbuff":
        return accBonus.strength;
      case "hakibuff":
        return accBonus.haki;
      default:
        return 0;
    }
  };

  // Helper to check if a value is SplitDamage
  const isSplitDamage = (
    value: unknown,
  ): value is { scale: DamageScale; damage: number }[] => {
    return (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      "scale" in value[0] &&
      "damage" in value[0]
    );
  };

  // Get the scale(s) for a specific move key
  const getScaleForMoveKey = (moveKey: MoveKey) => {
    if (!selectedMove) return activeScale;

    // Check if there's a per-key scale defined
    if (selectedMove.scales && selectedMove.scales[moveKey]) {
      return selectedMove.scales[moveKey]!;
    }

    // Fall back to move-wide scale or source default
    return activeScale;
  };

  const getBaseStat = (scale: DamageScale) => {
    switch (scale) {
      case "fruitbuff":
        return baseStats.fruit;
      case "swordbuff":
        return baseStats.sword;
      case "gunbuff":
        return baseStats.gun;
      case "strengthbuff":
        return baseStats.strength;
      case "hakibuff":
        return baseStats.haki;
      default:
        return 1;
    }
  };

  const getFinalDamage = (baseDamage: number, moveKey: MoveKey) => {
    if (baseDamage === 0) return 0;

    const scalesForKey = getScaleForMoveKey(moveKey);

    // Check if it's split damage (array of {scale, damage} objects)
    if (isSplitDamage(scalesForKey)) {
      // Sum all the split damages
      return scalesForKey.reduce((total, { scale, damage }) => {
        const scaledAccBonus = getScaledAccBonus(scale);
        const buffMult = damageBuffs[scaleToBuffKey[scale]] || 1;
        const baseStat = getBaseStat(scale);

        const calculatedDamage =
          (damage +
            (baseStat + scaledAccBonus) / 2 +
            (damage * (baseStat + scaledAccBonus)) / 12.5) *
          buffMult;

        return total + calculatedDamage;
      }, 0);
    }

    // Handle regular scales (single or array for max)
    const scales = Array.isArray(scalesForKey) ? scalesForKey : [scalesForKey];

    // Calculate damage for each scale and take the maximum
    const damages = scales.map((scale) => {
      const scaledAccBonus = getScaledAccBonus(scale);
      const buffMult = damageBuffs[scaleToBuffKey[scale]] || 1;
      const baseStat = getBaseStat(scale);

      return (
        (baseDamage +
          (baseStat + scaledAccBonus) / 2 +
          (baseDamage * (baseStat + scaledAccBonus)) / 12.5) *
        buffMult
      );
    });

    // Return the highest damage from all applicable scales
    return Math.max(...damages);
  };

  // Compute total max damage
  const getMaxDamageTotal = (move: MoveDamage) => {
    return moveKeys.reduce(
      (sum, key) => sum + getFinalDamage(Number(move[key]), key as MoveKey),
      0,
    );
  };

  const buffFieldsets = [
    {
      legend: "Active Buffs Details",
      fields: [
        {
          key: "supportBuff",
          label: "Support Style",
          data: supportActiveBuffs,
        },
        {
          key: "fightingBuff",
          label: "Fighting Style",
          data: fightingActiveBuffs,
        },
        { key: "gunSBuff", label: "Gun Style", data: gunActiveBuffs },
        { key: "swordSBuff", label: "Sword Style", data: swordActiveBuffs },
        { key: "fruitSBuff", label: "Devil Fruit", data: fruitActiveBuffs },
        { key: "suitBuff", label: "Suit", data: suitActiveBuffs },
      ],
    },
    {
      legend: "Active Buffs Details 2",
      fields: [
        { key: "titleBuff", label: "Title", data: titleBuffsData },
        { key: "raceBuff", label: "Race", data: raceBuffsData },
        {
          key: "armamentBuff",
          label: "Armament Haki",
          data: armamentActiveBuffs,
        },
        {
          key: "conquerorsBuff",
          label: "Conqueror Haki",
          data: conquerorsActiveBuffs,
        },
        {
          key: "blacksmithBuff",
          label: "Blacksmith Upgrade",
          data: blacksmithActiveBuffs,
        },
        {
          key: "giantBuff",
          label: "Giant Blacksmith Upgrade",
          data: giantActiveBuffs,
        },
        {
          key: "artifactBuff",
          label: "Artifact",
          data: artifactActiveBuffs,
        },
      ],
    },
  ];

  // Effects
  useEffect(() => {
    // Accessories
    const accObjs = [
      headAccData.find((a) => a.id === acc.selectedHeadAcc),
      topAccData.find((a) => a.id === acc.selectedTopAcc),
      backAccData.find((a) => a.id === acc.selectedBackAcc),
      armAccData.find((a) => a.id === acc.selectedArmAcc),
      waistAccData.find((a) => a.id === acc.selectedWaistAcc),
      legsAccData.find((a) => a.id === acc.selectedLegsAcc),
    ];
    setAccBonus({
      strength: accObjs.reduce((sum, a) => sum + (a?.strength || 0), 0),
      stamina: accObjs.reduce((sum, a) => sum + (a?.stamina || 0), 0),
      defense: accObjs.reduce((sum, a) => sum + (a?.defense || 0), 0),
      sword: accObjs.reduce((sum, a) => sum + (a?.sword || 0), 0),
      gun: accObjs.reduce((sum, a) => sum + (a?.gun || 0), 0),
      haki: accObjs.reduce((sum, a) => sum + (a?.haki || 0), 0),
      fruit: accObjs.reduce((sum, a) => sum + (a?.fruit || 0), 0),
    });

    //
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getBuff = (arr: any[], id: number) =>
      arr.find((b) => b.id === id) || {};
    const selected = {
      fighting: getBuff(fightingActiveBuffs, buffs.fightingBuff),
      gunS: getBuff(gunActiveBuffs, buffs.gunSBuff),
      swordS: getBuff(swordActiveBuffs, buffs.swordSBuff),
      fruitS: getBuff(fruitActiveBuffs, buffs.fruitSBuff),
      suit: getBuff(suitActiveBuffs, buffs.suitBuff),
      title: getBuff(titleBuffsData, buffs.titleBuff),
      race: getBuff(raceBuffsData, buffs.raceBuff),
      armament: getBuff(armamentActiveBuffs, buffs.armamentBuff),
      conquerors: getBuff(conquerorsActiveBuffs, buffs.conquerorsBuff),
      blacksmith: getBuff(blacksmithActiveBuffs, buffs.blacksmithBuff),
      giant: getBuff(giantActiveBuffs, buffs.giantBuff),
      support: getBuff(supportActiveBuffs, buffs.supportBuff),
      artifact: getBuff(artifactActiveBuffs, buffs.artifactBuff),
    };
    const buffTypes = [
      "fruitbuff",
      "swordbuff",
      "gunbuff",
      "strengthbuff",
      "hakibuff",
    ];
    setDamageBuffs({
      fruitBuff: buffTypes.reduce(
        (prod, type, i) =>
          i === 0
            ? prod *
              (selected.fighting[type] || 1) *
              (selected.gunS[type] || 1) *
              (selected.swordS[type] || 1) *
              (selected.fruitS[type] || 1) *
              (selected.suit[type] || 1) *
              (selected.title[type] || 1) *
              (selected.race[type] || 1) *
              (selected.armament[type] || 1) *
              (selected.conquerors[type] || 1) *
              (selected.blacksmith[type] || 1) *
              (selected.giant[type] || 1) *
              (selected.support[type] || 1) *
              (selected.artifact[type] || 1)
            : prod,
        1,
      ),
      swordBuff: buffTypes.reduce(
        (prod, type, i) =>
          i === 1
            ? prod *
              (selected.fighting[type] || 1) *
              (selected.gunS[type] || 1) *
              (selected.swordS[type] || 1) *
              (selected.fruitS[type] || 1) *
              (selected.suit[type] || 1) *
              (selected.title[type] || 1) *
              (selected.race[type] || 1) *
              (selected.armament[type] || 1) *
              (selected.conquerors[type] || 1) *
              (selected.blacksmith[type] || 1) *
              (selected.giant[type] || 1) *
              (selected.support[type] || 1) *
              (selected.artifact[type] || 1)
            : prod,
        1,
      ),
      gunBuff: buffTypes.reduce(
        (prod, type, i) =>
          i === 2
            ? prod *
              (selected.fighting[type] || 1) *
              (selected.gunS[type] || 1) *
              (selected.swordS[type] || 1) *
              (selected.fruitS[type] || 1) *
              (selected.suit[type] || 1) *
              (selected.title[type] || 1) *
              (selected.race[type] || 1) *
              (selected.armament[type] || 1) *
              (selected.conquerors[type] || 1) *
              (selected.blacksmith[type] || 1) *
              (selected.giant[type] || 1) *
              (selected.support[type] || 1) *
              (selected.artifact[type] || 1)
            : prod,
        1,
      ),
      strengthBuff: buffTypes.reduce(
        (prod, type, i) =>
          i === 3
            ? prod *
              (selected.fighting[type] || 1) *
              (selected.gunS[type] || 1) *
              (selected.swordS[type] || 1) *
              (selected.fruitS[type] || 1) *
              (selected.suit[type] || 1) *
              (selected.title[type] || 1) *
              (selected.race[type] || 1) *
              (selected.armament[type] || 1) *
              (selected.conquerors[type] || 1) *
              (selected.blacksmith[type] || 1) *
              (selected.giant[type] || 1) *
              (selected.support[type] || 1) *
              (selected.artifact[type] || 1)
            : prod,
        1,
      ),
      hakiBuff: buffTypes.reduce(
        (prod, type, i) =>
          i === 4
            ? prod *
              (selected.fighting[type] || 1) *
              (selected.gunS[type] || 1) *
              (selected.swordS[type] || 1) *
              (selected.fruitS[type] || 1) *
              (selected.suit[type] || 1) *
              (selected.title[type] || 1) *
              (selected.race[type] || 1) *
              (selected.armament[type] || 1) *
              (selected.conquerors[type] || 1) *
              (selected.blacksmith[type] || 1) *
              (selected.giant[type] || 1) *
              (selected.support[type] || 1) *
              (selected.artifact[type] || 1)
            : prod,
        1,
      ),
    });

    // Damage
  }, [acc, buffs]);

  useEffect(() => {
    if (!selectedMove) return;

    const buffToDisable = sourceToBuffKey[selectedMove.source];
    const hasTitleInName = selectedMove.name?.toLowerCase().includes("title");

    setBuffs((prev) => ({
      ...prev,
      [buffToDisable]: 0, // 👈 force NONE for source buff
      ...(hasTitleInName && { titleBuff: 0 }), // 👈 force NONE for title buff if move has "title" in name
    }));

    setSelectedScale(sourceToDamageScale[selectedMove.source]);
  }, [selectedMove, sourceToBuffKey, sourceToDamageScale]);

  const firstGroup = accKeys.slice(0, 3); // first 3
  const secondGroup = accKeys.slice(3, 6); // next 3

  // Render
  return (
    <div className="w-full flex flex-col items-center">
      {/* Stats */}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <span className="text-4xl">📊</span>
          </div>

          <div className="stat-title">Total Stats</div>
          <div className="stat-desc">
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <span className="custom-text-strength">
                STR: {accBonus.strength}
              </span>
              <span className="custom-text-stamina">
                STA: {accBonus.stamina}
              </span>
              <span className="custom-text-defense">
                DEF: {accBonus.defense}
              </span>
              <span className="custom-text-sword">SWD: {accBonus.sword}</span>
              <span className="custom-text-gun">GUN: {accBonus.gun}</span>
              <span className="custom-text-haki">HKI: {accBonus.haki}</span>
              <span className="custom-text-fruit">FRT: {accBonus.fruit}</span>
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <span className="text-4xl">🔱</span>
          </div>
          <div className="stat-title">Active Buffs</div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {scaleTypes.slice(0, 2).map(({ key, label, className }) => (
                <span
                  key={key}
                  className={`badge badge-lg w-full ${className}`}
                >
                  {Number(
                    damageBuffs[key as keyof typeof damageBuffs].toFixed(2),
                  ).toLocaleString()}{" "}
                  x {label} Damage
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {scaleTypes.slice(2).map(({ key, label, className }) => (
                <span
                  key={key}
                  className={`badge badge-lg w-full ${className}`}
                >
                  {Number(
                    damageBuffs[key as keyof typeof damageBuffs].toFixed(2),
                  ).toLocaleString()}{" "}
                  x {label} Damage
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="stat"></div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 mt-4">
        {selectedMove && (
          <button
            className="btn btn-primary"
            onClick={() => buildAutoBest(activeScale)}
          >
            Auto Best for Selected Move
          </button>
        )}
        <button
          className="btn custom-text-fruit"
          onClick={() => buildAutoBest("fruitbuff")}
        >
          Best Fruit Build
        </button>
        <button
          className="btn custom-text-sword"
          onClick={() => buildAutoBest("swordbuff")}
        >
          Best Sword Build
        </button>
        <button
          className="btn custom-text-gun"
          onClick={() => buildAutoBest("gunbuff")}
        >
          Best Gun Build
        </button>
        <button
          className="btn custom-text-strength"
          onClick={() => buildAutoBest("strengthbuff")}
        >
          Best Strength Build
        </button>
        <button
          className="btn custom-text-haki"
          onClick={() => buildAutoBest("hakibuff")}
        >
          Best Haki Build
        </button>
      </div>
      {/* Fieldsets */}
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Base Stats */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Base Stats</legend>

          {scaleTypes.map(({ key, label, className }) => {
            const statKey = key.replace("Buff", "") as keyof typeof baseStats;
            const value = baseStats[statKey];

            return (
              <div key={statKey} className="mb-4">
                <label className="label mt-2">
                  <span>{label}</span>
                  <span className={`text-sm ${className}`}>
                    {value.toLocaleString()}
                  </span>
                </label>

                <input
                  type="range"
                  min="1"
                  max="14285"
                  value={value}
                  onChange={(e) =>
                    setBaseStats((prev) => ({
                      ...prev,
                      [statKey]: Number(e.target.value),
                    }))
                  }
                  className="range range-sm w-full mb-2"
                />

                <input
                  type="number"
                  min="1"
                  max="14285"
                  value={value}
                  onChange={(e) => {
                    const val = Math.min(
                      14285,
                      Math.max(1, Number(e.target.value) || 1),
                    );
                    setBaseStats((prev) => ({
                      ...prev,
                      [statKey]: val,
                    }));
                  }}
                  className="input input-bordered input-sm w-full text-center"
                />
              </div>
            );
          })}
        </fieldset>

        {/* GROUP 1 — First 3 accessories */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-4">
          <legend className="fieldset-legend">Accessories (1-3)</legend>

          {firstGroup.map(({ key, label, data, color }) => {
            const selectedId = acc[key as keyof typeof acc];
            const selectedAccessory = data.find(
              (item) => item.id === selectedId,
            );

            return (
              <div key={key} className="mb-4">
                <label className="label mt-2">
                  <span>{label} Accessory</span>
                </label>

                <select
                  value={selectedId}
                  onChange={(e) => handleAccChange(key, Number(e.target.value))}
                  className={`select ${color} w-full`}
                >
                  <option value="" disabled>
                    Pick a {label.toLowerCase()} accessory
                  </option>

                  {[...data]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                {selectedAccessory && (
                  <div className="mt-2 bg-base-300 p-2 rounded-lg text-sm flex flex-wrap gap-x-3 gap-y-1 w-full">
                    <span className="custom-text-strength">
                      STR: {selectedAccessory.strength}
                    </span>
                    <span className="custom-text-stamina">
                      STA: {selectedAccessory.stamina}
                    </span>
                    <span className="custom-text-defense">
                      DEF: {selectedAccessory.defense}
                    </span>
                    <span className="custom-text-sword">
                      SWD: {selectedAccessory.sword}
                    </span>
                    <span className="custom-text-gun">
                      GUN: {selectedAccessory.gun}
                    </span>
                    <span className="custom-text-haki">
                      HKI: {selectedAccessory.haki}
                    </span>
                    <span className="custom-text-fruit">
                      FRT: {selectedAccessory.fruit}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </fieldset>

        {/* GROUP 2 — Next 3 accessories */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Accessories (4-6)</legend>

          {secondGroup.map(({ key, label, data, color }) => {
            const selectedId = acc[key as keyof typeof acc];
            const selectedAccessory = data.find(
              (item) => item.id === selectedId,
            );

            return (
              <div key={key} className="mb-4">
                <label className="label mt-2">
                  <span>{label} Accessory</span>
                </label>

                <select
                  value={selectedId}
                  onChange={(e) => handleAccChange(key, Number(e.target.value))}
                  className={`select ${color} w-full`}
                >
                  <option value="" disabled>
                    Pick a {label.toLowerCase()} accessory
                  </option>

                  {[...data]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                {selectedAccessory && (
                  <div className="mt-2 bg-base-300 p-2 rounded-lg text-sm flex flex-wrap gap-x-3 gap-y-1 w-full">
                    <span className="custom-text-strength">
                      STR: {selectedAccessory.strength}
                    </span>
                    <span className="custom-text-stamina">
                      STA: {selectedAccessory.stamina}
                    </span>
                    <span className="custom-text-defense">
                      DEF: {selectedAccessory.defense}
                    </span>
                    <span className="custom-text-sword">
                      SWD: {selectedAccessory.sword}
                    </span>
                    <span className="custom-text-gun">
                      GUN: {selectedAccessory.gun}
                    </span>
                    <span className="custom-text-haki">
                      HKI: {selectedAccessory.haki}
                    </span>
                    <span className="custom-text-fruit">
                      FRT: {selectedAccessory.fruit}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </fieldset>

        {/* Buffs Fieldsets */}
        {buffFieldsets.map((fieldset) => (
          <fieldset
            key={fieldset.legend}
            className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
          >
            <legend className="fieldset-legend">{fieldset.legend}</legend>

            {fieldset.fields.map(({ key, label, data }) => {
              const isDisabled =
                !!selectedMove &&
                (sourceToBuffKey[selectedMove.source] === key ||
                  (key === "titleBuff" &&
                    selectedMove.name?.toLowerCase().includes("title")));
              // Get selected buff object
              const selectedBuffId = buffs[key as keyof typeof buffs];
              const selectedBuff = data.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (buff: any) => buff.id === selectedBuffId,
              );

              // Prepare buff display
              let buffDisplay = "";
              if (selectedBuff) {
                const buffsArr = [
                  {
                    icon: "🍇",
                    name: "fruitbuff",
                    label: "Fruit",
                    value: selectedBuff.fruitbuff,
                  },
                  {
                    icon: "🗡️",
                    name: "swordbuff",
                    label: "Sword",
                    value: selectedBuff.swordbuff,
                  },
                  {
                    icon: "🔫",
                    name: "gunbuff",
                    label: "Gun",
                    value: selectedBuff.gunbuff,
                  },
                  {
                    icon: "💪",
                    name: "strengthbuff",
                    label: "Strength",
                    value: selectedBuff.strengthbuff,
                  },
                  {
                    icon: "👑",
                    name: "hakibuff",
                    label: "Haki",
                    value: selectedBuff.hakibuff,
                  },
                ];

                const allSame =
                  buffsArr.every((b) => b.value === buffsArr[0].value) &&
                  buffsArr[0].value !== 1;

                if (allSame) {
                  buffDisplay = `${buffsArr[0].value}x all damage`;
                } else {
                  buffDisplay = buffsArr
                    .filter((b) => b.value !== 1)
                    .map((b) => `${b.icon} ${b.value}x`)
                    .join(" ");
                }
              }

              return (
                <div key={key}>
                  <label className="label mt-2 flex items-center justify-between">
                    <span>{label}</span>
                    {buffDisplay && (
                      <span className="text-xs opacity-80 text-right">
                        {buffDisplay}
                      </span>
                    )}
                  </label>
                  <select
                    disabled={isDisabled}
                    value={buffs[key as keyof typeof buffs]}
                    onChange={(e) =>
                      handleBuffChange(key, Number(e.target.value))
                    }
                    className="select disabled:opacity-50"
                  >
                    {[...data]
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .map((buff: any) => (
                        <option key={buff.id} value={buff.id}>
                          {buff.name}
                        </option>
                      ))}
                  </select>
                </div>
              );
            })}
          </fieldset>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl space-y-6 mt-6">
          {/* Inputs */}
          <div className="flex flex-wrap gap-4">
            {/* Move selector */}
            <div className="flex-1 min-w-[260px]">
              <label className="label">
                <span>Move</span>
              </label>
              <select
                className="select w-full"
                value={selectedMoveId}
                onChange={(e) => setSelectedMoveId(Number(e.target.value))}
              >
                {allMoves
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((move) => (
                    <option key={move.id} value={move.id}>
                      {move.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* DAMAGE TABLES SIDE BY SIDE */}
      <div className="w-full flex justify-center mt-8">
        <div className="flex gap-6 max-w-5xl w-full">
          {/* Max Damage Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              <thead>
                <tr>
                  <th>Move</th>
                  <th>Max Damage</th>
                </tr>
              </thead>
              <tbody>
                {selectedMove &&
                  moveKeys.map((key, idx) => (
                    <tr key={`max-${key}-${idx}`}>
                      <td>{key}</td>
                      <td>
                        {Math.round(
                          getFinalDamage(
                            Number(selectedMove[key as keyof MoveDamage]),
                            key as MoveKey,
                          ),
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                <tr className="font-bold border-t">
                  <td>Total</td>
                  <td>
                    {selectedMove
                      ? Math.round(
                          getMaxDamageTotal(selectedMove),
                        ).toLocaleString()
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
