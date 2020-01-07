---
title: angular-小结
date: 2020-01-06 09:33:57
tags: node
---

源码： https://github.com/jinven/angular-app
演示： https://angular-new.now.sh/

<!-- more -->

# 搭建

## 初始化项目

```sh
# 全局模块
npm install -g @angular/cli
# 帮助信息
ng help
ng generate --help
# 创建项目
ng new angular-app
# 运行项目
cd angular-app
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

## 模板、结构指令

https://angular.cn/guide/template-syntax
https://angular.cn/guide/structural-directives

- `{{ 变量或表达式 }}` 计算并渲染值
- `*ngIf="条件"` 条件为 `true` 时渲染元素，否则不渲染
- `*ngFor="let 项 of 变量"` 数组循环
- `#customerInput`
- `[src]、...、[属性]="变量或表达式"、bind-属性="表达式"` 计算表达式后绑定属性
- `(click)、...、(事件)="方法或语句"、on-事件="语句"` 事件绑定
- `[(属性)]="表达式"、bindon-属性="表达式"` 双向绑定
- `[(ngModel)]="变量"` 用于 `input`、`textare`等表单项的值属性双向绑定，如：`<input [(ngModel)]="name">`
- `(ngSubmit)="方法"` 用于表单提交
- `[ngSwitch]="变量"、*ngSwitchCase="值"` 条件指令，如：`<div [ngSwitch]="'1'"><a *ngSwitchCase="'1'">1</a><a *ngSwitchCase="'2'">2</a></div>`
- `#变量` 模板引用变量，如： `<input value="110" #phone><button (click)="alert(phone.value)">Call</button>`
- `{`{ 变量 | 函数 }`}` 管道，可以多个管道，如： `{`{'ABCDE' | uppercase | lowercase }`}`
- `{`{ 变量！.属性 }`}` 非空断言操作符，当变量不为 `null` 时，取属性，否则为 `null`
- `{`{ $any(变量或表达式) }`}` 类型转换函数，将变量转为 `any` 类型
- `<ng-template>` 渲染 `HTML`
- `<ng-container>` 直接渲染子元素，如 `<ng-container *ngIf="true">text</ng-container`，直接显示文本 `text`，无父元素

### 自定义结构指令

如 `*appUnless="变量"` 是 `*ngIf` 的反义词

```ts
// src/app/unless.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

组件中使用

```html
<p *appUnless="condition" class="unless a">
  (A) This paragraph is displayed because the condition is false.
</p>
<p *appUnless="!condition" class="unless b">
  (B) Although the condition is true,
  this paragraph is displayed because appUnless is set to false.
</p>
```

### 自定义管道

内置的管道： `DatePipe`、`UpperCasePipe`、`LowerCasePipe`、`CurrencyPipe` 和 `PercentPipe`

如： `<p>The hero's birthday is {`{ birthday | date:"MM/dd/yy" }`} </p>`

写一个名叫 `ExponentialStrengthPipe` 的管道

```ts
// src/app/exponential-strength.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
```

在其他组件中使用

```html
<p>Super power boost: { {2 | exponentialStrength: 10} }</p>
```

## 属性指令

如创建一个 `appHighlight`

```html
<p appHighlight>Highlight me!</p>
<p [appHighlight]="'red'">Highlight me!</p>
<p [appHighlight]="'green'">Highlight me!</p>
<p [appHighlight]="'yellow'">Highlight me!</p>
<p [appHighlight] defaultColor="blue">Highlight me!</p>
```

1. 创建指令文件 `src/app/highlight.directive.ts`

```sh
ng generate directive highlight
```

