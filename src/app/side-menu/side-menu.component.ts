import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { catogaries } from '../catogaries';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  catogaries = catogaries;
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  filter(word) {
    console.log(word);
    const url = '/products';
    this.router.navigate([url, {
      word: word
    }]);
  }
}
