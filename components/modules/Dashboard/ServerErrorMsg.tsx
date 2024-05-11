import Styles from '@/styles/modules/dashboard/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { IResponse } from '@/types/dashboard';

const ServerErrorMsg = (response: IResponse) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.serverErrorMsg}>
      <p>{translations[lang].dashboard_page.error_msg}</p>
      <p>
        {translations[lang].dashboard_page.msg_about_error}:{' '}
        <b>{response.msg}</b>
      </p>
      <p>
        {translations[lang].dashboard_page.status}: <b>{response.status}</b>
      </p>
    </div>
  );
};

export default ServerErrorMsg;
