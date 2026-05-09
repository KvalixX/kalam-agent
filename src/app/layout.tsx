import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalam كلام — Ton agent client qui parle comme toi",
  description:
    "Kalam automatise le service client de ta boutique e-commerce avec une IA qui répond en Darija, français et arabe 24h/24. Connecté à Youcan, Shopify, Amana et plus.",
  keywords: "service client IA, WhatsApp bot maroc, darija IA, e-commerce maroc, chatbot darija, kalam",
  openGraph: {
    title: "Kalam — Ton agent client WhatsApp IA",
    description: "Réponds à tous tes clients en moins de 30 secondes, en Darija, 24h/24.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
