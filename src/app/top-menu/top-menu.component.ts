import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';

import { TopMenuService } from '../top-menu.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class TopMenuComponent implements OnInit {


  @Input() menu: any;
  @Input() baseUrl: string;

  constructor(
    private topMenuService: TopMenuService
  ) { }



  ngOnInit(): void {

  }


  open() {
    this.topMenuService.open();

  }



}
