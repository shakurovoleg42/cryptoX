import { memo } from "react";
import { Coin } from "../../types/listCoins";

const Coins = memo(({ id, symbol, price, status, refresh, remove }: Coin) => {
  return (
    <tr key={id} className="table-row">
      <td style={{ fontWeight: "900" }}>{symbol}</td>
      <td
        style={{
          color:
            status === "positive"
              ? "green"
              : status === "negative"
              ? "red"
              : "white",
          backgroundColor: "#242424",
        }}
      >
        ${price}
      </td>
      <td>
        <button onClick={refresh}>Refresh</button>
      </td>
      <td>
        <button onClick={remove}>Remove</button>
      </td>
    </tr>
  );
});

export default Coins;
