import Styles from '@/styles/elements/index.module.scss';

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
  isButtonType = false,
  ...props
}: ILinkIconDescriptionProps) => {
  const commonProps = {
    className: `${className} ${Styles.linkIconDescription}`,
    style: {
      color: color === 'light' ? COLORS.whiteFont : COLORS.blackFont,
      ...style,
    },
    ...props,
  };

  return isButtonType ? (
    <button {...commonProps}>
      <Image
        src={`/img/${imageName}.svg`}
        alt={imageName}
        width={24}
        height={24}
        priority
      />
      {children}
    </button>
  ) : (
    <Link {...commonProps}>
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
