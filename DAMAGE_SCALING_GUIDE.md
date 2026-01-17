# AOPG Calculator - Damage Scaling Guide

## Overview

The AOPG Calculator now supports **automatic damage scaling** based on move types and individual move abilities. The damage scale is automatically detected based on the move's source (Fighting Style, Devil Fruit, Sword, Gun, Haki, or Support Style).

## How It Works

### Automatic Scale Detection

When you select a move, the calculator automatically determines the appropriate damage scale:

- **Fighting Style** → `strengthbuff` (Strength)
- **Support Style** → `strengthbuff` (Strength)
- **Devil Fruit** → `fruitbuff` (Fruit)
- **Sword** → `swordbuff` (Sword)
- **Gun** → `gunbuff` (Gun)
- **Haki** → `hakibuff` (Haki)

The **Damage Scale** dropdown will be **disabled** when a move is selected, and it will show "(Auto: [Scale])" to indicate which scale is being used automatically.

---

## Editing Move Scales

You can customize the damage scaling in the following data files:

- `src/app/data/devilfruitMoveDamage.ts`
- `src/app/data/fightingstyleMoveDamage.ts`
- `src/app/data/gunstyleMoveDamage.ts`
- `src/app/data/hakiMoveDamage.ts`
- `src/app/data/supportstyleMoveDamage.ts`
- `src/app/data/swordstyleMoveDamage.ts`

### Three Ways to Define Scales

#### 1. **Default Scale (No customization needed)**

By default, each move uses its source's default scale. No code changes needed!

```typescript
{
  id: 0,
  name: "Reincarnated Slime",
  M1: 1500,
  Q: 40000,
  E: 50000,
  R: 0,
  F: 60000,
  G: 0,
  T: 0,
  U: 0,
  Y: 130000,
}
// This Fighting Style move automatically uses "strengthbuff" for all abilities
```

#### 2. **Move-Wide Scale Override**

Override the scale for **all abilities** in a move using the `scale` property:

```typescript
{
  id: 0,
  name: "Special Hybrid Move",
  M1: 1500,
  Q: 40000,
  E: 50000,
  R: 0,
  F: 60000,
  G: 0,
  T: 0,
  U: 0,
  Y: 130000,
  scale: "fruitbuff", // All abilities use Fruit scale instead of default
}
```

#### 3. **Per-Ability Scale Override** (Most Flexible)

Define **different scales for each ability** using the `scales` property:

##### Scenario 1: Each ability has a different scale

```typescript
{
  id: 0,
  name: "Hybrid Sword-Fruit Move",
  M1: 1500,
  Q: 40000,
  E: 50000,
  R: 20000,
  F: 60000,
  G: 0,
  T: 0,
  U: 0,
  Y: 130000,
  scales: {
    M1: "swordbuff",      // M1 scales with Sword
    Q: "fruitbuff",       // Q scales with Fruit
    E: "fruitbuff",       // E scales with Fruit
    R: "strengthbuff",    // R scales with Strength
    // F, G, T, U, Y will use the default scale (from source)
  }
}
```

##### Scenario 2: Some abilities scale with **multiple stats** (takes the highest)

```typescript
{
  id: 1,
  name: "Multi-Scale Move",
  M1: 2000,
  Q: 50000,
  E: 60000,
  R: 30000,
  F: 0,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
  scales: {
    M1: "swordbuff",                      // M1 scales with Sword only
    Q: "fruitbuff",                       // Q scales with Fruit only
    E: ["fruitbuff", "strengthbuff"],     // E scales with BOTH Fruit AND Strength (uses highest damage)
    R: ["swordbuff", "hakibuff"],         // R scales with BOTH Sword AND Haki (uses highest damage)
  }
}
```

When an ability has **multiple scales**, the calculator will:
1. Calculate damage using each scale
2. Apply the appropriate buffs for each scale
3. **Return the HIGHEST damage value**

This means if you have high Fruit stats but low Strength stats, and an ability scales with both, it will automatically use your Fruit scaling to maximize damage.

##### Scenario 3: Split damage with **different base values per scale** (sums the damage)

