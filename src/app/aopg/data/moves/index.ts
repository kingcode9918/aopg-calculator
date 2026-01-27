// Re-export types
export type {
  DamageScale,
  MoveKey,
  SplitDamage,
  MoveScale,
  MoveDamage,
} from "./types";
export { getMoveTotal } from "./types";

// Re-export all move damage data
export { devilFruitMoveDamage } from "./devilfruitMoveDamage";
export { fightingStyleMoveDamage } from "./fightingstyleMoveDamage";
export { gunStyleMoveDamage } from "./gunstyleMoveDamage";
export { hakiMoveDamage } from "./hakiMoveDamage";
export { supportStyleMoveDamage } from "./supportstyleMoveDamage";
export { swordStyleMoveDamage } from "./swordstyleMoveDamage";
