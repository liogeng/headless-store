import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { Group } from './group';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = '/api/products';
  httpOptions = {
    headers: new HttpHeaders({})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('已获取商品列表')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => this.log(`已获取商品详情`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  getGroups(): Observable<Group[]> {
    const url = '/api/get-groups';
    return this.http.get<Group[]>(url)
      .pipe(
        catchError(this.handleError<Group[]>(`getGroups`, []))
      );

  }


}
