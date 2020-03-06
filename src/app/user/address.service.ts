import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Address } from './address';
import { Status } from '../status';

import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  jwtToken = localStorage.getItem('accessToken');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`})
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`AddressService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getAddress(): Observable<Address> {
    const url = '/api/address';
    return this.http.get<Address>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log('获取地址')),
      catchError(this.handleError<Address>('getAddress'))
    );
  }

  saveAddress(address): Observable<Status> {
    const url = '/api/address';
    return this.http.put<Status>(url, address, this.httpOptions)
      .pipe(
        tap(res => this.log(res.message)),
        catchError(this.handleError<Status>('saveAddress'))
      );
  }
}
