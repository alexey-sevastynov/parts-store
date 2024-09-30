import Styles from '@/styles/elements/index.module.scss';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { FaTools } from 'react-icons/fa';
import { COLORS } from '@/constants/colors';
import { SvgIconUrlProps } from '@/types/elements';

const SvgIconUrl = ({
  imageUrl,
  alt,
  className,
  size = 24,
}: SvgIconUrlProps) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  const [isSvg, setIsSvg] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('image/svg+xml')) {
          const svgText = await response.text();
          setSvgContent(svgText);
          setIsSvg(true);
        } else {
          setIsSvg(false);
          throw new Error('The resulting content is not SVG.');
        }
      } catch (error) {
        setIsSvg(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSvg();
  }, [imageUrl]);

  if (loading) {
    return (
      <div className={className}>
        <RotatingLines
          visible={true}
          width={size.toString()}
          strokeColor={COLORS.grey}
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
        />
      </div>
    );
  }
  return (
    <div className={className}>
      {isSvg ? (
        <div
          className={`${Styles.svgIconUrl} `}
          style={{ width: size, height: size }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
          aria-label={alt}
        />
      ) : (
        <FaTools className={Styles.svgIconUrl} size={size} />
      )}
    </div>
  );
};

export default SvgIconUrl;
