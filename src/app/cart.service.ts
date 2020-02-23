import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { ProductElement } from './product-element';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // items = [];
  items: ProductElement[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  fee: number;

  constructor(
    private messageService: MessageService
  ) { }

  private log(message: string): void {
    this.messageService.add(`CartService: ${message}`);
  }

  addToCart(product, quantity): void {
    const item: ProductElement = {
      "product_id":product.product_id,
      "name": product.product_base.name,
      "price": product.sku_list[0].price,
      "main_img": product.product_base.main_img,
      "quantity": quantity,
      "selected": true
    }
    this.items.push(item);
    this.log(`您刚添加了${quantity}件${item.name}`);
  }


  save(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  clear() {
    this.items = [];
    localStorage.removeItem('cart');
  }
}
