import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.productService.getProduct(params.get('id')))
    );
  }


  addToCart(product, quantity): void {
    this.cartService.addToCart(product, quantity);
  }
}
