export interface IProduct {
  id: number;
  name: string;
  anime: string;
  price: number;
  stock: number;
  category: string;
  image: File | null;
  status?: string;
}
