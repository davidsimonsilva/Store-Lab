import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Store-lab',
  description: 'E-commerce completo: Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
