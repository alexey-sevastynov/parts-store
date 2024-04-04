import Styles from '@/styles/modules/authorization/index.module.scss';

import Image from 'next/image';

import { IButtonProps } from '@/types/authorization';

const ButtonSocialFusion = ({
  children,
  className,
  nameIcon,
  ...props
}: IButtonProps) => {
  return (
    <button className={`${Styles.buttonSocialFusion} ${className}`} {...props}>
      <Image
        src={`/img/${nameIcon}.png`}
        alt={nameIcon}
        width={24}
        height={24}
      />

      {children}
    </button>
  );
};

export default ButtonSocialFusion;
