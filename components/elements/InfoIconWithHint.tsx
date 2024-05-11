import Styles from '@/styles/elements/index.module.scss';

import { SIZE_ICON } from '@/constants/common';
import { LuInfo } from 'react-icons/lu';

import Paragraph from './Paragraph';

const InfoIconWithHint = ({ text }: { text: string }) => {
  return (
    <div className={Styles.infoIconWithHint}>
      <div className={Styles.infoIconWithHint__icon}>
        <LuInfo size={SIZE_ICON} />
      </div>

      <Paragraph>{text}</Paragraph>
    </div>
  );
};

export default InfoIconWithHint;
