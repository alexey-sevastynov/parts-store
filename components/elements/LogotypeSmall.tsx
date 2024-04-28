import Styles from '@/styles/elements/index.module.scss';
import { ILogotypeSmallProps } from '@/types/elements';

const LogotypeSmall = ({
  theme = 'light',
  color = 'orange',
}: ILogotypeSmallProps) => {
  const darkStyle = theme === 'dark' ? Styles.dark : '';
  const firstLetterRedStyle = color === 'red' ? Styles.red : '';

  return (
    <div
      className={`${Styles.logotypeSmall} ${darkStyle} ${firstLetterRedStyle}`}
    >
      <p>PARTS</p>
      <p>WAVE</p>
    </div>
  );
};

export default LogotypeSmall;
