import { COLORS } from '@/constants/colors';
import Styles from '@/styles/elements/index.module.scss';
import { IPopupWindowProps } from '@/types/elements';
import { removeOverflowHiddenFromBody } from '@/utils/common';
import { IoMdClose } from 'react-icons/io';
import Title from './Title';

const PopupWindow = ({
  closePopupWindow,
  title = 'No title',
  children,
}: IPopupWindowProps) => {
  return (
    <div className={Styles.popupWindow}>
      <header className={Styles.popupWindow__head}>
        <Title className={Styles.popupWindow__head_title} size='sm'>
          {title}
        </Title>
        <button
          className={Styles.popupWindow__head_close}
          onClick={() => {
            closePopupWindow();
            removeOverflowHiddenFromBody();
          }}
        >
          <IoMdClose size={24} color={COLORS.blackFont} />
        </button>
      </header>
      <main className={Styles.popupWindow__main}>{children}</main>
    </div>
  );
};

export default PopupWindow;
