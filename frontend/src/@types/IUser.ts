export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  orders: Order[];
}

export interface Order {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
