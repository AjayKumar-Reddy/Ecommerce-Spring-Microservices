import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA | Premium E-Commerce Platform",
  description: "Experience the next-generation shopping platform built with high performance and elegant design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="fixed inset-0 bg-[#030712] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.08),rgba(255,255,255,0))] pointer-events-none z-[-10]"></div>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
