---
title: angular-小结
date: 2020-01-06 09:33:59
tags:
---

# 搭建

源码： https://github.com/jinven/angular-app
演示： https://angular-app.now.sh

## 初始化项目

```sh
# 全局模块
npm install -g @angular/cli
# 帮助信息
ng help
ng generate --help
# 创建项目
ng new my-frist-project
# 运行项目
cd my-first-project
ng serve
# 或
npm start
```

## 安装 eslint

```
npm install --save-dev eslint
npm install --save-dev eslint-plugin-angular
npm install --save-dev @typescript-eslint/eslint-plugin@latest
npm install --save-dev @typescript-eslint/parser@latest
npx eslint --init
```

在 `package.json` 文件中添加

```json
{
    "scripts": {
        "eslint": "eslint --ext .js,.ts --ignore-path .gitignore .",
        // 或者指定ts： eslint src/**/*.ts
        // 修复不规范
        "eslint-fix": "eslint --ext .js,.ts --ignore-path .gitignore . --fixed"
    }
}
```

## 安装 prettier

```sh
npm install --save-dev prettier
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier
```

`.eslintrc.js` 文件中添加配置

```js
module.exports = {
    "extends": [
        // 此配置会出现 '***' is defined but never used  no-unused-vars 问题
        // "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "plugins": [
        "prettier"
    ],
    "rules": {
        // 禁止使用 console: 0 = off, 1 = warn, 2 = error
        "no-console": 1,
        "indent": ["error", 2, {
            "SwitchCase": 1
        }],
        // https://prettier.io/
        "prettier/prettier": [
          "error",
          {
            // auto lf(\n) crlf(\r\n) cr(\r)
            "endOfLine": "crlf",
            "singleQuote": true,
            "trailingComma": "none",
            "bracketSpacing": true,
            "printWidth": 300,
            // 句尾添加分号
            "prettier.semi": true,
            "jsxBracketSameLine": true,
            "tabWidth": 4,
            // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
            "trailingComma": "all"
          }
        ]
    }
}
```

## 检查问题

```sh
npm run eslint
```

## 安装 ng-zorro-antd

使用 [Ant Design of Angular](https://ng.ant.design/docs/introduce/zh)

```sh
ng add ng-zorro-antd
```

使用双向绑定需要在 `/src/app/app.module.ts` 文件中添加 `FormsModule` 模块：

```ts
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [FormsModule]
})
```



# 使用

## 组件

在 `/src/app/` 下创建一个组件，包含三个文件 `app.home.ts`、`app.home.html`、`app.home.scss`：

- 组件入口：`app.home.ts`

```ts
import { Component } from '@angular/core';
@Component({
    selector: 'app-home',
    templateUrl: './app.home.html',
    styleUrls: ['./app.home.scss'],
})
export class AppHome {
    // 定义一个变量，可在文档中直接使用
    text = 'Welcome';
}
```

- 组件文档： `app.home.html`

```html
<span>{{text}}</span>
```

- 组件样式： `app.home.scss`

```scss
span {
    font-size: 20px;
    font-weight: bold;
}
```

三个文件可写成一个 `app.home.ts` 文件：

```ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  template: `<span>{{text}}</span>`,
  styles: [`
    span {
      font-size: 20px;
      font-weight: bold;
    }
  `]
})
export class AppHome {
  text = 'Welcome';
}
```

使用该组件需在 `src/app/app.module.ts` 中定义

```ts
import { AppHome } from './app.home';
@NgModule({
    declarations: [AppHome]
})
```

然后在其他组件的文档中加入标签：

```html
<app-home></app-home>
```

- `OnInit`：初始化方法的生命周期钩子

```ts
import { OnInit } from '@angular/core';
export class AppHome implements OnInit {
    ngOnInit() {
    }
}
```

- `Input`、`Output`： 标记为输入、输出属性

```ts
// app.product.ts
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-product',
  template: `<span>{{product.name}}</span><button (click)="notify.emit()">Click Me</button>`,
})
export class AppHome implements OnInit {
    @Input() product;
    @Output() notify = new EventEmitter();
}

// app.component.ts
@Component({
  selector: 'app-root',
  template: '<app-product [product]="product" (notify)="onNotify()"></app-product>',
})
export class AppComponent {
    product = {
        name: '手机'
    }
    onNotify() {
        window.alert('ok');
    }
}
```

## 路由

`/src/app/app-routing.module.ts` 文件中配置 `routes`

```ts
import { Routes } from '@angular/router';
import { AppLogin } from './app.login'
import { AppAbout } from './app.about'
const routes: Routes = [
    {
        path: '',
        component: AppLogin
    },
    {
        path: 'login',
        component: AppLogin
    },
    {
        path: 'about',
        component: AppAbout
    }
]
```

`/src/app/app.component.html` 文件中添加路由链接和路由容器

```html
<a routerLink="/login" routerLinkActive="active">登录</a>
<a routerLink="/about" routerLinkActive="active">关于</a>
<router-outlet></router-outlet>
```

# RxJS

对象观察

# Service

# ngxs/store