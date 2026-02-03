# AOPG Data Guide

This guide explains how to add new values to all AOPG data files.

---

## Table of Contents

1. [Accessories](#accessories)
2. [Buffs - Active](#buffs---active)
3. [Buffs - Passive](#buffs---passive)
4. [Moves](#moves)

---

## Accessories

**Location:** `src/app/aopg/data/accessories/`

### Interface

```typescript
interface Accessories {
  id: number;        // Unique identifier (0 = None)
  name: string;      // Display name
  strength: number;  // Strength stat bonus
  stamina: number;   // Stamina stat bonus
  defense: number;   // Defense stat bonus
  sword: number;     // Sword damage bonus
  gun: number;       // Gun damage bonus
  haki: number;      // Haki damage bonus
  fruit: number;     // Devil Fruit damage bonus
  link?: string;     // Optional URL to wiki/guide on how to obtain
}
```

### Files & Current Counts

| File | Export Name | Last ID |
|------|-------------|---------|
| `head.ts` | `headAccData` | 55 |
| `top.ts` | `topAccData` | Check file |
| `arm.ts` | `armAccData` | Check file |
| `back.ts` | `backAccData` | Check file |
| `waist.ts` | `waistAccData` | Check file |
| `legs.ts` | `legsAccData` | Check file |

### Template

```typescript
  {
    id: NEXT_ID,
    name: "New Accessory Name",
    strength: 0,
    stamina: 0,
    defense: 0,
    sword: 0,
    gun: 0,
    haki: 0,
    fruit: 0,
    link: "https://wiki.example.com/accessory-name",  // Optional
  },
```

### Example (Head Accessory)

```typescript
  {
    id: 56,
    name: "New Head Item",
    strength: 500,
    stamina: 0,
    defense: 300,
    sword: 400,
    gun: 0,
    haki: 200,
    fruit: 600,
    link: "https://aopg.fandom.com/wiki/New_Head_Item",
  },
```

---

## Buffs - Active

**Location:** `src/app/aopg/data/buffs/active/`

### Interface

```typescript
interface ActiveBuffs {
  id: number;           // Unique identifier (0 = None)
  name: string;         // Display name
  fruitbuff: number;    // Devil Fruit damage multiplier (1.0 = 100%)
  swordbuff: number;    // Sword damage multiplier
  gunbuff: number;      // Gun damage multiplier
  strengthbuff: number; // Strength damage multiplier
  hakibuff: number;     // Haki damage multiplier
  link?: string;        // Optional URL to wiki/guide on how to obtain
}
```

### Buff Value Rules

- `1` = No change (100%)
- `1.5` = 50% increase (150%)
- `2.0` = 100% increase (200%)
- `3.0` = 200% increase (300%)

### Files & Current Counts

| File | Export Name | Last ID |
|------|-------------|---------|
| `fruit.ts` | `fruitActiveBuffs` | 5 |
| `fighting.ts` | `fightingActiveBuffs` | Check file |
| `gun.ts` | `gunActiveBuffs` | Check file |
| `sword.ts` | `swordActiveBuffs` | Check file |
| `armament.ts` | `armamentActiveBuffs` | Check file |
| `conquerors.ts` | `conquerorsActiveBuffs` | Check file |
| `suit.ts` | `suitActiveBuffs` | Check file |
| `support.ts` | `supportActiveBuffs` | Check file |

### Template

```typescript
  {
    id: NEXT_ID,
    name: "New Active Buff Name",
    fruitbuff: 1,
    swordbuff: 1,
    gunbuff: 1,
    strengthbuff: 1,
    hakibuff: 1,
    link: "https://wiki.example.com/buff-name",  // Optional
  },
```

### Example (Fruit Active Buff)

```typescript
  {
    id: 6,
    name: "New Transformation (Form Name)",
    fruitbuff: 2.5,
    swordbuff: 2.5,
    gunbuff: 2.5,
    strengthbuff: 2.5,
    hakibuff: 2.5,
    link: "https://aopg.fandom.com/wiki/New_Transformation",
  },
```

---

## Buffs - Passive

**Location:** `src/app/aopg/data/buffs/passive/`

### Title Interface

```typescript
interface TitleBuffs {
  id: number;
  name: string;
  fruitbuff: number;
  swordbuff: number;
  gunbuff: number;
  strengthbuff: number;
  hakibuff: number;
  rank: string;  // "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythical" | "divine"
}
```

### Race Interface

```typescript
interface RaceBuffs {
  id: number;
  name: string;
  fruitbuff: number;
  swordbuff: number;
  gunbuff: number;
  strengthbuff: number;
  hakibuff: number;
  note: string;   // Special mechanics info
  image: string;  // Path to race icon (e.g., "/resources/racename.jpg")
}
```

### Files & Current Counts

| File | Export Name | Last ID |
|------|-------------|---------|
| `title.ts` | `titleBuffsData` | 54 |
| `race.ts` | `raceBuffsData` | 30 |
| `artifact.ts` | `artifactActiveBuffs` | Check file |
| `blacksmith.ts` | `blacksmithActiveBuffs` | Check file |
| `giant.ts` | `giantActiveBuffs` | Check file |

### Title Template

```typescript
  {
    id: NEXT_ID,
    name: "New Title Name",
    fruitbuff: 1,
    swordbuff: 1,
    gunbuff: 1,
    strengthbuff: 1,
    hakibuff: 1,
    rank: "legendary",  // common, uncommon, rare, epic, legendary, mythical, divine
    link: "https://wiki.example.com/title-name",  // Optional
  },
```

### Race Template

```typescript
  {
    id: NEXT_ID,
    name: "New Race Name",
    fruitbuff: 1.5,
    swordbuff: 1.5,
    gunbuff: 1.5,
    strengthbuff: 1.5,
    hakibuff: 1.5,
    note: "Special ability description or 'No other damage buff'",
    image: "/resources/newrace.jpg",
    link: "https://wiki.example.com/race-name",  // Optional
  },
```

### Title Rank Reference

| Rank | Typical Buff Range |
|------|-------------------|
| common | 1.0 - 1.2 |
| uncommon | 1.2 - 1.3 |
| rare | 1.3 - 1.5 |
| epic | 1.5 - 1.7 |
| legendary | 1.5 - 2.0 |
| mythical | 2.0 - 3.5 |
| divine | 3.5+ |

---

## Moves

**Location:** `src/app/aopg/data/moves/`

### Interface

```typescript
type DamageScale = "fruitbuff" | "swordbuff" | "gunbuff" | "strengthbuff" | "hakibuff";
type MoveKey = "M1" | "Q" | "E" | "R" | "F" | "G" | "T" | "U" | "Y";

interface MoveDamage {
  id: number;
  name: string;
  M1: number;    // Base damage for M1 move
  Q: number;     // Base damage for Q move
  E: number;     // Base damage for E move
  R: number;     // Base damage for R move
  F: number;     // Base damage for F move
  G: number;     // Base damage for G move
  T: number;     // Base damage for T move
  U: number;     // Base damage for U move
  Y: number;     // Base damage for Y move
  scale?: DamageScale;                         // Default scale for all moves
  scales?: Partial<Record<MoveKey, MoveScale>>; // Per-key scales
}
```

### Files & Current Counts

| File | Export Name | Last ID |
|------|-------------|---------|
| `devilfruitMoveDamage.ts` | `devilFruitMoveDamage` | 114 |
| `fightingstyleMoveDamage.ts` | `fightingStyleMoveDamage` | Check file |
| `gunstyleMoveDamage.ts` | `gunStyleMoveDamage` | Check file |
| `hakiMoveDamage.ts` | `hakiMoveDamage` | Check file |
| `supportstyleMoveDamage.ts` | `supportStyleMoveDamage` | Check file |
| `swordstyleMoveDamage.ts` | `swordStyleMoveDamage` | Check file |

### Simple Template (Default Scale)

```typescript
  {
    id: NEXT_ID,
    name: "New Move Set Name",
    M1: 1000,
    Q: 5000,
    E: 6000,
    R: 7000,
    F: 8000,
    G: 0,
    T: 0,
    U: 0,
    Y: 10000,
  },
```

### Template with Custom Scale

```typescript
  {
    id: NEXT_ID,
    name: "New Move Set Name",
    M1: 1000,
    Q: 5000,
    E: 6000,
    R: 7000,
    F: 8000,
    G: 0,
    T: 0,
    U: 0,
    Y: 10000,
    scale: "swordbuff",  // All moves use sword scaling
  },
```

### Template with Per-Key Scales

```typescript
  {
    id: NEXT_ID,
    name: "Hybrid Move Set",
    M1: 1000,
    Q: 5000,
    E: 6000,
    R: 7000,
    F: 8000,
    G: 0,
    T: 0,
    U: 0,
    Y: 10000,
    scales: {
      M1: "strengthbuff",
      Q: "fruitbuff",
      E: ["fruitbuff", "strengthbuff"],  // Takes max of both
    },
  },
```

### Template with Split Damage

```typescript
  {
    id: NEXT_ID,
    name: "Split Damage Move Set",
    M1: 0,
    Q: 0,
    E: 5000,  // This value is ignored when using split damage
    R: 0,
    F: 0,
    G: 0,
    T: 0,
    U: 0,
    Y: 0,
    scales: {
      E: [
        { scale: "fruitbuff", damage: 2500 },
        { scale: "strengthbuff", damage: 2500 },
      ],
    },
  },
```

---

## Quick Reference

### All Buff Types

| Buff Type | Used In |
|-----------|---------|
| `fruitbuff` | Devil Fruit damage |
| `swordbuff` | Sword damage |
| `gunbuff` | Gun damage |
| `strengthbuff` | Strength/Fighting damage |
| `hakibuff` | Haki damage |

### Common Patterns

| Pattern | Example Values |
|---------|---------------|
| Balanced All | All buffs = 1.5 |
| Single Focus | One buff = 2.0+, others = 1.0 |
| Dual Focus | Two buffs = 1.5+, others = 1.0 |
| Progressive | Higher tiers have higher multipliers |

---

## Checklist

- [ ] Use the correct next ID (incremental)
- [ ] Name is unique and spelled correctly
- [ ] All required fields are filled
- [ ] Entry is placed before the closing `];`
- [ ] Comma after the closing `}`
- [ ] For moves: use `0` for unused move keys
- [ ] For buffs: use `1` for neutral multipliers
- [ ] For accessories: use `0` for unused stat bonuses
- [ ] Add `link` field with wiki/guide URL (optional but recommended)
