import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { HandsetService } from '../handset.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  items$: Observable<Product[]>;
  word: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public handsetService: HandsetService) { }

  ngOnInit() {
    const tmp = sessionStorage.getItem('products');

    if (!tmp) {
      this.getProducts();
    }
    else {
      this.products = JSON.parse(tmp);
      this.items$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>

            this.filter(params.get('word'))

        )
      );
    }



  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.items$ = this.route.paramMap.pipe(
          switchMap((params: ParamMap) =>

              this.filter(params.get('word'))

          )
        );
      });
  }

  filter(word) {

    if (!word || word.trim() == '') {
      word = '报告|目录|财务'
    }
    const reg = new RegExp(word, 'g');
    // const reg = this.searchItem;
    return of(this.products.filter(i => i.name.match(reg)));
  }



  canDeactivate(): Observable<boolean> | boolean {
    this.save();
    return true;
  }

  save() {
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }


}
