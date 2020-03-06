import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductElement } from 'src/app/shop/product-element';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {
  items: ProductElement[];
  fee: number;
  freight: number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.items.filter(item => item.selected === true);
    this.fee = this.cartService.getTotalCost();
    this.freight = this.cartService.getFreight();
  }

  closeSide() {
    this.cartService.openSide = false;

  }
}
