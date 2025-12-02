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
import { titleBuffsData } from "../data/titlebuff";
import { raceBuffsData } from "../data/racebuff";

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
      fruitSBuff: 3,
      suitBuff: 6,
      titleBuff: 53,
      raceBuff: 27,
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
      fruitSBuff: 3,
      suitBuff: 2,
      titleBuff: 38,
      raceBuff: 27,
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
      fruitSBuff: 3,
      suitBuff: 7,
      titleBuff: 53,
      raceBuff: 27,
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
      fruitSBuff: 3,
      suitBuff: 1,
      titleBuff: 53,
      raceBuff: 27,
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
  // const dev = useDevMode();

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
  });
  const [damageBuffs, setDamageBuffs] = useState({
    fruitBuff: 1,
    swordBuff: 1,
    gunBuff: 1,
    strengthBuff: 1,
  });

  // Damage

  // Handlers
  const handleAccChange = (key: string, value: number) =>
    setAcc((a) => ({ ...a, [key]: value }));
  const handleBuffChange = (key: string, value: number) =>
    setBuffs((b) => ({ ...b, [key]: value }));

  const setBestBuild = (type: keyof typeof bestBuilds) => {
    setAcc(bestBuilds[type].acc);
    setBuffs(() => {
      // If current selected main damage is fighting, keep fightingBuff as 0
      return { ...bestBuilds[type].buffs };
    });
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
              (selected.support[type] || 1)
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
              (selected.support[type] || 1)
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
              (selected.support[type] || 1)
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
              (selected.support[type] || 1)
            : prod,
        1
      ),
    });

    // Damage
  }, [acc, buffs]);

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

          {/* <div className="stat-value text-primary">
            {Object.values(stats)
              .reduce((a, b) => a + b, 0)
              .toLocaleString()}
          </div> */}

          <div className="stat-desc">
            {/* +
            {Object.values(accBonus)
              .reduce((a, b) => a + b, 0)
              .toLocaleString()} */}
            {/* --- Horizontal Stats Here --- */}
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
            {/* {dev ? (
              <>
                <div className="flex flex-col gap-3">
                  {scaleTypes.slice(0, 2).map(({ key, label, className }) => (
                    <button
                      key={key}
                      className={`badge badge-lg w-full cursor-pointer ${className}`}
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
                      className={`badge badge-lg w-full cursor-pointer ${className}`}
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
              <> */}
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
            {/* </>
            )} */}
          </div>
          {/* <div className="stat-desc">
            {((Object.values(stats).reduce((a, b) => a + b, 0) / 10000) * 3)
              .toFixed(4)
              .toLocaleString()}{" "}
            x from Pinpoint Artifact
          </div> */}
        </div>
        <div className="stat">
          {/* <div className="stat-value">
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
          </div> */}
          {/* <div className="stat-title">Main Damage</div> */}
          {/* {dev && (
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
          )} */}
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
        {/* <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
        </fieldset> */}

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
            {fieldset.fields.map(({ key, label, data }) => {
              // Get selected buff object
              const selectedBuffId = buffs[key as keyof typeof buffs];
              const selectedBuff = data.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                  >
                    <option value="" disabled>
                      Pick a {label.toLowerCase()}
                    </option>
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      data.map((buff: any) => (
                        <option key={buff.id} value={buff.id}>
                          {buff.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              );
            })}
          </fieldset>
        ))}
      </div>
      {/* Dev Mode: Base to Scale Damage */}
      {/* {dev && ( */}
      <div className="w-full max-w-4xl mt-4 flex flex-col items-center">
        {/* <div className="divider w-full">Base Damage w/ Passive</div> */}
        {/* <div className="w-full flex justify-center mb-4">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter a name for this computation"
            value={damageTitle}
            onChange={(e) => setDamageTitle(e.target.value)}
          />
        </div> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {moveKeys.map((key) => (
            <div key={key} className="space-y-4 border p-4 rounded-xl shadow">
              <label className="input">
                <span className="label">{key} Scale</span>
                <select
                  value={moveScales[key]}
                  onChange={(e) =>
                    setMoveScales((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="select select-bordered w-full"
                >
                  <option value="Fruit">Fruit</option>
                  <option value="Sword">Sword</option>
                  <option value="Gun">Gun</option>
                  <option value="Strength">Strength</option>
                </select>
              </label>
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
                          const scale = moveScales[key];
                          const statKey = getStatKeyForScaling(scale, stats);
                          const statValue = stats[statKey] || 1;
                          const accValue = accBonus[statKey] || 0;
                          const combined = statValue + accValue;
                          const scaleBuff = getScaleBuffForScaling(
                            scale,
                            damageBuffs
                          );
                          const scaled = computeScaledDamage(
                            base,
                            combined,
                            scaleBuff
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
        </div> */}
        {/* <div className="w-full flex justify-end pr-8 mt-2 mb-2">
          <div className="text-lg font-bold">
            Total Damage:&nbsp;
            {moveKeys
              .reduce((sum, key) => {
                const base = baseDamages[key];
                if (!base) return sum;
                const scale = moveScales[key];
                const statKey = getStatKeyForScaling(scale, stats);
                const statValue = stats[statKey] || 1;
                const accValue = accBonus[statKey] || 0;
                const combined = statValue + accValue;
                const scaleBuff = getScaleBuffForScaling(scale, damageBuffs);
                const scaled = computeScaledDamage(base, combined, scaleBuff);
                return sum + scaled;
              }, 0)
              .toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div> */}
        {/* Save to localStorage & Delete All button */}
        {/* <div className="w-full flex justify-end pr-8 mb-4 gap-2">
          <button
            className="btn btn-info"
            onClick={() => {
              const computed = moveKeys.reduce((obj, key) => {
                const base = baseDamages[key];
                const scale = moveScales[key]; // Use the selected scale for this move
                const statKey = getStatKeyForScaling(scale, stats);
                const statValue = stats[statKey] || 1;
                const accValue = accBonus[statKey] || 0;
                const combined = statValue + accValue;
                const scaleBuff = getScaleBuffForScaling(scale, damageBuffs);
                const scaled =
                  base === 0
                    ? 0
                    : computeScaledDamage(base, combined, scaleBuff);
                obj[key] = {
                  base,
                  scaled,
                  scale,
                };
                return obj;
              }, {} as Record<string, { base: number; scaled: number; scale: string }>);

              // Load existing records or start new array
              const prev = JSON.parse(
                localStorage.getItem("aopg_calculator_dev_saved") || "[]"
              );
              prev.push({
                timestamp: Date.now(),
                title: damageTitle,
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
        </div> */}
      </div>
      {/* )} */}
      {/* {!dev && selectedDamageData && selectedDamageData[0] && (
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
      )} */}
    </div>
  );
};

export default Calculator;
