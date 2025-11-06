export type MbiLevel = 'alto' | 'medio' | 'bajo';

export type Condicion = {
  EE: MbiLevel;
  DP: MbiLevel;
  RP: MbiLevel;
}

export interface MotorItem {
  condicion: Condicion; diagnostico: string;
  explicacion: string;
  preguntas_post_mbi: string[];
  intervencion: { emocional: string; ambiente: string; social: string; personal: string }
}