import { Montserrat } from '@/utils/customFonts';

import Layout from './Layout';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${Montserrat.variable}`}>
        <Layout>{children}</Layout>

        {/* modal windows here */}
      </body>
    </html>
  );
};

export default PagesLayout;
