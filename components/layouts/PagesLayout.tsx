import { Montserrat } from '@/utils/customFonts';

import Layout from './Layout';
import Providers from './Providers';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${Montserrat.variable}`}>
        <Providers>
          <Layout>{children}</Layout>
          {/* modal windows here */}
        </Providers>
      </body>
    </html>
  );
};

export default PagesLayout;
