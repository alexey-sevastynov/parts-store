import Styles from '@/styles/modules/dashboard/index.module.scss';

import { ChangeEvent } from 'react';

import { useLang } from '@/hooks/useLang';
import { CharacteristicFormState } from '@/types/dashboard';

import { Button } from '@/components/elements/Button';
import Title from '@/components/elements/Title';

const AddCategoryValue = ({
  state,
  handleChange,
  addValue,
}: {
  state:
    | CharacteristicFormState
    | { valueUa: string; valueRu: string; valueEn: string };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addValue: () => void;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.addCharacteristicValue}>
      <Title size='sm' className={Styles.addCharacteristicName__title}>
        {translations[lang].dashboard_page.value_characteristic}
      </Title>

      <ul className={Styles.addCharacteristicName__list}>
        <li className={Styles.addCategoryForm__list_item}>
          <label>{'URL image'}:</label>
          <input
            type='text'
            name='url'
            value={state.valueUa}
            onChange={handleChange}
          />
        </li>

        {/* value in ukraine */}
        <li className={Styles.addCharacteristicName__list_item}>
          <label>{translations[lang].dashboard_page.value_ua}:</label>
          <input
            type='text'
            value={state.valueUa}
            onChange={handleChange}
            name='valueUa'
          />
        </li>

        {/* value in russian  */}
        <li className={Styles.addCharacteristicName__list_item}>
          <label>{translations[lang].dashboard_page.value_ru}:</label>
          <input
            type='text'
            value={state.valueRu}
            onChange={handleChange}
            name='valueRu'
          />
        </li>

        {/* value in english */}
        <li className={Styles.addCharacteristicName__list_item}>
          <label>{translations[lang].dashboard_page.value_en}:</label>
          <input
            type='text'
            value={state.valueEn}
            onChange={handleChange}
            name='valueEn'
          />
        </li>
      </ul>

      <Button
        className={Styles.addCharacteristicValue__btn}
        type='button'
        onClick={addValue}
        disabled={!state.valueUa || !state.valueRu || !state.valueEn}
      >
        {translations[lang].common.add}
      </Button>
    </div>
  );
};

export default AddCategoryValue;
