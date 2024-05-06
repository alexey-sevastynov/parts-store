'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';
import React from 'react';

import { GrUpdate } from 'react-icons/gr';

import SearchAdmin from '../SearchAdmin';
import Title from '@/components/elements/Title';

import CharacteristicTable from './CharacteristicTable';
import { ICharacteristics } from '@/types/characteristic';
import { getAllCharacteristics } from '@/actions/characteristicActions';
import CharacteristicForm from './CharacteristicForm';

const Characteristic = () => {
  const { lang, translations } = useLang();

  const [characteristics, setCharacteristics] =
    React.useState<ICharacteristics[]>();
  const [searchResults, setSearchResults] =
    React.useState<ICharacteristics[]>();

  const getCharacteristics = async () => {
    try {
      const res = await getAllCharacteristics();
      console.log(res);

      setCharacteristics(res.characteristics);
      setSearchResults(res.characteristics);
    } catch (error) {
      console.error('Failed to fetch characteristics:', error);
    }
  };

  // React.useEffect(() => {
  //   getCharacteristics();
  // }, []);

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <section className={Styles.characteristic}>
      <div className={Styles.characteristic__head}>
        <div className={Styles.characteristic__head_title}>
          <Title size='md'>
            {translations[lang].dashboard_page.characteristic}
          </Title>
          <button>
            <GrUpdate
              title={translations[lang].common.update}
              onClick={getCharacteristics}
            />
          </button>
        </div>

        <div className={Styles.characteristic__search}>
          <SearchAdmin onSearch={handleSearch} />
        </div>
      </div>

      <CharacteristicTable characteristics={characteristics} />

      {/* <CharacteristicForm /> */}
    </section>
  );
};

export default Characteristic;
