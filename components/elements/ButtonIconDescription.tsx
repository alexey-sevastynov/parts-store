import Styles from '@/styles/elements/index.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { COLORS } from '@/constants/colors';

import { IButtonIconDescriptionProps } from '@/types/elements';

const ButtonIconDescription = ({
  imageName,
  color = 'light',
  className,
  style,
  children,
  ...props
}: IButtonIconDescriptionProps) => {
  return (
    <button
      {...props}
      className={`${className} ${Styles.buttonIconDescription}`}
      style={{
        color: color === 'light' ? COLORS.whiteFont : COLORS.blackFont,
        ...style,
      }}
    >
      <Image
        src={`/img/${imageName}.svg`}
        alt={imageName}
        width={24}
        height={24}
        priority
      />

      {children}
    </button>
  );
};

export default ButtonIconDescription;
