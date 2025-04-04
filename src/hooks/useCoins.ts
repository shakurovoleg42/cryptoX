import { useEffect, useState } from "react";
import { Coin } from "../types/listCoins";

const DEFAULT_COIN: Coin = {
  id: Date.now(),
  symbol: "DOGE",
  price: 0,
  refresh: () => {},
  remove: () => {},
  status: "neutral",
};

export const useCoins = () => {
  // выгружаем монетки при ComponentDidMount
  const [coins, setCoins] = useState<Coin[]>(() => {
    const stored = localStorage.getItem("coins");

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [DEFAULT_COIN];
      }
    }

    localStorage.setItem("coins", JSON.stringify([DEFAULT_COIN]));
    return [DEFAULT_COIN];
  });
  // Кидаем новые монеты в localStorage
  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);

   return { coins, setCoins };
};
