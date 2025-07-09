/* eslint-disable */
import { useState, useEffect } from "react";
import {
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
} from "../data/activebuff";
import { damageData, Weapon, Mode } from "../data/damage";
import { computeScaledDamage } from "../utils/computeDamage";
import { titleBuffsData } from "../data/titlebuff";
import { raceBuffsData } from "../data/racebuff";
import { useDevMode } from "../hooks/devmode";
import { stat } from "fs";
import {
  getScaleBuffForScaling,
  getStatKeyForScaling,
} from "../utils/damageScale";

const statKeys = [
  { key: "strength", label: "Strength" },
  { key: "stamina", label: "Stamina" },
  { key: "defense", label: "Defense" },
  { key: "sword", label: "Sword" },
  { key: "gun", label: "Gun" },
  { key: "haki", label: "Haki" },
  { key: "fruit", label: "Fruit" },
];

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

const moveKeys = ["M1", "Q", "E", "R", "F", "G", "T", "U", "Y"];

const scaleTypes = [
  { key: "fruitBuff", label: "Fruit", className: "custom-text-fruit" },
  { key: "swordBuff", label: "Sword", className: "custom-text-sword" },
  { key: "gunBuff", label: "Gun", className: "custom-text-gun" },
  { key: "strengthBuff", label: "Strength", className: "custom-text-strength" },
];

const bestBuilds = {
  strength: {
    acc: {
      selectedHeadAcc: 7,
      selectedTopAcc: 20,
      selectedBackAcc: 1,
      selectedArmAcc: 4,
      selectedWaistAcc: 2,
      selectedLegsAcc: 14,
    },
    buffs: {
      fightingBuff: 5,
      gunSBuff: 0,
      swordSBuff: 1,
      fruitSBuff: 1,
      suitBuff: 6,
      titleBuff: 50,
      raceBuff: 23,
      armamentBuff: 11,
      conquerorsBuff: 3,
      blacksmithBuff: 5,
      giantBuff: 15,
      supportBuff: 21,
    },
    scale: "strengthBuff",
  },
  gun: {
    acc: {
      selectedHeadAcc: 42,
      selectedTopAcc: 9,
      selectedBackAcc: 5,
      selectedArmAcc: 4,
      selectedWaistAcc: 1,
      selectedLegsAcc: 6,
    },
    buffs: {
      fightingBuff: 5,
      gunSBuff: 1,
      swordSBuff: 1,
      fruitSBuff: 1,
      suitBuff: 2,
      titleBuff: 38,
      raceBuff: 23,
      armamentBuff: 11,
      conquerorsBuff: 3,
      blacksmithBuff: 5,
      giantBuff: 15,
      supportBuff: 21,
    },
    scale: "gunBuff",
  },
  sword: {
    acc: {
      selectedHeadAcc: 34,
      selectedTopAcc: 9,
      selectedBackAcc: 5,
      selectedArmAcc: 6,
      selectedWaistAcc: 2,
      selectedLegsAcc: 6,
    },
    buffs: {
      fightingBuff: 5,
      gunSBuff: 0,
      swordSBuff: 4,
      fruitSBuff: 1,
      suitBuff: 7,
      titleBuff: 49,
      raceBuff: 23,
      armamentBuff: 11,
      conquerorsBuff: 3,
      blacksmithBuff: 5,
      giantBuff: 15,
      supportBuff: 21,
    },
    scale: "swordBuff",
  },
  fruit: {
    acc: {
      selectedHeadAcc: 14,
      selectedTopAcc: 3,
      selectedBackAcc: 13,
      selectedArmAcc: 4,
      selectedWaistAcc: 2,
      selectedLegsAcc: 3,
    },
    buffs: {
      fightingBuff: 5,
      gunSBuff: 0,
      swordSBuff: 1,
      fruitSBuff: 1,
      suitBuff: 1,
      titleBuff: 51,
      raceBuff: 23,
      armamentBuff: 11,
      conquerorsBuff: 3,
      blacksmithBuff: 5,
      giantBuff: 15,
      supportBuff: 21,
    },
    scale: "fruitBuff",
  },
};

