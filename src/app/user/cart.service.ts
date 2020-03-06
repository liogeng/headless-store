import { Injectable } from '@angular/core';

import { MessageService } from '../message.service';
import { ProductElement } from '../shop/product-element';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // items = [];
  items: ProductElement[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
<<<<<<< HEAD:src/app/cart.service.ts
  fee: number;
  freight: number;
=======
  // fee: number;
  // freight: number;
  openSide: boolean = false;
>>>>>>> dev:src/app/user/cart.service.ts

  constructor(
    private messageService: MessageService
  ) { }

  private log(message: string): void {
    this.messageService.add(`CartService: ${message}`);
  }

  addToCart(product, quantity): void {
    const item: ProductElement = {
      "product_id": product.product_id,
      "name": product.product_base.name,
      "price": product.sku_list[0].price,
      "main_img": product.product_base.main_img,
      "quantity": quantity,
      "selected": true
    }
    this.items.push(item);
    this.log(`您刚添加了${quantity}件${item.name}`);
  }

  getTotalCost() {
    return this.items.filter(t => t.selected === true).map(t => t.price * t.quantity).reduce((p, c) => p + c, 0);
  }

  getFreight() {
    if (this.getTotalCost() > 0 && this.getTotalCost() < 5000) {
      return 1000;
    }
    else {
      return 0;
    }
  }

  save(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  clear() {
    this.items = [];
    localStorage.removeItem('cart');
  }
}
