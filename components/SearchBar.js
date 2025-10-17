import styles from "@/styles/SearchBar.module.css";
import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { useRouter } from "next/router";
import { CiClock2 } from "react-icons/ci";
import { formatTime } from "@/components/formatTime";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [durations, setDurations] = useState({});
  const audioRef = useRef(null);

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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim()) fetchBooks(search);
      else setShowDropdown(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDurations(audio.duration || 0);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [search]);

  function handleSelectBook(id) {
    router.push(`/books/${id}`);
    setSearch("");
    setBooks([]);
    setShowDropdown(false);
    setHighlightIndex(-1);
  }

  function handleEnterSearch() {
    if (highlightIndex >= 0 && books[highlightIndex]) {
      handleSelectBook(books[highlightIndex].id);
    } else if (books.length > 0) {
      handleSelectBook(books[0].id);
    }
  }

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
              {search ? (
                <div
                  className={styles.clear__icon}
                  onClick={() => setSearch("")}
                  aria-label="Clear"
                >
                  <MdClear />
                </div>
              ) : (
                <div
                  className={styles.search__icon}
                  onClick={handleEnterSearch}
                  aria-label="Search"
                >
                  <IoIosSearch />
                </div>
              )}
            </div>
            {showDropdown && (
              <ul className={styles.results}>
                {books.map((book, index) => (
                  <li
                    key={book.id}
                    className={`${styles.result__item} ${
                      index === highlightIndex ? styles.highlight : ""
                    }`}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => handleSelectBook(book.id)}
                  >
                    <figure className={styles.results__image__wrapper}>
                      <img
                        className={styles.results__book__image}
                        src={book.imageLink}
                        alt={book.title}
                      />
                    </figure>
                    <div className={styles.results__description}>
                      <div className={styles.result__title}>{book.title}</div>
                      <div className={styles.result__author}>{book.author}</div>
                      <div className={styles.results__details__info}>
                        <audio
                          controls
                          src={book.audioLink || "/placeholder-audio.mp3"}
                          style={{ display: "none" }}
                          onLoadedMetadata={(e) =>
                            setDurations((prev) => ({
                              ...prev,
                              [book.id]: e.target.duration || 0,
                            }))
                          }
                        ></audio>
                        <div className={styles.results__details_icon}>
                          <CiClock2 />
                        </div>
                        <div className={styles.results__details_text}>
                          {formatTime(durations[book.id] || 0)}
                        </div>
                      </div>
                    </div>
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
