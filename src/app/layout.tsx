import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";
import CustomContainer from "./structure/CustomContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ulrThumbnail = `https://i.ibb.co/4ZqF1jVq/og.png`;
const url = `https://burnout-psi.vercel.app/`

export const metadata: Metadata = {
  title: {
    default: "Maslach Burnout Inventory (MBI) – Evaluación de Burnout",
    template: "%s | MBI Test"
  },

  description:
    "Aplicación oficial del Maslach Burnout Inventory (MBI). Evalúa agotamiento emocional, despersonalización y realización personal en profesionales, docentes y personal de salud.",

  keywords: [
    "Maslach Burnout Inventory",
    "MBI",
    "Burnout",
    "agotamiento emocional",
    "despersonalización",
    "realización personal",
    "psicometría",
    "evaluación psicológica",
    "estrés laboral",
    "salud mental",
    "docentes",
    "profesionales de la salud"
  ],

  applicationName: "Maslach Burnout Inventory - Evaluación Profesional",

  authors: [
    {
      name: "Facultad de Ingeniería Mecánica y Eléctrica",
      url: "https://www.fime.uanl.mx"
    }
  ],

  creator: "Facultad de Ingeniería Mecánica y Eléctrica",
  publisher: "Universidad Autónoma de Nuevo León",

  metadataBase: new URL(url), // ✅ actualiza según tu dominio real

  alternates: {
    canonical: url
  },

  openGraph: {
    title: "Maslach Burnout Inventory (MBI) – Evaluación Profesional",
    description:
      "Test oficial para evaluar el nivel de Burnout: Agotamiento emocional, despersonalización y sentido de logro personal.",
    url: url,
    siteName: "Maslach Burnout Inventory - MBI",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: ulrThumbnail,
        width: 1200,
        height: 630,
        alt: "Maslach Burnout Inventory - Evaluación de Burnout",
      },
    ],
  },

  

  twitter: {
    card: "summary_large_image",
    title: "Maslach Burnout Inventory (MBI) – Evaluación Profesional",
    description:
      "Evalúa tu nivel de agotamiento emocional, despersonalización y realización personal.",
    creator: "@uanl",
    images: [ulrThumbnail],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  category: "test psicológico",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CustomContainer>
          <>{children}</>
        </CustomContainer>
      </body>
    </html>
  );
}
