import Styles from '@/styles/elements/link-icon-description/index.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { COLORS } from '@/constants/colors';

import { ILinkIconDescriptionProps } from '@/types/elements';

const LinkIconDescription = ({
  imageName,
  color = 'light',
  className,
  style,
  children,
  ...props
}: ILinkIconDescriptionProps) => {
  return (
    <Link
      {...props}
      className={`${className} ${Styles.linkIconDescription}`}
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
    </Link>
  );
};

export default LinkIconDescription;
