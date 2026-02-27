/**
 * SwordMove Interface
 * Represents sword style moves with base damage values.
 */
export interface MoveHit {
  hit: number; // Hit number (1, 2, 3…)
  damage: number; // Damage of that hit
  multiplier?: number; // Optional per-hit multiplier
  upgrade?: number; // Optional upgrade multiplier
}

export interface MoveSlot {
  hits: MoveHit[];
  upgrade?: number; // Default upgrade multiplier for all hits in this slot
  desc?: string; // Optional description for the move slot
}

export interface MoveSet {
  id: number;
  name: string;

  M1?: MoveSlot;
  Z?: MoveSlot;
  X?: MoveSlot;
  C?: MoveSlot;
  V?: MoveSlot;
  F?: MoveSlot;
}

/**
 * Utility to generate multiple hits with the same base damage.
 */
export function generateHits(
  baseDamage: number,
  count: number,
  upgrade?: number,
): MoveHit[] {
  return Array.from({ length: count }, (_, i) => ({
    hit: i + 1,
    damage: baseDamage,
    upgrade,
  }));
}