```typescript
{
  id: 2,
  name: "Hybrid Split Move",
  M1: 1000,
  Q: 5000,
  E: 5000,
  R: 0,
  F: 0,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
  scales: {
    // M1: 1000 base for fruit + 1000 base for strength = summed together
    M1: [
      { scale: "fruitbuff", damage: 1000 },
      { scale: "strengthbuff", damage: 1000 }
    ],
    // Q: 2000 fruit damage + 3000 strength damage = summed together
    Q: [
      { scale: "fruitbuff", damage: 2000 },
      { scale: "strengthbuff", damage: 3000 }
    ],
    // E: 50-50 split (2500 each) = summed together
    E: [
      { scale: "fruitbuff", damage: 2500 },
      { scale: "strengthbuff", damage: 2500 }
    ],
  }
}
```

When an ability has **split damage**, the calculator will:
1. Calculate damage for the first scale using its specific damage value
2. Calculate damage for the second scale using its specific damage value
3. **Return the SUM of all damages**

This is different from Scenario 2 because:
- **Scenario 2 (Array of scales):** Uses the same base damage, takes the MAX
- **Scenario 3 (Split damage):** Uses different base damage values, takes the SUM

---

## Available Scale Types

| Scale Type      | Property Value    | Accessory Stat | Description                           |
|-----------------|-------------------|----------------|---------------------------------------|
| Fruit           | `"fruitbuff"`     | `fruit`        | Devil Fruit damage scaling            |
| Sword           | `"swordbuff"`     | `sword`        | Sword damage scaling                  |
| Gun             | `"gunbuff"`       | `gun`          | Gun damage scaling                    |
| Strength        | `"strengthbuff"`  | `strength`     | Fighting/Support Style damage scaling |
| Haki            | `"hakibuff"`      | `haki`         | Haki damage scaling                   |

---

## Complete Examples

### Example 1: Devil Fruit Move with Mixed Scaling

```typescript
{
  id: 10,
  name: "Final Gear 5",
  M1: 2300,
  Q: 109252,
  E: 97750,
  R: 115000,
  F: 0,
  G: 138000,
  T: 0,
  U: 0,
  Y: 149500,
  // No scale property = uses default "fruitbuff" for all abilities
}
```

### Example 2: Sword Move with Hybrid Scaling

```typescript
{
  id: 5,
  name: "True Yoru + Black Blade",
  M1: 2800,
  Q: 13750,
  E: 15125,
  R: 18750,
  F: 19228,
  G: 0,
  T: 0,
  U: 0,
  Y: 25000,
  scales: {
    M1: "swordbuff",                    // Normal sword M1
    Q: "swordbuff",                     // Normal sword ability
    E: ["swordbuff", "hakibuff"],       // Scales with both Sword and Haki
    R: "swordbuff",                     // Normal sword ability
    F: "swordbuff",                     // Normal sword ability
    Y: ["swordbuff", "strengthbuff"],   // Ultimate scales with Sword and Strength
  }
}
```

### Example 3: Fighting Style with Pure Strength

```typescript
{
  id: 4,
  name: "Reincarnated Slime",
  M1: 1500,
  Q: 40000,
  E: 50000,
  R: 0,
  F: 60000,
  G: 0,
  T: 0,
  U: 0,
  Y: 130000,
  // Default: all abilities use "strengthbuff"
}
```

### Example 4: Support Style with Fruit Override

```typescript
{
  id: 0,
  name: "NarutoV2 + Baryon Mode",
  M1: 45000,
  Q: 97225,
  E: 114764,
  R: 0,
  F: 699600,
  G: 179390,
  T: 0,
  U: 0,
  Y: 0,
  scale: "fruitbuff", // Override: use Fruit scale for all abilities instead of Strength
}
```

---

## UI Features

### Auto Best for Selected Move Button

When a move is selected, a new button **"Auto Best for Selected Move"** appears. This button automatically optimizes your:
- Accessories
- Buffs
- Stats

...based on the selected move's damage scale.

### Damage Scale Dropdown

- **Enabled** when no move is selected → You can manually choose a scale
- **Disabled** when a move is selected → Shows "(Auto: [Scale])" to indicate the automatic scale being used
- The dropdown value updates to show which scale is currently active

---

## Technical Details

### How Multi-Scale Works

#### Multiple Scales (Array of DamageScale)

When an ability has multiple scales (e.g., `["fruitbuff", "strengthbuff"]`):

1. The calculator calculates damage using the **Fruit** scale:
   - Uses `accBonus.fruit` for accessories
   - Uses `damageBuffs.fruitBuff` for buffs

