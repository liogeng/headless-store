import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CheckService } from '../check.service';
import { CartService } from '../cart.service';
import { Address } from '../address';
import { ProductsComponent } from '../products/products.component';

declare let wx: any;


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  checkType: any[];
  theCheckType: any;
  receipt: string;
  address: Address;
  codeUrl: string;
  data: any;
  isConfirmed: boolean;

  constructor(
    private cartService: CartService,
    private checkService: CheckService,
  ) { }

  ngOnInit() {
    this.checkType = [
      { 'id': 1, 'name': '线下' },
      { 'id': 2, 'name': '线上' },
    ];
    this.receipt = localStorage.getItem('receipt') || '';
    this.isConfirmed = false;
  }

  onChanged(address) {
    this.address = address;
  }

  orderInfo() {
    let items = JSON.parse(JSON.stringify(this.cartService.items));
    items.map(i => { delete i.main_img; delete i.selected; });

    return {
      'products': items,
      'fee': this.cartService.fee + this.cartService.freight,
      'address': this.address,
      'receipt': this.receipt,
      'checkType': this.theCheckType
    }
  }

  isOk() {
    return this.address && this.receipt;
  }


  submitOrder() {
    this.checkService.submitOrder(this.orderInfo()).subscribe(
      status => {
        if (status.status === 'ok') {
          this.cartService.items = [];
          localStorage.removeItem('cart');
        }
      }
    );
  }

  wxPay() {
    this.checkService.wxPay(this.orderInfo()).subscribe(
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
      });
  }

  canDeactivate(): Observable<boolean> | boolean {
    localStorage.setItem('receipt', this.receipt);
    return true;
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


  confirm() {
    const jsApiParameters = this.data.jsApiParameters;
    this.checkService.confirm(jsApiParameters);
    this.isConfirmed = true;
  }

}
