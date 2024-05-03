import {
  deleteSelectedUsers,
  deleteUser,
  findUserById,
} from '@/actions/authActions';

export const deleteUsers = async (
  checkboxes: { [key: string]: boolean },
  currentUserID: string | undefined
) => {
  if (currentUserID) await deleteSelectedUsers(checkboxes, currentUserID);
};

export const deleteUserAccount = async (
  id: string | undefined,
  currentUserID: string | undefined
) => {
  if (id && id !== currentUserID) {
    await deleteUser({ id });
  }
};
