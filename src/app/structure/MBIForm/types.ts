export type BurnoutSpectrums = "EE" | "DP" | "RP";

export type RiskLabels =
  | "Bajo"
  | "Medio"
  | "Alto (riesgo)"
  | "Bajo burnout"
  | "Alto burnout";

export type Results = {
  [key in BurnoutSpectrums]: {
    score: number;
    level: RiskLabels;
  };
};
