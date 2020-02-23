import { Component, OnInit } from '@angular/core';

import { ProductElement } from '../product-element';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  items: ProductElement [];

  constructor(
    private cartService: CartService,) { }

  ngOnInit() {
    this.items = this.cartService.items.filter(i => i.selected === true);
    this.cartService.fee = this.getTotalCost();

  }

  getTotalCost() {
    return this.items.map(t => t.price * t.quantity).reduce((p, c) => p + c, 0);
  }
}
