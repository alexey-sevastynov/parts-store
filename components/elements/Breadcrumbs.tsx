import Styles from '@/styles/elements/index.module.scss';
import { BreadcrumbsProps } from '@/types/elements';

import Link from 'next/link';

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className={Styles.breadcrumbs}>
      <ul className={Styles.breadcrumbs__container}>
        {items.map((page) => {
          return (
            <li key={page.id} className={Styles.breadcrumbs__item}>
              <Link
                className={Styles.breadcrumbs__link}
                href={page.link || '#'}
              >
                {page.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
