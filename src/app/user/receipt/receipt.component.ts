import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

// import { Observable } from 'rxjs';
import { ReceiptService } from '../receipt.service';
import { Receipt } from '../receipt';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  receiptForm = this.fb.group(
    {
      title: ['', Validators.required],
      id: ['', Validators.required],
      bank: ['', Validators.required],
      account: ['', Validators.required],
      address: [''],
      phone: ['']
    }
  );
  receipt: Receipt;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService
  ) { }

  ngOnInit(): void {
    // this.receipt = localStorage.getItem('receipt') || '';
    this.getReceipt();
  }

  get title() { return this.receiptForm.get('title'); }
  get id() { return this.receiptForm.get('id'); }
  get bank() { return this.receiptForm.get('bank'); }
  get account() { return this.receiptForm.get('account'); }
  get address() { return this.receiptForm.get('address'); }
  get phone() { return this.receiptForm.get('phone'); }

  // canDeactivate(): Observable<boolean> | boolean {
  //   // localStorage.setItem('receipt', this.receipt);
  //   return true;
  // }
  getReceipt(): void {
    this.receiptService.getReceipt().subscribe(
      receipt => {
        if (receipt) {
          this.receipt = receipt;
          this.setValues(this.receipt);
        }
      }
    );
  }

  setValues(receipt) {
    this.receiptForm.setValue({
      title: receipt.title,
      id: receipt.id,
      bank: receipt.bank,
      account: receipt.account,
      address: receipt.address,
      phone: receipt.phone,
    })
  }

  saveReceipt() {
    if (this.receiptForm.touched && this.receiptForm.dirty) {
      this.receiptService.saveReceipt(this.receiptForm.value).subscribe(() => { });
    }
  }

}
