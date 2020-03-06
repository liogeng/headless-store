import { Component, OnInit, Input } from '@angular/core';
import { ProductElement } from '../product-element';
import { Group } from '../group';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() product: ProductElement;
  @Input() group: Group;
  // @Input() colorBright: string;
  // @Input() colorNomal: string;

  color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
