import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../../user/cart.service';
import { Group } from '../group';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  group: Group;
  showImg: string;

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
      switchMap((params: ParamMap) => {
        setTimeout(() => this.group = {
          group_id: +params.get('group_id'),
          group_name: params.get('group_name')
        }, 0);
        return this.productService.getProduct(params.get('id'));
      })
    );
  }


  addToCart(product, quantity): void {
    this.cartService.addToCart(product, quantity);
  }
}
