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
  display: string[] = ['out_trade_no','time_place','check_type','total_fee','result_code'];

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


}
