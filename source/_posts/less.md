---
title: less
date: 2019-12-01 00:41:00
tags: 
- css
---

一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

<!-- more -->

```sh
npm install -g less
lessc styles.less
lessc styles.less styles.css
lessc --clean-css styles.less styles.min.css
```

# 用法

代码用法

```js
var less = require('less');
less.render('.class { width: (1 + 1) }', function (e, output) {
  console.log(output.css);
});
// .class {
//   width: 2;
// }
```

配置

```js
var less = require('less');

less.render('.class { width: (1 + 1) }', {
  paths: ['.', './lib'],  // Specify search paths for @import directives
  filename: 'style.less', // Specify a filename, for better error messages
  compress: true          // Minify CSS output
}, function (e, output) {
  console.log(output.css);
});
```

浏览器端用法

```html
<!-- 确保 .less 在 less.js 前 -->
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<!-- 选项，确保在 less.js 前 -->
<script>
  less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: false,
    rootpath: ":/a.com/"
  };
</script>
<script src="less.js" type="text/javascript"></script>
```

或者

```html
<script src="less.js" data-poll="1000" data-relative-urls="false"></script>
<link data-dump-line-numbers="all" data-global-vars='{ myvar: "#ddffee", mystr: "\"quoted\"" }' rel="stylesheet/less" type="text/css" href="less/styles.less">
```

cdn 

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js"></script>
```

# 规则

```less
@base: #f938ab;
.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
```

=>

```css
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}
.box div {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
```

## 变量

```less
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);
#header {
  color: @light-blue;
}
a {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
@my-selector: banner;
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
@images: "../img";
body {
  background: url("@{images}/white-sand.png");
}
```

=>

```css
#header {
  color: #6c94be;
}
a {
  color: #428bca;
}
a:hover{
  color: #3071a9;
}
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
body{
  background: url("../img/white-sand.png")
}
```

属性

```less
@property: color;
.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
@fnord:  "I am fnord.";
@var:    "fnord";
content: @@var;
```

=>

```css
.widget {
  color: #0ee;
  background-color: #999;
}
content: "I am fnord.";
```

懒加载

```less
.lazy-eval {
  width: @var;
}
@var: @a;
@a: 9%;
```

=>

```css
.lazy-eval-scope {
  width: 9%;
}
```

默认变量

```less
// library
@base-color: green;
@dark-color: darken(@base-color, 10%);
// use of library
@import "library.less";
@base-color: red;
```

## 层叠

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
.clearfix {
  display: block;
  zoom: 1;
  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
.screen-color {
  @media screen {
    color: green;
    @media (min-width: 768px) {
      color: red;
    }
  }
  @media tv {
    color: black;
  }
}
#a {
  color: blue;
  @font-face {
    src: made-up-url;
  }
  padding: 2 2 2 2;
}
```

=>

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
.clearfix {
  display: block;
  zoom: 1;
}
.clearfix:after {
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
@media screen {
  .screen-color {
    color: green;
  }
}
@media screen and (min-width: 768px) {
  .screen-color {
    color: red;
  }
}
@media tv {
  .screen-color {
    color: black;
  }
}
#a {
  color: blue;
}
@font-face {
  src: made-up-url;
}
#a {
  padding: 2 2 2 2;
}
```

## 操作

```less
// numbers are converted into the same units
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is 1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // result is 4px

// example with variables
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%

@base: 2cm * 3mm; // result is 6cm

@color: #224488 / 2; //results in #112244
background-color: #112244 + #111; // result is #223355
```

## 转义

```less
.weird-element {
  content: ~"^//* some horrible but needed css hack";
}
```

=>

```css
.weird-element {
  content: ^//* some horrible but needed css hack;
}
```

## 函数

```less
@base: #f04615;
@width: 0.5;
.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

## 命名空间和访问器

```less
#bundle {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white
    }
  }
  .tab { ... }
  .citation { ... }
}
#header a {
  color: orange;
  #bundle > .button;
}
```

## 作用域

```less
@var: red;
#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
@var: red;
#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

## 注释

```less
/* One hell of a block
style comment! */
@var: red;

