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

  getAddressOut(address: Address): string {
    return [
      address.province.name,
      address.city.code === address.province.code ? '' : address.city.name,
      address.county.code === address.city.code ? '' : address.county.name,
      address.street,
      '，',
      address.postcode,
      '，',
      '收件人：',
      address.name,
      '，',
      '电话：',
      address.phone
    ].join('');
  }

  getProductList(products) {
    return products.map(product => product.name).join(',');

  }

}
