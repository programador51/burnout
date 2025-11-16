import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import type {
  Progress,
  PropsPostMbiFormTree,
  Scale,
  TreeScales,
} from "./types";
import { toYouTubeEmbed } from "@/app/helpers/questions";

const TREES: TreeScales = {
  AE: {
    bajo: {
      start: "ae_low_1",
      nodes: {
        ae_low_1: {
          question: "¿Sueles sentirte con energía al iniciar tu jornada?",
          yes: "ae_low_solution_yes",
          no: "ae_low_solution_no",
        },
        ae_low_solution_yes: {
          solution: [
            "Mantén tus rutinas saludables",
            "Incluye micro descansos cada 2 horas",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=wPoj5log_7M", // 3 min breathing
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1VE8kQycQcY", // centering meditation 3 min
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=VzVpckjnOco", // 3 Minute Relax and Relief
            },
          ],
        },
        ae_low_solution_no: {
          solution: [
            "Revisa tus hábitos de descanso",
            "Incluye respiración profunda 2 veces al día",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=a4LxzATy-4Y", // 4-7-8 breathing
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=HucyP1LfGzU", // explicación 4‑7‑8 para dormir
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=Q4UG3PMSk6k", // 3-min box breathing
            },
          ],
        },
      },
    },

    medio: {
      start: "ae_mid_1",
      nodes: {
        ae_mid_1: {
          question: "¿Te cuesta concentrarte varios días por semana?",
          yes: "ae_mid_2",
          no: "ae_mid_solution_low",
        },
        ae_mid_2: {
          question: "¿Sientes que te fatigas antes de lo habitual?",
          yes: "ae_mid_solution_focus",
          no: "ae_mid_solution_low",
        },
        ae_mid_solution_focus: {
          solution: [
            "Usa técnica Pomodoro",
            "Reduce distractores visuales y auditivos",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=bDaUm46VkSs", // Mini-mindfulness break 3 min
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=p1T7V9PhVy8", // Pomodoro technique 3x5
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1oDrJba2PSs", // Pomodoro study live video
            },
          ],
        },
        ae_mid_solution_low: {
          solution: [
            "Mantén descansos cada 90-120 minutos",
            "Planifica cargas equilibradas",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1VE8kQycQcY", // centering meditation 3 min
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=2OhT4bd59KE", // Pomodoro 3-cycle (teoría breve)
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=EMTGflevrLI", // Pomodoro 20/3 timer
            },
          ],
        },
      },
    },

    alto: {
      start: "ae_high_1",
      nodes: {
        ae_high_1: {
          question: "¿Tienes problemas de sueño frecuentes?",
          yes: "ae_high_2",
          no: "ae_high_3",
        },
        ae_high_2: {
          question: "¿Estos afectan tu rendimiento diario?",
          yes: "ae_high_solution_sleep",
          no: "ae_high_3",
        },
        ae_high_3: {
          question: "¿Sientes sobrecarga laboral constante?",
          yes: "ae_high_solution_overload",
          no: "ae_high_solution_general",
        },
        ae_high_solution_sleep: {
          solution: [
            "Higiene del sueño estricta",
            "Evita pantallas 1h antes de dormir",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=HucyP1LfGzU", // 4-7-8 to sleep
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=a4LxzATy-4Y", // explicación 4-7-8
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=oI1lz3O1zYI", // Box breathing 3 min practice
            },
          ],
        },
        ae_high_solution_overload: {
          solution: [
            "Reorganiza carga laboral",
            "Aplica descansos activos programados",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=bDaUm46VkSs", // 3-min mental break
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search3", // pomodoro technique explanation
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1search6", // focus + timer
            },
          ],
        },
        ae_high_solution_general: {
          solution: [
            "Revisión semanal de prioridades",
            "Micropausas obligatorias",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=0eDwJv1aqmg", // 3 min stress reset
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search2", // 3-min breathing space
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1search17", // 3 min relax and relief
            },
          ],
        },
      },
    },
  },

  DP: {
    bajo: {
      start: "dp_low_1",
      nodes: {
        dp_low_1: {
          question: "¿Mantienes conexión emocional con tus compañeros?",
          yes: "dp_low_solution_yes",
          no: "dp_low_solution_no",
        },
        dp_low_solution_yes: {
          solution: ["Mantén interacción social saludable"],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=q9Gs93pNC_I", // self compassion break 3 min
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search13", // Chopra 3-min meditation
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=0eDwJv1aqmg", // quick mindfulness break
            },
          ],
        },
        dp_low_solution_no: {
          solution: [
            "Realiza pausas con interacción breve",
            "Agenda de gratitud semanal",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search0", // 3-min mindful breathing meditation
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search16", // quick reset 3 min stress
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1search17", // 3 minute relax and relief
            },
          ],
        },
      },
    },

    medio: {
      start: "dp_mid_1",
      nodes: {
        dp_mid_1: {
          question: "¿Te cuesta empatizar en los últimos días?",
          yes: "dp_mid_2",
          no: "dp_mid_solution_low",
        },
        dp_mid_2: {
          question: "¿Evitas conversaciones o interacción laboral?",
          yes: "dp_mid_solution_empathy",
          no: "dp_mid_solution_low",
        },
        dp_mid_solution_empathy: {
          solution: [
            "Ejercicios de empatía cognitiva",
            "Breves interacciones sociales",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=zeOcVzMUDBo", // 3-min mindful breathing
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=4Bs0qUB3BHQ", // Chopra 3-min meditation
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=bDaUm46VkSs", // 3 min mental break guided
            },
          ],
        },
        dp_mid_solution_low: {
          solution: [
            "Refuerzo positivo semanal",
            "Conexiones sociales ligeras",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search10", // centering meditation 3 min
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search25", // self-compassion break
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=bDaUm46VkSs", // mini mindfulness break
            },
          ],
        },
      },
    },

    alto: {
      start: "dp_high_1",
      nodes: {
        dp_high_1: {
          question: "¿Te sientes desconectado emocionalmente del trabajo?",
          yes: "dp_high_2",
          no: "dp_high_solution_general",
        },
        dp_high_2: {
          question: "¿Esa desconexión afecta tu motivación diaria?",
          yes: "dp_high_solution_emotional",
          no: "dp_high_solution_general",
        },
        dp_high_solution_emotional: {
          solution: [
            "Supervisión emocional",
            "Ejercicios de reconexión 5 min al día",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search17", // 3 min relax and relief
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=0eDwJv1aqmg", // 3 min reset
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=Q4UG3PMSk6k", // box breathing 3 min
            },
          ],
        },
        dp_high_solution_general: {
          solution: [
            "Rediseña tareas para aumentar significado",
            "Reduce aislamiento social",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search0", // mindful breathing 3 min
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search3", // Pomodoro technique short
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1search26", // pomodoro study with me
            },
          ],
        },
      },
    },
  },

  RP: {
    bajo: {
      start: "rp_low_1",
      nodes: {
        rp_low_1: {
          question: "¿Sientes que tu trabajo tiene poco impacto?",
          yes: "rp_low_solution_identity",
          no: "rp_low_solution_general",
        },
        rp_low_solution_identity: {
          solution: [
            "Ejercicios de propósito personal",
            "Registrar logros recientes",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search13", // Chopra 3-min meditation
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search2", // 3-min breathing space mindfulness
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=q9Gs93pNC_I", // self-compassion break 3 min
            },
          ],
        },
        rp_low_solution_general: {
          solution: ["Meta semanal corta", "Logros diarios"],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=bDaUm46VkSs", // mini mindfulness break
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search10", // centering meditation
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1search17", // 3 minute relax
            },
          ],
        },
      },
    },

    medio: {
      start: "rp_mid_1",
      nodes: {
        rp_mid_1: {
          question: "¿Sientes falta de crecimiento personal?",
          yes: "rp_mid_solution_growth",
          no: "rp_high_solution",
        },
        rp_mid_solution_growth: {
          solution: [
            "Plan mensual de desarrollo",
            "Buscar nuevos retos controlados",
          ],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=wPoj5log_7M", // 3-min mindful breathing
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=p1T7V9PhVy8", // explicación pomodoro
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1oDrJba2PSs", // pomodoro “study with me”
            },
          ],
        },
        rp_high_solution: {
          solution: ["Mantén hábitos de logro", "Apoya en mentoría"],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search16", // 3-min reset
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=1search3", // pomodoro explainer
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1search26", // pomodoro study with me
            },
          ],
        },
      },
    },

    alto: {
      start: "rp_high_1",
      nodes: {
        rp_high_1: {
          question: "¿Te sientes satisfecho con tus logros recientes?",
          yes: "rp_high_solution_yes",
          no: "rp_mid_solution_growth",
        },
        rp_high_solution_yes: {
          solution: ["Sostén tu motivación", "Comparte logros con el equipo"],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search17", // 3 min relax
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=4Bs0qUB3BHQ", // Chopra 3-min meditation
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=1oDrJba2PSs", // Pomodoro
            },
          ],
        },
        rp_mid_solution_growth: {
          solution: ["Busca retos ligeros", "Toma cursos de actualización"],
          resources: [
            {
              type: "relax",
              url: "https://www.youtube.com/watch?v=1search2", // breathing space
            },
            {
              type: "explanation",
              url: "https://www.youtube.com/watch?v=p1T7V9PhVy8", // pomodoro explanation
            },
            {
              type: "practice",
              url: "https://www.youtube.com/watch?v=EMTGflevrLI", // timer with 3 min breaks
            },
          ],
        },
      },
    },
  },
};

