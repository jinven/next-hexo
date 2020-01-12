---
title: scss
date: 2019-12-29 16:00:10
tags:
- css
---

Sass 是对 CSS 的扩展，允许使用变量、嵌套规则、 mixins、导入等功能， 完全兼容 CSS 语法。

Sass 有两种语法。

第一种被称为 SCSS (Sassy CSS)，是一个 CSS3 语法的扩充版本

第二种比较老的语法：缩排语法（或者就称为 "Sass"）

https://www.npmjs.com/package/sass
https://www.npmjs.com/package/node-sass

```sh
npm install node-sass
```

```js
var sass = require('node-sass')
sass.render({
  file: scss_filename,
  // [, options..]
}, function(err, result) { /*...*/ })
// OR
var result = sass.renderSync({
  data: scss_content
  // [, options..]
});
```

<!-- more -->

例子

```js
var sass = require('node-sass');
sass.render({
  file: '/path/to/myFile.scss',
  data: 'body{background:blue; a{color:black;}}',
  importer: function(url, prev, done) {
    someAsyncFunction(url, prev, function(result){
      done({
        file: result.path,
        contents: result.data
      });
    });
    // OR
    var result = someSyncFunction(url, prev);
    return {file: result.path, contents: result.data};
  },
  includePaths: [ 'lib/', 'mod/' ],
  outputStyle: 'compressed'
}, function(error, result) {
  if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    console.log(result.css.toString());
    console.log(result.stats);
    console.log(result.map.toString());
    // or better
    console.log(JSON.stringify(result.map));
  }
});
// OR
var result = sass.renderSync({
  file: '/path/to/file.scss',
  data: 'body{background:blue; a{color:black;}}',
  outputStyle: 'compressed',
  outFile: '/to/my/output.css',
  sourceMap: true,
  importer: function(url, prev, done) {
    someAsyncFunction(url, prev, function(result){
      done({
        file: result.path,
        contents: result.data
      });
    });
    // OR
    var result = someSyncFunction(url, prev);
    return {file: result.path, contents: result.data};
  }
}));
console.log(result.css);
console.log(result.map);
console.log(result.stats);
```

## 变量

`$`符号标识变量，包括中划线和下划线

- 变量可以在css规则块定义之外存在
- 当变量定义在css规则块内，那么该变量只能在此规则块内使用

支持 6 种主要的数据类型：

- 数字，1, 2, 13, 10px
- 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
- 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
- 布尔型，true, false
- 空值，null
- 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
- maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)

```scss
$nav-color: #F90;
$highlight-color: #F90;
$highlight-outline: 1px solid $highlight-color;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
  border: 1px solid $highlight-color;
  outline: $highlight-outline;
}
```

编译后

```css
nav {
  width: 100px;
  color: #F90;
  border: 1px solid #F90;
  outline: 1px solid #F90;
}
```

## 圆括号

```scss
p {
  width: 1em + (2em * 3);
}
```

=>

```css
p {
  width: 7em;
}
```

## 插值语句

`#{}`

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

```css
p.foo {
  border-color: blue;
}
p {
  font: 12px/30px;
}
```

## @media

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;
@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
```

=>

```css
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px;
  }
}
```

## 嵌套

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
    a {
        color: blue;
        &:hover { 
            color: red
        }
    }
  }
  aside { 
    background-color: #EEE;
    body.ie & { color: green }
  }
}
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
nav, aside {
  a {color: blue}
}
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

编译后

```css
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content article a { color: blue }
#content article a:hover { color: red }
#content aside { background-color: #EEE }
body.ie #content aside { color: green }
.container h1, .container h2, .container h3 { margin-bottom: .8em }
nav a, aside a {color: blue}
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

## 导入SASS文件

`@import`

如： `@import "themes/night-sky";`

### 默认变量值

`!default` 如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值

```scss
$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}
```

