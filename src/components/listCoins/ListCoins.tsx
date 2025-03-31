import styles from "./ListCoins.module.scss";
import type { Coin } from "../../types/listCoins.ts";
import { useState } from "react";

const ListCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([
    {
      id: 1,
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.18",
      refresh: () => {},
      remove: () => {},
    },
  ]);

  setCoins([
    ...coins,
    {
      id: 2,
      name: "Litecoin",
      symbol: "LTC",
      price: "$100.00",
      refresh: () => {},
      remove: () => {},
    },
  ]);

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
