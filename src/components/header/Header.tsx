import { useState } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchTerm);
    setSearchTerm("");
  };

  // useEffect(() => {
  //   if (searchQuery) {
  //     console.log("Search query:", searchQuery);
  //   }
  // }, [searchQuery]); его будем юзать в ListCoins.tsx

  console.log("Search query:", searchQuery);
  return (
    <div className={styles.header}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <div>
          <input
            type="text"
            placeholder="DOGE etc."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <div>
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
