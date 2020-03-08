import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HandsetService } from '../handset.service';
import { ProductService } from '../shop/product.service';
import { Group } from '../shop/group';
import { CartService } from '../user/cart.service';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  searchForm: FormGroup;
  groups$: Observable<Group[]>;
  topMenu: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    public authService: AuthService,
    public cartService: CartService,
    public handsetService: HandsetService,
  ) { }



  ngOnInit() {
    this.searchForm = new FormGroup({
      word: new FormControl('', [
        // Validators.required
      ])
    });
    this.groups$ = this.productService.getGroups();
  }

  closeSide() {
    this.router.navigate([{ outlets: { side: null }}]);
  }

  search() {
    const url = '/products';
    this.router.navigate([url, {
      word: this.searchForm.get('word').value.trim()
    }]);
  }

  getGroups() {

  }

  setMenu(groups: Group[]) {
    let topMenu = [];
    for (let item of groups) {
      if (item.group_name == '期刊') {
        topMenu.push(
          {
            title: item.group_name,
            link: '农村电气化|农电管理',
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
            link: '报告|目录|财务',
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
            link: '[^务]规[范程]|[导总]则|术语|技术条件',
            items: [{
              name: '清洁能源',
              link: { word: '光伏|风电|风力' }
            },
            {
              name: '变电',
              link: { word: '变电' }
            },
            {
              name: '输电',
              link: { word: '输电|输变电' }
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
              name: '保护',
              link: { word: '保护' }
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
              name: '信息',
              link: { word: '信息' }
            },
            ]
          }
        );
      }
    }
    return topMenu;

  }

}
