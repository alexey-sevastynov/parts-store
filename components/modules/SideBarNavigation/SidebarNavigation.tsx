'use client';
import Styles from '@/styles/modules/sidebar-navigation/index.module.scss';

import StylesElement from '@/styles/elements/index.module.scss';
import { useSession } from 'next-auth/react';
import { useLang } from '@/hooks/useLang';

import { GoListUnordered } from 'react-icons/go';
import { IoCartOutline } from 'react-icons/io5';
import { BsViewList } from 'react-icons/bs';
import { VscFeedback } from 'react-icons/vsc';
import { CiHeart, CiWallet } from 'react-icons/ci';

import { SIZE_ICON } from '@/constants/common';

import UserCard from '@/components/elements/UserCard';
import IconWithTitleCounter from '../../elements/IconWithTitleCounter';

const SidebarNavigation = () => {
  const { data, status } = useSession();
  const { lang, translations } = useLang();

  const email = data?.user?.email || 'Unknown email';
  const firstName = data?.user?.firstName || 'Unknown';
  const lastName = data?.user?.lastName || 'user';
  const photo = data?.user.photo;

  return (
    <nav className={Styles.sidebarNavigation}>
      <ul className={Styles.sidebarNavigation__list}>
        <li className={Styles.sidebarNavigation__list_item}>
          {status === 'authenticated' && (
            <UserCard
              firstName={firstName}
              lastName={lastName}
              email={email}
              isActive={true}
              photo={photo}
            />
          )}
        </li>

        {/* _____________________Orders */}
        <li className={Styles.sidebarNavigation__list_item}>
          <IconWithTitleCounter
            image={
              <GoListUnordered
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].user_page.orders}
            counter={1}
          />
        </li>

        {/* _____________________Cart */}
        <li className={Styles.sidebarNavigation__list_item}>
          <IconWithTitleCounter
            image={
              <IoCartOutline
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].user_page.cart}
            counter={null}
          />
        </li>

        {/* _____________________Favorite */}
        <li className={Styles.sidebarNavigation__list_item}>
          <IconWithTitleCounter
            image={
              <CiHeart
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].user_page.wish_list}
            counter={null}
          />
        </li>

        {/* _____________________viewed products */}
        <li className={Styles.sidebarNavigation__list_item}>
          <IconWithTitleCounter
            image={
              <BsViewList
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].user_page.viewed_products}
          />
        </li>

        {/* _____________________feedback */}
        <li className={Styles.sidebarNavigation__list_item}>
          <IconWithTitleCounter
            image={
              <VscFeedback
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].user_page.feedback}
          />
        </li>

        {/* _____________________wallet */}
        <li className={Styles.sidebarNavigation__list_item}>
          <IconWithTitleCounter
            image={
              <CiWallet
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].user_page.wallet}
          />
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