// Get in line!
@var: white;
```

## Importing

```less
@import "library"; // library.less
@import "typo.css";
@themes: "../../src/themes";
@import "@{themes}/tidal-wave.less";
```

## 扩展

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```

=>

```css
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

```less
.a:extend(.b) {}
// the above block does the same thing as the below block
.a {
  &:extend(.b);
}
.c:extend(.d all) {
  // extends all instances of ".d" e.g. ".x.d" or ".d.x"
}
.c:extend(.d) {
  // extends only instances where the selector will be output as just ".d"
}
.e:extend(.f) {}
.e:extend(.g) {}
// the above an the below do the same thing
.e:extend(.f, .g) {}
.big-division,
.big-bag:extend(.bag),
.big-bucket:extend(.bucket) {
  // body
}
pre:hover,
.some-class {
  &:extend(div pre);
}
pre:hover:extend(div pre),
.some-class:extend(div pre) {}
```

### 扩展层叠

```less
.bucket {
  tr { // nested ruleset with target selector
    color: blue;
  }
}
.some-class:extend(.bucket tr) {} // nested ruleset is recognized
```

=>

```css
.bucket tr,
.some-class {
  color: blue;
}
```

```less
.bucket {
  tr & { // nested ruleset with target selector
    color: blue;
  }
}
.some-class:extend(tr .bucket) {} // nested ruleset is recognized
```

=>

```css
tr .bucket,
.some-class {
  color: blue;
}
```

```less
*.class {
  color: blue;
}
.noStar:extend(.class) {}
link:hover:visited {
  color: blue;
}
.selector:extend(link:visited:hover) {}
```

=>

```css
*.class {
  color: blue;
}
link:hover:visited {
  color: blue;
}
```

### nth表单式

```less
:nth-child(1n+3) {
  color: blue;
}
.child:extend(:nth-child(n+3)) {}
[title=identifier] {
  color: blue;
}
[title='identifier'] {
  color: blue;
}
[title="identifier"] {
  color: blue;
}
.noQuote:extend([title=identifier]) {}
.singleQuote:extend([title='identifier']) {}
.doubleQuote:extend([title="identifier"]) {}
```

=>

```css
:nth-child(1n+3) {
  color: blue;
}
[title=identifier],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}
[title='identifier'],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}
[title="identifier"],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}
```

### 扩展全部

```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}
.replacement:extend(.test all) {}
@variable: .bucket;
@{variable} { // interpolated selector
  color: blue;
}
.some-class:extend(.bucket) {} // does nothing, no match is found
```

=>

```css
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
.bucket {
  color: blue;
}
```

### @media

```less
@media print {
  .screenClass:extend(.selector) {} // extend inside media
  .selector { // this will be matched - it is in the same media
    color: black;
  }
}
.selector { // ruleset on top of style sheet - extend ignores it
  color: red;
}
@media screen {
  .selector {  // ruleset inside another media - extend ignores it
    color: blue;
  }
}
```

=>

```css
@media print {
  .selector,
  .screenClass { /*  ruleset inside the same media was extended */
    color: black;
  }
}
.selector { /* ruleset on top of style sheet was ignored */
  color: red;
}
@media screen {
  .selector { /* ruleset inside another media was ignored */
    color: blue;
  }
}
```

```less
@media screen {
  .screenClass:extend(.selector) {} // extend inside media
  @media (min-width: 1023px) {
    .selector {  // ruleset inside nested media - extend ignores it
      color: blue;
    }
  }
}
```

=>

```css
@media screen and (min-width: 1023px) {
  .selector { /* ruleset inside another nested media was ignored */
    color: blue;
  }
}
```

```less
@media screen {
  .selector {  /* ruleset inside nested media - top level extend works */
    color: blue;
  }
  @media (min-width: 1023px) {
    .selector {  /* ruleset inside nested media - top level extend works */
      color: blue;
    }
  }
}
.topLevel:extend(.selector) {} /* top level extend matches everything */
```

=>

```css
@media screen {
  .selector,
  .topLevel { /* ruleset inside media was extended */
    color: blue;
  }
}
@media screen and (min-width: 1023px) {
  .selector,
  .topLevel { /* ruleset inside nested media was extended */
    color: blue;
  }
}
```

### 重复检测

```less
.alert-info,
.widget {
  /* declarations */
}
.alert:extend(.alert-info, .widget) {}
```

=>

```css
.alert-info,
.widget,
.alert,
.alert {
  /* declarations */
}
```

## 混合 Mixins

```less
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div {
  .mixin(#008000);
}
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```

=>

```css
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
button:hover {
  border: 1px solid red;
}
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

## 混合函数

```less
.mixin() {
  @width:  100%;
  @height: 200px;
}
.caller {
  .mixin();
  width:  @width;
  height: @height;
}
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}
div {
  .average(16px, 50px); // "call" the mixin
  padding: @average;    // use its "return" value
}
.mixin() {
  @size: in-mixin;
  @definedOnlyInMixin: in-mixin;
}
.class {
  margin: @size @definedOnlyInMixin;
  .mixin();
}
@size: globaly-defined-value; // callers parent scope - no protection
.unlock(@value) { // outer mixin
  .doSomething() { // nested mixin
    declaration: @value;
  }
}
#namespace {
  .unlock(5); // unlock doSomething mixin
  .doSomething(); //nested mixin was copied here and is usable
}
```

=>

```css
.caller {
  width:  100%;
  height: 200px;
}
div {
  padding: 33px;
}
.class {
  margin: in-mixin in-mixin;
}
#namespace {
  declaration: 5;
}
```

## 将规则集传递到混合

```less
// declare detached ruleset
@detached-ruleset: { background: red; };
// use detached ruleset
.top {
    @detached-ruleset(); 
}
.desktop-and-old-ie(@rules) {
  @media screen and (min-width: 1200) { @rules(); }
  html.lt-ie9 &                       { @rules(); }
}
header {
  background-color: blue;
  .desktop-and-old-ie({
    background-color: red;
  });
}
@my-ruleset: {
  .my-selector {
    @media tv {
      background-color: black;
    }
  }
};
@media (orientation:portrait) {
    @my-ruleset();
}
// detached ruleset with a mixin
@detached-ruleset: { 
    .mixin() {
        color:blue;
    }
};
// call detached ruleset
.caller {
    @detached-ruleset(); 
    .mixin();
}
```

=>

```css
.top {
  background: red;
}
header {
  background-color: blue;
}
@media screen and (min-width: 1200) {
  header {
    background-color: red;
  }
}
html.lt-ie9 header {
  background-color: red;
}
@media (orientation: portrait) and tv {
  .my-selector {
    background-color: black;
  }
}
.caller {
  color: blue;
}
```

### 局部

```less
@detached-ruleset: {
  caller-variable: @caller-variable; // variable is undefined here
  .caller-mixin(); // mixin is undefined here
};
selector {
  // use detached ruleset
  @detached-ruleset(); 
  // define variable and mixin needed inside the detached ruleset
  @caller-variable: value;
  .caller-mixin() {
    variable: declaration;
  }
}
@variable: global;
@detached-ruleset: {
  // will use global variable, because it is accessible
  // from detached-ruleset definition
  variable: @variable; 
};
selector {
  @detached-ruleset();
  @variable: value; // variable defined in caller - will be ignored
}
#space {
  .importer-1() {
    @detached: { scope-detached: @variable; }; // define detached ruleset
  }
}
.importer-2() {
  @variable: value; // unlocked detached ruleset CAN see this variable
  #space > .importer-1(); // unlock/import detached ruleset
}
.use-place {
  .importer-2(); // unlock/import detached ruleset second time
   @detached();
}
```

=>

```css
selector {
  caller-variable: value;
  variable: declaration;
}
selector {
  variable: global;
}
.use-place {
  scope-detached: value;
}
```

## 导入指令

```less
.foo {
  background: #900;
}
@import "this-is-valid.less";
@import "foo";      // foo.less is imported
@import "foo.less"; // foo.less is imported
@import "foo.php";  // foo.php imported as a less file
@import "foo.css";  // statement left in place, as-is
```

导入选项

- `reference`: use a Less file but do not output it
- `inline`: include the source file in the output but do not process it
- `less`: treat the file as a Less file, no matter what the file extension
- `css`: treat the file as a CSS file, no matter what the file extension
- `once`: only include the file once (this is default behavior)
- `multiple`: include the file multiple times
- `optional`: continue compiling when file is not found

## 混入守卫

```less
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}
.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }
```

=>

```css
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

## CSS守卫

```less
.my-optional-style() when (@my-option = true) {
  button {
    color: white;
  }
}
.my-optional-style();
button when (@my-option = true) {
  color: white;
}
& when (@my-option = true) {
  button {
    color: white;
  }
  a {
    color: blue;
  }
}
```

## 循环

```less
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}
div {
  .loop(5); // launch the loop
}
.generate-columns(4);
.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
```

=>

```css
div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

