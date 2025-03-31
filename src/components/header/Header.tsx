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
  };

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

      {searchQuery && <p>Searching for: {searchQuery}</p>}
    </div>
  );
};

export default Header;
