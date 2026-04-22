import { Products } from "./product.model";

export interface CartItem extends Products {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  
}
