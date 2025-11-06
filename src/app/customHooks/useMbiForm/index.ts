"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MotorItem } from "@/app/structure/PostMbiForm/types";
import { getPostMbiQuestions } from "@/app/helpers/questions";
import { Results } from "@/app/structure/MBIForm/types";

export type FormValues = { [key: string]: number };

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

const scale = [
    "0) Nunca", "1) Algunas veces al año o menos", "2) Una vez al mes o menos", "3) Algunas veces al mes", "4) Una vez a la semana", "5) Varias veces a la semana", "6) Todos los días",
]

// ✅ schema dinámico
const schemaFields: Record<string, yup.NumberSchema<number>> = {};
questions.forEach((_, index) => {
    schemaFields[`q${index}`] = yup
        .number()
        .required("Debe seleccionar una respuesta")
        .min(0)
        .max(6);
});
const schema = yup.object().shape(schemaFields);

// ✅ default values
const defaultValues: FormValues = {};
questions.forEach((_, index) => {
    defaultValues[`q${index}`] = 5;
});

export function useMBIForm() {
    const [results, setResults] = useState<null | Results>(null);
    const [postMbi, setPostMbi] = useState<MotorItem[]>([]);
    const [open, setOpen] = useState(false);

    // fetch del Motor Global
    useEffect(() => {
        getPostMbiQuestions().then(setPostMbi);
    }, []);

    const form = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues,
    });

    // ✅ Funciones internas de puntuación
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

    const getEELevel = (score: number) =>
        score <= 16 ? "bajo" : score <= 26 ? "medio" : "alto";
    const getDPLevel = (score: number) =>
        score <= 6 ? "bajo" : score <= 12 ? "medio" : "alto";
    const getRPLevel = (score: number) =>
        score >= 39 ? "bajo" : score >= 32 ? "medio" : "alto";

    const onSubmit = (data: FormValues) => {
        const EEIndexes = [0, 1, 2, 5, 8, 13, 19];
        const DPIndexes = [4, 10, 15, 20];
        const RPIndexes = [3, 6, 7, 9, 11, 12, 14, 16, 17, 18, 21];

        const EE = sum(EEIndexes.map((i) => data[`q${i}`]));
        const DP = sum(DPIndexes.map((i) => data[`q${i}`]));
        const RP = sum(RPIndexes.map((i) => data[`q${i}`]));

        setResults({
            EE: { score: EE, level: getEELevel(EE) },
            DP: { score: DP, level: getDPLevel(DP) },
            RP: { score: RP, level: getRPLevel(RP) },
        });

        setOpen(true);
    };

    return {
        questions,
        scale,
        form,
        onSubmit,
        results,
        postMbi,
        open,
        setOpen,
    };
}