const Calculator = () => {
  const dev = useDevMode();

  const [customModeBuff, setCustomModeBuff] = useState(1);

  // Stats and Accessories
  const [stats, setStats] = useState({
    strength: 1,
    stamina: 1,
    defense: 1,
    sword: 1,
    gun: 1,
    haki: 1,
    fruit: 1,
  });
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
  });
  const [damageBuffs, setDamageBuffs] = useState({
    fruitBuff: 1,
    swordBuff: 1,
    gunBuff: 1,
    strengthBuff: 1,
  });

  // Damage
  const [selectedDamage, setSelectedDamage] = useState(0);
  const [selectedDamageData, setSelectedDamageData] = useState<Weapon[]>();
  const [selectedModeIdx, setSelectedModeIdx] = useState(0);
  const [baseDamages, setBaseDamages] = useState<Record<string, number>>(() =>
    moveKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
  );

  // Handlers
  const handleStatChange = (key: string, value: number) =>
    setStats((s) => ({ ...s, [key]: value }));
  const handleAccChange = (key: string, value: number) =>
    setAcc((a) => ({ ...a, [key]: value }));
  const handleBuffChange = (key: string, value: number) =>
    setBuffs((b) => ({ ...b, [key]: value }));
  const handleBaseDamageChange = (key: string, value: string) =>
    setBaseDamages((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));

  const isFightingType =
    selectedDamageData &&
    selectedDamageData[0] &&
    selectedDamageData[0].type === "Fighting";

  const setBestBuild = (type: keyof typeof bestBuilds) => {
    setAcc(bestBuilds[type].acc);
    setBuffs((prev) => {
      // If current selected main damage is fighting, keep fightingBuff as 0
      if (isFightingType) {
        return { ...bestBuilds[type].buffs, fightingBuff: 0 };
      }
      return { ...bestBuilds[type].buffs };
    });
    setSelectedScale(bestBuilds[type].scale as keyof typeof damageBuffs);
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
          disableIf: () => isFightingType,
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
      ],
    },
  ];

  const [selectedScale, setSelectedScale] =
    useState<keyof typeof damageBuffs>("fruitBuff");

  const scaleFactor = damageBuffs[selectedScale];

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

    // Buffs
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
    };
    const buffTypes = ["fruitbuff", "swordbuff", "gunbuff", "strengthbuff"];
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
              (customModeBuff || 1)
            : prod,
        1
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
              (customModeBuff || 1)
            : prod,
        1
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
              (customModeBuff || 1)
            : prod,
        1
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
              (customModeBuff || 1)
            : prod,
        1
      ),
    });

    // Damage
    const foundDamage = damageData.find((dmg) => dmg.id === selectedDamage);
    setSelectedDamageData(foundDamage ? [foundDamage] : undefined);
    setSelectedModeIdx(-1);

    if (isFightingType && buffs.fightingBuff !== 0) {
      setBuffs((prev) => ({ ...prev, fightingBuff: 0 }));
    }
  }, [acc, buffs, selectedDamage, customModeBuff, isFightingType]);

  const combinedStatValue =
    (stats as any)[selectedScale.replace("Buff", "")] +
    (accBonus as any)[selectedScale.replace("Buff", "")];

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
          <div className="stat-value text-primary">
            {Object.values(stats)
              .reduce((a, b) => a + b, 0)
              .toLocaleString()}
          </div>
          <div className="stat-desc">
            +
            {Object.values(accBonus)
              .reduce((a, b) => a + b, 0)
              .toLocaleString()}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <span className="text-4xl">🔱</span>
          </div>
          <div className="stat-title">Active Buffs</div>
          <div className="flex gap-3">
            {dev ? (
              <>
                <div className="flex flex-col gap-3">
                  {scaleTypes.slice(0, 2).map(({ key, label, className }) => (
                    <button
                      key={key}
                      className={`badge badge-lg w-full cursor-pointer ${className} ${
                        selectedScale === key
                          ? "ring ring-primary ring-offset-2"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedScale(key as keyof typeof damageBuffs)
                      }
                      type="button"
                    >
                      {Number(
                        damageBuffs[key as keyof typeof damageBuffs].toFixed(2)
                      ).toLocaleString()}{" "}
                      x {label} Damage
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {scaleTypes.slice(2).map(({ key, label, className }) => (
                    <button
                      key={key}
                      className={`badge badge-lg w-full cursor-pointer ${className} ${
                        selectedScale === key
                          ? "ring ring-primary ring-offset-2"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedScale(key as keyof typeof damageBuffs)
                      }
                      type="button"
                    >
                      {Number(
                        damageBuffs[key as keyof typeof damageBuffs].toFixed(2)
                      ).toLocaleString()}{" "}
                      x {label} Damage
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {scaleTypes.slice(0, 2).map(({ key, label, className }) => (
                    <span
                      key={key}
                      className={`badge badge-lg w-full ${className}`}
                    >
                      {Number(
                        damageBuffs[key as keyof typeof damageBuffs].toFixed(2)
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
                        damageBuffs[key as keyof typeof damageBuffs].toFixed(2)
                      ).toLocaleString()}{" "}
                      x {label} Damage
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="stat-desc">
            {((Object.values(stats).reduce((a, b) => a + b, 0) / 10000) * 3)
              .toFixed(4)
              .toLocaleString()}{" "}
            x from Pinpoint Artifact
          </div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <select
              value={selectedDamage}
              onChange={(e) => setSelectedDamage(Number(e.target.value))}
              className="select select-accent"
            >
              <option value="" disabled>
                Pick a main damage
              </option>
              {damageData.map((dmg) => (
                <option key={dmg.id} value={dmg.id}>
                  {dmg.name}
                </option>
              ))}
            </select>
          </div>
          <div className="stat-title">Main Damage</div>
          {dev && (
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold">Custom Mode Buff:</span>
              <input
                type="number"
                min={1}
                step={0.1}
                value={customModeBuff}
                onChange={(e) => setCustomModeBuff(Number(e.target.value))}
                className="input input-xs input-bordered w-20 text-right"
              />
              <span className="opacity-70">x (applies to all buffs)</span>
            </div>
          )}
          <div className="stat-desc text-secondary">
            {selectedDamageData && selectedDamageData.length > 0 ? (
              <div>
                {selectedDamageData[0].modes &&
                  selectedDamageData[0].modes.length > 0 && (
                    <div className="gap-2 mb-2">
                      {/* None option */}
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="mode-toggle"
                          className="radio radio-warning radio-xs"
                          checked={selectedModeIdx === -1}
                          onChange={() => setSelectedModeIdx(-1)}
                        />
                        <span className="ml-1">None</span>
                      </label>
                      {selectedDamageData[0].modes.map(
                        (mode: Mode, idx: number) => (
                          <label
                            key={mode.name}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="mode-toggle"
                              className="radio radio-warning radio-xs"
                              checked={selectedModeIdx === idx}
                              onChange={() => setSelectedModeIdx(idx)}
                            />
                            <span className="ml-1">{mode.name}</span>
                          </label>
                        )
                      )}
                    </div>
                  )}
              </div>
            ) : (
              "No damage data selected"
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 mt-4">
        <button
          className="btn custom-text-fruit"
          onClick={() => setBestBuild("fruit")}
        >
          Best Fruit Build
        </button>
        <button
          className="btn custom-text-sword"
          onClick={() => setBestBuild("sword")}
        >
          Best Sword Build
        </button>
        <button
          className="btn custom-text-gun"
          onClick={() => setBestBuild("gun")}
        >
          Best Gun Build
        </button>
        <button
          className="btn custom-text-strength"
          onClick={() => setBestBuild("strength")}
        >
          Best Strength Build
        </button>
      </div>
      {/* Fieldsets */}
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Stats Fieldset */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Stats Details</legend>
          {statKeys.map(({ key, label }) => (
            <div key={key}>
              <label className="label mt-2">
                <span>{label}</span>
                <input
                  type="number"
                  min={1}
                  max={14285}
                  value={stats[key as keyof typeof stats]}
                  onChange={(e) =>
                    handleStatChange(key, Number(e.target.value))
                  }
                  className="input input-xs input-bordered w-24 text-right"
                />
                <span> + {accBonus[key as keyof typeof accBonus]}</span>
              </label>
              <input
                type="range"
                min={1}
                max={14285}
                value={stats[key as keyof typeof stats]}
                onChange={(e) => handleStatChange(key, Number(e.target.value))}
                className={`range custom-text-${key}`}
              />
            </div>
          ))}
          <div className="flex justify-center gap-4 mt-2">
            <button
              className="btn btn-soft"
              onClick={() =>
                setStats(
                  Object.fromEntries(statKeys.map(({ key }) => [key, 1])) as any
                )
              }
            >
              Minimum
            </button>
            <button
              className="btn btn-soft btn-success"
              onClick={() =>
                setStats(
                  Object.fromEntries(
                    statKeys.map(({ key }) => [key, 14285])
                  ) as any
                )
              }
            >
              Maximum
            </button>
          </div>
        </fieldset>

        {/* Accessories Fieldset */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Accessories Details</legend>
          {accKeys.map(({ key, label, data, color }) => (
            <div key={key}>
              <label className="label mt-2">
                <span>{label} Accessory</span>
              </label>
              <select
                value={acc[key as keyof typeof acc]}
                onChange={(e) => handleAccChange(key, Number(e.target.value))}
                className={`select ${color}`}
              >
                <option value="" disabled>
                  Pick a {label.toLowerCase()} accessory
                </option>
                {data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </fieldset>

        {/* Buffs Fieldsets */}
        {buffFieldsets.map((fieldset) => (
          <fieldset
            key={fieldset.legend}
            className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
          >
            <legend className="fieldset-legend">{fieldset.legend}</legend>
            {fieldset.fields.map(({ key, label, data, disableIf }) => {
              // Get selected buff object
              const selectedBuffId = buffs[key as keyof typeof buffs];
              const selectedBuff = data.find(
                (buff: any) => buff.id === selectedBuffId
              );

              // Prepare buff display
              let buffDisplay = "";
              if (selectedBuff) {
                // Collect all buff multipliers
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
                    value={buffs[key as keyof typeof buffs]}
                    onChange={(e) =>
                      handleBuffChange(key, Number(e.target.value))
                    }
                    className="select"
                    disabled={disableIf ? disableIf() : false}
                  >
                    <option value="" disabled>
                      Pick a {label.toLowerCase()}
                    </option>
                    {data.map((buff: any) => (
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
      {/* Dev Mode: Base to Scale Damage */}
      {dev && (
        <div className="w-full max-w-4xl mt-4 flex flex-col items-center">
          <div className="divider w-full">Base Damage w/ Passive</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {moveKeys.map((key) => (
              <div key={key} className="space-y-4 border p-4 rounded-xl shadow">
                <label className="input">
                  <span className="label">{key} Move</span>
                  <input
                    type="text"
                    placeholder="0.00"
                    min={0}
                    max={10000000}
                    step="100"
                    value={
                      baseDamages[key]
                        ? baseDamages[key].toLocaleString("en-US")
                        : ""
                    }
                    onChange={(e) => {
                      // Remove commas before parsing
                      const raw = e.target.value.replace(/,/g, "");
                      handleBaseDamageChange(key, raw);
                    }}
                  />
                </label>
                <label className="input">
                  <input
                    type="text"
                    readOnly
                    value={
                      baseDamages[key]
                        ? (() => {
                            const base = baseDamages[key];
                            const scaled = computeScaledDamage(
                              base,
                              combinedStatValue,
                              scaleFactor
                            );
                            return scaled
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          })()
                        : ""
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end pr-8 mt-2 mb-2">
            <div className="text-lg font-bold">
              Total Damage:&nbsp;
              {moveKeys
                .reduce((sum, key) => {
                  const base = baseDamages[key];
                  if (!base) return sum;
                  const scaled = computeScaledDamage(
                    base,
                    combinedStatValue,
                    scaleFactor
                  );
                  return sum + scaled;
                }, 0)
                .toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          {/* Save to localStorage & Delete All button */}
          <div className="w-full flex justify-end pr-8 mb-4 gap-2">
            <button
              className="btn btn-info"
              onClick={() => {
                const computed = moveKeys.reduce((obj, key) => {
                  const base = baseDamages[key];
                  const scaled = computeScaledDamage(
                    base,
                    combinedStatValue,
                    scaleFactor
                  );
                  obj[key] = {
                    base,
                    scaled,
                  };
                  return obj;
                }, {} as Record<string, { base: number; scaled: number }>);

                // Load existing records or start new array
                const prev = JSON.parse(
                  localStorage.getItem("aopg_calculator_dev_saved") || "[]"
                );
                prev.push({
                  timestamp: Date.now(),
                  moves: computed,
                });
                localStorage.setItem(
                  "aopg_calculator_dev_saved",
                  JSON.stringify(prev)
                );
                alert("Computed values saved to local storage!");
              }}
            >
              Save Computed Values
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                localStorage.removeItem("aopg_calculator_dev_saved");
                alert("All saved records deleted!");
              }}
            >
              Delete All Saved
            </button>
          </div>
        </div>
      )}
      {!dev && selectedDamageData && selectedDamageData[0] && (
        <div className="w-full max-w-4xl mt-4 flex flex-col items-center">
          <div className="divider w-full">Damage Computation</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {moveKeys.map((key) => {
              // Find the move in the selected weapon/mode
              let move;
              if (
                selectedModeIdx !== -1 &&
                selectedDamageData[0].modes &&
                selectedDamageData[0].modes[selectedModeIdx]
              ) {
                move = selectedDamageData[0].modes[selectedModeIdx].moves.find(
                  (m: any) => m.key === key
                );
              } else {
                move = selectedDamageData[0].moves?.find(
                  (m: any) => m.key === key
                );
              }
              return (
                <div
                  key={key}
                  className="space-y-4 border p-4 rounded-xl shadow"
                >
                  <div className="font-semibold text-center mb-2">
                    {move?.name || key}
                  </div>
                  <label className="input">
                    <span className="label">{key} Move</span>
                    <input
                      type="text"
                      readOnly
                      hidden
                      value={
                        move && move.baseDamage
                          ? Number(
                              move.baseDamage * (move.numHits ?? 1)
                            ).toLocaleString("en-US")
                          : ""
                      }
                    />
                  </label>
                  <label className="input">
                    <input
                      type="text"
                      readOnly
                      value={
                        move && move.baseDamage
                          ? (() => {
                              const base = move.baseDamage;
                              const numHits = move.numHits ?? 1;
                              const scale = move.scaling;
                              const statKey = getStatKeyForScaling(
                                scale,
                                stats
                              );
                              const statValue = stats[statKey] || 1;
                              const accValue = accBonus[statKey] || 0;
                              const combined = statValue + accValue;
                              const scaleBuff = getScaleBuffForScaling(
                                scale,
                                damageBuffs
                              );
                              let scaled = computeScaledDamage(
                                base,
                                combined,
                                scaleBuff,
                                numHits
                              );
                              return scaled
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            })()
                          : ""
                      }
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-end pr-8 mt-2 mb-2">
            <div className="text-lg font-bold">
              Total Damage:&nbsp;
              {moveKeys
                .reduce((sum, key) => {
                  let move;
                  if (
                    selectedModeIdx !== -1 &&
                    selectedDamageData[0].modes &&
                    selectedDamageData[0].modes[selectedModeIdx]
                  ) {
                    move = selectedDamageData[0].modes[
                      selectedModeIdx
                    ].moves.find((m: any) => m.key === key);
                  } else {
                    move = selectedDamageData[0].moves?.find(
                      (m: any) => m.key === key
                    );
                  }
                  if (!move || !move.baseDamage) return sum;
                  const base = move.baseDamage;
                  const numHits = move.numHits ?? 1;
                  const scale = move.scaling;
                  const statKey = getStatKeyForScaling(scale, stats);
                  const statValue = stats[statKey] || 1;
                  const accValue = accBonus[statKey] || 0;
                  const combined = statValue + accValue;
                  const scaleBuff = getScaleBuffForScaling(scale, damageBuffs);
                  let scaled = computeScaledDamage(
                    base,
                    combined,
                    scaleBuff,
                    numHits
                  );
                  return sum + scaled;
                }, 0)
                .toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* eslint-enable */

export default Calculator;
