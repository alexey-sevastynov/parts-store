import Styles from '@/styles/elements/index.module.scss';
import {
  INotificationBarProps,
  TypeNotificationMessage,
} from '@/types/elements';
import { NotificationStatus } from '@/constants/notification-status';

const NotificationBar = ({
  type = NotificationStatus.success,
  className,
  children,
  ...props
}: INotificationBarProps) => {
  const wrapStyle = (notificationType: TypeNotificationMessage) => {
    switch (notificationType) {
      case NotificationStatus.success:
        return `${Styles.notificationBar} ${Styles.success}`;
      case NotificationStatus.warning:
        return `${Styles.notificationBar} ${Styles.warning}`;
      case NotificationStatus.error:
        return `${Styles.notificationBar} ${Styles.error}`;
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  };

  return (
    <div className={`${wrapStyle(type)} ${className}`} {...props}>
      <p className={Styles.notificationBar__message}>{children}</p>
    </div>
  );
};

export default NotificationBar;
