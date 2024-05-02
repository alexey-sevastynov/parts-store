import Styles from '@/styles/modules/dashboard/index.module.scss';

import Image from 'next/image';

const PhotoUser = ({
  photo,
  firstName,
  lastName,
}: {
  photo?: string;
  firstName: string;
  lastName: string;
}) => {
  const firstLetterFirstName = firstName[0].toUpperCase();
  const firstLetterLastName = lastName[0].toUpperCase();

  return (
    <div className={Styles.photoUser}>
      {photo ? (
        <Image
          className={Styles.photoUser__photo}
          src={photo}
          alt={'avatar'}
          width={96}
          height={96}
        />
      ) : (
        <div
          className={`${Styles.photoUser__photo} ${Styles.photoUser__photo_custom}`}
        >
          {firstLetterFirstName}
          {firstLetterLastName}
        </div>
      )}
    </div>
  );
};

export default PhotoUser;
