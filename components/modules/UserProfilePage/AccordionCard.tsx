import Styles from '@/styles/modules/user-profile-page/index.module.scss';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Title from '@/components/elements/Title';

import { IAccordionCardProps } from '@/types/user-page';

const AccordionCard = ({
  iconReactIcons,
  title,
  children,
}: IAccordionCardProps) => {
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);

  const toggleAccordion = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsActive((prevState) => !prevState);
    }
  };

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <article className={Styles.accordionCard}>
      <div className={Styles.accordionCard__header} onClick={toggleAccordion}>
        {iconReactIcons}
        <Title className={Styles.accordionCard__header_title} size='sm'>
          {title}
        </Title>

        <span className={Styles.accordionCard__header_arrow} />
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            onAnimationComplete={onAnimationComplete}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default AccordionCard;
