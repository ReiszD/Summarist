import styles from '@/styles/Settings.module.css'
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import login__image from '@/summarist-home-page-main/assets/login.png';

export default function Settings() {
    return (
        <div className={styles.settings__wrapper}>
            <SearchBar />
            <Sidebar />
            <div className={styles.settings__container}>
                <div className={styles.settings__row}>
                    <div className={styles.settings__section__title}>Settings</div>
                    {/* <div className={styles.settings__login__wrapper}>
                        <Image src={login__image} alt="login image" className={styles.login_img} />
                        <div className={styles.settings__login__text}>Log in to your account to see your details.</div>
                        <div className={`${styles.settings__btn} ${styles.settings__login__btn}`}>Login</div>
                    </div> */}
                    <div className={styles.setting__content}>
                        <div className={styles.settings__subtitle}>Your Subscription Plan</div>
                        <div className={styles.settings__text}>Premium</div>
                        <div className={`${styles.settings__btn} ${styles.settings__login__btn}`}>Upgrade</div>
                    </div>
                    <div className={styles.setting__content}>
                        <div className={styles.settings__subtitle}>Email</div>
                        <div className={styles.settings__text}>hanna@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    )
}