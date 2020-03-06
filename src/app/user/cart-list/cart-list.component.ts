import { Component, OnInit } from '@angular/core';

import { ProductElement } from '../../shop/product-element';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  items: ProductElement [];
  fee: number;
  freight: number;

  constructor(
    private cartService: CartService,) { }

  ngOnInit() {
    this.items = this.cartService.items.filter(i => i.selected === true);
<<<<<<< HEAD:src/app/cart-list/cart-list.component.ts
    this.fee = this.cartService.fee;
    this.freight = this.cartService.freight;
=======
    this.fee = this.cartService.getTotalCost();
    this.freight = this.cartService.getFreight();
>>>>>>> dev:src/app/user/cart-list/cart-list.component.ts
  }

}
