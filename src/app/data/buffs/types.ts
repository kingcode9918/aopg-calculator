/**
 * Buff System Types
 *
 * Core interfaces for the buff/multiplier system used throughout the game.
 */

/**
 * BaseBuff Interface
 *
 * The foundation for all buff types in the game.
 * All multipliers default to 1.0 (no change) and scale damage multiplicatively.
 */
export interface BaseBuff {
  id: number;           // Unique identifier (0 = None/No buff)
  name: string;         // Display name of the buff
  fruitbuff: number;    // Devil Fruit damage multiplier (1.0 = 100%, 2.0 = 200%)
  swordbuff: number;    // Sword damage multiplier
  gunbuff: number;      // Gun damage multiplier
  strengthbuff: number; // Strength damage multiplier
  hakibuff: number;     // Haki damage multiplier
}

/**
 * ActiveBuffs Interface
 *
 * Represents temporary buffs from transformations, abilities, or equipment.
 * Examples: Devil Fruit forms, Fighting style modes, Haki stages
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ActiveBuffs extends BaseBuff {}

/**
 * TitleBuffs Interface
 *
 * Represents permanent title bonuses earned through player progression.
 * Includes rarity tier information (common, rare, legendary, etc.)
 */
export interface TitleBuffs extends BaseBuff {
  rank: string; // Rarity tier: common, uncommon, rare, epic, legendary, mythical, divine
}

/**
 * RaceBuffs Interface
 *
 * Represents permanent race bonuses based on character race.
 * May include special mechanics and visual assets.
 */
export interface RaceBuffs extends BaseBuff {
  note: string;  // Special mechanics or bonus information
  image: string; // Path to race icon/image
}
