import Paragraph from '@/components/elements/Paragraph';
import Styles from '@/styles/modules/dashboard/index.module.scss';

const NotFoundMsg = ({ message }: { message: string }) => {
  return (
    <div className={Styles.notFoundMsg}>
      <Paragraph>{message}</Paragraph>
    </div>
  );
};

export default NotFoundMsg;
