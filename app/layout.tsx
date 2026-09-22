import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "N3 BAC — Antiseptik Pembersih Luka",
  description:
    "N3 BAC Antiseptik Spray — Solusi modern perawatan luka dengan PHMB 0,1%. Tersedia 60ml, 100ml, dan 300ml.",
  icons: { icon: "/img/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={plusJakarta.variable}>
      <body>{children}</body>
    </html>
  );
}