如果在导入sass局部文件之前声明了一个$fancybox-width变量，那么局部文件中对$fancybox-width赋值400px的操作就无效。

如果用户没有做这样的声明，则$fancybox-width将默认为400px

### 嵌套导入

如：

```scss
/* _blue-theme.scss */
aside {
  background: blue;
  color: white;
}
```

导入到一个css规则内

```scss
.blue-theme {@import "blue-theme"}
// 生成的结果跟直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```

### 原生的CSS导入

三种情况下会生成原生的CSS@import

- 被导入文件的名字以.css结尾；
- 被导入文件的名字是一个URL地址，由此可用谷歌字体API提供的相应服务；
- 被导入文件的名字是CSS的url()值。

## 静默注释

- `/* ... */`
- `//`

## 混合器

用 `@mixin` 标识符定义，通过 `@include` 使用

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
ul.plain {
  color: #444;
  @include no-bullets;
}
a {
  @include link-colors(blue, red, green);
}
a {
  @include link-colors(
    $normal: blue,
    $visited: green,
    $hover: red
  );
}
```

生成

```css
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

### 默认参数值

```scss
@mixin link-colors($normal,$hover: $normal,$visited: $normal)
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

## 选择器继承

`@extend` 一个选择器可以继承为另一个选择器定义的所有样式

```scss
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

`.seriousError` 不仅会继承 `.error` 自身的所有样式，任何跟 `.error` 有关的组合选择器样式也会被 `.seriousError` 以组合选择器的形式继承

```scss
// 应用到.seriousError a
.error a{
  color: red;
  font-weight: 100;
}
// 应用到hl.seriousError
h1.error {
  font-size: 1.2rem;
}
```

## @at-root

```scss
.parent {
  ...
  @at-root .child { ... }
}
.parent {
  ...
  @at-root {
    .child1 { ... }
    .child2 { ... }
  }
  .step-child { ... }
}
@media print {
  .page {
    width: 8in;
    @at-root (without: media) {
      color: red;
    }
  }
}
```

=>

```css
.parent { ... }
.child { ... }
.parent { ... }
.child1 { ... }
.child2 { ... }
.parent .step-child { ... }
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: red;
}
```

## @debug

```scss
@debug 10em + 12em;
```

=>

```css
Line 1 DEBUG: 22em
```

## @warn、@error

```scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @error "$x may not be unitless, was #{$x}.";
  }
  @if unitless($y) {
    @error "$y may not be unitless, was #{$y}.";
  }
  position: relative; left: $x; top: $y;
}
```

## 占位符选择器

`%foo` 与常用的 id 与 class 选择器写法相似，只是 # 或 . 替换成了 %。必须通过 @extend 指令调用

单独使用时，不会被编译到 CSS 文件中

```scss
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
.notice {
  @extend %extreme;
}
```

=>

```css
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

## 控制指令

### @if

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

编译为

```css
p {
  border: 1px solid;
}
p {
  color: green;
}
```

### @for

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

=>

```scss
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

### @each

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
@each $animal, $color, $cursor in (puma, black, default), (sea-slug, blue, pointer), (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

=>

```css
.puma-icon {
  background-image: url('/images/puma.png');
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
}
.egret-icon {
  background-image: url('/images/egret.png');
}
.salamander-icon {
  background-image: url('/images/salamander.png');
}
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default;
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer;
}
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move;
}
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.2em;
}
```

### @while

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

=>

```css
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

## 函数指令

```scss
$grid-width: 40px;
$gutter-width: 10px;
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}
#sidebar { width: grid-width(5); }
// #sidebar { width: grid-width($n: 5); }
```

=>

```css
#sidebar {
  width: 240px;
}
```

## 输出格式

- :nested 嵌套
- :expanded 更像是手写的样式
- :compact 每条 CSS 规则只占一行，包含其下的所有属性
- :compressed 删除所有无意义的空格、空白行、以及注释，力求将文件体积压缩到最小
