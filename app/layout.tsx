import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colección esencial · Cuidado facial",
  description:
    "Productos de cuidado facial formulados para nutrir, proteger e iluminar tu piel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}