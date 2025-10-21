"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BurnoutSpectrums, Results } from "./types";
const questions: string[] = [
  "Me siento emocionalmente agotado/a por mi trabajo.",
  "Me siento cansado al final de la jornada de trabajo.",
  "Cuando me levanto por la mañana y me enfrento a otra jornada de trabajo me siento fatigado.",
  "Tengo facilidad para comprender cómo se sienten mis alumnos/as.",
  "Creo que estoy tratando a algunos alumnos/as como si fueran objetos impersonales.",
  "Siento que trabajar todo el día con alumnos/as supone un gran esfuerzo y me cansa.",
  "Creo que trato con mucha eficacia los problemas de mis alumnos/as.",
  "Siento que mi trabajo me está desgastando. Me siento quemado por mi trabajo.",
  "Creo que con mi trabajo estoy influyendo positivamente en la vida de mis alumnos/as.",
  "Me he vuelto más insensible con la gente desde que ejerzo la profesión docente.",
  "Pienso que este trabajo me está endureciendo emocionalmente.",
  "Me siento con mucha energía en mi trabajo.",
  "Me siento frustrado/a en mi trabajo.",
  "Creo que trabajo demasiado.",
  "No me preocupa realmente lo que les ocurra a algunos de mis alumnos/as.",
  "Trabajar directamente con alumnos/as me produce estrés.",
  "Siento que puedo crear con facilidad un clima agradable con mis alumnos/as.",
  "Me siento motivado después de trabajar en contacto con alumnos/as.",
  "Creo que consigo muchas cosas valiosas en este trabajo.",
  "Me siento acabado en mi trabajo, al límite de mis posibilidades.",
  "En mi trabajo trato los problemas emocionalmente con mucha calma.",
  "Creo que los alumnos/as me culpan de algunos de sus problemas.",
];

const scale: string[] = [
  "0) Nunca",
  "1) Algunas veces al año o menos",
  "2) Una vez al mes o menos",
  "3) Algunas veces al mes",
  "4) Una vez a la semana",
  "5) Varias veces a la semana",
  "6) Todos los días",
];

type FormValues = { [key: string]: number };

const schemaFields: Record<string, yup.NumberSchema<number>> = {};
questions.forEach((_, index) => {
  schemaFields[`q${index}`] = yup
    .number()
    .required("Debe seleccionar una respuesta")
    .min(0)
    .max(6);
});
const schema = yup.object().shape(schemaFields);

const defaultValues: FormValues = {};
questions.forEach((_, index) => {
  defaultValues[`q${index}`] = 1;
});

// Color mapping
const riskColor = {
  Bajo: "#4caf50",
  Medio: "#ff9800",
  "Alto (riesgo)": "#f44336",
  "Bajo burnout": "#4caf50",
  "Alto burnout": "#f44336",
};

const MBIForm: React.FC = () => {
  const [results, setResults] = useState<null | Results>(null);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    const EEIndexes = [0, 1, 2, 5, 8, 13, 19];
    const DPIndexes = [4, 10, 15, 20];
    const RPIndexes = [3, 6, 7, 9, 11, 12, 14, 16, 17, 18, 21];

    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

    const EE = sum(EEIndexes.map((i) => data[`q${i}`]));
    const DP = sum(DPIndexes.map((i) => data[`q${i}`]));
    const RP = sum(RPIndexes.map((i) => data[`q${i}`]));

    const getEELevel = (score: number) =>
      score <= 16 ? "Bajo" : score <= 26 ? "Medio" : "Alto (riesgo)";
    const getDPLevel = (score: number) =>
      score <= 6 ? "Bajo" : score <= 12 ? "Medio" : "Alto (riesgo)";
    const getRPLevel = (score: number) =>
      score >= 39 ? "Bajo burnout" : score >= 32 ? "Medio" : "Alto burnout";

    setResults({
      EE: { score: EE, level: getEELevel(EE) },
      DP: { score: DP, level: getDPLevel(DP) },
      RP: { score: RP, level: getRPLevel(RP) },
    });

    setOpen(true);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Maslach Burnout Inventory
      </Typography>

      <Typography marginBottom={2}>
        Diseñada para profesionales de los servicios humanos y de salud
        (médicos, enfermeras, psicólogos, maestros, trabajadores sociales,
        etc.). Es la versión original.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question, index) => (
          <Box key={index} mb={3}>
            <FormControl component="fieldset" error={!!errors[`q${index}`]}>
              <FormLabel component="legend">{`${
                index + 1
              }. ${question}`}</FormLabel>
              <RadioGroup defaultValue="1">
                {scale.map((label, i) => (
                  <FormControlLabel
                    key={i}
                    value={i.toString()}
                    control={<Radio {...register(`q${index}`)} />}
                    label={label}
                  />
                ))}
              </RadioGroup>
              {errors[`q${index}`] && (
                <Typography variant="body2" color="error">
                  {errors[`q${index}`]?.message}
                </Typography>
              )}
            </FormControl>
          </Box>
        ))}

        <Button fullWidth type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>

      {/* POPUP DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle>Resultados del test</DialogTitle>
          <IconButton
            sx={{
              marginRight: 3,
            }}
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent>
          {results && (
            <Grid container spacing={2}>
              {["EE", "DP", "RP"].map((key) => (
                <Grid
                  size={{
                    xs: 12,
                  }}
                  key={key}
                >
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor:
                        riskColor[results[key as BurnoutSpectrums].level],
                      color: "#fff",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {key === "EE"
                        ? "Agotamiento Emocional (EE)"
                        : key === "DP"
                        ? "Despersonalización (DP)"
                        : "Realización Personal (RP)"}
                    </Typography>
                    <Typography variant="body1">
                      {results[key as BurnoutSpectrums].level}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default MBIForm;
