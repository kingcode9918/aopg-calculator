# Verse Passive Data Guide

This guide explains how to add new values to the passive buff data files.

---

## File Structure Overview

All passive buff files share the same `buffs` interface:

```typescript
interface buffs {
  id: number;        // Unique incremental ID (0, 1, 2, ...)
  name: string;      // Display name
  strengthBuff: number;  // Multiplier for strength damage
  swordBuff: number;     // Multiplier for sword damage
  specialBuff: number;   // Multiplier for special damage
}
```

### Buff Value Rules
- `1` = No change (neutral)
- `> 1` = Buff (e.g., `1.5` = 50% increase)
- `< 1` = Debuff (e.g., `0.5` = 50% decrease)

---

## Files & Current Counts

| File | Export Name | Current Count | Last ID |
|------|-------------|---------------|---------|
| `titles.ts` | `titlesData` | 31 entries | 30 |
| `races.ts` | `racesData` | 18 entries | 17 |
| `hakis.ts` | `hakisData` | 6 entries | 5 |
| `relics.ts` | `relicsData` | 7 entries | 6 |
| `abilities.ts` | `abilitiesData` | 5 entries | 4 |
| `prestiges.ts` | `prestigesData` | 0 entries | - |

---

## How to Add New Entries

### 1. Titles (`titles.ts`)

Add before the closing `];`:

```typescript
  {
    id: 31,  // Next ID after 30
    name: "New Title Name",
    strengthBuff: 1,    // Set your values
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current titles include:** None, Hero Of Wrought, SSS+ Rank Master, Easter Master, Sternritter A, Over Heaven, Dark Slayer, Never-Miss Hit, The Struggler, Falcon of Darkness, God of Gods, The Bird of Hermes, Silver Sword Saint Reaper, Emperor of Roses, etc.

---

### 2. Races (`races.ts`)

Add before the closing `];`:

```typescript
  {
    id: 18,  // Next ID after 17
    name: "New Race Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current races:** Human, Arrancar, Reaper, Angelica, Vessel, Vampire, Demonic, Mahoraga, Ghoul, Contractor, Dullahan Day/Night, Dragonic, Birkan, Truthseeker, Fallen Angel, Legendary Saiyan, Player Lvl 100

---

### 3. Hakis (`hakis.ts`)

Add before the closing `];`:

```typescript
  {
    id: 6,  // Next ID after 5
    name: "Haki Lvl 6",
    strengthBuff: 1.3,   // Pattern: +0.05 per level
    swordBuff: 1.3,
    specialBuff: 1.3,
  },
```

**Current pattern:** Each haki level adds +0.05 to all buffs (Lvl 1 = 1.05, Lvl 2 = 1.1, etc.)

---

### 4. Relics (`relics.ts`)

Add before the closing `];`:

```typescript
  {
    id: 7,  // Next ID after 6
    name: "New Relic Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current relics:** None, Ashen Ring, Brand of Sacrifice, John-Smith Mask, Golden Earrings, Kamish Necklace, Momonga's Red Orb

---

### 5. Abilities (`abilities.ts`)

Add before the closing `];`:

```typescript
  {
    id: 5,  // Next ID after 4
    name: "New Ability Name",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

**Current abilities:** None, Vizard Mask, Fighter Zone, Transparent World, Adolla Link

---

### 6. Prestiges (`prestiges.ts`)

This file is currently **empty**. To set it up:

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

**Don't forget** to add the export in `index.ts`:
```typescript
export { prestigesData } from "./prestiges";
```

---

## Quick Reference Template

Copy this template when adding new entries:

```typescript
  {
    id: NEXT_ID,
    name: "NAME_HERE",
    strengthBuff: 1,
    swordBuff: 1,
    specialBuff: 1,
  },
```

---

## Common Buff Patterns

| Type | Strength | Sword | Special | Example |
|------|----------|-------|---------|---------|
| Balanced | 1.5 | 1.5 | 1.5 | Vizard Mask, Vessel |
| Strength Focus | 1.7+ | 1 | 1 | Never-Miss Hit, Upper Rank Three |
| Sword Focus | 1 | 1.5+ | 1 | Hero Of Wrought, Ashen Ring |
| Special Focus | 1 | 1 | 1.5+ | Easter Master, Over Heaven |
| Mixed (Sword+Special) | 1 | 1.5 | 1.5 | Falcon of Darkness |
| Mixed (Strength+Sword) | 1.5 | 1.5 | 1 | The Struggler, The Bird of Hermes |

---

## Checklist for Adding New Data

- [ ] Use the correct next ID (incremental)
- [ ] Name is unique and spelled correctly
- [ ] All three buff values are set (use `1` for neutral)
- [ ] Entry is placed before the closing `];`
- [ ] Comma after the closing `}`
- [ ] For new files: export added to `index.ts`
