"use client";

import React from "react";
import { Box, Button, Typography, TextField, Divider } from "@mui/material";

import { MotorItem } from "./types";
import { Condicion } from "./types";
import { usePostMBIForm } from "@/app/customHooks/usePostMBIForm";

interface Props {
  motor_global: MotorItem[];
  valoresCondicion: Condicion;
}

export default function FormPostMBI({ motor_global, valoresCondicion }: Props) {
  const { form, resultado, seleccionado, onSubmit } = usePostMBIForm(
    motor_global,
    valoresCondicion
  );

  const { register, handleSubmit, formState } = form;

  if (!seleccionado)
    return (
      <Typography>No se encontró diagnóstico para estos valores.</Typography>
    );

  return (
    <Box mx="auto">
      {/* FORMULARIO */}
      {!resultado && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {seleccionado.preguntas_post_mbi.map((pregunta, index) => (
              <Box key={index} mb={3}>
                <Typography mb={1}>{pregunta}</Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Escribe aquí"
                  {...register(`pregunta_${index}`)}
                  error={!!formState.errors[`pregunta_${index}`]}
                  helperText={formState.errors[`pregunta_${index}`]?.message}
                />
              </Box>
            ))}

            <Button fullWidth variant="contained" type="submit">
              Finalizar
            </Button>
          </form>
        </Box>
      )}

      {/* RESULTADO */}
      {resultado && (
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Resultado
          </Typography>

          <Typography variant="h6" mt={2}>
            Diagnóstico: {resultado.diagnostico}
          </Typography>

          <Typography mt={2}>{resultado.explicacion}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Intervenciones sugeridas</Typography>

          <Box mt={1}>
            <Typography mb={2}>
              <strong>Emocional:</strong> {resultado.intervencion.emocional}
            </Typography>
            <Typography mb={2}>
              <strong>Ambiente:</strong> {resultado.intervencion.ambiente}
            </Typography>
            <Typography mb={2}>
              <strong>Social:</strong> {resultado.intervencion.social}
            </Typography>
            <Typography mb={2}>
              <strong>Personal:</strong> {resultado.intervencion.personal}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
