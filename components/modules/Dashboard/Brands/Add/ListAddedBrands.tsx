import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent } from 'react';

import { useLang } from '@/hooks/useLang';
import { IBrandsTableProps } from '@/types/dashboard';

import Title from '@/components/elements/Title';
import { handleCheckboxChange } from '@/utils/dashboards';
import { BiSort } from 'react-icons/bi';
import NotFoundMsg from '../../NotFoundMsg';
import { IBrand } from '@/types/brand';
import { COLORS } from '@/constants/colors';
import { ROUTES } from '@/constants/common';
import Link from 'next/link';
import { deleteSelectedBrands } from '@/actions/brandActions';

const ListAddedBrands = ({
  brands,
  isLoading,
  updateList,
}: IBrandsTableProps) => {
  const { lang, translations } = useLang();

  const [checkboxes, setCheckboxes] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [isSortByName, setIsSortByName] = React.useState<boolean>(false);

  const renderedBrands = isSortByName
    ? brands.slice().sort((a, b) => a.name.localeCompare(b.name))
    : brands.slice().reverse();

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
      const selectedBrandIds = Object.keys(checkboxes).filter(
        (key) => checkboxes[key] && key !== 'all'
      );
      const res = await deleteSelectedBrands(selectedBrandIds);

      if (res.status === 200) {
        setCheckboxes({});

        // Обновление списка брендов после удаления
        updateList();
      }
    } catch (error) {
      console.error('Failed to delete selected brands:', error);
    }
  };

  return (
    <div className={Styles.listAddedBrands}>
      <Title size='sm' className={Styles.listAddedBrands__title}>
        {translations[lang].dashboard_page.list_added_brands}
      </Title>

      <table className={Styles.brandsTable}>
        <thead>
          <tr className={Styles.brandsTable__head}>
            {/* checkbox ALL */}
            <th className={Styles.brandsTable__head_checkbox}>
              <input
                type='checkbox'
                name='all'
                checked={checkboxes['all'] || false}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(
                    brands,
                    event,
                    checkboxes,
                    setCheckboxes,
                    isAnyCheckboxChecked
                  )
                }
                disabled={!brands}
              />
            </th>

            {/* name */}
            <th className={Styles.brandsTable__head_name_brand}>
              <button
                className={isSortByName ? Styles.btn_active : Styles.btn}
                title={translations[lang].dashboard_page.sort_by_alphabet}
                onClick={() => setIsSortByName((prevState) => !prevState)}
              >
                <p>{translations[lang].dashboard_page.name}</p>
                <BiSort />
              </button>
            </th>

            {/* website link */}
            <th className={Styles.brandsTable__head_website_brand}>
              {translations[lang].dashboard_page.link_website}
            </th>
          </tr>

          {/* PANEL DELETE, WHEN SELECT */}
          {isAnyCheckboxChecked && (
            <tr className={Styles.brandsTable__head_delete}>
              <th>
                <button
                  className={Styles.brandsTable__head_delete_btn_red}
                  onClick={deleteSelected}
                >
                  {translations[lang].dashboard_page.delete_selected_brands}
                </button>
              </th>

              <th>
                <button
                  className={Styles.brandsTable__head_delete_btn}
                  onClick={handleBackButtonClick}
                >
                  {translations[lang].common.cancel}
                </button>
              </th>
            </tr>
          )}

          {/* LINE */}
          <tr className={Styles.brandsTable__head_line}>
            <td />
          </tr>
        </thead>

        <tbody>
          {/* if the search didn't turn up anything, */}
          {!isLoading && (!brands || brands.length === 0) && (
            <NotFoundMsg
              message={translations[lang].dashboard_page.not_found_brands}
            />
          )}

          {/* if the data has not yet been downloaded */}
          {isLoading
            ? [...Array(10)].map((_, id) => <p key={id}>...loading</p>)
            : renderedBrands?.map((brand: IBrand) => {
                return (
                  <tr
                    key={brand._id}
                    className={Styles.brandsTable__body}
                    style={
                      checkboxes[brand._id as string]
                        ? { backgroundColor: COLORS.grey }
                        : {}
                    }
                  >
                    <td
                      className={`${Styles.brandsTable__body_checkbox} ${
                        checkboxes[brand._id as string] && Styles.select
                      }`}
                    >
                      <input
                        type='checkbox'
                        name={brand._id}
                        checked={checkboxes[brand._id as string] || false}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCheckboxChange(
                            brands,
                            event,
                            checkboxes,
                            setCheckboxes,
                            isAnyCheckboxChecked
                          )
                        }
                      />
                    </td>

                    {/* ______name */}
                    <td className={Styles.brandsTable__body_name_brand}>
                      <Link
                        href={ROUTES.VIEW_BRANDS_BY_ID(brand._id as string)}
                      >
                        {brand.name}
                      </Link>
                    </td>

                    {/* ______website link */}
                    <td className={Styles.brandsTable__body_website_brand}>
                      {brand.website || '-'}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default ListAddedBrands;
