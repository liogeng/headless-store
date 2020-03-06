import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


import { CheckService } from '../check.service';
import { CartService } from '../cart.service';
import { Address } from '../address';
import { AddressComponent } from '../address/address.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { ProductElement } from '../../shop/product-element';
import { CheckTypeComponent } from '../check-type/check-type.component';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

declare let wx: any;

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @ViewChild('addressForm') private addressComponent: AddressComponent;
  @ViewChild('receiptForm') private receiptComponent: ReceiptComponent;
  @ViewChild('checkTypeForm') private checkTypeComponent: CheckTypeComponent;

  codeUrl: string;
  data: any;
  isConfirmed: boolean;
  isLinear: boolean = true;
  isSmallScreen: boolean;
  result: string;

  constructor(
    private cartService: CartService,
    private checkService: CheckService,
    private orderService: OrderService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {

    // this.receipt = localStorage.getItem('receipt') || '';
    this.isConfirmed = false;
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
    this.orderService.orderInfo = this.orderInfo();
    console.log(this.orderInfo());
    if (this.checkTypeComponent.checkTypeForm.value.type === '微信支付') {
      this.wxPay();
    }
    else {
      this.submitOrder();
    }
  }

  isOk() {
    // return this.address && this.receipt;
  }


  submitOrder() {
    this.checkService.submitOrder(this.orderInfo()).subscribe(
      status => {
        if (status.status === 'ok') {
          this.cartService.items = [];
          localStorage.removeItem('cart');
          this.result = '订单已生成';
        }
        else {
          this.result = '有故障，请重新生成订单';
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
    window.confirm('for test');
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


  wxConfirm() {
    const jsApiParameters = this.data.jsApiParameters;
    this.checkService.confirm(jsApiParameters);
    this.isConfirmed = true;
  }

}
