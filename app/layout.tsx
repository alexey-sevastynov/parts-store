import type { Metadata } from 'next';

import './globalStyles/global.scss';
import PagesLayout from '@/components/layouts/PagesLayout';

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
      <PagesLayout>{children}</PagesLayout>
    </html>
  );
}
