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
  isLoggedIn: boolean = false;
  isPasswordChanged: boolean = false;
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
            localStorage.setItem('jwt_token', val.data.jwt_token);
            this.isLoggedIn = true;
            console.log(this.isLoggedIn);
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
    localStorage.removeItem('jwt_token');
    this.isLoggedIn = false;
  }

  checkLoggedIn(): Observable<Status> {
    this.isLoggedIn = false;
    const jwt_token = localStorage.getItem('jwt_token');
    if (jwt_token) {
      const url = '/user/check-logged-in';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt_token}`})
      }
      return this.http.get<Status>(url, httpOptions)
        .pipe(
          tap(val => {
            if (val.status === 'ok') {
              this.isLoggedIn = true;
            }
          }),
          catchError(this.handleError<Status>('checkLoggedIn'))
        );
    }
  }
}
