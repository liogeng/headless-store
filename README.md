# GuoyuShop

## 项目背景

小规模的网店，须尽可能地减少成本。微信小店提供了网店的基础功能，并开放了API，可以加以利用。为此，开发了网页和微信内均能使用的小店。

商品数据完全是微信小店数据。用户、订单数据保存在SAE。

用户登录本打算用微信登录，但需要单独申请，比较麻烦，还是自己进行用户管理吧。

经过对几种前端技术的比对，网页前端还是采用了Angular，尽管Angular在从1.0版升级后变得完全不同，但习惯之后还是很好用的。主要完成了用户身分验证、商品展示排序过滤、购物车、地址、开票信息、订单、微信支付等功能。

用户身分验证采用了jwt。

参照[saleor](https://demo.saleor.io/)的DEMO，对网店外观做了一次大修改。

运行实例：[https://wxncdqh.applinzi.com/guoyu-shop](https://wxncdqh.applinzi.com/guoyu-shop)。

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
