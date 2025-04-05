import type { Coin } from "../types/listCoins.ts";
import { notify } from "./notifications.js";

export const updateList = (
  allCoins: string,
  setCoins: React.Dispatch<React.SetStateAction<Coin[]>>
) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!allCoins) {
    notify("info", "It seems like the list is empty");
    return;
  }
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${allCoins}&tsyms=USD&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        setCoins((prevCoins) =>
          prevCoins.map((coin) => {
            const newPrice = data[coin.symbol]?.USD;
            if (!newPrice) return coin;

            let status = "neutral";

            if (newPrice > coin.price) {
              status = "positive";
            } else if (newPrice < coin.price) {
              status = "negative";
            } else {
              status = "neutral";
            }

            return {
              ...coin,
              price: newPrice,
              status,
            };
          })
        );
        notify("info", "Coin prices updated");
      }
    })
    .catch((error) => {
      console.error("Error updating coin prices:", error);
    });
};
