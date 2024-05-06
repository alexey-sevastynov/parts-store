'use client';

import Characteristic from '@/components/modules/Dashboard/Characteristic/Characteristic';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import React from 'react';

const CharacteristicPage = () => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin />

      <Characteristic />
    </main>
  );
};

export default CharacteristicPage;
