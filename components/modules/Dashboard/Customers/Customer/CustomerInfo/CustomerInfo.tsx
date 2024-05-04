import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { Button } from '@/components/elements/Button';
import { Oval } from 'react-loader-spinner';
import { SIZE_ICON } from '@/constants/common';
import { COLORS } from '@/constants/colors';
import { IUser } from '@/types/user';
import DateTranslation from '../../DateTranslation';
import PhotoUser from '../../PhotoUser';
import { extractLastFiveCharacters } from '@/utils/common';
import { Role } from '@/constants/user';
import { changeUserBlockStatus, changeUserRole } from '@/actions/authActions';
import { getRoleFromString } from '@/utils/user';
import CustomerInfoLoading from './CustomerInfoLoading';

const CustomerInfo = ({
  user,
  getUser,
}: {
  user: IUser | undefined;
  getUser: (id: string) => void;
}) => {
  if (!user) return <CustomerInfoLoading />;
  const { lang, translations } = useLang();

  const [isActiveEdit, setIsActiveEdit] = React.useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const [selectedRole, setSelectedRole] = React.useState<Role>(
    (user?.role || Role.user) as Role
  );
  const [selectedBlocked, setSelectedBlocked] = React.useState<boolean>(
    user?.isBlocked || false
  );

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsActiveEdit(true);
  };

  const handleCancelEdit = () => {
    setIsActiveEdit(false);
    setIsValueChanged(false);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(getRoleFromString(event.target.value));
    setIsValueChanged(true);
  };

  const handleBlockedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlocked(event.target.value === 'true');
    setIsValueChanged(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      // Change user role
      await changeUserRole({ id: user?._id, role: selectedRole });

      // Change user block status
      await changeUserBlockStatus({
        id: user?._id,
        isBlocked: selectedBlocked,
      });

      // Reset state and exit edit mode
      setIsSubmitting(false);
      setIsActiveEdit(false);
      setIsValueChanged(false);

      getUser(user?._id);
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={Styles.customerInfo}>
      <span className={Styles.customerInfo__line} />
      <Title size='sm' className={Styles.customerInfo__title}>
        {translations[lang].dashboard_page.user_info}
      </Title>

      <form className={Styles.customerInfo__form} onSubmit={handleSubmit}>
        <div className={Styles.customerInfo__content}>
          <ul className={Styles.customerInfo__content_list}>
            {/* ____________first name */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.first_name}</p>
              <p>{user?.firstName}</p>
            </li>

            {/* ____________last name */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.last_name}</p>
              <p>{user?.lastName}</p>
            </li>

            {/* ____________email */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>Email</p>
              <p>{user?.email}</p>
            </li>

            {/* ____________mobile */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.phone}</p>
              <p>
                {user?.phone || translations[lang].dashboard_page.not_phone}
              </p>
            </li>

            {/* ____________createdAt */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.created}</p>
              <DateTranslation date={user?.createdAt} />
            </li>

            {/* ____________updatedAt */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.updated}</p>
              <DateTranslation date={user?.updatedAt} />
            </li>

            {/* ____________role */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.role}</p>

              {isActiveEdit ? (
                <select value={selectedRole} onChange={handleRoleChange}>
                  <option value={Role.user}>{Role.user}</option>
                  <option value={Role.admin}>{Role.admin}</option>
                </select>
              ) : (
                <p>{user?.role}</p>
              )}
            </li>

            {/* ____________blocked */}
            <li className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.blocked}</p>

              {isActiveEdit ? (
                <select
                  value={selectedBlocked.toString()}
                  onChange={handleBlockedChange}
                >
                  <option value='false'>{translations[lang].common.no}</option>
                  <option value='true'>{translations[lang].common.yes}</option>
                </select>
              ) : (
                <p>
                  {user?.isBlocked
                    ? translations[lang].common.yes
                    : translations[lang].common.no}
                </p>
              )}
            </li>
          </ul>

          <div className={Styles.customerInfo__content_code}>
            <PhotoUser
              photo={user?.photo}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />

            <div className={Styles.customerInfo__content_list_item}>
              <p>{translations[lang].dashboard_page.code}</p>
              <p>{extractLastFiveCharacters(user?._id || '00000')}</p>
            </div>
          </div>
        </div>

        {isActiveEdit ? (
          // _______ if edit buttons
          <div className={Styles.customerInfo__btns}>
            <Button
              className={Styles.customerInfo__btn}
              disabled={!isValueChanged || isSubmitting}
              type='submit'
            >
              {isSubmitting ? (
                <Oval
                  visible={true}
                  height={SIZE_ICON}
                  width={SIZE_ICON}
                  color={COLORS.whiteFont}
                  secondaryColor={COLORS.whiteFont}
                  ariaLabel='oval-loading'
                />
              ) : (
                translations[lang].common.save
              )}
            </Button>
            <Button
              className={Styles.customerInfo__btn}
              onClick={handleCancelEdit}
              type='button'
            >
              {translations[lang].common.cancel}
            </Button>
          </div>
        ) : (
          // _______ if NOT edit button
          <div className={Styles.customerInfo__btns}>
            <Button
              className={Styles.customerInfo__btn}
              onClick={handleEdit}
              type='button'
            >
              {translations[lang].common.edit}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerInfo;
