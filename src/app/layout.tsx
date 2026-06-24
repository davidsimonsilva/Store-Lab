import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store-lab",
  description:
    "E-commerce completo: Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%232563eb'/%3E%3Cg transform='translate(2.4 2.4) scale(0.8)'%3E%3Cpath d='M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2' fill='none' stroke='%23fff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6.453 15h11.094' fill='none' stroke='%23fff' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M8.5 2h7' fill='none' stroke='%23fff' stroke-width='2.5' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
