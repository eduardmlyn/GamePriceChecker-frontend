import {Seller} from "./enum/seller.enum";

export interface GameSeller {
  seller: Seller,
  link: string,
  price: number
}
