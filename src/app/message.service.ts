import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  constructor(public snackBar: MatSnackBar) { }

  add(message: string) {
    this.messages.push(message);
    this.snackBar.open(message, '通知', {
      duration: 400,
    });
  }

  clear() {
    this.messages = [];
  }
}
