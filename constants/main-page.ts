import { TypeItemCart } from '@/types/main-page';
import { v4 } from 'uuid';

export const FAKE_ITEMS_BASKET_NOTIFICATON: TypeItemCart[] = [
  {
    id: v4(),
    href: '/',
    image: '/img/item-test-1.jpg',
    description: 'Олива моторна HDX 20W-50 1л',
  },
  {
    id: v4(),
    href: '/',
    image: '/img/item-test-2.jpg',
    description: 'Губка для миття автомобіля AUTO...',
  },
  {
    id: v4(),
    href: '/',
    image: '/img/item-test-3.webp',
    description: 'Фільтр паливний',
  },
];
