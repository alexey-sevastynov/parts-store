import type { Metadata } from 'next';
import { Montserrat } from '@/utils/customFonts';

import './globalStyles/global.scss';

export const metadata: Metadata = {
  title: 'Parts Wave',
  description: 'Auto parts store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${Montserrat.variable}`}>{children}</body>
    </html>
  );
}
