export interface IProduct {
  id: number;
  name: string;
  anime: string;
  price: number;
  stock: number;
  category: string;
  image: File | null;
  quantity: number;
  status?: string;
}
