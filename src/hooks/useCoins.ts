import { useEffect, useState } from "react";
import { Coin } from "../types/listCoins";
import { updateList } from "../utils/updateList";

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

  // только при первом монтировании или изменении коинс

  useEffect(() => {
    const allCoins = coins.map((coin) => coin.symbol).join(",");
    if (allCoins) {
      updateList(allCoins, setCoins);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coins, setCoins };
};
