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
          prevCoins.map((coin) => ({
            ...coin,
            price: data[coin.symbol]?.USD
              ? `${data[coin.symbol].USD}`
              : coin.price,
          }))
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
