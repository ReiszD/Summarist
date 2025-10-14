import styles from "@/styles/SearchBar.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  async function onSearch() {
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();

      // Adjust depending on API response
      const books = Array.isArray(data)
        ? data
        : data?.books
        ? data.books
        : [];

      if (books.length > 0) {
        // Navigate to the first matching book
        router.push(`/books/${books[0].id}`);
      } else {
        alert("No books found for that search term.");
      }

      setSearch("");
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Something went wrong while searching. Please try again.");
    }
  }

  return (
    <div className={styles.search__background}>
      <div className={styles.search__wrapper}>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <div className={styles.search__input__wrapper}>
              <input
                className={styles.search__input}
                type="search"
                value={search}
                placeholder="Search For Books"
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onSearch();
                }}
              />
              <button
                className={styles.search__icon}
                onClick={onSearch}
                aria-label="Search"
              >
                <IoIosSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
