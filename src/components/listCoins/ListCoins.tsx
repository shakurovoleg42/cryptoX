import React from "react";
import styles from "./ListCoins.module.scss";

const ListCoins = () => {
  return (
    <div className={styles.listCoins}>
      <h2>List of Coins</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td>Bitcoin</td>
            <td>BTC</td>
            <td>$60,000</td>
            <td>
              <button>Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListCoins;
