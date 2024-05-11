'use client';

import React from 'react';

import { ICharacteristics } from '@/types/characteristic';
import { IUser } from '@/types/user';

import Characteristics from '@/components/modules/Dashboard/Characteristics/Characteristics';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CharacteristicsPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, characteristics },
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; characteristics: ICharacteristics[] };
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
