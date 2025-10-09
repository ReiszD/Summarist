import styles from "@/styles/Home.module.css";

export default function Footer() {
  return (
    <>
      <section className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footer__top__wrapper}>
              <div className={styles.footer__block}>
                <div className={styles.footer__link__title}>Actions</div>
                <div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Summarist Magazine</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Cancel Subscription</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Help</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Contact us</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__link__title}>Useful Links</div>
                <div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Pricing</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Summarist Business</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Gift Cards</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__link__title}>Company</div>
                <div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>About</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Careers</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Partners</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__link__title}>Other</div>
                <div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Sitemap</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Legal Notice</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Terms of Service</a>
                  </div>
                  <div className={styles.footer__link__wrapper}>
                    <a className={styles.footer__link}>Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footer__copyright__wrapper}>
              <div className={styles.footer__copyright}>
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
