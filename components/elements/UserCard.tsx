'use client';
import Styles from '@/styles/elements/index.module.scss';

import Image from 'next/image';

import { IUserCardProps } from '@/types/elements';

const UserCard = ({
  firstName,
  lastName,
  email,
  photo,
  isActive,

  isOnlyPhoto,
}: IUserCardProps) => {
  const firstLetter = firstName[0].toUpperCase();

  const fullName = firstName + ' ' + lastName;

  const photoCard = photo ? (
    <Image
      className={Styles.userCard__photo}
      src={photo}
      alt={'avatar'}
      width={40}
      height={40}
    />
  ) : (
    <div
      className={`${Styles.userCard__photo} ${Styles.userCard__photo_custom}`}
    >
      {firstLetter}
    </div>
  );

  if (isOnlyPhoto) {
    return <div className={Styles.userCard}>{photoCard}</div>;
  }

  return (
    <div className={Styles.userCard}>
      {photoCard}

      <div className={Styles.userCard__description}>
        <p
          className={`${Styles.userCard__description_name} ${isActive ? Styles.userCard__description_name_active : ''}`}
          title={fullName}
        >
          {fullName}
        </p>
        <p className={Styles.userCard__description_email} title={email}>
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
