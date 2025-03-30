const Header = () => {
  return (
    <header className="header">
      <form action="">
        <input type="text" placeholder="Search..." />
        <button type="submit" className="search-button">
          Search
        </button>
        <button type="submit" className="search-button">
          Update list
        </button>
      </form>
    </header>
  );
};

export default Header;
