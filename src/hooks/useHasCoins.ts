import { useEffect, useState } from "react";
import { Coin } from "../types/listCoins";

export const useCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  // выгружаем монетки при ComponentDidMount
  useEffect(() => {
    const storedCoins = localStorage.getItem("coins");
    if (storedCoins) {
      setCoins(JSON.parse(storedCoins));
    }
  }, []);
  // Кидаем новые монеты в localStorage
  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);
  return { coins, setCoins };
};
