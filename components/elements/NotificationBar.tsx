import Styles from '@/styles/elements/index.module.scss';
import {
  INotificationBarProps,
  TypeNotificationMessage,
} from '@/types/elements';

const NotificationBar = ({
  type = 'success',
  className,
  children,
  ...props
}: INotificationBarProps) => {
  const wrapStyle = (type: TypeNotificationMessage) => {
    switch (type) {
      case 'success':
        return `${Styles.notificationBar} ${Styles.success}`;
      case 'warning':
        return `${Styles.notificationBar} ${Styles.warning}`;
      case 'error':
        return `${Styles.notificationBar} ${Styles.error}`;
    }
  };

  return (
    <div className={`${wrapStyle(type)} ${className}`} {...props}>
      <p className={Styles.notificationBar__message}>{children}</p>
    </div>
  );
};

export default NotificationBar;
