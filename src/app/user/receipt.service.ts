import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message.service';
import { Status } from '../status';
import { Receipt } from './receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  jwtToken = localStorage.getItem('accessToken');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`})
  }
  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string) {
      this.messageService.add(`ReceiptService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      }
    }

    getReceipt(): Observable<Receipt> {
      const url = '/api/receipt';
      return this.http.get<Receipt>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('获取发票信息')),
        catchError(this.handleError<Receipt>('getReceipt'))
      );
    }

    saveReceipt(receipt): Observable<Status> {
      const url = '/api/receipt';
      return this.http.put<Status>(url, receipt, this.httpOptions)
        .pipe(
          tap(res => this.log(res.message)),
          catchError(this.handleError<Status>('saveReceipt'))
        );
    }
}
