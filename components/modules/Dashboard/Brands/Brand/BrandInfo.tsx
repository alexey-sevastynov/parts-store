import Styles from '@/styles/modules/dashboard/index.module.scss';
import React from 'react';
import { useLang } from '@/hooks/useLang';
import Title from '@/components/elements/Title';
import { Button } from '@/components/elements/Button';
import { Oval } from 'react-loader-spinner';
import { SIZE_ICON } from '@/constants/common';
import { COLORS } from '@/constants/colors';
import { IBrand } from '@/types/brand';
import { updateBrandById } from '@/actions/brandActions';

const BrandInfo = ({
  brand,
  getBrand,
}: {
  brand: IBrand | undefined;
  getBrand: (id: string) => void;
}) => {
  if (!brand) return <p>loading...</p>;
  const { lang, translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const [state, setState] = React.useState<IBrand>({
    name: '',
    website: '',
  });

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsActiveEdit(true);
  };

  const handleCancelEdit = () => {
    setIsActiveEdit(false);
    setIsValueChanged(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsValueChanged(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (brand._id) {
        await updateBrandById(brand._id, state);

        setIsSubmitting(false);
        setIsActiveEdit(false);
        setIsValueChanged(false);

        getBrand(brand._id);
      } else {
        console.log('One or more required values are missing');
      }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (brand) {
      setState({
        name: brand.name || '',
        website: brand.website || '',
      });
    }
  }, [brand]);

  return (
    <div className={Styles.customerInfo}>
      <span className={Styles.customerInfo__line} />
      <Title size='sm' className={Styles.customerInfo__title}>
        {translations[lang].dashboard_page.brand_info}
      </Title>

      <form className={Styles.customerInfo__form} onSubmit={handleSubmit}>
        <div className={Styles.customerInfo__content}>
          <ul className={Styles.customerInfo__content_list}>
            {/* ____________name */}
            <li className={Styles.customerInfo__content_list_item}>
              <label>{translations[lang].dashboard_page.name}</label>

              {isActiveEdit ? (
                <input
                  type='text'
                  name='name'
                  value={state.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{state.name}</p>
              )}
            </li>

            {/* ____________website */}
            <li className={Styles.customerInfo__content_list_item}>
              <label>{translations[lang].dashboard_page.link_website}</label>

              {isActiveEdit ? (
                <input
                  type='text'
                  name='website'
                  value={state.website}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{state.website || '-'}</p>
              )}
            </li>
          </ul>
        </div>

        {isActiveEdit ? (
          // _______ if edit buttons
          <div className={Styles.customerInfo__btns}>
            <Button
              className={Styles.customerInfo__btn}
              disabled={!isValueChanged || isSubmitting}
              type='submit'
            >
              {isSubmitting ? (
                <Oval
                  visible={true}
                  height={SIZE_ICON}
                  width={SIZE_ICON}
                  color={COLORS.whiteFont}
                  secondaryColor={COLORS.whiteFont}
                  ariaLabel='oval-loading'
                />
              ) : (
                translations[lang].common.save
              )}
            </Button>
            <Button
              className={Styles.customerInfo__btn}
              onClick={handleCancelEdit}
              type='button'
            >
              {translations[lang].common.cancel}
            </Button>
          </div>
        ) : (
          // _______ if NOT edit button
          <div className={Styles.customerInfo__btns}>
            <Button
              className={Styles.customerInfo__btn}
              onClick={handleEdit}
              type='button'
            >
              {translations[lang].common.edit}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BrandInfo;
