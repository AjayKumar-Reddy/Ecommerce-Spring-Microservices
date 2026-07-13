import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA | Premium AI-Powered E-Commerce",
  description: "Experience the next-generation shopping platform powered by microservices and advanced AI recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
