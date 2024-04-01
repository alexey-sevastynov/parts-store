import { ImageProps } from 'next/image';
import { LinkProps } from 'next/link';

export interface ILinkIconDescriptionProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  imageName: string;
  color: 'light' | 'dark';

  children: React.ReactNode;
}

export interface ILgotypeProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string;
  alt?: string;
}
