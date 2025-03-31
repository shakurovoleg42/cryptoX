import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import ListCoins from "./components/listCoins/ListCoins";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <Header onSearch={setSearchQuery} />
      <ListCoins searchQuery={searchQuery} />
    </div>
  );
}
