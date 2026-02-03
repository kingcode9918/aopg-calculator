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
  stamina: number;   // Stamina stat bonus
  defense: number;   // Defense stat bonus
  sword: number;     // Sword damage bonus
  gun: number;       // Gun damage bonus
  haki: number;      // Haki damage bonus
  fruit: number;     // Devil Fruit damage bonus
  link?: string;     // Optional URL to wiki/guide on how to obtain
}
