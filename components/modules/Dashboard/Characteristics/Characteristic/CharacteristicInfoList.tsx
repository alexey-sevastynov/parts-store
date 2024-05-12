import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';
import { ICharacteristicInfoListProps } from '@/types/dashboard';

import Title from '@/components/elements/Title';
import CharacteristicTableEdit from '../CharacteristicTableEdit';

const CharacteristicInfoList = ({
  values,
  isLoading,
  onDeleteSelected,
  checkboxes,
  setCheckboxes,
  updateCharacteristic,
}: ICharacteristicInfoListProps) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.characteristicInfoList}>
      <span className={Styles.characteristicInfoList__line} />
      <Title size='sm' className={Styles.characteristicInfoList__title}>
        {translations[lang].dashboard_page.list_added_characteristics}
      </Title>

      <CharacteristicTableEdit
        values={values}
        isLoading={isLoading}
        onDeleteSelected={onDeleteSelected}
        checkboxes={checkboxes}
        setCheckboxes={setCheckboxes}
      />
    </div>
  );
};

export default CharacteristicInfoList;
