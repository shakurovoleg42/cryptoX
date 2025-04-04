export type Coin = {
  id: number;
  symbol: string;
  price: string;
  status: string;
  refresh: () => void;
  remove: () => void;
};
