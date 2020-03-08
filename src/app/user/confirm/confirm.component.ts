import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { CheckService } from '../check.service';
import { Order } from '../order';
import { CartService } from '../cart.service';
import { ProductElement } from 'src/app/shop/product-element';
import { DialogComponent } from '../dialog/dialog.component';


declare let wx: any;

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  codeUrl: string;
  data: any;
  isConfirmed: boolean;
  orderInfo: Order;
  result: string;
  checkType: string;
  items: ProductElement[];
  address: string;

  constructor(
    private checkService: CheckService,
    private cartService: CartService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isConfirmed = false;
    this.items = this.cartService.items.filter(item => item.selected === true);
    this.orderInfo = this.checkService.orderInfo;
    this.checkType = this.orderInfo.checkType.type;
    const addressObject = this.orderInfo.address.address;
    this.address = `${addressObject.province.name}${addressObject.county.name}${addressObject.street}，${addressObject.postcode}，${this.orderInfo.address.name}`;
  }

  confirm() {

    if (this.checkType === '微信支付') {
      this.wxPay();
    }
    else {
      this.submitOrder();
    }
  }

  submitOrder() {
    this.checkService.submitOrder(this.orderInfo).subscribe(
      status => {
        if (status.status === 'ok') {
          this.cartService.items = [];
          localStorage.removeItem('cart');
          this.result = '订单已生成，支付后将立即发货。';
        }
        else {
          this.result = '有故障，请重新生成订单';
        }
        this.isConfirmed = true;
      }
    );
  }

  wxPay() {
    this.checkService.wxPay(this.orderInfo).subscribe(
      status => {
        if (status.status === 'ok') {
          if (this.checkService.isWxBrowser()) {
            this.data = status.data;
            const jsSdkConfig = this.data.jsSdkConfig;
            this.jsConfig(jsSdkConfig);
          }
          else {
            this.codeUrl = status.data.code_url;
          }
        }
        this.isConfirmed = true;
      });
  }

  jsConfig(jsSdkConfig) {
    wx.config({
      debug: false,
      appId: jsSdkConfig.appId,
      timestamp: jsSdkConfig.timestamp,
      nonceStr: jsSdkConfig.nonceStr,
      signature: jsSdkConfig.signature,
      jsApiList: ['chooseWXPay']
    });
  }


  wxConfirm() {
    const jsApiParameters = this.data.jsApiParameters;
    this.checkService.confirm(jsApiParameters);
    this.isConfirmed = true;
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (this.isConfirmed) {
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