```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  @Input('appHighlight') highlightColor: string;
  @Input() defaultColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

## 组件

### 创建与使用

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

### 生命周期

顺序

- `ngOnChanges()` 设置数据绑定输入属性时响应
- `ngOnInit()` 初始化指令/组件
- `ngDoCheck()` 检测
- `ngAfterContentInit()` 把外部内容投影进组件/指令的视图之后调用
- `ngAfterContentChecked()` 被投影组件内容的变更检测之后调用
- `ngAfterViewInit()` 初始化完组件视图及其子视图之后调用
- `ngAfterViewChecked()` 做完组件视图和子视图的变更检测之后调用
- `ngOnDestroy()` 销毁指令/组件之前调用并清扫

## 表单

https://angular.cn/guide/forms-overview

- `FormControl` 表单控件的值和验证状态
- `FormGroup` 表单控件组的值和状态
- `FormArray` 表单控件数组的值和状态
- `ControlValueAccessor` 和原生 DOM 元素之间创建一个桥梁
- `formControlName` 输入框和 FormGroup 中定义的表单控件绑定起来
- `FormGroupDirective` FormGroup 实例绑定到 DOM 元素
- `FormGroupName` 内嵌的 FormGroup 实例绑定到一个 DOM 元素
- `FormArrayName` 内嵌的 FormArray 实例绑定到一个 DOM 元素
- `FormControlDirective` FormControl 实例绑定到表单控件元素
- `<form #heroForm="ngForm">` 为 form 增补了一些额外特性，监听属性、`valid` 属性

1. 注册 `ReactiveFormsModule`

```ts
// /src/app/app.module.ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({ imports: [ReactiveFormsModule] })
```

2. 生成新控件

`ng generate component NameEditor`

```ts
// /src/app/name-editor/name-editor.component.ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-name-editor',
  template: '<label>Name:<input type="text" [formControl]="name"></label>',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
}
```

3. 其他组件中显示

`<app-name-editor></app-name-editor>`

4. 表单验证

https://angular.cn/guide/form-validation

```ts
ngOnInit(): void {
  this.heroForm = new FormGroup({
    'name': new FormControl(this.hero.name, [
      Validators.required,
      Validators.minLength(4),
      forbiddenNameValidator(/bob/i) 
    ]),
    'alterEgo': new FormControl(this.hero.alterEgo),
    'power': new FormControl(this.hero.power, Validators.required)
  });
}
get name() { return this.heroForm.get('name'); }
get power() { return this.heroForm.get('power'); }
```

```html
<input id="name" class="form-control" formControlName="name" required >
<div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
  <div *ngIf="name.errors.required">Name is required.</div>
  <div *ngIf="name.errors.minlength">Name must be at least 4 characters long.</div>
  <div *ngIf="name.errors.forbiddenName">Name cannot be Bob.</div>
</div>
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

# Service 与 RxJS

## 单一数据服务

`Service` 创建服务提供数据操作能力

如获得登录状态：

创建 `login.service.ts` 数据服务文件

```ts
// /src/app/services/login.service.ts
import { Injectable } from '@angular/core'
@Injectable({ providedIn: 'root' })
export class LoginService {
    private loginState: boolean = false;
    setLogin(state: boolean) {
        this.loginState = state;
    }
    getLogin(): boolean {
        return this.loginState;
    }
    constructor() {}
}
```

在 `app.login.ts` 组件中使用服务进行登录

```ts
// /src/app/pages/app.login.ts
import { LoginService } from '../services/login.service'
export class AppLogin {
  constructor(
    private loginService: LoginService
  ) {}
  submitForm(): void {
    this.loginService.setLogin(true);
  }
}
```

在 组件中使用服务获取登录状态

```ts
// /src/app/components/app.header.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
export class AppHeader implements OnInit {
  isLogin: boolean = false;
  constructor(
    private loginService: LoginService,
  ) {}
  logout() {
    this.loginService.setLogin(false)
  }
  ngOnInit() {
    this.isLogin = loginService.getLogin();
  }
}
```

## RxJS数据服务

以上服务已有的组件状态不会更新，使用 `RxJS` 库创建可观察对象的函数

```ts
// /app/services/login.rxjs.service.ts
import { Injectable, ApplicationRef } from '@angular/core'
import { ReplaySubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class LoginRxjsService {
    private loginState: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    public getLogin(): Observable<boolean> {
        return this.loginState;
    }
    public setLogin(state: boolean) {
        this.loginState.next(state)
    }
    constructor(private ref: ApplicationRef) {}
}

// /src/app/pages/app.login.ts
import { LoginRxjsService } from '../services/login.rxjs.service'
export class AppLogin {
  constructor(
    private loginService: LoginService
  ) {}
  submitForm(): void {
    this.loginRxjsService.setOutput(this.validateForm.value.userName);
  }
}

// /src/app/components/app.header.ts
import { Component, OnInit } from '@angular/core';
import { LoginRxjsService } from '../services/login.rxjs.service'
export class AppHeader implements OnInit {
  isLogin: boolean = false;
  constructor(
    private loginRxjs: LoginRxjsService,
  ) {}
  logout() {
    this.loginRxjs.setLogin(false)
  }
  ngOnInit() {
    this.loginRxjs.getLogin().subscribe((state: boolean) => {
      this.isLogin = state;
    })
  }
}
```

# ngxs/store

https://www.ngxs.io/getting-started/installation

状态管理，类似 `Redux`

```sh
npm install @ngxs/store --save
```

```ts
// /src/app/app.module.ts
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
@NgModule({
  imports: [NgxsModule.forRoot([ZooState])]
})

// /src/app/store/animal.actions.ts
export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public name: string) {}
}

