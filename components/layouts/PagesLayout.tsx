import { Montserrat } from '@/utils/customFonts';

import Layout from './Layout';
import Providers from './Providers';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ua'>
      <body className={`${Montserrat.variable}`}>
        <Providers>
          <Layout>{children}</Layout>

          {/* background, when the language drop-down window is open */}
          <div className='lang-popup-overlay overlay-active' />
        </Providers>
      </body>
    </html>
  );
};

export default PagesLayout;
