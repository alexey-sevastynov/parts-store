import { TitleSize } from '@/types/elements';

interface ITitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
  size?: TitleSize;
  className?: string;
}

const TITLE_SIZE_STYLES_MAP: {
  [key: string]: string;
} = {
  xl: 'title-xl',
  lg: 'title-lg',
  md: 'title-md',
  sm: 'title-sm',
};

const Title = ({ size = 'lg', className, children, ...props }: ITitleProps) => {
  return (
    <h2 className={`${TITLE_SIZE_STYLES_MAP[size]} ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default Title;
