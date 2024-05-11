import Styles from '@/styles/modules/dashboard/index.module.scss';

import { ChangeEvent } from 'react';

import { useLang } from '@/hooks/useLang';

import { CharacteristicFormState } from '@/types/dashboard';

import InfoIconWithHint from '@/components/elements/InfoIconWithHint';
import Title from '@/components/elements/Title';

const AddCharacteristicName = ({
  state,
  handleChange,
}: {
  state: CharacteristicFormState;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.addCharacteristicName}>
      <Title size='sm' className={Styles.addCharacteristicName__title}>
        {translations[lang].dashboard_page.name_characteristic}
      </Title>

      <ul className={Styles.addCharacteristicName__list}>
        {/* name in ukraine */}
        <li className={Styles.addCharacteristicName__list_item}>
          <label>{translations[lang].dashboard_page.name_ua}:</label>
          <input
            type='text'
            name='nameUa'
            value={state.nameUa}
            onChange={handleChange}
          />
        </li>

        {/* name in Russian */}
        <li className={Styles.addCharacteristicName__list_item}>
          <label>{translations[lang].dashboard_page.name_ru}:</label>
          <input
            type='text'
            name='nameRu'
            value={state.nameRu}
            onChange={handleChange}
          />
        </li>

        {/* name in English */}
        <li className={Styles.addCharacteristicName__list_item}>
          <label>{translations[lang].dashboard_page.name_en}:</label>
          <input
            type='text'
            name='nameEn'
            value={state.nameEn}
            onChange={handleChange}
          />
        </li>
      </ul>

      <div className={Styles.addCharacteristicName__info}>
        <InfoIconWithHint
          text={translations[lang].dashboard_page.help_text_name_characteristic}
        />
      </div>
    </div>
  );
};

export default AddCharacteristicName;
