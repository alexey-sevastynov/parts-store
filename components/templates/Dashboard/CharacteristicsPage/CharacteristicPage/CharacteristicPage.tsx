'use client';

import Characteristic from '@/components/modules/Dashboard/Characteristics/Characteristic/Characteristic';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICharacteristics } from '@/types/characteristic';
import { IUser } from '@/types/user';
import React from 'react';

const CharacteristicPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: characteristic },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data?: ICharacteristics };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />
      {characteristic && (
        <Characteristic msg={msg} status={status} data={characteristic} />
      )}
    </main>
  );
};

export default CharacteristicPage;
