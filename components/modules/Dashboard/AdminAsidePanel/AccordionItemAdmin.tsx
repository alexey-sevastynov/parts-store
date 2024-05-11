import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { IAccordionItemAdminProps } from '@/types/dashboard';
import { ROUTES } from '@/constants/common';

import ItemNavAdmin from './ItemNavAdmin';

const AccordionItemAdmin = ({
  icon,
  title,
  isActive = false,
  children,
  href,
}: IAccordionItemAdminProps) => {
  const pathname = usePathname();

  const [isActiveDropDown, setIsActiveDropDown] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setIsActiveDropDown(pathname.startsWith(ROUTES.CHARACTERISTICS));
  }, [pathname, href]);

  return (
    <div className={Styles.accordionItemAdmin}>
      <Link href={href}>
        <ItemNavAdmin icon={icon} title={title} isActive={isActive} isSubMenu />
      </Link>

      <AnimatePresence initial={false}>
        {isActiveDropDown && (
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
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItemAdmin;
