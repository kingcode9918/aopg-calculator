export function computeScaledDamage(
  base: number,
  stat: number,
  scaleFactor: number,
  numHits?: number
): number {
  let scaled = (base + stat / 2 + (base * stat) / 12.5) * scaleFactor;
  if (numHits) {
    scaled *= numHits;
  }
  return Number(scaled.toFixed(0));
}
