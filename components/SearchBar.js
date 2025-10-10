import styles from '@/styles/SearchBar.module.css';

export default function SearchBar() {
    return (
      <div className={styles.search__background}>
      <div className={styles.search__wrapper}>
        <figure className={styles.search__figure}>
          <img src="logo" alt="logo" />
        </figure>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <h1>Searchbar</h1>
            <div className={styles.search__input__wrapper}>
              <input
                className={styles.search__input}
                type="text"
                placeholder="Search For Books"
              />
              <div className={styles.search__icon}>
                <img src="search icon" alt="icon" className='search__img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}