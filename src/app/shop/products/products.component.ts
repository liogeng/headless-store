import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';



import { ProductElement } from '../product-element';
import { ProductService } from '../product.service';
import { HandsetService } from '../../handset.service';
import { Group } from '../group';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<ProductElement[]>;

  group: Group;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  items$: Observable<ProductElement[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private pageInatorIntl: MatPaginatorIntl,
    public handsetService: HandsetService) { }

  ngOnInit() {
    this.pageInatorIntl.itemsPerPageLabel = '每页';
    this.pageInatorIntl.firstPageLabel = '第一页';
    this.pageInatorIntl.lastPageLabel = '最后一页';
    this.pageInatorIntl.previousPageLabel = '上一页';
    this.pageInatorIntl.nextPageLabel = '下一页';

    this.products$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        setTimeout(() => this.group = {
          group_id: +params.get('id'),
          group_name: params.get('name')
        }, 0);
        return this.productService.getProducts(params.get('id'));
      })
    );

    this.products$.subscribe(
      res => {
        this.dataSource = new MatTableDataSource<ProductElement>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.items$ = this.dataSource.connect();
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  search() {
    this.products$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.search(params.get('word'))
      )
    );

    // const reg = new RegExp(word.trim(), 'g');
    // return of(this.products.filter(i => i.name.match(reg)));
  }




  // canDeactivate(): Observable<boolean> | boolean {
  //   this.productService.save(this.dataSource);
  //   return true;
  // }

}
