export type Coin = {
  id: number;
  symbol: string;
  price: string;
  refresh: () => void;
  remove: () => void;
};
