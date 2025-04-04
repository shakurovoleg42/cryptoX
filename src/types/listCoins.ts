export type Coin = {
  id: number;
  symbol: string;
  price: number;
  status: string;
  refresh: () => void;
  remove: () => void;
};
