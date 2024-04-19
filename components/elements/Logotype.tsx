import Image from 'next/image';

import { ILgotypeProps } from '@/types/elements';

const Logotype = ({ ...props }: ILgotypeProps) => {
  const { src = '/img/logo.svg', alt = 'logo', ...otherProps } = props;

  return (
    <Image
      src={src}
      alt={alt}
      width={121}
      height={92}
      priority
      {...otherProps}
    />
  );
};

export default Logotype;
