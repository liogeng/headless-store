import { Component, OnInit } from '@angular/core';

import { OrderService } from '../order.service';
import { Address } from '../address';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  myOrders: any [];
  display: string[] = ['out_trade_no','time_end','check_type','total_fee','result_code','products'];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getMyOrders().subscribe(
      status => {
        if (status && status.status === 'ok') {
          this.myOrders = status.data.my_orders.reverse();
        }
      }
    );
  }

  getCheckType(checkType) {
    if (checkType && checkType.name) {
      return checkType.name;
    }

    if (checkType && checkType.type) {
      return checkType.type;
    }
    return '';
  }



  getAddressOut(address: Address|any): string {
    let ad = '';
    if (address.address) {
       ad = [
      address.address.province.name,
      address.address.city.code === address.address.province.code ? '' : address.address.city.name,
      address.address.county.code === address.address.city.code ? '' : address.address.county.name,
      address.address.street,
      '，',
      address.address.postcode
      ].join('');
    }
    else {
       ad = [
        address.province.name,
        address.city.name,
        address.county.name,
        address.street,
        '，',
        address.postcode
        ].join('');
    }
    return [
      ad,
      '，',
      '收件人：',
      address.name,
      '，',
      '电话：',
      address.phone
    ].join('');
  }

  getProductList(products) {
    if (products) {
      return products.map(product => product.name).join(',');
    }
    return '';
  }

}
