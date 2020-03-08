import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CheckService } from '../check.service';
import { CartService } from '../cart.service';
import { AddressComponent } from '../address/address.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { ProductElement } from '../../shop/product-element';
import { CheckTypeComponent } from '../check-type/check-type.component';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @ViewChild('addressForm') private addressComponent: AddressComponent;
  @ViewChild('receiptForm') private receiptComponent: ReceiptComponent;
  @ViewChild('checkTypeForm') private checkTypeComponent: CheckTypeComponent;


  isLinear: boolean = true;
  isSmallScreen: boolean;
  result: string;

  constructor(
    private cartService: CartService,
    private checkService: CheckService,
    private router: Router,
    // private dialogService: DialogService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {

    // this.receipt = localStorage.getItem('receipt') || '';
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 992px)');
  }

  // onChanged(address) {
  //   this.address = address;
  // }

  orderInfo() {
    let items: ProductElement[] = JSON.parse(JSON.stringify(this.cartService.items.filter(i => i.selected == true)));
    items.map(i => { delete i.main_img; delete i.selected; });

    return {
      products: items,
      fee: this.cartService.getTotalCost(),
      freight: this.cartService.getFreight(),
      address: this.addressComponent.addressForm.value,
      receipt: this.receiptComponent.receiptForm.value,
      checkType: this.checkTypeComponent.checkTypeForm.value
    }
  }

  placeOrder() {
    this.addressComponent.saveAddress();
    this.receiptComponent.saveReceipt();
    this.checkService.orderInfo = this.orderInfo();
    // console.log(this.orderInfo());
    this.router.navigate(['/confirm']);


  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (this.checkService.orderInfo) {
      return true;
    }

    return this.openDialog();
  }

  openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    return dialogRef.afterClosed();

  }

}
