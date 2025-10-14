import styles from "@/styles/SearchBar.module.css";
import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef(null);

  // Fetch books based on search term
  async function fetchBooks(query) {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      const results = Array.isArray(data) ? data : data?.books ?? [];
      setBooks(results);
      setShowDropdown(results.length > 0);
      setHighlightIndex(-1); // reset highlight
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setShowDropdown(false);
      setHighlightIndex(-1);
    }
  }

  // Debounced live search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim()) fetchBooks(search);
      else setShowDropdown(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Navigate to a book
  function handleSelectBook(id) {
    router.push(`/books/${id}`);
    setSearch("");
    setBooks([]);
    setShowDropdown(false);
    setHighlightIndex(-1);
  }

  // Handle Enter key
  function handleEnterSearch() {
    if (highlightIndex >= 0 && books[highlightIndex]) {
      handleSelectBook(books[highlightIndex].id);
    } else if (books.length > 0) {
      handleSelectBook(books[0].id);
    }
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % books.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + books.length) % books.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleEnterSearch();
    }
  }

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
        setHighlightIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.search__background} ref={wrapperRef}>
      <div className={styles.search__wrapper}>
        <figure>{/* <img src="logo" alt="logo" /> */}</figure>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <div className={styles.search__input__wrapper}>
              <input
                className={styles.search__input}
                type="search"
                value={search}
                placeholder="Search For Books"
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div
                className={styles.search__icon}
                onClick={handleEnterSearch}
                aria-label="Search"
              >
                <IoIosSearch />
              </div>
            </div>
            {showDropdown && (
              <ul className={styles.results}>
                {books.map((book, index) => (
                  <li
                    key={book.id}
                    className={`${styles.resultItem} ${
                      index === highlightIndex ? styles.highlight : ""
                    }`}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => handleSelectBook(book.id)}
                  >
                    <div className={styles.resultTitle}>{book.title}</div>
                    <div className={styles.resultAuthor}>{book.author}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
