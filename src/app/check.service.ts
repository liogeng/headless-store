import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Status } from './status';

import { MessageService } from './message.service';
import { CartService } from './cart.service';

declare let wx: any;

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  jwtToken = localStorage.getItem('accessToken');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`})
  }
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  submitOrder(order) {
    const url = '/api/offline-pay';

    return this.http.post<Status>(url, order, this.httpOptions)
     .pipe(
       tap(val => this.log(val.message)),
       catchError(this.handleError<Status>('checkService'))
     );
  }

  wxPay(order) {
    const url = '/api/wx-pay';

    return this.http.post<Status>(url, order, this.httpOptions)
     .pipe(
       tap(val => this.log(val.message)),
       catchError(this.handleError<Status>('checkService'))
     );
  }

  isWxBrowser() {
    let reg: any;
    reg = navigator.userAgent.match(/MicroMessenger\/(\d\.\d)/);
    // console.log(reg[1]);

    if (reg && reg[1] >= '5.0') {
      return true;
    }
    else {
      return false;
    }
  }

  confirm(jsApiParameters) {
    wx.chooseWXPay({
      timestamp: jsApiParameters.timeStamp,
      nonceStr: jsApiParameters.nonceStr,
      package: jsApiParameters.package,
      signType: jsApiParameters.signType,
      paySign: jsApiParameters.paySign,
      success: function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          this.log('支付成功');
          this.cartService.items = [];
          localStorage.removeItem('cart');
        }
        else {
          this.log(res.err_msg);
        }
      },
      fail:  function(res) {
        this.log(JSON.stringify(res));
      }
    });
  }

}
