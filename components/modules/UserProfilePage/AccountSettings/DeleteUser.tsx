import React from 'react';
import { Button } from '@/components/elements/Button';
import UserCard from '@/components/elements/UserCard';
import Styles from '@/styles/modules/user-profile-page/index.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { deleteUser } from '@/actions/authActions';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closePopupWindowDeleteUser } from '@/context/features/modals/modals';
import { useLang } from '@/hooks/useLang';

const DeleteUser = () => {
  const dispatch = useDispatch();

  const { data } = useSession();

  const router = useRouter();
  const { lang, translations } = useLang();

  const [isConfirm, setIsConfirm] = React.useState<boolean>(false);

  const email = data?.user?.email || 'Unknown email';
  const firstName = data?.user?.firstName || 'Unknown';
  const lastName = data?.user?.lastName || 'user';
  const photo = data?.user.photo;

  const idUser = data?.user._id;

  const deleteUserAccount = async (id: string | undefined) => {
    if (id && isConfirm) {
      const res = await deleteUser({ id }).finally(() => {
        signOut({ redirect: false });
        router.push('/');
        dispatch(closePopupWindowDeleteUser());
      });
    }
  };

  return (
    <div className={Styles.deleteUser}>
      <UserCard
        firstName={firstName}
        lastName={lastName}
        email={email}
        photo={photo}
        isOnlyPhoto
      />

      <div className={Styles.deleteUser__agree}>
        <button
          className={`${Styles.deleteUser__agree_btn} ${isConfirm ? Styles.active : ''}`}
          onClick={() => setIsConfirm(!isConfirm)}
        />
        <p className={Styles.deleteUser__agree_text}>
          {translations[lang].user_page.message_delete_account}
        </p>
      </div>

      <div className={Styles.deleteUser__btns}>
        <button
          className='btn-md-transparent'
          type='button'
          onClick={() => dispatch(closePopupWindowDeleteUser())}
        >
          {translations[lang].common.cancel}
        </button>
        <Button
          className={Styles.deleteUser__btns_btn}
          type='button'
          disabled={!isConfirm}
          onClick={() => deleteUserAccount(idUser)}
        >
          {translations[lang].common.delete}
        </Button>
      </div>
    </div>
  );
};

export default DeleteUser;
