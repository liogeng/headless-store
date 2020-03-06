import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-check-type',
  templateUrl: './check-type.component.html',
  styleUrls: ['./check-type.component.css']
})
export class CheckTypeComponent implements OnInit {
  checkTypes = [
    '银行汇款', '邮局汇款',  '微信支付'
  ];

  checkTypeForm = this.fb.group({
    type: ['', Validators.required]
  });

  get type() { return this.checkTypeForm.get('type'); }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
