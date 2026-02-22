# How to Add a New Buff to the Calculator

This guide explains how to add a new buff type (like titles, races, hakis) to the Verse calculator.

## Prerequisites

Your data file should use the `buffs` interface from `data/passive/types.ts`:

```typescript
interface buffs {
  id: number;
  name: string;
  strengthBuff: number;
  swordBuff: number;
  specialBuff: number;
}
```

## Steps

### Step 1: Create the Data File

Create a new file in `data/passive/` (e.g., `example.ts`):

```typescript
import type { buffs } from "./types";

export const exampleData: buffs[] = [
  {
    id: 0,
    name: "None",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
  {
    id: 1,
    name: "Example Buff",
    strengthBuff: 1.5,
    swordBuff: 1.5,
    specialBuff: 1.5,
  },
];
```

### Step 2: Export from Index

Add the export in `data/passive/index.ts`:

```typescript
export { exampleData } from "./example";
```

### Step 3: Import in Calculator

Add to the import statement in `views/calculator.tsx`:

```typescript
import { titlesData, racesData, hakisData, exampleData } from "../data/passive";
```

### Step 4: Add State

Add a useState hook for the selected ID:

```typescript
const [exampleId, setExampleId] = useState(0);
```

### Step 5: Add Lookup

Add the lookup to find the selected item:

```typescript
const selectedExample =
  exampleData.find((e) => e.id === exampleId) || exampleData[0];
```

### Step 6: Update Multiplier Function

Add the multiplier variable in `getStatMultiplier`:

```typescript
const getStatMultiplier = (statKey: string) => {
  let titleMult = 1;
  let raceMult = 1;
  let hakiMult = 1;
  let exampleMult = 1;  // Add this

  if (statKey === "strength") {
    titleMult = selectedTitle.strengthBuff || 1;
    raceMult = selectedRace.strengthBuff || 1;
    hakiMult = selectedHaki.strengthBuff || 1;
    exampleMult = selectedExample.strengthBuff || 1;  // Add this
  }
  if (statKey === "sword") {
    titleMult = selectedTitle.swordBuff || 1;
    raceMult = selectedRace.swordBuff || 1;
    hakiMult = selectedHaki.swordBuff || 1;
    exampleMult = selectedExample.swordBuff || 1;  // Add this
  }
  if (statKey === "special") {
    titleMult = selectedTitle.specialBuff || 1;
    raceMult = selectedRace.specialBuff || 1;
    hakiMult = selectedHaki.specialBuff || 1;
    exampleMult = selectedExample.specialBuff || 1;  // Add this
  }

  return baseDmgMult * titleMult * raceMult * hakiMult * exampleMult;  // Multiply here
};
```

### Step 7: Update handleBestBuff Function

The `handleBestBuff` function automatically selects the best buffs when the user clicks the "Best" button. Add your new buff type to this function:

```typescript
const handleBestBuff = (statKey: "strength" | "sword" | "special") => {
  const buffKey = `${statKey}Buff` as
    | "strengthBuff"
    | "swordBuff"
    | "specialBuff";

  // Find best passive buffs (existing)
  const bestTitle = titlesData.reduce((best, current) =>
    (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
  );
  // ... other existing best lookups ...

  // Add this: Find best example buff
  const bestExample = exampleData.reduce((best, current) =>
    (current[buffKey] || 1) > (best[buffKey] || 1) ? current : best,
  );

  // Set all passive buffs (existing)
  setTitleId(bestTitle.id);
  setRaceId(bestRace.id);
  // ... other existing setters ...

  // Add this: Set your new buff
  setExampleId(bestExample.id);
};
```

**Key points:**
- Use the `buffKey` variable (dynamically computed from `statKey`) to access the correct buff property
- Use `reduce` to find the item with the highest buff value for that stat
- Default to `1` when comparing (`|| 1`) to handle undefined values
- Add the setter call at the end to update the state

### Step 8: Add UI Selector

Add the dropdown in the Passive fieldset (inside the right column):

```tsx
<div className="mb-4">
  <label className="label">
    <span className="font-bold flex items-center gap-2 flex-wrap">
      Select Example
      {selectedExample.strengthBuff > 1 && (
        <span className="custom-text-strength text-sm">
          💪 {selectedExample.strengthBuff}x
        </span>
      )}
      {selectedExample.swordBuff > 1 && (
        <span className="custom-text-sword text-sm">
          ⚔️ {selectedExample.swordBuff}x
        </span>
      )}
      {selectedExample.specialBuff > 1 && (
        <span className="custom-text-special text-sm">
          ✨ {selectedExample.specialBuff}x
        </span>
      )}
    </span>
  </label>
  <select
    className="select select-bordered w-full"
    value={exampleId}
    onChange={(e) => setExampleId(Number(e.target.value))}
  >
    {exampleData.map((e) => (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    ))}
  </select>
</div>
```

## Notes

