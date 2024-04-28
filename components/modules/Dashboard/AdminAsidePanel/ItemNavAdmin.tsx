import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IItemNavAdminProps } from '@/types/dashboard';

const ItemNavAdmin = ({
  icon,
  title,
  isActive = false,
}: IItemNavAdminProps) => {
  return (
    <li className={Styles.itemNavAdmin}>
      {isActive && <span className={Styles.itemNavAdmin__marker} />}
      <div
        className={`${Styles.itemNavAdmin__icon} ${isActive && Styles.active}`}
      >
        {icon}
      </div>
      <p
        className={`${Styles.itemNavAdmin__title} ${isActive && Styles.active}`}
      >
        {title}
      </p>
    </li>
  );
};

export default ItemNavAdmin;
