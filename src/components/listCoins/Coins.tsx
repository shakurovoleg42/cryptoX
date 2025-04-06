import { memo } from "react";
import { Coin } from "../../types/listCoins";

const Coins = memo(({ symbol, price, status, refresh, remove }: Coin) => {
  return (
    <tr className="table-row">
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
        {status === "positive" ? (
          <span style={{ color: "green", fontWeight: "900", fontSize: "32px" }}>
            ↑
          </span>
        ) : status === "negative" ? (
          <span style={{ color: "red", fontWeight: "900", fontSize: "32px" }}>
            ↓
          </span>
        ) : (
          <span></span>
        )}
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
