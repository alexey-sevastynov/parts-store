import ListInfoInternetStore from '@/components/elements/ListInfoInternetStore';
import ListInfoMyAccount from '@/components/elements/ListInfoMyAccount';
import ListInfoUseful from '@/components/elements/ListInfoUseful';
import ListSocialMedia from '@/components/elements/ListSocialMedia';
import Logotype from '@/components/elements/Logotype';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/footer/index.module.scss';

const Footer = () => {
  const { lang, translations } = useLang();
  return (
    <section className={Styles.footer}>
      <div className={`container ${Styles.footer__container}`}>
        <div className={Styles.footer__main}>
          <div className={Styles.footer__main_column}>
            <ListInfoInternetStore />
          </div>
          <div className={Styles.footer__main_column}>
            <ListInfoUseful />
          </div>
          <div className={Styles.footer__main_column}>
            <ListInfoMyAccount />
          </div>
          <div className={Styles.footer__main_column}>
            <Logotype />
            <div className={Styles.footer__main_column_tel}>
              <a href='tel:+380974211929'>+38 (097) 42-119-29</a>
              <a href='tel:+380974211929'>+38 (097) 42-119-29</a>
              <a href='tel:+380974211929'>+38 (097) 42-119-29</a>
            </div>

            <ListSocialMedia theme='dark' />
          </div>
        </div>
        <p className={Styles.footer__rights_reserved}>
          2024 {translations[lang].footer_page.all_rights_reserved}
        </p>
      </div>
    </section>
  );
};

export default Footer;
