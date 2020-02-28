import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HandsetService } from '../handset.service';
import { ProductService } from '../product.service';
import { Group } from '../group';
import { timeInterval } from 'rxjs/operators';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  searchForm: FormGroup;
  groups: Group[];
  topMenu: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    public handsetService: HandsetService
  ) { }



  ngOnInit() {
    this.searchForm = new FormGroup({
      word: new FormControl('', [
        // Validators.required
      ])
    });

    this.getGroups();
  }

  search() {
    const url = '/products';
    this.router.navigate([url, {
      word: this.searchForm.get('word').value.trim()
    }]);
  }

  getGroups() {
    this.productService.getGroups()
      .subscribe(groups => {
        this.groups = groups;
        this.topMenu = this.setMenu(groups);
      });
  }

  setMenu(groups: Group[]) {
    let topMenu = [];
    for (let item of groups) {
      if (item.group_name == '期刊') {
        topMenu.push(
          {
            title: item.group_name,
            items: [{
              name: '农村电气化',
              link: { word: '农村电气化' }
            },
            {
              name: '农电管理',
              link: { word: '农电管理' }
            }]
          }
        );
      }
      if (item.group_name == '书籍') {
        topMenu.push(
          {
            title: item.group_name,
            items: [{
              name: '专业发展报告',
              link: { word: '专业发展报告' }
            },
            {
              name: '专题技术报告',
              link: { word: '专题技术报告' }
            },
            {
              name: '其他',
              link: { word: '目录|财务' }
            }]
          }
        );
      }
      if (item.group_name == '标准') {
        topMenu.push(
          {
            title: item.group_name,
            items: [{
              name: '光伏',
              link: { word: '光伏' }
            },
            {
              name: '变电',
              link: { word: '变电' }
            },
            {
              name: '输电',
              link: { word: '输电' }
            },
            {
              name: '配电',
              link: { word: '配电' }
            },
            {
              name: '开关',
              link: { word: '开关|断路器' }
            },
            {
              name: '配电',
              link: { word: '配电' }
            },
            {
              name: '变压器',
              link: { word: '变压器' }
            },
            {
              name: '通信',
              link: { word: '通信' }
            },
            {
              name: '通信',
              link: { word: '通信' }
            },
            {
              name: '通信',
              link: { word: '通信' }
            }]
          }
        );
      }
    }
    return topMenu;

  }

}
