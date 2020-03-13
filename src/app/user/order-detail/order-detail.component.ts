import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Status } from '../../status';
import { Address } from '../address';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order$: Observable<Status>;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.order$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.orderService.getOrder(params.get('id'))
      )
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
