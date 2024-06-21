import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';
import Image from 'next/image';

import { useLang } from '@/hooks/useLang';
import { IGoodsTableProps } from '@/types/dashboard';

import Title from '@/components/elements/Title';
import { handleCheckboxChange } from '@/utils/dashboards';
import { BiSort } from 'react-icons/bi';

import { COLORS } from '@/constants/colors';
import { ROUTES, SIZE_ICON_BIG } from '@/constants/common';
import Link from 'next/link';
import NotFoundMsg from '../NotFoundMsg';
import { IProduct } from '@/types/goods';
import { deleteSelectedProducts } from '@/actions/goodsActions';
import DateTranslation from '@/components/elements/DateTranslation';

const ListAddedGoods = ({
  goods,
  isLoading,
  updateList,
  isEmptyProducts,
  isEmptySearchResulProducts,
}: IGoodsTableProps) => {
  const { lang, translations } = useLang();

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [sortState, setSortState] = React.useState<{
    byName: boolean;
    byCategory: boolean;
    byPrice: boolean;
    byPriceSale: boolean;
    byRating: boolean;
    byCreated: boolean;
  }>({
    byName: false,
    byCategory: false,
    byPrice: false,
    byPriceSale: false,
    byRating: false,
    byCreated: true,
  });

  const handleSortButtonClick = (
    sortType: 'name' | 'category' | 'price' | 'priceSale' | 'rating' | 'created'
  ) => {
    setSortState({
      byName: sortType === 'name' ? true : false,
      byCategory: sortType === 'category' ? true : false,
      byPrice: sortType === 'price' ? true : false,
      byPriceSale: sortType === 'priceSale' ? true : false,
      byRating: sortType === 'rating' ? true : false,
      byCreated: sortType === 'created' ? true : false,
    });
  };

  const sortedUsers = (products: IProduct[] | undefined) => {
    if (!products) {
      return [];
    } else {
      const sortedProducts = [...goods];

      const sortByName = (a: IProduct, b: IProduct) => {
        return a.name[lang].localeCompare(b.name[lang]);
      };

      const sortByCategory = (a: IProduct, b: IProduct) => {
        return a.category.name[lang].localeCompare(b.category.name[lang]);
      };

      const sortByPrice = (a: IProduct, b: IProduct) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceA - priceB;
      };

      const sortBySalePrice = (a: IProduct, b: IProduct) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        return priceA - priceB;
      };

      const sortByRating = (a: IProduct, b: IProduct) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingA - ratingB;
      };

      const sortByCreated = (a: IProduct, b: IProduct) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      };

      if (sortState.byName) {
        sortedProducts.sort(sortByName);
      }

      if (sortState.byCategory) {
        sortedProducts.sort(sortByCategory);
      }

      if (sortState.byPrice) {
        sortedProducts.sort(sortByPrice);
      }

      if (sortState.byPriceSale) {
        sortedProducts.sort(sortBySalePrice);
      }

      if (sortState.byRating) {
        sortedProducts.sort(sortByRating);
      }

      if (sortState.byCreated) {
        sortedProducts.sort(sortByCreated);
      }

      return sortedProducts;
    }
  };

  const sortedProductsList = sortedUsers(goods);

  const isCheckedAll = checkboxes['all'];

  const isAnyCheckboxChecked = Object.values(checkboxes).some(
    (value) => value === true
  );

  const handleBackButtonClick = () => {
    // Set the state of all checkboxes to false
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = false;
    });
    setCheckboxes({});
  };

  const deleteSelected = async () => {
    try {
      const selectedProducts = goods.filter(
        (item) => item._id && checkboxes[item._id] && item._id !== 'all'
      );

      const selectedIds = selectedProducts.map((item) => item._id as string);

      const selectedUrl = selectedProducts.flatMap(
        (item) => item.photos?.split(', ') || []
      );

      const res = await deleteSelectedProducts(selectedIds);
      if (res.status === 200) {
        setCheckboxes({});

        updateList();
      }

      const fetchRes = await fetch('/api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: selectedUrl }),
      });

      const fetchResult = await fetchRes.json();

      if (!fetchRes.ok) {
        console.error('Failed to delete categories:', fetchResult);
      }
    } catch (error) {
      console.error('Failed to delete selected brands:', error);
    }
  };

  return (
    <div className={Styles.listAddedProducts}>
      <Title size='sm' className={Styles.listAddedProducts__title}>
        {translations[lang].dashboard_page.list_added_products}
      </Title>

      <table className={Styles.productsTable}>
        <thead>
          <tr className={Styles.productsTable__head}>
            {/* checkbox ALL */}
            <th className={Styles.productsTable__head_checkbox}>
              <input
                type='checkbox'
                name='all'
                checked={checkboxes['all'] || false}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(
                    goods,
                    event,
                    checkboxes,
                    setCheckboxes,
                    isAnyCheckboxChecked
                  )
                }
                disabled={!goods}
              />
            </th>
            {/* image */}
            <th className={Styles.productsTable__head_image_product}>
              {translations[lang].dashboard_page.image_goods}
            </th>
            {/* code */}
            <th className={Styles.productsTable__head_code_product}>
              {translations[lang].dashboard_page.code}
            </th>
            {/* name */}
            <th className={Styles.productsTable__head_name_product}>
              <button
                className={sortState.byName ? Styles.btn_active : Styles.btn}
                title={translations[lang].dashboard_page.sort_by_alphabet}
                onClick={() => handleSortButtonClick('name')}
              >
                <p>{translations[lang].dashboard_page.name}</p>
                <BiSort />
              </button>
            </th>
            {/* brand */}
            <th className={Styles.productsTable__head_brand_product}>
              <p>{translations[lang].dashboard_page.brand}</p>
            </th>
            {/* category */}
            <th className={Styles.productsTable__head_category_product}>
              <button
                className={
                  sortState.byCategory ? Styles.btn_active : Styles.btn
                }
                title={translations[lang].dashboard_page.sort_by_alphabet}
                onClick={() => handleSortButtonClick('category')}
              >
                <p>{translations[lang].dashboard_page.category}</p>
                <BiSort />
              </button>
            </th>

            {/* rating */}
            <th className={Styles.productsTable__head_rating_product}>
              <button
                className={sortState.byRating ? Styles.btn_active : Styles.btn}
                onClick={() => handleSortButtonClick('rating')}
              >
                <p>{translations[lang].dashboard_page.rating}</p>

                <BiSort />
              </button>
            </th>
            {/* quantity available */}
            <th className={Styles.productsTable__head_quantity_product}>
              <p>{translations[lang].dashboard_page.number_available}</p>
            </th>

            {/* price */}
            <th className={Styles.productsTable__head_price_product}>
              <button
                className={sortState.byPrice ? Styles.btn_active : Styles.btn}
                onClick={() => handleSortButtonClick('price')}
              >
                <p>{translations[lang].dashboard_page.price_product}</p>
                <BiSort />
              </button>
            </th>

            {/* price sale */}
            <th className={Styles.productsTable__head_price_sale_product}>
              <button
                className={
                  sortState.byPriceSale ? Styles.btn_active : Styles.btn
                }
                onClick={() => handleSortButtonClick('priceSale')}
              >
                <p>{translations[lang].dashboard_page.sale_product}</p>
                <BiSort />
              </button>
            </th>

            {/* country */}

            {/* !!! or country factory, or created date !!! */}

            {/* <th className={Styles.productsTable__head_country_product}>
              <p>{translations[lang].dashboard_page.country_factory}</p>
            </th> */}

            {/* created */}
            <th className={Styles.productsTable__head_created_product}>
              <button
                className={sortState.byCreated ? Styles.btn_active : Styles.btn}
                onClick={() => handleSortButtonClick('created')}
              >
                <p>{translations[lang].dashboard_page.created}</p>
                <BiSort />
              </button>
            </th>
          </tr>

          {/* PANEL DELETE, WHEN SELECT */}
          {isAnyCheckboxChecked && (
            <tr className={Styles.productsTable__head_delete}>
              <th>
                <button
                  className={Styles.productsTable__head_delete_btn_red}
                  onClick={deleteSelected}
                >
                  {translations[lang].dashboard_page.delete_selected_brands}
                </button>
              </th>

              <th>
                <button
                  className={Styles.productsTable__head_delete_btn}
                  onClick={handleBackButtonClick}
                >
                  {translations[lang].common.cancel}
                </button>
              </th>
            </tr>
          )}

          {/* LINE */}
          <tr className={Styles.productsTable__head_line}>
            <td />
          </tr>
        </thead>

        <tbody>
          {/* if the search didn't turn up anything, */}
          {!isLoading && (!goods || isEmptySearchResulProducts) && (
            <tr>
              <td>
                <NotFoundMsg
                  message={translations[lang].dashboard_page.not_found_brands}
                />
              </td>
            </tr>
          )}

          {/* if nothing data */}
          {!isLoading &&
            goods &&
            isEmptySearchResulProducts &&
            !isEmptyProducts && (
              <tr>
                <td>
                  <p>No data</p>
                </td>
              </tr>
            )}

          {/* if the data has not yet been downloaded */}
          {isLoading
            ? [...Array(10)].map((_, id) => <p key={id}>...loading</p>)
            : sortedProductsList?.map((item: IProduct) => {
                return (
                  <tr
                    key={item._id}
                    className={Styles.productsTable__body}
                    style={
                      checkboxes[item._id as string]
                        ? { backgroundColor: COLORS.grey }
                        : {}
                    }
                  >
                    <td
                      className={`${Styles.productsTable__body_checkbox} ${
                        checkboxes[item._id as string] && Styles.select
                      }`}
                    >
                      <input
                        type='checkbox'
                        name={item._id}
                        checked={checkboxes[item._id as string] || false}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCheckboxChange(
                            goods,
                            event,
                            checkboxes,
                            setCheckboxes,
                            isAnyCheckboxChecked
                          )
                        }
                      />
                    </td>
                    {/* image */}
                    <td className={Styles.productsTable__body_image_product}>
                      {item?.photos
                        ?.split(',')
                        .map((photo) => (
                          <Image
                            key={photo}
                            src={photo}
                            alt={item.name[lang]}
                            height={SIZE_ICON_BIG}
                            width={SIZE_ICON_BIG}
                          />
                        ))}
                    </td>
                    {/* code */}
                    <td className={Styles.productsTable__body_code_product}>
                      <p>{item.sku || '-'}</p>
                    </td>
                    {/* ______name */}
                    <td className={Styles.productsTable__body_name_product}>
                      <Link href={ROUTES.VIEW_GOODS_BY_ID(item._id as string)}>
                        <p>{item?.name[lang]}</p>
                      </Link>
                    </td>
                    {/* ______brand */}
                    <td className={Styles.productsTable__body_brand_product}>
                      <p>{item?.brand?.name || '-'}</p>
                    </td>
                    {/* ______category */}
                    <td className={Styles.productsTable__body_category_product}>
                      <p>{item.category.name[lang] || '-'}</p>
                    </td>

                    {/* rating */}
                    <td className={Styles.productsTable__body_rating_product}>
                      <p>{item.rating || 0}</p>
                    </td>

                    {/* quantity available */}
                    <td className={Styles.productsTable__body_quantity_product}>
                      <p>{item.quantityAvailable}</p>
                    </td>

                    {/* price */}
                    <td className={Styles.productsTable__body_price_product}>
                      <p>{item.price}</p>
                    </td>

                    {/* price sale */}
                    <td
                      className={Styles.productsTable__body_price_sale_product}
                    >
                      <p>{item.salePrice || item.price}</p>
                    </td>

                    {/* country */}

                    {/* !!! or country factory, or created date !!! */}

                    {/* <td className={Styles.productsTable__body_country_product}>
                      <p>{(item.country && item?.country[lang]) || '-'}</p>
                    </td> */}

                    {/* created date */}
                    <td className={Styles.productsTable__body_created_product}>
                      <DateTranslation date={item.createdAt} />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default ListAddedGoods;
