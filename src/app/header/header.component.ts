import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      word: new FormControl('', [
        Validators.required
      ])
    });
  }

  get word() {
    return this.searchForm.get('word');
  }

  search() {
    console.log(this.word.value)
  }
}
