import type { Metadata } from 'next';

import './globalStyles/global.scss';
import '@uploadthing/react/styles.css';
import 'react-quill/dist/quill.snow.css';

import PagesLayout from '@/components/layouts/PagesLayout';
import Providers from '@/components/layouts/Providers';
import { Montserrat } from '@/utils/customFonts';

export const metadata: Metadata = {
  title: 'parts-wave',
  description: 'Auto parts store.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ua'>
      <body className={`${Montserrat.variable}`}>
        <Providers>
          <PagesLayout>{children}</PagesLayout>
        </Providers>
      </body>
    </html>
  );
}
