import styles from "@/styles/ForYou.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Selected from "./ForYou/Selected";
import Recommended from "./ForYou/Recommended";


export async function getServerSideProps() {
  try {
    const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    console.log("📘 API Response:", data);

    // some APIs return { books: [...] } instead of [...]
    const books = Array.isArray(data) ? data : data.books || [];

    return { props: { selected: books } };
  } catch (error) {
    console.error("Error fetching:", error);
    return { props: { selected: [] } };
  }
}

export default function ForYou({selected}) {
  console.log("📗 selected prop in ForYou:", selected);
  return (
    <div className={styles.for__you__wrapper}>
      <SearchBar />
      <Sidebar />
      <div className={styles.for__you__row}>
        <div className={styles.for__you__container}>
          <div className="for_you_wrapper">
            <Selected selected={selected} />
            <Recommended />
          </div>
        </div>
      </div>
    </div>
  );
}
