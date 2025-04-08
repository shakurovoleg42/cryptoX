export type Coin = {
  id: string;
  symbol: string;
  price: number;
  status: string;
  refresh: () => void;
  remove: () => void;
};
