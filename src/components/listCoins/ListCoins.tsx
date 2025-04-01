import styles from "./ListCoins.module.scss";
import type { Coin } from "../../types/listCoins.ts";
import { useEffect, useState } from "react";
import { useCoinFunctions } from "../../utils/coinFuncs";

interface ListCoinsProps {
  searchQuery: string;
}

const ListCoins = ({ searchQuery }: ListCoinsProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const { refreshCoin, removeCoin } = useCoinFunctions();

  useEffect(() => {
    if (!searchQuery) return;

    if (coins.some((coin) => coin.symbol === searchQuery)) {
      console.log("Coin already exists in the list");
      return;
    }

    console.log(searchQuery);
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${searchQuery}&tsyms=USD`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.USD) {
          setCoins((prevCoins) => [
            ...prevCoins,
            {
              id: Date.now(),
              symbol: searchQuery.toLocaleUpperCase(),
              price: `$${data.USD}`,
              refresh: () => refreshCoin(searchQuery, setCoins),
              remove: () => removeCoin(searchQuery, setCoins),
            },
          ]);
        }
      });
  }, [searchQuery]);

  console.log(coins);

  return (
    <div className={styles.listCoins}>
      <h2>List of Coins</h2>
      <button className="update-button">Update list</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Refresh</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="table-row">
              <td>{coin.symbol}</td>
              <td>{coin.price}</td>
              <td>
                <button onClick={() => refreshCoin(coin.symbol, setCoins)}>
                  Refresh
                </button>
              </td>
              <td>
                <button onClick={() => removeCoin(coin.symbol, setCoins)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCoins;
