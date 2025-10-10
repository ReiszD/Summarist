import styles from '@/styles/SearchBar.module.css';
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
    return (
      <div className={styles.search__background}>
      <div className={styles.search__wrapper}>
        <figure className={styles.search__figure}>
          {/* <img src="logo" alt="logo" /> */}
        </figure>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <div className={styles.search__input__wrapper}>
              <input
                className={styles.search__input}
                type="text"
                placeholder="Search For Books"
              />
              <div className={styles.search__icon}>
                <IoIosSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}