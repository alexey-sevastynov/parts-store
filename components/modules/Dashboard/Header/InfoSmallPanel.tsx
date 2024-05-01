import Title from '@/components/elements/Title';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IInfoSmallPanelProps } from '@/types/dashboard';

const InfoSmallPanel = ({ title, number, icon }: IInfoSmallPanelProps) => {
  return (
    <article className={Styles.infoSmallPanel}>
      <Title size='xl' className={Styles.infoSmallPanel__title}>
        {title}
      </Title>

      <p className={Styles.infoSmallPanel__number}>{number}</p>

      <div className={Styles.infoSmallPanel__icon}>{icon}</div>
    </article>
  );
};

export default InfoSmallPanel;
