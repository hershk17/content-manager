export interface Product {
  id: string;
  cover: string;
  name: string;
  // price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
  // priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
  price: number;
  priceSale: number | null;
  colors: string;
  status: string;
}
