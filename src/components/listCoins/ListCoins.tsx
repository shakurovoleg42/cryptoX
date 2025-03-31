import styles from "./ListCoins.module.scss";
import type { Coin } from "../../types/listCoins.ts";
import { useEffect, useState } from "react";

interface ListCoinsProps {
  searchQuery: string;
}

const ListCoins = ({ searchQuery }: ListCoinsProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  console.log(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      // https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
      fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${searchQuery}&tsyms=USD`
      )
        .then((response) => response.json())
        .then((data) =>
          setCoins((prevCoins) => [
            ...prevCoins,
            {
              id: Date.now(),
              name: searchQuery,
              symbol: searchQuery,
              price: `$${data.USD}`,
              refresh: () => refreshCoin(searchQuery),
              remove: () => removeCoin(searchQuery),
            },
          ])
        );
    }
  }, [searchQuery]);

  const refreshCoin = (symbol: string) => {
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins((prevCoins) =>
          prevCoins.map((coin) =>
            coin.symbol === symbol ? { ...coin, price: `$${data.USD}` } : coin
          )
        );
      });
  };

  const removeCoin = (symbol: string) => {
    setCoins((prevCoins) => prevCoins.filter((coin) => coin.symbol !== symbol));
  };
  console.log(coins);

  return (
    <div className={styles.listCoins}>
      <h2>List of Coins</h2>
      <button className="update-button">Update list</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Refresh</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{coin.price}</td>
              <td>
                <button onClick={coin.refresh}>Refresh</button>
              </td>
              <td>
                <button onClick={coin.remove}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCoins;
