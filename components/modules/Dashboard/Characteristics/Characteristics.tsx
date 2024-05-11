'use client';

import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';
import Link from 'next/link';

import { useLang } from '@/hooks/useLang';

import { GrUpdate } from 'react-icons/gr';
import { BsPlusCircleFill } from 'react-icons/bs';

import { ICharacteristics } from '@/types/characteristic';
import { ICharacteristicsProps } from '@/types/dashboard';

import { getAllCharacteristics } from '@/actions/characteristicActions';

import { ROUTES } from '@/constants/common';

import Title from '@/components/elements/Title';
import CharacteristicsTable from './CharacteristicsTable';
import ServerErrorMsg from '../ServerErrorMsg';
import SearchAdmin from '../SearchAdmin';

const Characteristics = ({ data, status, msg }: ICharacteristicsProps) => {
  const { lang, translations } = useLang();

  const isLoaded = status === 200;
  const isLoading: boolean = !Object.assign(data);

  const [characteristics, setCharacteristics] =
    React.useState<ICharacteristics[]>(data);
  const [searchResults, setSearchResults] =
    React.useState<ICharacteristics[]>(data);

  const getCharacteristics = async () => {
    try {
      const res = await getAllCharacteristics();
      console.log(res);

      setCharacteristics(res.characteristics as ICharacteristics[]);
      setSearchResults(res.characteristics as ICharacteristics[]);
    } catch (error) {
      console.error('Failed to fetch characteristics:', error);
    }
  };

  const handleSearch = (query: string) => {
    if (!characteristics) return [];

    if (!query) {
      setSearchResults(characteristics); // If the query is empty, show all characteristics
    } else {
      const filteredCharacteristics = characteristics.filter(
        (characteristic) => {
          return characteristic.name[lang]
            .toLowerCase()
            .includes(query.toLowerCase());
        }
      );
      setSearchResults(filteredCharacteristics);
    }
  };

  return (
    <section className={Styles.characteristic}>
      <div className={Styles.characteristic__head}>
        <div className={Styles.characteristic__head_title}>
          <Title size='md'>
            {translations[lang].dashboard_page.characteristics}
          </Title>
          <button className={Styles.characteristic__head_title_btn_update}>
            <GrUpdate
              title={translations[lang].common.update}
              onClick={getCharacteristics}
            />
          </button>
          <Link
            href={ROUTES.CHARACTERISTICS_ADD}
            className={Styles.characteristic__head_title_btn_add}
          >
            <BsPlusCircleFill
              title={translations[lang].common.add}
              onClick={getCharacteristics}
            />
          </Link>
        </div>

        {/* if loaded and status = 200 */}
        {isLoaded && (
          <div className={Styles.characteristic__search}>
            <SearchAdmin onSearch={handleSearch} />
          </div>
        )}
      </div>

      {/* if loaded and status = 200 */}
      {!isLoaded ? (
        <ServerErrorMsg msg={msg} status={status} />
      ) : (
        <>
          <CharacteristicsTable
            characteristics={searchResults}
            isLoading={isLoading}
            getCharacteristics={getCharacteristics}
          />

          {/* <CharacteristicForm /> */}
        </>
      )}
    </section>
  );
};

export default Characteristics;
