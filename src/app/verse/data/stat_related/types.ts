/**
 * Accessories Interface
 *
 * Represents equipment items that provide stat bonuses to the character.
 * Used across all accessory slots (head, top, arm, back, waist, legs).
 */
export interface Accessories {
  id: number;        // Unique identifier (0 = None/No equipment)
  name: string;      // Display name of the accessory
  strength: number;  // Strength stat bonus
  defense: number;   // Defense stat bonus
  sword: number;     // Sword damage bonus
  special: number;   // Special damage bonus
  increment: number; // Stat increase per enchantment level
}
