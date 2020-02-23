import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../auth.service';
import { User } from '../user';


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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  changePasswordForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
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

  get email() { return this.changePasswordForm.get('emailFormControl'); }
  get password() { return this.changePasswordForm.get('passwordFormControl'); }
  get checkPassword() { return this.changePasswordForm.get('checkPasswordFormControl'); }

  changePassword() {
    const uid = this.route.snapshot.queryParamMap.get('uid');
    const  code = this.route.snapshot.queryParamMap.get('code');
    const email = this.email.value.trim().toLowerCase();
    const password = Md5.hashStr(email + Md5.hashStr(Md5.hashStr(this.password.value.trim()).toString()).toString()).toString();
    this.user = {
      uid: uid,
      email: email,
      password: password,
      code: code
     };

    this.authService.changePassword(this.user).subscribe(() => {
      if (this.authService.isPasswordChanged) {
      this.router.navigateByUrl('/login');
      }
    });
  }

}
