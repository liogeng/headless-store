import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './auth';
import { Status } from '../status';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = localStorage.getItem('accessToken') ? true : false;
  isPasswordChanged = false;
  redirectUrl: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
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

  login(user: User): Observable<Status> {
    const url = '/user/login';
    return this.http.post<Status>(url, user, this.httpOptions)
      .pipe(
        tap(val => {
          if (val.status === 'ok') {
            this.isLoggedIn = true;
            localStorage.setItem('accessToken', val.data.accessToken);
          }
          this.log(val.message);
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  register(user: User): Observable<Status> {
    const url = '/user/register';

    return this.http.post<Status>(url, user, this.httpOptions)
      .pipe(
        tap(val => this.log(val.message)),
        catchError(this.handleError<Status>('register'))
      );
  }

  getbackPassword(user: User): Observable<Status> {
    const url = '/user/getback-password';

    return this.http.post<Status>(url, user, this.httpOptions)
      .pipe(
        tap(val => this.log(val.message)),
        catchError(this.handleError<Status>('getbackPassword'))
      );
  }

  changePassword(user: User): Observable<Status> {
    const url = '/user/change-password';
    return this.http.post<Status>(url, user, this.httpOptions)
      .pipe(
        tap(val => {
          if (val.status === 'ok') {
            this.isPasswordChanged = true;
          }
          this.log(val.message)}),
        catchError(this.handleError<Status>('changePassword'))
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
  }
}
