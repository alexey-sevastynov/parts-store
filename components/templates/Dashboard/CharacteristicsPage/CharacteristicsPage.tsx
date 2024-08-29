'use client';

import React from 'react';

import { ICharacteristics } from '@/types/characteristic';
import { IUser } from '@/types/user';

import Characteristics from '@/components/modules/Dashboard/Characteristics/Characteristics';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CharacteristicsPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: characteristics },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: ICharacteristics[] };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      <Characteristics data={characteristics} status={status} msg={msg} />
    </main>
  );
};

export default CharacteristicsPage;
