import { Component, OnInit } from '@angular/core';

import { OrderService } from '../order.service'

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
          this.myOrders = status.data.my_orders;
        }
      }
    );
  }

}
