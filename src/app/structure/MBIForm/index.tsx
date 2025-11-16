"use client";

import React from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { useMBIForm } from "@/app/customHooks/useMbiForm";
import FormPostMBI from "../PostMbiForm";
import PostMbiFormTree from "../PostMbiFormTree";

const MBIForm: React.FC = () => {
  const {
    questions,
    scale,
    form,
    onSubmit,
    results,
    postMbi,
    open,
    setOpen,
  } = useMBIForm();

  const { register, handleSubmit, formState } = form;

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Maslach Burnout Inventory
      </Typography>

      <Typography marginBottom={2}>
        Diseñada para profesionales de los servicios humanos y de salud (médicos,
        enfermeras, psicólogos, maestros, trabajadores sociales, etc.).
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((q, index) => (
          <Box key={index} mb={3}>
            <FormControl component="fieldset" error={!!formState.errors[`q${index}`]}>
              <FormLabel>{`${index + 1}. ${q}`}</FormLabel>

              <RadioGroup defaultValue="5">
                {scale.map((label, i) => (
                  <FormControlLabel
                    key={i}
                    value={i.toString()}
                    control={<Radio {...register(`q${index}`)} />}
                    label={label}
                  />
                ))}
              </RadioGroup>

              {formState.errors[`q${index}`] && (
                <Typography variant="body2" color="error">
                  {formState.errors[`q${index}`]?.message}
                </Typography>
              )}
            </FormControl>
          </Box>
        ))}

        <Button fullWidth type="submit" variant="contained">
          Enviar
        </Button>
      </form>

      <Dialog open={open} fullWidth maxWidth="md" onClose={() => setOpen(false)}>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <DialogTitle>Formulario post MBI</DialogTitle>

          <IconButton sx={{ mr: 3 }} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent>
          {results && (
            <>
            <PostMbiFormTree levels={{
              AE:results.EE.level,
              DP:results.DP.level,
              RP:results.RP.level
            }}/>
            <FormPostMBI
              motor_global={postMbi}
              valoresCondicion={{
                EE: results.EE.level,
                DP: results.DP.level,
                RP: results.RP.level,
              }}
            />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default MBIForm;
