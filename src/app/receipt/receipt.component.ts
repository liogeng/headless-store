import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  receipt: string;
  constructor() { }

  ngOnInit(): void {
    this.receipt = localStorage.getItem('receipt') || '';
  }
  canDeactivate(): Observable<boolean> | boolean {
    localStorage.setItem('receipt', this.receipt);
    return true;
  }
}
