import { LinkProps } from 'next/link';

export interface ILinkIconDescriptionProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  imageName: string;
  color: 'light' | 'dark';

  children: React.ReactNode;
}
