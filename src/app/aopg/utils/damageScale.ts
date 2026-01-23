/**
 * Get the stat key for a move's scaling type.
 */

/* eslint-disable */
export function getStatKeyForScaling<T extends Record<string, any>>(
  scaling: string,
  stats: T
): keyof T {
  switch (scaling) {
    case "Sword":
      return "sword" as keyof T;
    case "Gun":
      return "gun" as keyof T;
    case "Strength":
      return "strength" as keyof T;
    case "Fruit":
    default:
      return "fruit" as keyof T;
  }
}

/**
 * Get the scale buff value for a move's scaling type.
 */
export function getScaleBuffForScaling<T extends Record<string, number>>(
  scaling: string,
  damageBuffs: T
): number {
  switch (scaling) {
    case "Sword":
      return damageBuffs["swordBuff"];
    case "Gun":
      return damageBuffs["gunBuff"];
    case "Strength":
      return damageBuffs["strengthBuff"];
    case "Fruit":
    default:
      return damageBuffs["fruitBuff"];
  }
}
