import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/item-product/index.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavProduct = ({
  linkAllAboutProduct,
}: {
  linkAllAboutProduct: string;
}) => {
  const pathName = usePathname();
  const { lang, translations } = useLang();

  const linkCharacteristics = `${linkAllAboutProduct}/characteristics`;
  const linkReviews = `${linkAllAboutProduct}/reviews`;
  const linkAnalogs = `${linkAllAboutProduct}/analogs`;

  const isPageAllAboutProduct: boolean = pathName === linkAllAboutProduct;
  const isPageCharacteristics: boolean = pathName === linkCharacteristics;
  const isPageReviews: boolean = pathName === linkReviews;
  const isPageAnalogs: boolean = pathName === linkAnalogs;

  return (
    <nav className={Styles.navProduct}>
      <span className='divider' />
      <ul className={Styles.navProduct__list}>
        {/* all about product */}
        <li
          className={`${Styles.navProduct__list_item} ${isPageAllAboutProduct && Styles.active}`}
        >
          <Link
            className={`${Styles.navProduct__list_item_link}  ${isPageAllAboutProduct && Styles.active}`}
            href={linkAllAboutProduct}
          >
            {translations[lang].product_page.all_about_product}
          </Link>
        </li>

        {/* characteristics */}
        <li
          className={`${Styles.navProduct__list_item} ${isPageCharacteristics && Styles.active}`}
        >
          <Link
            className={`${Styles.navProduct__list_item_link} ${isPageCharacteristics && Styles.active}`}
            href={linkCharacteristics}
          >
            {translations[lang].product_page.characteristics}
          </Link>
        </li>

        {/* reviews */}
        <li
          className={`${Styles.navProduct__list_item} ${isPageReviews && Styles.active}`}
        >
          <Link
            className={`${Styles.navProduct__list_item_link} ${isPageReviews && Styles.active}`}
            href={linkReviews}
          >
            {translations[lang].product_page.reviews}
          </Link>
        </li>

        {/* analogs */}
        <li
          className={`${Styles.navProduct__list_item} ${isPageAnalogs && Styles.active}`}
        >
          <Link
            className={`${Styles.navProduct__list_item_link} ${isPageAnalogs && Styles.active}`}
            href={linkAnalogs}
          >
            {translations[lang].product_page.analogs}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavProduct;
