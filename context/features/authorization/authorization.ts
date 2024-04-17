// 'use client';

// import { createUserAccount } from '@/api/authorization';
// import { StatusType } from '@/types/authorization';
// import { IUser, IUserParams } from '@/types/user';
// import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// export interface AuthorizationState {
//   signIn: {
//     status: StatusType;
//     message: string | null;
//   };
//   signUp: {
//     user: IUserParams;
//     status: StatusType;
//     message: string | null;
//   };
// }

// const initialState: AuthorizationState = {
//   signIn: {
//     status: null,
//     message: null,
//   },
//   signUp: {
//     user: {
//       email: '',
//       password: '',
//       firstName: '',
//       lastName: '',
//       phone: '',
//     },
//     status: null,
//     message: null,
//   },
// };

// export const authorizationSlice = createSlice({
//   name: 'authorization',
//   initialState,
//   reducers: {
//     setFormDataSignUp: (state, action: PayloadAction<IUserParams>) => {
//       state.signUp.user = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createUserAccount.pending, (state) => {
//       state.signUp.status = 'loading';
//       state.signUp.message = null;
//     });
//     builder.addCase(createUserAccount.fulfilled, (state) => {
//       state.signUp.status = 'success';
//       state.signUp.message = 'Status code 201';
//     });
//     builder.addCase(createUserAccount.rejected, (state, action) => {
//       state.signUp.status = 'error';
//       state.signUp.message = action.error.message || 'error';
//     });
//   },
// });

// export const { setFormDataSignUp } = authorizationSlice.actions;

// export const authorizationReducer = authorizationSlice.reducer;
