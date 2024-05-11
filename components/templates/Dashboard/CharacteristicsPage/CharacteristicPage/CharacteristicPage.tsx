'use client';

import Characteristic from '@/components/modules/Dashboard/Characteristics/Characteristic/Characteristic';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICharacteristics } from '@/types/characteristic';
import { IUser } from '@/types/user';
import React from 'react';

const CharacteristicPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, characteristic: data },
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; characteristic?: ICharacteristics };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />
      {data && <Characteristic msg={msg} status={status} data={data} />}
    </main>
  );
};

export default CharacteristicPage;
