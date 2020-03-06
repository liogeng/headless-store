import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-menu-item',
  templateUrl: './top-menu-item.component.html',
  styleUrls: ['./top-menu-item.component.css']
})
export class TopMenuItemComponent implements OnInit {
  @Input() items;

  constructor() { }

  ngOnInit(): void {
  }

  close() {}
}
