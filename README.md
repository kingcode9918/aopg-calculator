# Roblox Game Damage Calculator

A Next.js web application for calculating damage in Roblox anime games. Currently supports **A One Piece Game (AOPG)** and **Verse Piece**.

## Overview

This calculator helps players optimize their builds by computing damage output based on:

- **Base Stats** - Strength, Defense, Sword, Special
- **Passive Buffs** - Titles, Races, Hakis, Relics, Abilities, Prestiges, Wisps
- **Equipment** - Accessories with enhancement levels
- **Traits** - Active and passive trait damage multipliers
- **Moves** - Sword styles, Fruits, Fighting styles, Specs with base damage values
- **Modifiers** - Enhancement levels, Blessing multipliers

### Damage Formula

```
finalDamage = baseDamage * (1 + totalStat / 75) * damageMultiplier * enhanceMult * blessingMult
```

Where:
- `totalStat` = baseStat + ghostStat + accessoryStat + traitStat
- `damageMultiplier` = All buff multipliers combined (title, race, haki, relic, ability, prestige, wisp, trait)
- `enhanceMult` = `enhanceLevel * 2.5` (sword moves only)
- `blessingMult` = `2.5` when blessing is enabled

## Features

### AOPG Calculator (`/aopg`)
- Accessory slots (Head, Top, Waist, Legs, Arm, Back)
- Active buffs (Armament, Conquerors, Fighting, Fruit, Gun, Suit, Support, Sword)
- Passive buffs (Race, Title, Blacksmith, Giant, Artifact)
- Move damage tables for different fighting styles

### Verse Calculator (`/verse`)
- Base stat allocation with ghost rank bonuses
- Passive buff selectors (Title, Race, Haki, Relic, Ability, Prestige, Wisp)
- Accessory and Trait selection with enhancement
- Move damage calculator with:
  - Move types: Sword, Fruit, Fighting, Spec
  - Enhancement levels (1-10) for swords
  - Blessing modifier (2.5x damage)
- Automatic stat-to-move mapping:
  - Sword moves use Sword stat
  - Fighting moves use Strength stat
  - Fruit/Spec moves use Special stat

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **React**: React 19

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aopg-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/app/
├── page.tsx                 # Home page with calculator selection
├── aopg/                    # AOPG Calculator
│   ├── page.tsx
│   ├── views/               # UI components
│   ├── data/
│   │   ├── accessories/     # Accessory data (head, top, waist, etc.)
│   │   ├── buffs/           # Active & passive buff data
│   │   └── moves/           # Move damage data
│   ├── hooks/               # Custom hooks
│   └── utils/               # Damage calculation utilities
├── verse/                   # Verse Calculator
│   ├── page.tsx
│   ├── views/               # UI components
│   │   └── calculator.tsx   # Main calculator component
│   ├── data/
│   │   ├── passive/         # Buff data (titles, races, hakis, etc.)
│   │   ├── stat_related/    # Stats, accessories, traits
│   │   └── moves/           # Move data (swords, fruits, etc.)
│   └── HOW_TO_ADD_BUFF.md   # Guide for adding new data
```

## Adding New Data

See the following guides:
- [Verse: How to Add Buffs & Moves](src/app/verse/HOW_TO_ADD_BUFF.md)
- [AOPG: Data Guide](src/app/aopg/data/GUIDE.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## Contact

Need help? DM on Discord: **kingcode99**

## License

This project is for personal/educational use. Game data belongs to their respective Roblox game developers.
