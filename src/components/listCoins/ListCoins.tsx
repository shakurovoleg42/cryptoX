/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useCoins } from "../../hooks/useCoins";

import { useCoinFunctions } from "../../utils/coinFuncs";
import { updateList } from "../../utils/updateList";
import { notify } from "../../utils/notifications";

import Coins from "./Coins";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ListCoins.module.scss";

interface ListCoinsProps {
  searchQuery: string;
}

const ListCoins = ({ searchQuery }: ListCoinsProps) => {
  const { coins, setCoins } = useCoins();
  const { refreshCoin, removeCoin } = useCoinFunctions();
  const allCoins = coins.map((coin) => coin.symbol).join(",");

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!searchQuery) return;

    if (coins.some((coin) => coin.symbol === searchQuery)) {
      notify("error", "Coin already exists in the list");
      return;
    }

    console.log(searchQuery);
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${searchQuery}&tsyms=USD&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.USD) {
          setCoins((prevCoins) => [
            ...prevCoins,
            {
              id: Date.now(),
              symbol: searchQuery,
              price: data.USD,
              refresh: () => refreshCoin(searchQuery, setCoins),
              remove: () => removeCoin(searchQuery, setCoins),
              status: "neutral",
            },
          ]);
        } else {notify("error", `Coin ${searchQuery} not found`);}
        
      })
      .catch((error) => {
        console.log("Error fetching coin data:", error);
      });
  }, [searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (coins.length === 0) return;
      updateList(allCoins, setCoins);
    }, 10000);

    return () => clearInterval(interval);
  }, [allCoins]);

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
          {coins.map(({ id, symbol, price, status }) => (
            <Coins
              key={id}
              id={id}
              symbol={symbol}
              price={price}
              status={status}
              refresh={() => refreshCoin(symbol, setCoins)}
              remove={() => removeCoin(symbol, setCoins)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCoins;
