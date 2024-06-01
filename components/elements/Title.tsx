import { TitleSize, TitleWeight } from '@/types/elements';

interface ITitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
  size?: TitleSize;
  weight?: TitleWeight;
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

const TITLE_WEIGHT_STYLES_MAP: {
  [key: string]: string;
} = {
  bold: 'weight-bold',
  semiBold: 'weight-semi-bold',
  medium: 'weight-medium',
  light: 'weight-light',
  regular: 'weight-regular',
};

const Title = ({
  size = 'lg',
  weight = 'regular',
  className,
  children,
  ...props
}: ITitleProps) => {
  return (
    <h2
      className={`${TITLE_SIZE_STYLES_MAP[size]} ${TITLE_WEIGHT_STYLES_MAP[weight]} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Title;
