import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "@/components/mouse-move-effect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeTrek",
  description: "CodeTrek is a modern web development starter kit.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/treklogo.jpg" type="image/jpeg" />
      </head>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <MouseMoveEffect />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
