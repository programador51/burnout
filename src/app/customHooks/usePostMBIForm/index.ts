"use client";

import { useState, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MotorItem } from "@/app/structure/PostMbiForm/types";
import { Condicion } from "@/app/structure/PostMbiForm/types";

export interface FormValues {
  [key: string]: string;
}

export function usePostMBIForm(
  motor_global: MotorItem[],
  valoresCondicion: Condicion
) {
  const [resultado, setResultado] = useState<MotorItem | null>(null);

  // ✅ Encontrar diagnóstico según condición
  const seleccionado = useMemo(
    () =>
      motor_global.find(
        (item) =>
          item.condicion.EE === valoresCondicion.EE &&
          item.condicion.DP === valoresCondicion.DP &&
          item.condicion.RP === valoresCondicion.RP
      ),
    [motor_global, valoresCondicion]
  );

  // ✅ Crear schema Yup dinámico
  const schema = useMemo(() => {
    if (!seleccionado) return yup.object().shape({});

    const fields: Record<string, yup.StringSchema> = {};

    seleccionado.preguntas_post_mbi.forEach((_, idx) => {
      fields[`pregunta_${idx}`] = yup.string().required("Requerido");
    });

    return yup.object().shape(fields);
  }, [seleccionado]);

  // ✅ Configuración del formulario
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    setResultado(seleccionado ?? null);
  };

  return {
    form,
    resultado,
    seleccionado,
    onSubmit,
  };
}
