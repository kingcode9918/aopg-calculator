export interface MoveDamage {
  id: number;
  name: string;
  M1: number;
  Q: number;
  E: number;
  R: number;
  F: number;
  G: number;
  T: number;
  U: number;
  Y: number;
}

export const getMoveTotal = (move: MoveDamage): number => {
  const keys: (keyof MoveDamage)[] = [
    "M1",
    "Q",
    "E",
    "R",
    "F",
    "G",
    "T",
    "U",
    "Y",
  ];
  return keys.reduce((total, key) => total + Number(move[key]), 0);
};