export default function PostMbiFormTree({
  levels = { AE: "alto", DP: "medio", RP: "bajo" },
}: PropsPostMbiFormTree) {
  const [progress, setProgress] = useState<Progress>({
    AE: TREES.AE[levels.AE].start,
    DP: TREES.DP[levels.DP].start,
    RP: TREES.RP[levels.RP].start,
  });

  const [completed, setCompleted] = useState({
    AE: null as string[] | null,
    DP: null as string[] | null,
    RP: null as string[] | null,
  });

  // radio seleccionado por escala
  const [radioValue, setRadioValue] = useState({
    AE: "",
    DP: "",
    RP: "",
  });

  const handleAnswer = (type: Scale, answer: "yes" | "no") => {
    const tree = TREES[type][levels[type]];
    const nodeId = progress[type];
    const node = tree.nodes[nodeId];

    if ("solution" in node) return;

    const nextId = node[answer];
    const nextNode = tree.nodes[nextId];

    if ("solution" in nextNode) {
      setCompleted((prev) => ({ ...prev, [type]: nextNode.solution }));
    }

    setProgress((prev) => ({ ...prev, [type]: nextId }));

    // 🔥 limpiar radio al avanzar
    setRadioValue((prev) => ({ ...prev, [type]: "" }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      {Object.keys(progress).map((scaleKey) => {
        const type = scaleKey as Scale;
        const tree = TREES[type][levels[type]];
        const node = tree.nodes[progress[type]];

        const answer = TREES[type][levels[type]].nodes[progress[type]];

        return (
          <Card key={type}>
            <CardContent>
              {/* <Typography variant="h6">{type}</Typography> */}

              {!completed[type] && "question" in node ? (
                <>
                  <Typography>{node.question}</Typography>

                  <RadioGroup
                    name={`question-${type}`}
                    value={radioValue[type]}
                    onChange={(e) => {
                      const val = e.target.value as "yes" | "no";
                      setRadioValue((prev) => ({ ...prev, [type]: val }));
                      handleAnswer(type, val);
                    }}
                    sx={{ mt: 2 }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Sí"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Recomendación final
                  </Typography>

                  {completed[type]?.map((s, i) => (
                    <Typography key={i}>• {s}</Typography>
                  ))}

                  <Box mt={2}>
                    <Typography fontWeight="bold">
                      Video recursos recomendados
                    </Typography>

                    {"resources" in answer &&
                      answer.resources.map((r, i) => (
                        <Box key={i} mt={1}>
                          {toYouTubeEmbed(r.url) && (
                            <iframe
                              width="100%"
                              height="315"
                              frameBorder={0}
                              src={toYouTubeEmbed(r.url)!}
                              title="YouTube video player"
                              allowFullScreen
                            />
                          )}
                        </Box>
                      ))}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
