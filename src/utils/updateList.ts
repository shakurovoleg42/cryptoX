import type { Coin } from "../types/listCoins.ts";
import { notify } from "./notifications.js";

export const updateList = (
  allCoins: string,
  setCoins: React.Dispatch<React.SetStateAction<Coin[]>>
) => {
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${allCoins}&tsyms=USD`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        setCoins((prevCoins) =>
          prevCoins.map((coin) => {
            const newPrice = data[coin.symbol]?.USD;
            if (!newPrice) return coin;

            let status = "neutral";

            if (parseFloat(newPrice) > parseFloat(coin.price)) {
              status = "positive";
            } else if (parseFloat(newPrice) < parseFloat(coin.price)) {
              status = "negative";
            } else {
              status = "neutral";
            }

            return {
              ...coin,
              price: `${newPrice}`,
              status,
            };
          })
        );
        console.log("Updated coins:", data);
      }
      if (data.Type === 2) {
        notify("error", `It seems like the list is empty`);
      }
    })
    .catch((error) => {
      console.error("Error updating coin prices:", error);
    });
};
