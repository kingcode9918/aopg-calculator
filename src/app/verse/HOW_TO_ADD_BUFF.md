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

### Step 7: Add UI Selector

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