2. The calculator calculates damage using the **Strength** scale:
   - Uses `accBonus.strength` for accessories
   - Uses `damageBuffs.strengthBuff` for buffs

3. Returns `Math.max(fruitDamage, strengthDamage)` → **the highest damage wins!**

#### Split Damage (Array of {scale, damage})

When an ability has split damage (e.g., `[{ scale: "fruitbuff", damage: 1000 }, { scale: "strengthbuff", damage: 1000 }]`):

1. The calculator calculates damage for **Fruit** using **1000 as base**:
   - Uses `accBonus.fruit` for accessories
   - Uses `damageBuffs.fruitBuff` for buffs

2. The calculator calculates damage for **Strength** using **1000 as base**:
   - Uses `accBonus.strength` for accessories
   - Uses `damageBuffs.strengthBuff` for buffs

3. Returns `fruitDamage + strengthDamage` → **all damages are summed!**

### Damage Calculation Formula

For each ability:

```javascript
finalDamage = (
  baseDamage +
  (BASE_STAT + scaledAccBonus) / 2 +
  (baseDamage * (BASE_STAT + scaledAccBonus)) / 12.5
) * buffMultiplier
```

Where:
- `baseDamage` = the move's base damage value (M1, Q, E, R, F, G, T, U, or Y)
- `BASE_STAT` = 14285 (constant)
- `scaledAccBonus` = total accessories bonus for the active scale
- `buffMultiplier` = combined buff multiplier for the active scale

---

## Quick Reference: Editing Files

### Step 1: Open the appropriate file

- **Devil Fruit moves**: `src/app/data/devilfruitMoveDamage.ts`
- **Fighting Style moves**: `src/app/data/fightingstyleMoveDamage.ts`
- **Gun moves**: `src/app/data/gunstyleMoveDamage.ts`
- **Haki moves**: `src/app/data/hakiMoveDamage.ts`
- **Support Style moves**: `src/app/data/supportstyleMoveDamage.ts`
- **Sword moves**: `src/app/data/swordstyleMoveDamage.ts`

### Step 2: Find your move in the array

Each file exports an array like:
```typescript
export const devilFruitMoveDamage: MoveDamage[] = [
  { /* move 1 */ },
  { /* move 2 */ },
  { /* move 3 */ },
  // ...
];
```

### Step 3: Add scale properties

Add `scale` or `scales` property to your move object:

```typescript
{
  id: 0,
  name: "Your Move Name",
  M1: 1000,
  Q: 2000,
  E: 3000,
  R: 4000,
  F: 5000,
  G: 0,
  T: 0,
  U: 0,
  Y: 0,
  scales: {  // ← Add this
    M1: "swordbuff",
    Q: "fruitbuff",
    E: ["fruitbuff", "strengthbuff"],
  }
},
```

### Step 4: Save and rebuild

```bash
npm run build
```

---

## Troubleshooting

### Q: My move isn't using the correct scale

**A:** Check the following:
1. Is there a `scale` property overriding the default?
2. Is there a `scales` property for specific abilities?
3. What is the move's source? (fighting, fruit, support, gun, sword, haki)
4. The priority is: `scales[ability]` → `scale` → `sourceToDamageScale[source]`

### Q: Multi-scale isn't working

**A:** Make sure you're using an array:
```typescript
// ✅ Correct
E: ["fruitbuff", "strengthbuff"]

// ❌ Wrong
E: "fruitbuff, strengthbuff"
```

### Q: Build errors after editing

**A:** Common issues:
- Missing comma after adding `scale` or `scales` property
- Typo in scale name (must be exactly: `"fruitbuff"`, `"swordbuff"`, `"gunbuff"`, `"strengthbuff"`, or `"hakibuff"`)
- Missing closing bracket/brace

---

## Summary

- ✅ **No editing needed** for moves that use default scaling
- ✅ Use `scale: "fruitbuff"` to override scale for entire move
- ✅ Use `scales: { M1: "swordbuff", Q: "fruitbuff" }` for per-ability scaling
- ✅ Use `scales: { E: ["fruitbuff", "strengthbuff"] }` for multi-scale abilities
- ✅ Calculator automatically picks the highest damage when multiple scales are used
- ✅ UI shows which scale is active and disables manual selection when appropriate

---

**Created:** January 17, 2026
**Version:** 1.0
**Author:** AOPG Calculator Team
