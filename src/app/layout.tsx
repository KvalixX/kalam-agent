import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalam — Automate your WhatsApp Sales",
  description: "AI-powered WhatsApp agent for modern e-commerce. Fluent in Darija, French, and Arabic. Connected to Shopify, YouCan, and Amana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
