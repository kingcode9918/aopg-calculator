# Verse Data Guide

This guide explains how to add new values to all Verse data files.

---

## Table of Contents

1. [Passive Buffs](#passive-buffs)
2. [Stat Related](#stat-related)

---

## Passive Buffs

**Location:** `src/app/verse/data/passive/`

### Interface

```typescript
interface buffs {
  id: number;
  name: string;
  strengthBuff: number;   // Strength damage multiplier
  swordBuff: number;      // Sword damage multiplier
  specialBuff: number;    // Special damage multiplier
}
```

### Buff Value Rules

- `1` = No change (100%)
- `1.5` = 50% increase (150%)
- `2.0` = 100% increase (200%)
- `< 1` = Debuff (e.g., 0.5 = 50% decrease)

### Files & Current Counts

| File | Export Name | Entries | Last ID |
|------|-------------|---------|---------|
| `titles.ts` | `titlesData` | 31 | 30 |
| `races.ts` | `racesData` | 18 | 17 |
| `hakis.ts` | `hakisData` | 6 | 5 |
| `relics.ts` | `relicsData` | 7 | 6 |
| `abilities.ts` | `abilitiesData` | 5 | 4 |
| `prestiges.ts` | `prestigesData` | 0 | - |

---

### 1. Titles (`titles.ts`)

**Next ID:** 31

```typescript
  {
    id: 31,
    name: "New Title Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current Titles Include:**
- None, Hero Of Wrought, SSS+ Rank Master, Easter Master
- Sternritter A, Over Heaven, Dark Slayer, Never-Miss Hit
- The Struggler, Falcon of Darkness, God of Gods
- The Bird of Hermes, Silver Sword Saint Reaper
- Emperor of Roses, Emperor of Dreams, Ruler of Death
- Madoka Magica Girls, Hope and Despair

---

### 2. Races (`races.ts`)

**Next ID:** 18

```typescript
  {
    id: 18,
    name: "New Race Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current Races:**
| ID | Name | Buff |
|----|------|------|
| 0 | Human | 1x |
| 1 | Arrancar | 1.5x Special |
| 2 | Reaper | 1.5x Sword |
| 3 | Angelica | 1.25x All |
| 4 | Vessel | 1.5x All |
| 5 | Vampire | 1.25x All |
| 6 | Demonic | 1.75x All |
| 7 | Mahoraga | 2.75x All |
| 8 | Ghoul | 2.5x All |
| 9 | Contractor | 2x All |
| 10 | Dullahan Day | 0.5x All |
| 11 | Dullahan Night | 3x All |
| 12 | Dragonic | 2.25x All |
| 13 | Birkan | 3.25x All |
| 14 | Truthseeker | 2.5x Sword |
| 15 | Fallen Angel | 2.75x All |
| 16 | Legendary Saiyan | 3.75x All |
| 17 | Player Lvl 100 | 4x All |

---

### 3. Hakis (`hakis.ts`)

**Next ID:** 6

**Pattern:** Each level adds +0.05 to all buffs

```typescript
  {
    id: 6,
    name: "Haki Lvl 6",
    strengthBuff: 1.3,
    swordBuff: 1.3,
    specialBuff: 1.3,
  },
```

**Current Pattern:**
| Level | All Buffs |
|-------|-----------|
| None | 1.0 |
| Lvl 1 | 1.05 |
| Lvl 2 | 1.1 |
| Lvl 3 | 1.15 |
| Lvl 4 | 1.2 |
| Lvl 5 | 1.25 |

---

### 4. Relics (`relics.ts`)

**Next ID:** 7

```typescript
  {
    id: 7,
    name: "New Relic Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current Relics:**
| Name | Effect |
|------|--------|
| None | 1x All |
| Ashen Ring | 1.7x Sword |
| Brand of Sacrifice | 1.5x Strength |
| John-Smith Mask | 1.5x Special |
| Golden Earrings | 1.2x All |
| Kamish Necklace | 1.4x Sword |
| Momonga's Red Orb | 1.75x Special |

---

### 5. Abilities (`abilities.ts`)

**Next ID:** 5

```typescript
  {
    id: 5,
    name: "New Ability Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current Abilities:**
| Name | Effect |
|------|--------|
| None | 1x All |
| Vizard Mask | 1.5x All |
| Fighter Zone | 1.25x All |
| Transparent World | 2x All |
| Adolla Link | 1.75x All |

---

### 6. Prestiges (`prestiges.ts`)

**Currently Empty** - Needs setup:

```typescript
import type { buffs } from "./types";

export const prestigesData: buffs[] = [
  {
    id: 0,
    name: "None",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
  {
    id: 1,
    name: "Prestige 1",
    strengthBuff: 1.1,
    swordBuff: 1.1,
    specialBuff: 1.1,
  },
];
```

**Don't forget to add export in `index.ts`:**
```typescript
export { prestigesData } from "./prestiges";
```

---

## Stat Related

**Location:** `src/app/verse/data/stat_related/`

### Interfaces

```typescript
// For Accessories and Traits
interface Stats {
  id: number;
  name: string;
  strength: number;    // Strength stat bonus
  defense: number;     // Defense stat bonus
  sword: number;       // Sword stat bonus
  special: number;     // Special stat bonus
  increment?: number;  // Optional increment value
  dmgMult?: number;    // Optional damage multiplier
}

// For Ranks
interface Rank {
  label: string;  // Display label (e.g., "SSS+")
  value: number;  // Base stat value
}

// For Passive Traits
interface PassiveTrait {
  id: number;
  name: string;
  dmgMult: number;  // Damage multiplier
}
```

### Files & Current Counts

| File | Export Name | Entries | Last ID |
|------|-------------|---------|---------|
| `accessories.ts` | `accessoriesData` | 80 | 79 |
| `traits.ts` | `traitsData` | 38 | 37 |
| `ranks.ts` | `ranks` | 11 | N/A |

---

### 1. Accessories (`accessories.ts`)

**Next ID:** 80

```typescript
  {
    id: 80,
    name: "New Accessory Name",
    strength: 0,
    defense: 0,
    sword: 0,
    special: 0,
    increment: 1000,
  },
```

**Stat Ranges (for reference):**
| Tier | Typical Values |
|------|----------------|
| Low | 0 - 5,000 |
| Mid | 5,000 - 30,000 |
| High | 30,000 - 70,000 |
| Top | 70,000 - 150,000 |

**Recent Accessories:**
- Asta Demon Wing: STR 75k, DEF 75k, SWD 100k, INC 1500
- Santa Robe: STR 150k, DEF 95k, SWD 91k, SPE 91k, INC 500
- Demonic God Attire: All 90k, INC 1000

---

### 2. Traits (`traits.ts`)

**Next ID:** 38

```typescript
  {
    id: 38,
    name: "New Trait Name",
    strength: 0,
    defense: 0,
    sword: 0,
    special: 0,
    dmgMult: 1,
  },
```

**Damage Multiplier Tiers:**
| Tier | dmgMult Range |
|------|---------------|
| Common | 1.0 - 1.5 |
| Uncommon | 1.5 - 2.0 |
| Rare | 2.0 - 3.5 |
| Epic | 3.5 - 7.5 |
| Legendary | 7.5 - 12 |
| Mythic | 12 - 17 |
| Divine | 17+ |

**Top Traits:**
| Name | Stats | dmgMult |
|------|-------|---------|
| Overlord of Death | DEF 85k, SWD 60k, SPE 120k | 22 |
| Destruction King | DEF 65k, SWD 32k, SPE 95k | 20 |
| Lord of Shades | DEF 50k, SWD 50k, SPE 75k | 17 |
| Godly Saiyajin | DEF 40k, SPE 90k | 16 |

---

### 3. Ranks (`ranks.ts`)

```typescript
  { label: "SSS++", value: 25000 },
```

**Current Ranks:**
| Label | Value |
|-------|-------|
| D | 0 |
| C | 1,500 |
| C+ | 3,000 |
| B | 4,500 |
| B+ | 6,000 |
| A | 7,500 |
| A+ | 10,000 |
| S | 12,500 |
| SS | 15,000 |
| SSS | 17,500 |
| SSS+ | 20,000 |

---

## Common Buff Patterns

### Passive Buffs

| Type | Strength | Sword | Special | Example |
|------|----------|-------|---------|---------|
| Balanced | 1.5 | 1.5 | 1.5 | Vizard Mask, Vessel |
| Strength Focus | 1.7+ | 1 | 1 | Never-Miss Hit |
| Sword Focus | 1 | 1.5+ | 1 | Hero Of Wrought |
| Special Focus | 1 | 1 | 1.5+ | Easter Master |
| Mixed (Sword+Special) | 1 | 1.5 | 1.5 | Falcon of Darkness |

### Stat Items

| Type | Pattern |
|------|---------|
| Defense Focus | High DEF, low others |
| Sword Focus | High SWD, moderate DEF |
| Special Focus | High SPE, moderate DEF |
| Balanced | Equal distribution |
| Strength Build | High STR, moderate DEF |

---

## Checklist

### For Passive Buffs
- [ ] Use the correct next ID (incremental)
- [ ] Name is unique and spelled correctly
- [ ] All three buff values are set (use `1` for neutral)
- [ ] Entry is placed before the closing `];`
- [ ] Comma after the closing `}`
- [ ] For new files: export added to `index.ts`

### For Stat Items
- [ ] Use the correct next ID (incremental)
- [ ] Name is unique and spelled correctly
- [ ] All four stat values are set (use `0` for none)
- [ ] `increment` field included for accessories
- [ ] `dmgMult` field included for traits
- [ ] Entry is placed before the closing `];`
- [ ] Comma after the closing `}`
