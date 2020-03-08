import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Status } from '../status';
import { MessageService } from '../message.service';

import { Order } from './order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  jwtToken = localStorage.getItem('accessToken');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`})
  };
  orderInfo: Order;

  constructor(
    private http: HttpClient,
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

  getMyOrders() {
    const url = '/api/my-orders';
    return this.http.get<Status>(url, this.httpOptions)
      .pipe(
        tap(val => this.log(val.message)),
        catchError(this.handleError<Status>('orderService'))
      );

  }
}
