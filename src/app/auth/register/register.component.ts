import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../auth.service';
import { User } from '../auth';

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('passwordFormControl');
  const checkPassword = control.get('checkPasswordFormControl');

  if (password.value !== checkPassword.value) {
    checkPassword.setErrors({ 'identityRevealed': true })
  }
  else {
    return null;
  }
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService,) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      checkPasswordFormControl: new FormControl('', [
        Validators.required,
      ]),
    },
    { validators: identityRevealedValidator }
    );
  }

  get email() { return this.registerForm.get('emailFormControl'); }
  get password() { return this.registerForm.get('passwordFormControl'); }
  get checkPassword() { return this.registerForm.get('checkPasswordFormControl'); }



  register() {
    const email = this.email.value.trim().toLowerCase();
    const password = Md5.hashStr(email + Md5.hashStr(Md5.hashStr(this.password.value.trim()).toString()).toString()).toString();
    this.user = { email: email, password: password };

    this.authService.register(this.user).subscribe(() => {});
  }
}
