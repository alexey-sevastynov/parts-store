import Styles from '@/styles/modules/dashboard/index.module.scss';

import React, { ChangeEvent, FormEvent, useState } from 'react';

import { useLang } from '@/hooks/useLang';

import { Button } from '@/components/elements/Button';

import NotificationBar from '@/components/elements/NotificationBar';
import { TypeNotificationMessage } from '@/types/elements';
import { IBrand } from '@/types/brand';
import { createBrand } from '@/actions/brandActions';

export default function BrandForm({ updateList }: { updateList: () => void }) {
  const { lang, translations } = useLang();

  const [state, setState] = useState<IBrand>({
    name: '',
    website: '',
  });

  const [notification, setNotification] = React.useState<null | {
    type: TypeNotificationMessage;
    message: string;
  }>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const addValue = (): void => {
    if (state.name) {
      setState({
        ...state,
        name: state.name,
        website: state.website,
      });
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (state.name) {
      console.log('Before createBrand:', state); // Debugging statement

      try {
        const response = await createBrand(state);
        if (response.status === 200) {
          console.log('createBrand response:', response); // Debugging statement

          showNotification(
            'success',
            `${translations[lang].common.success_fetch}: "${response.msg}"`
          );

          // Очистка состояния после успешной операции
          setState({
            name: '',
            website: '',
          });

          updateList();
        } else {
          showNotification(
            'error',
            `${translations[lang].common.error_fetch}: ${response.msg}`
          );
        }
      } catch (error: any) {
        console.log('createBrand error:', error); // Debugging statement

        showNotification(
          'error',
          `${translations[lang].common.error_fetch}: ${error.message}`
        );
      }
    }
  };

  const showNotification = (type: TypeNotificationMessage, message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null); // Here we set null to hide the notification
    }, 3000);
  };

  return (
    <form className={Styles.brandForm} onSubmit={handleSubmit}>
      <span className={Styles.brandForm__line} />
      <div className={Styles.brandForm__wrapper}>
        <ul className={Styles.brandForm__inputs}>
          <li className={Styles.brandForm__inputs_item}>
            <label>{translations[lang].dashboard_page.name}:</label>
            <input
              type='text'
              name='name'
              value={state.name}
              onChange={handleChange}
            />
          </li>

          <li className={Styles.brandForm__inputs_item}>
            <label>{translations[lang].dashboard_page.link_website}:</label>
            <input
              type='text'
              name='website'
              value={state.website}
              onChange={handleChange}
            />
          </li>
        </ul>

        <Button
          className={Styles.brandForm__btn}
          type='submit'
          onClick={addValue}
          disabled={!state.name}
        >
          {translations[lang].common.add}
        </Button>
      </div>

      {notification && (
        <div className={Styles.brandForm__notification}>
          <NotificationBar type={notification.type}>
            {notification.message}
          </NotificationBar>
        </div>
      )}

      <span className={Styles.brandForm__line} />
    </form>
  );
}
