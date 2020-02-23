import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { CartService } from '../cart.service';
import { ProductElement } from '../product-element';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  displayedColumns: string[] = ['selected', 'img', 'name', 'price', 'quantity', 'cost'];

  dataSource: MatTableDataSource<ProductElement>;
  selection = new SelectionModel<ProductElement>(true, []);

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ProductElement>(this.cartService.items);
    this.dataSource.data.forEach(row => {
      if (row.selected === true) {
        this.selection.select(row)
      }
    });
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getTotalCost() {
    // return this.items.map(t => t.price * t.quantity).reduce((p, c) => p + c, 0);
    let sum = 0;
    this.dataSource.data.forEach(row => {
      row.selected = false;
      if (this.selection.isSelected(row)) {
        row.selected = true;
        sum += row.quantity * row.price;
      }

    })
    return sum;
  }

  save() {
    this.cartService.save();
  }

  canDeactivate(): Observable<boolean> | boolean {
      this.save();
      return true;
  }

  clear() {
    this.cartService.clear();
    this.dataSource.connect().next([]);
    this.selection.clear();

  }
}