- Use `> 1` for buffs that only go up (titles, hakis)
- Use `!== 1` for buffs that can go below 1 (races with debuffs like Dullahan Day 0.5x)
- The buff value `1` means no change (100% = 1x)
- `1.5` means +50% buff (150% = 1.5x)
- `0.5` means -50% debuff (50% = 0.5x)

---

# How to Add a New Move Type

This guide explains how to add a new move type (like swords, fruits, fightings, specs) to the Verse calculator.

## Prerequisites

Your data file should use the `move` interface from `data/moves/types.ts`:

```typescript
interface move {
  id: number;
  name: string;
  M1: number;
  Z: number;
  X: number;
  C: number;
  V: number;
  F: number;
}
```

## Steps

### Step 1: Create the Data File

Create a new file in `data/moves/` (e.g., `example.ts`):

```typescript
import type { move } from "./types";

export const exampleData: move[] = [
  {
    id: 0,
    name: "Example Move",
    M1: 500,
    Z: 1000,
    X: 2000,
    C: 3000,
    V: 5000,
    F: 6000,
  },
  {
    id: 1,
    name: "Another Move",
    M1: 600,
    Z: 1200,
    X: 2400,
    C: 3600,
    V: 6000,
    F: 7200,
  },
];
```

### Step 2: Export from Index

Add the export in `data/moves/index.ts`:

```typescript
export { exampleData } from "./example";
```

### Step 3: Import in Calculator

Add to the import statement in `views/calculator.tsx`:

```typescript
import {
  swordsData,
  fruitsData,
  fightingsData,
  specsData,
  exampleData,  // Add this
} from "../data/moves";
```

### Step 4: Update Move Type

Add the new type to the `moveType` state type:

```typescript
const [moveType, setMoveType] = useState<"sword" | "fruit" | "fighting" | "spec" | "example">("sword");
```

### Step 5: Update getMoveData Function

Add your new move type to the switch statement:

```typescript
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
    case "example":  // Add this
      return exampleData;
  }
};
```

### Step 6: Update getMoveStatKey Function

Define which stat your move type uses for damage calculation:

```typescript
const getMoveStatKey = (): "strength" | "sword" | "special" => {
  switch (moveType) {
    case "fighting":
      return "strength";  // Uses strength stat
    case "sword":
      return "sword";     // Uses sword stat
    case "fruit":
    case "spec":
      return "special";   // Uses special stat
    case "example":
      return "special";   // Choose: "strength", "sword", or "special"
  }
};
```

### Step 7: Update calculateMoveDamage Function (if needed)

If your move type needs special handling for enhance/blessing:

```typescript
const calculateMoveDamage = (baseDamage: number) => {
  // ... existing stat calculation ...

  // Apply enhance multiplier (sword only, or add your type)
  if (moveType === "sword") {
    damage = (damage + moveState.enhanceLevel * 2.5) * multipliers;
  }

  // Apply blessing multiplier (sword, fighting, spec - not fruit)
  // Add or remove your type as needed
  if (moveType !== "fruit" && moveState.blessing) {
    damage = damage * 2.5;
  }

  return damage;
};
```

### Step 8: Update UI Selector

Add the new option to the Move Type dropdown:

```tsx
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
  <option value="example">Example</option>  {/* Add this */}
</select>
```

### Step 9: Update Conditional UI (if needed)

If your move type needs enhance/blessing controls, update the conditional rendering:

```tsx
{/* Show enhance only for sword */}
{moveType === "sword" && (
  <div className="flex-1">
    {/* Enhance Level input */}
  </div>
)}

{/* Show blessing for sword, fighting, spec (not fruit) */}
{(moveType === "sword" || moveType === "fighting" || moveType === "spec" || moveType === "example") && (
  <div className="flex-1">
    {/* Blessing checkbox */}
  </div>
)}
```

## Damage Formula

The move damage is calculated as:

```
finalDamage = (baseDamage * multiplier + enhanceAmt) * (1 + totalStat / 75) * damageMultiplier * blessingMult
```

Where:
- `baseDamage` = The move's base damage (M1, Z, X, C, V, or F)
- `multiplier` = The move's internal hit multiplier
- `totalStat` = baseStat + ghostStat + accessoryStat + traitStat
- `damageMultiplier` = All buff multipliers (title, race, haki, relic, ability, prestige, wisp, trait)
- `enhanceAmt` = `enhanceLevel * 2.5` (added to base damage, sword only)
- `blessingMult` = `2.5` if blessing is enabled

## Move Type to Stat Mapping

| Move Type | Stat Used |
|-----------|-----------|
| sword     | sword     |
| fighting  | strength  |
| fruit     | special   |
| spec      | special   |

## Notes

- Move types that use `enhance` add `enhanceLevel * 2.5` to base damage
- Move types that use `blessing` multiply damage by `2.5` when enabled
- Fruit moves have no enhance or blessing multipliers (raw stat damage only)
- The stat used affects which buffs apply (e.g., sword buffs only affect sword stat)
