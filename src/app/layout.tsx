import type { Metadata, Viewport } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { StorageInitializer } from "@/components/storage-initializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOS Ajuda — Assistência de Emergência",
  description:
    "Plataforma mobile-first para conectar pessoas afetadas por cheias com voluntários e doadores em Moçambique.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0d6e56",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="min-h-screen antialiased">
        <StorageInitializer>
          <div className="mx-auto min-h-screen max-w-lg pb-20">
            {children}
          </div>
          <MobileNav />
        </StorageInitializer>
      </body>
    </html>
  );
}
