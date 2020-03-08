import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../auth.service';
import { User } from '../auth';
import { CartService } from 'src/app/user/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: User;
  hide = true;
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('emailFormControl');
  }

  get password() {
    return this.loginForm.get('passwordFormControl');
  }

  login() {
    // console.log(this.email.value);
    const email = this.email.value.trim().toLowerCase();
    const password = Md5.hashStr(email + Md5.hashStr(Md5.hashStr(this.password.value.trim()).toString()).toString()).toString();
    this.user = { email: email, password: password };

    this.authService.login(this.user).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/home';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  closeSide() {
    this.cartService.openSide = false;

  }
}
