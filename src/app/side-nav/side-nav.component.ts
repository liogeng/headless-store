import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HandsetService } from '../handset.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  searchForm: FormGroup;

  constructor(
    private router: Router,
    public handsetService: HandsetService
    ) {}



  ngOnInit() {
    this.searchForm = new FormGroup({
      word: new FormControl('', [
        // Validators.required
      ])
    });


  }

 search() {
   const url = '/products';
   this.router.navigate([url, {
    word: this.searchForm.get('word').value.trim()
   }]);
 }


}
