import { Component, OnInit } from '@angular/core';

import { HandsetService } from '../handset.service';

@Component({
  selector: 'app-top-ad',
  templateUrl: './top-ad.component.html',
  styleUrls: ['./top-ad.component.css']
})
export class TopAdComponent implements OnInit {

  constructor(
    public handsetService: HandsetService
  ) { }

  ngOnInit() {
  }

}
