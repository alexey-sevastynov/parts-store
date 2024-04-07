import { IUser, IUserParams } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUserAccount = createAsyncThunk<IUser, IUserParams>(
  'authorization/createUserAccount',
  async (params) => {
    const { data } = await axios.post('/api/user/sign-up', params);

    return data;
  }
);
