import { useCallback } from "react";
import type { Coin } from "../types/listCoins.ts";

export const useCoinFunctions = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const refreshCoin = useCallback(
    (
      symbol: string,
      setCoins: React.Dispatch<React.SetStateAction<Coin[]>>
    ) => {
      fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCoins((prevCoins) =>
            prevCoins.map((coin) =>
              coin.symbol === symbol ? { ...coin, price: data.USD } : coin
            )
          );
        });
    },
    [apiKey]
  );

  const removeCoin = useCallback(
    (
      symbol: string,
      setCoins: React.Dispatch<React.SetStateAction<Coin[]>>
    ) => {
      setCoins((prevCoins) =>
        prevCoins.filter((coin) => coin.symbol !== symbol)
      );
    },
    []
  );

  return { refreshCoin, removeCoin };
};
