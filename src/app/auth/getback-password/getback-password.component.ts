import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../auth';

@Component({
  selector: 'app-getback-password',
  templateUrl: './getback-password.component.html',
  styleUrls: ['./getback-password.component.css']
})
export class GetbackPasswordComponent implements OnInit {
  user: User;
  getbackPasswordForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getbackPasswordForm = new FormGroup({
      emailFormControl: new FormControl ('', [
        Validators.required,
        Validators.email,
      ])
    })
  }

  get email() { return this.getbackPasswordForm.get('emailFormControl'); }

  getbackPassword(){
    const email = this.email.value.trim().toLowerCase();
    this.user = {email: email};
    this.authService.getbackPassword(this.user).subscribe();
  }
}