// component
import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';
@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {}
  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name));
    // this.store.dispatch([new AddAnimal('Panda'), new AddAnimal('Zebra')]);
  }
}
```

# ngx-translate国际化（推荐）

1. 安装模块 `npm install --save @ngx-translate/core @ngx-translate/http-loader rxjs`
2. `/src/app/app.module.ts` 文件加入：

```ts
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
```

3. 创建 `/src/assets/i18n/zh.json` 文件，默认位置

```json
{
    "menu": "菜单",
    "title": "标题",
    "text": "文本"
}
```

4. 在需要多语言的组件上添加配置：

```ts
// app.component.ts
import {TranslateService} from '@ngx-translate/core';
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.setDefaultLang('zh');
    }
}
```

```html
<!-- app.component.html -->
<p [translate]="menu"></p>
<p translate>title</p>
<p>{ { 'text' | translate } }</p>
```

# i18n国际化

https://angular.cn/guide/i18n

以中文、英文为例：

1. 在要多语言的标签上加上 `i18n` 属性，一般定义一个id，如： `<p i18n="@@helloWorld">hello, world!</p>`
2. 生成英文语言文件，一般放在 `/src/locale` 目录中，执行命令： `ng xi18n --output-path src/locale` 
3. 生成中文语言文件，执行命令： `ng xi18n --output-path src/locale --i18n-locale zh --out-file messages.zh.xlf`
4. 在 `messages.zh.xlf` 中 `<trans-unit id="helloWorld">` 的 `<source>` 下新增一行 `<target>你好，世界！</target>`
5. 在 `angular.json` 中新增翻译配置

```json
{
    "project": {
        "项目名称": {
            "architect": {
                "build": {
                    "configurations": {
                        "production-zh": {
                            "fileReplacements": [
                                {
                                    "replace": "src/environments/environment.ts",
                                    "with": "src/environments/environment.prod.ts"
                                }
                            ],
                            "optimization": true,
                            "outputHashing": "all",
                            "sourceMap": false,
                            "extractCss": true,
                            "namedChunks": false,
                            "aot": true,
                            "extractLicenses": true,
                            "vendorChunk": false,
                            "buildOptimizer": true,
                            "outputPath": "dist/my-project-zh/",
                            "i18nFile": "src/locale/messages.zh.xlf",
                            "i18nFormat": "xlf",
                            "i18nLocale": "zh",
                            "i18nMissingTranslation": "error"
                        },
                        "zh": {
                            "aot": true,
                            "outputPath": "dist/my-project-zh/",
                            "i18nFile": "src/locale/messages.zh.xlf",
                            "i18nFormat": "xlf",
                            "i18nLocale": "zh",
                            "i18nMissingTranslation": "error"
                        }
                    }
                },
                "serve": {
                    "configurations": {
                        "production": {
                            "browserTarget": "项目名称:build:production"
                        },
                        "zh": {
                            "browserTarget": "项目名称:build:zh"
                        }
                    }
                }
            }
        }
    }
}
```

6. 在 `package.json` 文件的 `scripts` 加入 `"start:zh": "ng serve --configuration=zh"`，执行命令： `npm run start:zh`
