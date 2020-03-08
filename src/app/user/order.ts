import { ProductElement } from '../shop/product-element';
import { Address } from './address';
import { Receipt } from './receipt';

export interface Order {
  products: ProductElement[];
  fee: number;
  freight: number;
  address: Address;
  receipt: Receipt;
  checkType: {type:string};
}