## 合并

```less
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}
```

=>

```css
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

### 空间

```less
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
```

=>

```css
.myclass {
  transform: scale(2) rotate(15deg);
}
```

## 父选择器

```less
a {
  color: blue;
  &:hover {
    color: green;
  }
}
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }
  &-custom {
    background-image: url("custom.png");
  }
}
```

=>

```css
a {
  color: blue;
}
a:hover {
  color: green;
}
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```

### &

```less
.link {
  & + & {
    color: red;
  }
  & & {
    color: green;
  }
  && {
    color: blue;
  }
  &, &ish {
    color: cyan;
  }
}
.grand {
  .parent {
    & > & {
      color: red;
    }
    & & {
      color: green;
    }
    && {
      color: blue;
    }
    &, &ish {
      color: cyan;
    }
  }
}
.header {
  .menu {
    border-radius: 5px;
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}
p, a, ul, li {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}
```

=>

```css
.link + .link {
  color: red;
}
.link .link {
  color: green;
}
.link.link {
  color: blue;
}
.link, .linkish {
  color: cyan;
}
.grand .parent > .grand .parent {
  color: red;
}
.grand .parent .grand .parent {
  color: green;
}
.grand .parent.grand .parent {
  color: blue;
}
.grand .parent,
.grand .parentish {
  color: cyan;
}
.header .menu {
  border-radius: 5px;
}
.no-borderradius .header .menu {
  background-image: url('images/button-background.png');
}
p,
a,
ul,
li {
  border-top: 2px dotted #366;
}
p + p,
p + a,
p + ul,
p + li,
a + p,
a + a,
a + ul,
a + li,
ul + p,
ul + a,
ul + ul,
ul + li,
li + p,
li + a,
li + ul,
li + li {
  border-top: 0;
}
```

# 函数手册

http://lesscss.org/functions/

## 杂项函数

- `color`
- `image-size`
- `image-width`
- `image-height`
- `convert`
- `data-uri`
- `default`
- `unit`
- `get-unit`
- `svg-gradient`

## 字符串函数

- `escape`
- `e`
- `%` format
- `replace`

## 列表函数

- `length`
- `extract`

## 数学函数

- `ceil`
- `floor`
- `percentage`
- `round`
- `sqrt`
- `abs`
- `sin`
- `asin`
- `cos`
- `acos`
- `tan`
- `atan`
- `pi`
- `pow`
- `mod`
- `min`
- `max`

## 类型函数

- `isnumber`
- `isstring`
- `iscolor`
- `iskeyword`
- `isurl`
- `ispixel`
- `isem`
- `ispercentage`
- `isunit`
- `isruleset`

## 颜色定义函数

- `rgb`
- `rgba`
- `argb`
- `hsl`
- `hsla`
- `hsv`
- `hsva`

## 颜色通道函数

- `hue`
- `saturation`
- `lightness`
- `hsvhue`
- `hsvsaturation`
- `hsvvalue`
- `red`
- `green`
- `blue`
- `alpha`
- `luma`
- `luminance`

## 颜色操作函数

- `saturate`
- `desaturate`
- `lighten`
- `darken`
- `fadein`
- `fadeout`
- `fade`
- `spin`
- `mix`
- `tint`
- `shade`
- `greyscale`
- `contrast`

## 颜色混合函数

- `multiply`
- `screen`
- `overlay`
- `softlight`
- `hardlight`
- `difference`
- `exclusion`
- `average`
- `negation`
