import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maslach Burnout Inventor",
  description:
    "Maslach Burnout Inventory (MBI): Evalúa el nivel de agotamiento emocional, despersonalización y realización personal en profesionales de servicios humanos y de salud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Container>
        {children}
        </Container>
      </body>
    </html>
  );
}
