import React from "react";
import styles from "./ListCoins.module.scss";

const ListCoins = () => {
  return (
    <div className={styles.listCoins}>
      <h2>List of Coins</h2>
      <button className="update-button">Update list</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Refresh</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dogecoin</td>
            <td>DOGE</td>
            <td>$0,18</td>
            <td>
              <button>Refresh</button>
            </td>
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
