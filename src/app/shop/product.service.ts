import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from './product';
import { ProductElement } from './product-element';
import { Group } from './group';
import { MessageService } from '../message.service';
// import { apiUrl } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getProducts(id: string): Observable<ProductElement[]> {
    const url = `/api/group/${id}`;
    return this.http.get<ProductElement[]>(url)
      .pipe(
        tap(_ => this.log('已获取商品列表')),
        catchError(this.handleError<ProductElement[]>('getProducts', []))
      );
  }

  getProduct(id: string): Observable<Product> {
    const url = `/api/products/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => this.log(`已获取商品详情`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  getGroups(): Observable<Group[]> {
    const url = '/api/groups';
    return this.http.get<Group[]>(url)
      .pipe(
        catchError(this.handleError<Group[]>(`getGroups`, []))
      );

  }

  search(word: string): Observable<ProductElement[]> {
    if (word) {
      const url = `/api/search/${word}`;
      return this.http.get<ProductElement[]>(url)
        .pipe(
          tap(_ => this.log(`已获取商品列表`)),
          catchError(this.handleError<ProductElement[]>(`search word=${word}`, []))
        );
    }
  }

}
