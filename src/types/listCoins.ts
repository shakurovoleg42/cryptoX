export type Coin = {
  id: number;
  name: string;
  symbol: string;
  price: string;
  refresh: () => void;
  remove: () => void;
};
