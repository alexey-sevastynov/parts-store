import { ParagraphSize } from '@/types/elements';
import React, { HTMLAttributes } from 'react';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: ParagraphSize;
}

const PARAGRAPH_SIZE_STYLES_MAP: {
  [key: string]: string;
} = {
  xl: 'text-xl',
  lg: 'text-lg',
  md: 'text-md',
  sm: 'text-sm',
};

export const Paragraph = ({
  size = 'md',
  className,
  ...props
}: ParagraphProps) => {
  return <p className={`${PARAGRAPH_SIZE_STYLES_MAP[size]}`} {...props} />;
};

export default Paragraph;
