import Styles from '@/styles/modules/main-page/index.module.scss';

import Image from 'next/image';
import { SIZE_ICON } from '@/constants/common';

import { BsCartCheckFill } from 'react-icons/bs';
import { ICartNotificationBarProps } from '@/types/main-page';
import { FAKE_ITEMS_BASKET_NOTIFICATON } from '@/constants/main-page';
import { Button } from '@/components/elements/Button';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BREAKPOINTS } from '@/constants/breakpoints';

const CartNotificationBar = ({
  items = FAKE_ITEMS_BASKET_NOTIFICATON,
}: ICartNotificationBarProps) => {
  const isMedia768 = useMediaQuery(BREAKPOINTS.md);

  return (
    <div className={Styles.cartNotificationBar}>
      <div className={Styles.cartNotificationBar__icon}>
        <BsCartCheckFill size={SIZE_ICON} />
      </div>

      <div className={Styles.cartNotificationBar__total}>
        <p className='text-md'>
          У кошику <b>3</b> товари  на суму <b>255 ₴</b>
        </p>
      </div>

      <div className={Styles.cartNotificationBar__items}>
        {items.map((item) => (
          <article
            key={item.id}
            className={Styles.cartNotificationBar__items_item}
          >
            <Link href={'/'}>
              <Image
                src={item.image || '/img/no-image.png'}
                alt={item.image}
                width={44}
                height={44}
                style={{
                  objectFit: 'contain',
                }}
              />
            </Link>

            <p className={Styles.cartNotificationBar__items_item_description}>
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className={Styles.cartNotificationBar__btns}>
        <button
          className={`btn-md-transparent ${Styles.cartNotificationBar__btns_toCart}`}
        >
          Перейти до кошика
        </button>
        <Button className={Styles.cartNotificationBar__btns_toOrder}>
          {isMedia768 ? 'Оформити' : 'Оформити замовлення'}
        </Button>
      </div>
    </div>
  );
};

export default CartNotificationBar;
