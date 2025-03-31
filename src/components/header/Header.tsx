import { useState } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
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
            required
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
