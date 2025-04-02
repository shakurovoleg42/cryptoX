import styles from "./ListCoins.module.scss";
import type { Coin } from "../../types/listCoins.ts";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCoinFunctions } from "../../utils/coinFuncs";
import { updateList } from "../../utils/updateList";
import { notify } from "../../utils/notifications";

interface ListCoinsProps {
  searchQuery: string;
}

const ListCoins = ({ searchQuery }: ListCoinsProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const { refreshCoin, removeCoin } = useCoinFunctions();
  const allCoins = coins.map((coin) => coin.symbol).join(",");

  useEffect(() => {
    if (!searchQuery) return;

    if (coins.some((coin) => coin.symbol === searchQuery)) {
      notify("error", "Coin already exists in the list");
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
              price: data.USD,
              refresh: () => refreshCoin(searchQuery, setCoins),
              remove: () => removeCoin(searchQuery, setCoins),
              status: "negative",
            },
          ]);
        }
      })
      .catch((error) => {
        notify("error", `Coin ${searchQuery} not found`);
        console.error("Error fetching coin data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (coins.length === 0) return;
      updateList(allCoins, setCoins);
      notify("info", "Coin prices updated");
    }, 10000);

    return () => clearInterval(interval);
  }, [allCoins, coins]);

  return (
    <div className={styles.listCoins}>
      <h2>List of Coins</h2>
      <ToastContainer />
      <button
        className={styles.updateButton}
        onClick={() => updateList(allCoins, setCoins)}
      >
        🔃 Update list
      </button>
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
              <td>${coin.price}</td>
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
