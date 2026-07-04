import type { Metadata, Viewport } from "next";
import { BottomNav, TopNav } from "@/components/navigation";
import { StorageInitializer } from "@/components/storage-initializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOS Ajuda — Assistência de Emergência",
  description:
    "Plataforma mobile-first para ligar pessoas afetadas por cheias a voluntários e doadores em Moçambique.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a8ec4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <StorageInitializer>
          <TopNav />
          <main className="mx-auto min-h-screen max-w-lg pb-24 md:max-w-4xl md:pb-8">
            {children}
          </main>
          <BottomNav />
        </StorageInitializer>
      </body>
    </html>
  );
}
