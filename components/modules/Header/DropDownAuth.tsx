import Styles from '@/styles/modules/header/index.module.scss';
import React, { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { FaUserLarge } from 'react-icons/fa6';

import { SIZE_ICON } from '@/constants/common';
import { basePropsForMotionDropDown } from '@/constants/motion';

import { IWrappedComponentProps } from '@/types/hocs';
import { useAppDispatch } from '@/context/hooks';

import { withClickOutside } from '@/components/hocs/withClickOutside';

import Authorization from '@/components/modules/Authorization/Authorization';

import {
  closeDropDownLang,
  openDropDownAuth,
} from '@/context/features/modals/modals';

const DropDownAuth = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const dispatch = useAppDispatch();

    const handleShowPopup = () => {
      setOpen(true);
      dispatch(openDropDownAuth());
      dispatch(closeDropDownLang());
    };

    return (
      <div ref={ref}>
        <Link href='/auth' onMouseEnter={handleShowPopup}>
          <FaUserLarge size={SIZE_ICON} />
        </Link>
        {open && (
          <motion.div
            className={Styles.dropDownAuth}
            {...basePropsForMotionDropDown}
          >
            <span className={Styles.dropDownAuth__arrow} />
            <Authorization />
          </motion.div>
        )}
      </div>
    );
  }
);

DropDownAuth.displayName = 'DropDownAuth';

export default withClickOutside(DropDownAuth);
