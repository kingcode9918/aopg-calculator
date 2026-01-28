/**
 * Stats Interface
 * Represents equipment items that provide stat bonuses to the character.
 */
export interface Stats {
  id: number;
  name: string;
  strength: number;
  defense: number;
  sword: number;
  special: number;
  increment?: number;
  dmgMult?: number;
}

/**
 * Rank Interface
 * Represents ghost/rank stat bonuses.
 */
export interface Rank {
  label: string;
  value: number;
}

/**
 * PassiveTrait Interface
 * Represents passive trait damage multipliers.
 */
export interface PassiveTrait {
  id: number;
  name: string;
  dmgMult: number;
}
