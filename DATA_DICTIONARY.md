# AOPG Calculator Data Dictionary

This document provides a comprehensive guide to all data files in the `src/app/data/` directory, including their structure, purpose, and how to add new entries.

## Table of Contents

1. [Core Type Definitions](#core-type-definitions)
2. [Buff System](#buff-system)
3. [Accessories System](#accessories-system)
4. [Move Damage System](#move-damage-system)
5. [Quick Reference](#quick-reference)

---

## Core Type Definitions

### `move.ts` - Core Movement and Damage Types

**Purpose:** Defines the fundamental types and interfaces used throughout the damage calculation system.

#### Type Definitions

```typescript
// Damage scaling types - determines which stat buffs apply
export type DamageScale = "fruitbuff" | "swordbuff" | "gunbuff" | "strengthbuff" | "hakibuff";

// Available move keys
export type MoveKey = "M1" | "Q" | "E" | "R" | "F" | "G" | "T" | "U" | "Y";

// Split damage allows a move to scale from multiple stats
export type SplitDamage = {
  scale: DamageScale;
  damage: number;
}[];

// Move can use single scale, multiple scales (takes max), or split damage (sums)
export type MoveScale = DamageScale | DamageScale[] | SplitDamage;
```

#### Main Interface

```typescript
interface MoveDamage {
  id: number;              // Unique identifier
  name: string;            // Display name
  M1: number;              // Basic attack damage
  Q: number;               // Q ability damage
  E: number;               // E ability damage
  R: number;               // R ability damage
  F: number;               // F ability damage
  G: number;               // G ability damage
  T: number;               // T ability damage
  U: number;               // U ability damage
  Y: number;               // Y ability damage
  scale?: DamageScale;     // Optional: default scale for all moves
  scales?: Partial<Record<MoveKey, MoveScale>>; // Optional: per-move scaling
}
```

#### Example: Basic Entry

```typescript
{
  id: 0,
  name: "Final Gear 5 + Sun God Nika",
  M1: 6900,
  Q: 327750,
  E: 293250,
  R: 345000,
  F: 0,
  G: 414000,
  T: 0,
  U: 0,
  Y: 448500,
  // Uses default "fruitbuff" scaling for all moves
}
```

#### Example: Custom Scaling

```typescript
{
  id: 5,
  name: "Wukong + Four Focus Scroll",
  M1: 13400,
  Q: 26800,
  E: 30150,
  R: 33500,
  F: 63650,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
  scale: "swordbuff", // All moves scale with sword buff
}
```

#### Example: Split Damage (Advanced)

```typescript
{
  id: 9,
  name: "Reincarnated Slime + Birth of a Demon Lord",
  M1: 1500,
  Q: 40000,
  E: 50000,
  R: 0,
  F: 60000,
  G: 0,
  T: 0,
  U: 0,
  Y: 130000,
  // Example of split damage (commented in actual file):
  scales: {
    Y: [
      { scale: "fruitbuff", damage: 55890 },
      { scale: "strengthbuff", damage: 21600 }
    ]
  }
}
```

---

## Buff System

The buff system consists of base interfaces and various implementations for different buff sources.

### `basebuff.ts` - Base Buff Interface

**Purpose:** Defines the core structure for all buff types.

```typescript
interface BaseBuff {
  id: number;
  name: string;
  fruitbuff: number;      // Multiplier for fruit damage
  swordbuff: number;      // Multiplier for sword damage
  gunbuff: number;        // Multiplier for gun damage
  strengthbuff: number;   // Multiplier for strength damage
  hakibuff: number;       // Multiplier for haki damage
}
```

All buff values are multipliers (1.0 = no change, 1.5 = +50%, etc.)

---

### `activebuff.ts` - Active Buffs

**Purpose:** Stores temporary buffs from abilities, transformations, and special states.

#### Interface

```typescript
interface ActiveBuffs extends BaseBuff {}
```

#### Available Buff Arrays

- `fruitActiveBuffs[]` - Devil fruit transformations
- `fightingActiveBuffs[]` - Fighting style modes
- `gunActiveBuffs[]` - Gun weapon modes
- `swordActiveBuffs[]` - Sword weapon modes
- `armamentActiveBuffs[]` - Armament Haki levels
- `conquerorsActiveBuffs[]` - Conqueror's Haki stages
- `blacksmithActiveBuffs[]` - Blacksmith upgrade levels
- `giantActiveBuffs[]` - Giant blacksmith upgrades
- `suitActiveBuffs[]` - Special suit bonuses
- `supportActiveBuffs[]` - Support style transformations
- `artifactActiveBuffs[]` - Artifact buffs

#### Example Entry

```typescript
{
  id: 3,
  name: "Final Gear 5 (Sun God Nika)",
  fruitbuff: 3,      // 3x fruit damage
  swordbuff: 3,      // 3x sword damage
  gunbuff: 3,        // 3x gun damage
  strengthbuff: 3,   // 3x strength damage
  hakibuff: 3,       // 3x haki damage
}
```

#### How to Add New Active Buff

1. Choose the appropriate array based on buff source
2. Add entry with unique `id` (increment from last entry)
3. Set `name` to display name
4. Set multiplier values (use 1 for no effect)

**Example: Adding a new fruit transformation**

```typescript
// In fruitActiveBuffs array:
{
  id: 5,
  name: "Awakened Phoenix (Flames of Rebirth)",
  fruitbuff: 2.5,
  swordbuff: 1.0,
  gunbuff: 1.0,
  strengthbuff: 1.5,
  hakibuff: 1.0,
}
```

---

### `racebuff.ts` - Race Buffs

**Purpose:** Stores passive buffs from character races.

#### Interface

```typescript
interface RaceBuffs extends BaseBuff {
  note: string;    // Additional information about the buff
  image: string;   // Path to race icon
}
```

#### Example Entry

```typescript
{
  id: 15,
  name: "Oni",
  fruitbuff: 2.4,
  swordbuff: 2.4,
  gunbuff: 2.4,
  strengthbuff: 2.4,
  hakibuff: 2.4,
  note: "No other damage buff",
  image: "/resources/oni.jpg",
}
```

#### How to Add New Race

```typescript
{
  id: 31,                           // Next available ID
  name: "Your Race Name",
  fruitbuff: 1.5,                   // Adjust multipliers as needed
  swordbuff: 1.5,
  gunbuff: 1.5,
  strengthbuff: 1.5,
  hakibuff: 1.5,
  note: "Describe any special mechanics",
  image: "/resources/yourrace.jpg",
}
```

---

### `titlebuff.ts` - Title Buffs

**Purpose:** Stores buffs from player titles/achievements.

#### Interface

```typescript
interface TitleBuffs extends BaseBuff {
  rank: string;  // Rarity: "common", "uncommon", "rare", "epic", "legendary", "mythical", "divine"
}
```

#### Example Entries

```typescript
// Common title
{
  id: 1,
  name: "Swordsman",
  fruitbuff: 1.0,
  swordbuff: 1.2,    // 20% sword damage boost
  gunbuff: 1.0,
  strengthbuff: 1.0,
  hakibuff: 1,
  rank: "common",
}

// Mythical title
{
  id: 45,
  name: "Sun God",
  fruitbuff: 3.0,    // 200% fruit damage boost
  swordbuff: 2.0,
  gunbuff: 2.0,
  strengthbuff: 2.0,
  hakibuff: 2,
  rank: "mythical",
}
```

#### How to Add New Title

```typescript
{
  id: 55,                  // Next available ID
  name: "Title Name",
  fruitbuff: 1.5,          // Set multipliers based on power level
  swordbuff: 1.5,
  gunbuff: 1.5,
  strengthbuff: 1.5,
  hakibuff: 1.5,
  rank: "legendary",       // Choose appropriate rarity
}
```

---

## Accessories System

### `accessories.ts` - Equipment Buffs

**Purpose:** Stores stat bonuses from equipment items.

#### Interface

```typescript
interface Accessories {
  id: number;
  name: string;
  strength: number;   // Strength stat bonus
  stamina: number;    // Stamina stat bonus
  defense: number;    // Defense stat bonus
  sword: number;      // Sword stat bonus
  gun: number;        // Gun stat bonus
  haki: number;       // Haki stat bonus
  fruit: number;      // Fruit stat bonus
}
```

#### Available Equipment Slots

- `headAccData[]` - Head accessories
- `topAccData[]` - Chest/top accessories
- `armAccData[]` - Arm accessories
- `backAccData[]` - Back accessories
- `waistAccData[]` - Waist accessories
- `legsAccData[]` - Leg accessories

#### Example Entry

```typescript
{
  id: 14,
  name: "Golden Shades",
  strength: 0,
  stamina: 0,
  defense: 1650,
  sword: 0,
  gun: 0,
  haki: 1000,
  fruit: 2700,
}
```

#### How to Add New Accessory

```typescript
// In the appropriate equipment slot array (e.g., headAccData):
{
  id: 55,                    // Next available ID in this slot
  name: "Accessory Name",
  strength: 500,             // Set stat bonuses
  stamina: 0,
  defense: 400,
  sword: 0,
  gun: 0,
  haki: 300,
  fruit: 600,
}
```

---

## Move Damage System

All move damage files follow the same `MoveDamage` interface structure.

### `devilfruitMoveDamage.ts` - Devil Fruit Moves

**Purpose:** Stores base damage values for devil fruit abilities.

#### Example Entry

```typescript
{
  id: 0,
  name: "Final Gear 5 + Sun God Nika",
  M1: 6900,
  Q: 327750,
  E: 293250,
  R: 345000,
  F: 0,          // 0 means ability doesn't exist
  G: 414000,
  T: 0,
  U: 0,
  Y: 448500,
}
```

#### How to Add New Devil Fruit Move Set

```typescript
{
  id: 111,                // Next available ID
  name: "Fruit Name + Transformation",
  M1: 5000,               // Basic attack
  Q: 15000,               // Q ability
  E: 20000,               // E ability
  R: 25000,               // R ability
  F: 30000,               // F ability
  G: 0,                   // No G ability
  T: 0,                   // No T ability
  U: 35000,               // U ability
  Y: 40000,               // Y ability (ultimate)
}
```

---

### `fightingstyleMoveDamage.ts` - Fighting Style Moves

**Purpose:** Stores base damage for fighting style abilities.

#### Special Note

Some entries use custom scaling:

```typescript
{
  id: 5,
  name: "Wukong + Four Focus Scroll",
  M1: 13400,
  Q: 26800,
  E: 30150,
  R: 33500,
  F: 63650,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
  scale: "swordbuff",  // All moves scale with sword instead of default strength
}
```

#### How to Add New Fighting Style

```typescript
{
  id: 47,
  name: "Fighting Style + Transformation",
  M1: 1500,
  Q: 5000,
  E: 7000,
  R: 9000,
  F: 11000,
  G: 0,
  T: 0,
  U: 13000,
  Y: 0,
  // Optional: add custom scaling
  scale: "strengthbuff",  // or "swordbuff" for weapon-based styles
}
```

---

### `swordstyleMoveDamage.ts` - Sword Style Moves

**Purpose:** Stores base damage for sword weapon abilities.

#### Example Entry

```typescript
{
  id: 1,
  name: "Daimyo Oden Blades + Boiling Rage",
  M1: 11250,
  Q: 30000,
  E: 50000,
  R: 80000,
  F: 100000,
  G: 0,
  T: 0,
  U: 6250,
  Y: 0,
}
```

#### How to Add New Sword

```typescript
{
  id: 65,
  name: "Sword Name + Ability Mode",
  M1: 2000,
  Q: 8000,
  E: 12000,
  R: 16000,
  F: 20000,
  G: 0,
  T: 25000,
  U: 0,
  Y: 30000,
}
```

---

### `gunstyleMoveDamage.ts` - Gun Style Moves

**Purpose:** Stores base damage for gun weapon abilities.

#### Example Entry

```typescript
{
  id: 0,
  name: "Frost Bazooka + Subzero",
  M1: 14000,
  Q: 20000,
  E: 26000,
  R: 0,
  F: 0,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
}
```

#### How to Add New Gun

```typescript
{
  id: 19,
  name: "Gun Name + Special Mode",
  M1: 3000,
  Q: 10000,
  E: 15000,
  R: 8000,
  F: 0,
  G: 0,
  T: 0,
  U: 0,
  Y: 12000,
}
```

---

### `hakiMoveDamage.ts` - Haki Moves

**Purpose:** Stores base damage for Haki emission abilities.

#### Example Entry

```typescript
{
  id: 6,
  name: "Emission (Joy Boy Haki)",
  M1: 150000,
  Q: 0,
  E: 0,
  R: 0,
  F: 0,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
}
```

**Note:** Most Haki entries only have M1 damage (emission punch).

#### How to Add New Haki Move

```typescript
{
  id: 7,
  name: "Haki Type (Description)",
  M1: 5000,    // Usually only M1 is used
  Q: 0,
  E: 0,
  R: 0,
  F: 0,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
}
```

---

### `supportstyleMoveDamage.ts` - Support Style Moves

**Purpose:** Stores base damage for support/special fighting styles.

#### Example Entry

```typescript
{
  id: 50,
  name: "God of Stands",
  M1: 2000,
  Q: 45000,
  E: 37500,
  R: 32825,
  F: 0,
  G: 57500,
  T: 0,
  U: 0,
  Y: 0,
}
```

#### How to Add New Support Style

```typescript
{
  id: 58,
  name: "Support Style + Mode",
  M1: 1500,
  Q: 10000,
  E: 15000,
  R: 20000,
  F: 25000,
  G: 0,
  T: 0,
  U: 30000,
  Y: 0,
}
```

---

## Quick Reference

### File Purposes Summary

| File | Purpose | Key Feature |
|------|---------|-------------|
| `move.ts` | Core type definitions | Defines `MoveDamage` interface and scaling types |
| `basebuff.ts` | Base buff interface | Core structure for all buffs |
| `activebuff.ts` | Temporary buffs | Multiple arrays for different buff sources |
| `racebuff.ts` | Race bonuses | Includes image and note fields |
| `titlebuff.ts` | Title bonuses | Includes rank/rarity field |
| `accessories.ts` | Equipment stats | Six equipment slots with stat bonuses |
| `devilfruitMoveDamage.ts` | Devil fruit damage | Base damage for fruit abilities |
| `fightingstyleMoveDamage.ts` | Fighting style damage | Base damage for combat styles |
| `swordstyleMoveDamage.ts` | Sword damage | Base damage for sword weapons |
| `gunstyleMoveDamage.ts` | Gun damage | Base damage for gun weapons |
| `hakiMoveDamage.ts` | Haki damage | Base damage for haki abilities |
| `supportstyleMoveDamage.ts` | Support damage | Base damage for special styles |

### Common Patterns

#### Multiplier Values
- `1.0` = No effect (100%)
- `1.5` = +50% damage
- `2.0` = +100% damage (double)
- `3.0` = +200% damage (triple)

#### ID Assignment
- Always use the next sequential ID
- IDs are unique within each array
- Don't skip numbers or reuse IDs

#### Move Keys That Don't Exist
- Set value to `0` if the ability doesn't have that key
- Example: If weapon has no Y ultimate, set `Y: 0`

#### Naming Conventions
- Format: `"Item/Ability + Transformation/Mode"`
- Example: `"Final Gear 5 + Sun God Nika"`
- Example: `"Wukong + Four Focus Scroll"`

### Relationships Between Data

```
User Stats + Accessories = Total Stats
    ↓
Total Stats × Race Buffs × Title Buffs × Active Buffs = Final Multipliers
    ↓
Move Base Damage × Final Multipliers = Actual Damage
```

### Testing New Entries

After adding new data:

1. Verify unique ID
2. Check all required fields are present
3. Ensure multipliers/values are reasonable
4. Test in calculator UI
5. Verify damage calculations are correct

---

## Advanced: Split Damage System

For moves that scale from multiple stats simultaneously:

```typescript
{
  id: 0,
  name: "Hybrid Move",
  M1: 1000,
  Q: 5000,
  E: 5000,
  // ... other moves
  scales: {
    // Y ability splits between fruit and strength
    Y: [
      { scale: "fruitbuff", damage: 55890 },
      { scale: "strengthbuff", damage: 21600 }
    ],
    // Total Y damage = 55890 (scaled by fruit) + 21600 (scaled by strength)
  }
}
```

**Use Cases:**
- Hybrid fighting styles
- Fruit + weapon combinations
- Special transformation abilities

---

## Conclusion

This data dictionary covers all major data structures in the AOPG Calculator. When adding new entries:

1. Find the appropriate file
2. Use the correct interface structure
3. Assign a unique ID
4. Follow naming conventions
5. Set appropriate values
6. Test thoroughly

For questions or issues, refer to existing entries in each file as examples.
