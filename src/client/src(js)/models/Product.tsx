export interface Product {
  id: string;
  cover: string;
  name: string;
  price: number;
  priceSale: number | null;
  colors: string[];
  status: string;
}
