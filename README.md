# 🧩 Proyecto Next.js con Atomic Design + Material UI

## 📘 Descripción General
Este proyecto está desarrollado en **Next.js** siguiendo la metodología de **Atomic Design** para mantener una estructura escalable, modular y reutilizable.  
Se utiliza **Material UI (MUI)** como librería principal de componentes de interfaz y **React Hook Form** junto con **Yup** para la gestión y validación de formularios.

Se utilizara Typescript y al final todo se subira con hosting de Vercel

---

## 🧱 Metodología Atomic Design

La estructura de componentes se basa en la jerarquía de **Brad Frost**:

```
src/
│
├── components/
│ ├── atoms/ # Elementos básicos (botones, inputs, iconos)
│ ├── molecules/ # Combinación de átomos (formularios simples, tarjetas)
│ ├── organisms/ # Secciones completas (headers, modales, tablas)
│ ├── templates/ # Estructuras de página reutilizables
│ └── pages/ # Composición final (rutas de Next.js)
│
├── hooks/ # Custom hooks (e.g., useAuth, useFormHandler)
├── context/ # Contextos globales (autenticación, tema, usuario)
├── services/ # Lógica de API (axios/fetch) y comunicación con backend
├── utils/ # Funciones auxiliares (formatos, helpers, validaciones)
├── styles/ # Archivos de estilos globales o temas de Material UI (css o scss modules pueden usarse)
└── pages/api/ # Endpoints API (Next.js Serverless Functions)
```

Un ejemplo de estructura esperada
```
src/
├── components/
│   ├── atoms/
│   │   └── ButtonPrimary/
│   │       ├── index.jsx
│   │       └── styles.js
│   ├── molecules/
│   │   └── LoginForm/
│   ├── organisms/
│   │   └── Header/
│   ├── templates/
│   │   └── DashboardTemplate/
│   └── pages/
│       └── HomePage/
├── hooks/
│   └── useAuth.js
├── context/
│   └── AuthContext.js
├── services/
│   └── userService.js
└── utils/
    └── validations.js

```

---

## 🎨 UI — Material UI (MUI)

- Usamos **@mui/material** y **@mui/icons-material** para construir una interfaz moderna y coherente.  
`ThemeProvider`.

**Ejemplo de uso:**
```jsx
import { Button } from "@mui/material";

<Button variant="contained" color="primary">
  Enviar
</Button>
```

---

# Maslach Burnout Inventory (MBI-HSS Human Services Survey)

Diseñada para profesionales de los servicios humanos y de salud (médicos, enfermeras, psicólogos, maestros, trabajadores sociales, etc.). Es la versión original.

---

## Escalas

### 1. Agotamiento emocional (Emotional Exhaustion, EE)
Evalúa el cansancio físico y emocional que siente la persona debido a su trabajo.  
Se manifiesta como falta de energía, sensación de estar sobrecargado y dificultad para seguir atendiendo a los demás.  
Es la dimensión más representativa del burnout.

### 2. Despersonalización (Depersonalization, DP)
Mide el grado de frialdad, cinismo o actitudes negativas hacia los pacientes, clientes o compañeros de trabajo.  
Se traduce en indiferencia o trato deshumanizado hacia los demás.

### 3. Realización personal (Personal Accomplishment, PA)
Evalúa los sentimientos de competencia y éxito en el trabajo.  
Una baja realización personal se relaciona con la sensación de ineficacia y falta de logros.

---

## Escalas del MBI-HSS (Puntuación)

- **Agotamiento Emocional (AE / EE)** – 9 ítems  
  → Fatiga, cansancio, sentirse sobrecargado.
- **Despersonalización (DP)** – 5 ítems  
  → Actitud fría, indiferente o cínica hacia los pacientes/usuarios.
- **Realización Personal (RP / PA)** – 8 ítems  
  → Sentimientos de competencia, logro y eficacia en el trabajo.  
  **Importante:** en esta escala la puntuación baja indica burnout.

---

## Forma de evaluación

- Cada ítem se responde en una escala Likert de 7 puntos (0 = nunca, 6 = todos los días).
- Se suman los puntos de cada subescala de manera independiente.
- No hay un puntaje total único; el diagnóstico se hace con los niveles de cada subescala.

| Escala | Bajo | Medio | Alto (riesgo) |
|--------|------|-------|---------------|
| Agotamiento Emocional (EE) | 0–16 | 17–26 | ≥27 |
| Despersonalización (DP) | 0–6 | 7–12 | ≥13 |
| Realización Personal (RP) | ≥39 (bajo burnout) | 32–38 | ≤31 (alto burnout) |

---

## Resultados

- **Burnout alto** → cuando se cumplen:
  - EE alto
  - DP alto
  - RP bajo
- **Burnout moderado** → cuando una o dos de las escalas están en nivel de riesgo.
- **Sin burnout** → cuando las tres escalas están en rangos no problemáticos.

---

## Cuestionario

> Nota: La plantilla se adapta al profesionista. En este ejemplo se menciona “alumno(s)” porque está enfocado en docentes. Para el área de salud, reemplazar por “paciente(s)”.

1. Me siento emocionalmente agotado/a por mi trabajo.
2. Me siento cansado al final de la jornada de trabajo.
3. Cuando me levanto por la mañana y me enfrento a otra jornada de trabajo me siento fatigado.
4. Tengo facilidad para comprender cómo se sienten mis alumnos/as.
5. Creo que estoy tratando a algunos alumnos/as como si fueran objetos impersonales.
6. Siento que trabajar todo el día con alumnos/as supone un gran esfuerzo y me cansa.
7. Creo que trato con mucha eficacia los problemas de mis alumnos/as.
8. Siento que mi trabajo me está desgastando. Me siento quemado por mi trabajo.
9. Creo que con mi trabajo estoy influyendo positivamente en la vida de mis alumnos/as.
10. Me he vuelto más insensible con la gente desde que ejerzo la profesión docente.
11. Pienso que este trabajo me está endureciendo emocionalmente.
12. Me siento con mucha energía en mi trabajo.
13. Me siento frustrado/a en mi trabajo.
14. Creo que trabajo demasiado.
15. No me preocupa realmente lo que les ocurra a algunos de mis alumnos/as.
16. Trabajar directamente con alumnos/as me produce estrés.
17. Siento que puedo crear con facilidad un clima agradable con mis alumnos/as.
18. Me siento motivado después de trabajar en contacto con alumnos/as.
19. Creo que consigo muchas cosas valiosas en este trabajo.
20. Me siento acabado en mi trabajo, al límite de mis posibilidades.
21. En mi trabajo trato los problemas emocionalmente con mucha calma.
22. Creo que los alumnos/as me culpan de algunos de sus problemas.

---

## Soluciones / Intervenciones

Aunque el MBI-HSS no prescribe tratamientos, un sistema experto puede generar recomendaciones basadas en los resultados:

- **Si EE alto:**
  - Pausas regulares y descanso suficiente.
  - Técnicas de manejo de estrés (mindfulness, respiración, relajación).
- **Si DP alto:**
  - Supervisión o mentoría profesional.
  - Talleres de comunicación empática y relación con pacientes.
- **Si RP bajo:**
  - Programas de reconocimiento y feedback positivo.
  - Capacitación para mejorar habilidades y sentir eficacia profesional.
