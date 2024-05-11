import Styles from '@/styles/elements/index.module.scss';

import { SIZE_ICON } from '@/constants/common';
import { FaRegQuestionCircle } from 'react-icons/fa';

import Paragraph from './Paragraph';

const QuestionIconWithHint = ({ text }: { text: string }) => {
  return (
    <div className={Styles.questionIconWithHint}>
      <div className={Styles.questionIconWithHint__icon}>
        <FaRegQuestionCircle size={SIZE_ICON} />
      </div>

      <Paragraph>{text}</Paragraph>
    </div>
  );
};

export default QuestionIconWithHint;
