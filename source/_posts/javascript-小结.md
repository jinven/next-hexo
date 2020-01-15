---
title: javascript-小结
date: 2019-12-01 00:00:43
tags:
- javascript
---

一个完整的 JavaScript 实现是由以下 3 个不同部分组成的：

- 核心（ECMAScript）
- 文档对象模型（DOM: Document Object Model）
- 浏览器对象模型（BOM: Browser Object Model）

<!-- more -->

## ECMAScript

并不与任何具体浏览器相绑定，没有用于任何用户输入输出的方法。

可以为不同种类的宿主环境提供核心的脚本编程能力，因此核心的脚本语言是与任何特定的宿主环境分开进行规定的。

Web 浏览器对于 ECMAScript 来说是一个宿主环境，但并不是唯一的宿主环境。

ECMAScript 描述了以下内容：语法、类型、语句、关键字、保留字、运算符、对象

**ECMAScript 仅仅是一个描述**，定义了脚本语言的所有属性、方法和对象。

## DOM

是 HTML 和 XML 的应用程序接口（API）。

DOM 将把整个页面规划成由节点层级构成的文档。

HTML 或 XML 页面的每个部分都是一个节点的衍生物。

## BOM

独立于内容，可以对浏览器窗口进行访问和操作。

可以移动窗口、改变状态栏中的文本以及执行其他与页面内容不直接相关的动作。

它只是 JavaScript 的一个部分，没有任何相关的标准。

- 弹出新的浏览器窗口
- 移动、关闭浏览器窗口以及调整窗口大小
- 提供 Web 浏览器详细信息的定位对象
- 提供用户屏幕分辨率详细信息的屏幕对象
- 对 cookie 的支持
- IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象

每种浏览器都有自己的 BOM 实现: Window 对象、Navigator 对象、Screen 对象、History 对象、Location 对象

# 基本

## 声明/定义

- `var`: 没有块作用域，变量会提升到顶端。
- `let`: 块作用域（Block Scope），在循环中使用的变量没有重新声明循环外的变量，循环内才可见。
- `const`: 常量，与 let 变量类似，但不能重新赋值。
- `class`: 特殊的函数，有两个组成部分：类表达式和类声明。
- `function`: 函数，被设计为执行特定任务的代码块。

## 关键字

break、case、catch、continue、default、delete、do、else、finally、for、if、in、instanceof、new、return、switch、this、throw、try、typeof、void、while、with、debugger、exports、import、static、super、async、wait

### 常用函数

Symbol、Number、Object、Boolean、String、Function、ArrayBuffer、AudioBufferSourceNode、Blob、FileReader、Map、Promise、Range、RegExp、Set、TypeError、Uint8Array、Uint32Array、WeakMap、WeakSet、Worker

## 类型

### 五种可包含值的数据类型

- 字符串（string）
- 数字（number）
- 布尔（boolean）
- 对象（object）
- 函数（function）

### 三种对象类型

- 对象（Object）
- 日期（Date）
- 数组（Array）

### 两种不能包含值的数据类型：

- null
- undefined

### 值

- 原始值

存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。

5 种原始类型：Undefined、Null、Boolean、Number 和 String

- 引用值

存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处。

### 类型判断

#### typeof 

返回下列值之一：

- `undefined` 如果变量是 Undefined 类型的
- `boolean` 如果变量是 Boolean 类型的
- `number` 如果变量是 Number 类型的
- `string` 如果变量是 String 类型的
- `object` 如果变量是一种引用类型或 Null 类型的

#### instanceof 

在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 "object"。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。

```js
var a = new String('a')
var arr = []
console.log(typeof a);              //输出 "object"
console.log(a instanceof String);   //输出 "true"
console.log(typeof arr);            //输出 "object"
console.log(arr instanceof Array);  //输出 "true"
```

#### Object.prototype.toString.call/apply

输出对象的类

- `Object.prototype.toString.call('')`: [object String]
- `Object.prototype.toString.call(1)`: [object Number]
- `Object.prototype.toString.call(null)`: [object Null]
- `Object.prototype.toString.call(undefined)`: [object Undefined]
- `Object.prototype.toString.call({})`: [object Object]
- `Object.prototype.toString.call(Symbol())`: [object Symbol]
- `Object.prototype.toString.call([])`: [object Array]
- `Object.prototype.toString.call(new Function())`: [object Function]
- `Object.prototype.toString.call(new Set())`: [object Set]
- `Object.prototype.toString.call(new Date())`: [object Date]

#### constructor

```js
"Bill".constructor                 // 返回 "function String()  { [native code] }"
(3.14).constructor                 // 返回 "function Number()  { [native code] }"
false.constructor                  // 返回 "function Boolean() { [native code] }"
[1,2,3,4].constructor              // 返回 "function Array()   { [native code] }"
{name:'Bill', age:62}.constructor  // 返回" function Object()  { [native code] }"
new Date().constructor             // 返回 "function Date()    { [native code] }"
function () {}.constructor         // 返回 "function Function(){ [native code] }"
```

## 引用类型

引用类型通常叫做类（class），遇到引用值，所处理的就是对象。

对象是由 new 运算符加上要实例化的对象的名字创建的。

```js
// 不止一个参数时，要求使用括号。
var o = new Object();
// 如果没有参数，如以下代码所示，括号可以省略：
var o = new Object;
var d = new Date;
```

### Object

自身用处不大，ECMAScript 中的所有对象都由这个对象继承而来，Object 对象中的所有属性和方法都会出现在其他对象中。

1. 属性：

- `constructor` 对创建对象的函数的引用（指针）。对于 Object 对象，该指针指向原始的 Object() 函数。
- `Prototype` 对该对象的对象原型的引用。对于所有的对象，它默认返回 Object 对象的一个实例。

2. 方法：

- `hasOwnProperty(property)` 判断对象是否有某个特定的属性。必须用字符串指定该属性。（例如，o.hasOwnProperty("name")）
- `IsPrototypeOf(object)` 判断该对象是否为另一个对象的原型。
- `PropertyIsEnumerable` 判断给定的属性是否可以用 for...in 语句进行枚举。
- `ToString()` 返回对象的原始字符串表示。对于 Object 对象，ECMA-262 没有定义这个值，所以不同的 ECMAScript 实现具有不同的值。
- `ValueOf()` 返回最适合该对象的原始值。对于许多对象，该方法返回的值都与 ToString() 的返回值相同。

#### `__proto__`

已经从 Web 标准中删除

#### constructor

```js
var o = {};
o.constructor === Object;   // true
var o = new Object;
o.constructor === Object;   // true
var a = [];
a.constructor === Array;    // true
var a = new Array;
a.constructor === Array     // true
var n = new Number(3);
n.constructor === Number;   // true
```

#### assign

将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。

拷贝 symbol 类型的属性。

```js
// Object.assign(target, ...sources)
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };
const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }

// 继承属性和不可枚举属性是不能拷贝的
const obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});
const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }

// 原始类型会被包装为对象
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")
const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// null 和 undefined 会被忽略，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

// 异常会打断后续拷贝任务
const target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。
Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。
console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```

Polyfill

```js
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      let to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          for (let nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
```

#### create

创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

```js
// Object.create(proto[, propertiesObject])
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person);
me.name = "Matthew";
me.isHuman = true;
me.printIntroduction(); // "My name is Matthew. Am I human? true"

// 创建一个原型为null的空对象
Object.create(null);

var o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});

function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码

//创建一个可写的,可枚举的,可配置的属性p
o = Object.create({}, {
  p: {
    value: 42, 
    writable: true,
    enumerable: true,
    configurable: true 
  } 
});
```

- `propertiesObject`

可选。如果没有指定为 undefined，则是要添加到新创建对象的不可枚举（默认）属性对象的属性描述符以及相应的属性名称。

#### defineProperty

在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

```js
// Object.defineProperty(obj, prop, descriptor)
// prop 要定义或修改的属性的名称。
// descriptor 将被定义或修改的属性描述符。
//    configurable 为 true 时，该属性描述符才能够被改变，也能从对应的对象上被删除。默认为 false。
//    enumerable 当且仅当该属性的enumerable为true时，才能够出现在对象的枚举属性中。默认为 false。
//    value 该属性对应的值。任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
//    writable 仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
//    get 给属性提供 getter 的方法，如果没有 getter 则为 undefined。
//    set 给属性提供 setter 的方法，如果没有 setter 则为 undefined。
var obj = {};
Object.defineProperty(obj, 'name', { value: 'n' });

// 使用 __proto__
var obj = {};
var descriptor = Object.create(null); // 没有继承的属性
// 默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);

// 显式
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});

var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable:true });
Object.defineProperty(o, "b", { value : 2, enumerable:false });
Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true
for (var i in o) {    
  console.log(i);             // 'a', 'd'
}
Object.keys(o);               // ["a", "d"]
o.propertyIsEnumerable('a');  // true
o.propertyIsEnumerable('b');  // false
o.propertyIsEnumerable('c');  // false
```

#### defineProperties

直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

```js
// Object.defineProperties(obj, props)
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

#### entries

返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

```js
let obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj));     // [ ['foo', 'bar'], ['baz', 42] ]
let obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(obj));     // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
let anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj));   // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]
let myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj));   // [ ['foo', 'bar'] ]
console.log(Object.entries('foo'));   // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]
let obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`);     // "a 5", "b 7", "c 9"
}
var map = new Map(Object.entries({ foo: "bar", baz: 42 }));
console.log(map);                     // Map { foo: "bar", baz: 42 }
```

#### freeze、isFrozen

冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。

```js
const obj = { prop: 42 };
Object.freeze(obj);
obj.prop = 33;                      // Throws an error in strict mode
console.log(obj.prop);              // expected output: 42
delete obj.prop;                    // false
console.log(obj.prop);              // expected output: 42
console.log(Object.isFrozen(obj));  // true
Object.defineProperty(obj, 'ohai', { value: 17 });  // 抛出 TypeError
Object.setPrototypeOf(obj, { x: 20 });              // 抛出 TypeError
```

#### fromEntries

把键值对列表转换为一个对象。

```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
console.log(Object.fromEntries(entries)); // Object { foo: "bar", baz: 42 }
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
console.log(Object.fromEntries(arr));     // { 0: "a", 1: "b", 2: "c" }
const object = Object.fromEntries(Object.entries({ a: 1, b: 2, c: 3 })
  .map(([ key, val ]) => [ key, val * 2 ]));
console.log(object);                      // { a: 2, b: 4, c: 6 }
```

#### getOwnPropertyDescriptor

返回指定对象上一个自有属性对应的属性描述符。

```js
// Object.getOwnPropertyDescriptor(obj, prop)
let o = { get foo() { return 17; } };
let d = Object.getOwnPropertyDescriptor(o, "foo");
// d {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }
```

#### getOwnPropertyDescriptors

获取一个对象的所有自身属性的描述符。

#### getOwnPropertyNames 

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]
```

#### getOwnPropertySymbols

返回一个给定对象自身的所有 Symbol 属性的数组。

```js
var obj = {};
var symbol = Symbol();
obj[symbol] = 123;
Object.getOwnPropertySymbols(obj);
```

#### getPrototypeOf

返回指定对象的原型（内部`[[Prototype]]`属性的值）。

```js
const prototype1 = {};
const object1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(object1) === prototype1); // true
var reg = /a/;
Object.getPrototypeOf(reg) === RegExp.prototype;            // true
```

#### is

判断两个值是否是相同的值。

```js
// Object.is(value1, value2);
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true
Object.is('foo', 'bar');     // false
Object.is([], []);           // false
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false
Object.is(null, null);       // true
// 特例
Object.is(0, -0);            // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

#### isExtensible、preventExtensions

- `isExtensible`: 判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
- `preventExtensions`: 让一个对象变的不可扩展。

```js
// Object.isExtensible(obj)
// 新对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty);     // === true
// ...可以变的不可扩展.
Object.preventExtensions(empty);
Object.isExtensible(empty);     // === false
// 密封对象是不可扩展的.
var sealed = Object.seal({});
Object.isExtensible(sealed);    // === false
// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
Object.isExtensible(frozen);    // === false
```

#### isSealed、seal

- `seal`: 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
- `isSealed`: 判断一个对象是否被密封。

```js
var obj = {
  prop: function() {},
  foo: 'bar'
};
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;
var o = Object.seal(obj);
o === obj;                  // true
Object.isSealed(obj);       // true
obj.foo = 'quux';
Object.defineProperty(obj, 'foo', {
  get: function() { return 'g'; }
}); // throws a TypeError
obj.quaxxor = 'the friendly duck';
delete obj.foo;
// will throw TypeErrors.
function fail() {
  'use strict';
  delete obj.foo; // throws a TypeError
  obj.sparky = 'arf'; // throws a TypeError
}
fail();
Object.defineProperty(obj, 'ohai', {
  value: 17
}); // throws a TypeError
Object.defineProperty(obj, 'foo', {
  value: 'eit'
}); // changes existing property value
```


#### keys

会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致。

```js
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr));    // console: ['0', '1', '2']
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj));    // console: ['0', '1', '2']
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj));  // console: ['2', '7', '100']
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj));  // console: ['foo']
```

### Function

[参数个数限制在65536](https://bugs.webkit.org/show_bug.cgi?id=80797)

```js
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 6));   // 8
```

#### arguments

已经从 Web 标准中删除。

无需明确指出参数名，就能访问它们。

`arguments.length`: 参数个数。
`arguments.callee`: 当前正在执行的函数。

```js
// 每个 arg 都是一个参数，最后一个参数是函数主体（要执行的代码）。
// 这些参数必须是字符串。
// ECMAScript 可以接受任意多个参数（最多 25 个）
var function_name = new function(arg1, arg2, ..., argN, function_body)
```

```js
var sayHi = new Function("sName", "sMessage", "alert(\"Hello \" + sName + sMessage);");
// 等同于
function sayHi(sName, sMessage) {
  alert("Hello " + sName + sMessage);
}
// 属性 length 声明了函数期望的参数个数。
console.log(sayHi.length);        //输出 "2"
//  valueOf() 方法和 toString() 方法: 返回的都是函数的源代码，在调试时尤其有用。
console.log(sayHi.toString());    //输出 "2"
```

注意：尽管可以使用 Function 构造函数创建函数，但最好不要使用它，因为用它定义函数比用传统方式要慢得多。

不过，所有函数都应看作 Function 类的实例。

#### length

指明函数的形参个数。

```js
function func1() {}
function func2(a, b) {}
console.log(func1.length); // 0
console.log(func2.length); // 2
```

#### name

函数实例的名称。

```js
(new Function).name;                  // "anonymous"
var f = function() {};
var object = {
  someMethod: function() {}
};
console.log(f.name);                  // "f"
console.log(object.someMethod.name);  // "someMethod"
```

#### prototype 

属性存储了 Function 的原型对象。

#### toString

返回一个表示当前函数源代码的字符串。

#### AOP

```js
var foo = function(value){
  value[0]=2;
  console.log(`call:${value}`); 
  value[0]=3;
}
Function.prototype.before = function(fn){
  var _this = this;
  return function() {
    fn.apply(this,arguments);
    return _this.apply(this,arguments);
  }
}
Function.prototype.after = function(fn){
  var _this = this;
  return function(){
    var r = _this.apply(this,arguments);
    fn.apply(this,arguments);
    return r;
  }
}
foo.before(function(value){
  console.log(`before:${value}`);
}).after(function(value){
  console.log(`after:${value}`);
})([1]);
// before:1
// call:2
// after:3
```

#### call/apply

1. 每个函数都包含两个非继承而来的方法：apply()和call()。
2. 都是在特定的作用域中调用函数。

- `call`: 第一个参数用作 this 的对象。其他参数都直接传递给函数自身。
- `apply`: 有两个参数，用作 this 的对象和要传递给函数的参数的数组。

call、apply、bind的作用是改变函数运行时this的指向

```js
function foo(age, position){
  return `${this.name}: ${age}, ${position}`
}
var obj={
  name: 'a'
}
console.log(foo.call(obj, 20, 'web'))     //a: 20, web
console.log(foo.apply(obj, [20, 'web']))  //a: 20, web
// 等同于
obj.foo=foo;
console.log(obj.foo(20, 'web'))           //a: 20, web
```

#### bind

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}
const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined
const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

```js
// thisArg: 调用绑定函数时作为 this 参数传递给目标函数的值。 
//          如果使用new运算符构造绑定函数，则忽略该值。
//          当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。
//          如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。
// arg1, arg2, ...: 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
// return: 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。

当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}
function addArguments(arg1, arg2) {
  return arg1 + arg2
}
var list1 = list(1, 2, 3);            // [1, 2, 3]
var result1 = addArguments(1, 2);     // 3
// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);
// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37); 
var list2 = leadingThirtysevenList();         // [37]
var list3 = leadingThirtysevenList(1, 2, 3);  // [37, 1, 2, 3]
var result2 = addThirtySeven(5);              // 37 + 5 = 42 
var result3 = addThirtySeven(5, 10);          // 37 + 5 = 42 ，第二个参数被忽略
```

setTimeout

```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}
// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};
LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};
var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法
```

Polyfill

```js
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
```

### Boolean

```js
var oBooleanObject = new Boolean(true);
// 覆盖了 Object 对象的 ValueOf() 方法，返回原始值，即 true 和 false。
// ToString() 方法也会被覆盖，返回字符串 "true" 或 "false"。
var oFalseObject = new Boolean(false);
var bResult = oFalseObject && true;	//输出 true
console.log(Boolean());                     //false
console.log(Boolean(''));                   //false
console.log(Boolean(null));                 //false
console.log(Boolean(undefined));            //false
console.log(Boolean(NaN));                  //false
console.log(Boolean(0));                    //false
console.log(Boolean('hello'));              //true
console.log(Boolean(50));                   //true
console.log(Boolean({}));                   //true
console.log(Boolean([]));                   //true
console.log(Boolean(Infinity));             //true
console.log(Boolean(-Infinity));            //true
```

#### hasOwnProperty

对象自身属性中是否具有指定的属性。

```js
o = new Object();
o.propOne = null;
o.hasOwnProperty('propOne'); // true
o.propTwo = undefined;  
o.hasOwnProperty('propTwo'); // true

o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // true
o.hasOwnProperty('toString');         // false
o.hasOwnProperty('hasOwnProperty');   // false
```

#### isPrototypeOf

一个对象是否存在于另一个对象的原型链上。

```js
function Foo() {}
function Bar() {}
function Baz() {}
Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);
var baz = new Baz();
console.log(Baz.prototype.isPrototypeOf(baz));    // true
console.log(Bar.prototype.isPrototypeOf(baz));    // true
console.log(Foo.prototype.isPrototypeOf(baz));    // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

#### propertyIsEnumerable

表示指定的属性是否可枚举。

```js
var o = {};
var a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';
o.propertyIsEnumerable('prop'); // true
a.propertyIsEnumerable(0);      // true

var a = ['is enumerable'];

a.propertyIsEnumerable(0);            // true
a.propertyIsEnumerable('length');     // false
Math.propertyIsEnumerable('random');  // false
this.propertyIsEnumerable('Math');    // false
```

#### toLocaleString

返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的而重载使用。

#### valueOf

返回指定对象的原始值。

```js
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array);       // true
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
console.log(date.valueOf());                  // 1376838719230
var num =  15.26540;
console.log(num.valueOf());                   // 15.2654
var bool = true;
console.log(bool.valueOf() === bool);         // true
var newBool = new Boolean(true);
console.log(newBool.valueOf() == newBool);    // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
console.log(newBool.valueOf() === newBool);   // false
function foo(){}
console.log( foo.valueOf() === foo );         // true
var foo2 =  new Function("x", "y", "return x + y;");
console.log( foo2.valueOf() );
var obj = {name: "张三", age: 18};
console.log( obj.valueOf() === obj );         // true
var str = "http://www.xyz.com";
console.log( str.valueOf() === str );         // true
var str2 = new String("http://www.xyz.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
console.log( str2.valueOf() === str2 );       // false
```

#### setPrototypeOf

设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

#### values

返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

```js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj));          // ['bar', 42]
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj));          // ['a', 'b', 'c']
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj));       // ['b', 'c', 'a']
var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj));       // ['bar']
console.log(Object.values('foo'));        // ['f', 'o', 'o']
```

### Number

```js
var oNumberObject = new Number(68);
var iNumber = oNumberObject.valueOf();
// 返回的是具有指定位数小数的数字的字符串表示，能表示具有 0 到 20 位小数的数字，超过这个范围的值会引发错误。
console.log(oNumberObject.toFixed(2));      //输出 "68.00"
// 返回的是用科学计数法表示的数字的字符串形式。
console.log(oNumberObject.toExponential(1));//输出 "6.8e+1"
// 返回数字的预定形式或指数形式。它有一个参数，即用于表示数的数字总数（不包括指数）。
console.log(oNumberObject.toPrecision(1));  //输出 "7e+1"
console.log(oNumberObject.toPrecision(2));  //输出 "68"
console.log(oNumberObject.toPrecision(3));  //输出 "68.0"
console.log(oNumberObject.toString(2));     //输出 "1000100"
console.log(oNumberObject.toString(8));     //输出 "104"
console.log(oNumberObject.toString(16));    //输出 "44"
console.log(oNumberObject.toString(36));    //输出 "1w"
console.log(Number.MAX_VALUE);              //输出 1.7976931348623157e+308
console.log(Number.MIN_VALUE);              //输出 5e-324
console.log(Number.POSITIVE_INFINITY);      //输出 Infinity
console.log(Number.NEGATIVE_INFINITY);      //输出 -Infinity
console.log(NaN == NaN);                    //false
console.log(Number());                      //0
console.log(Number(false));                 //0
console.log(Number(true));                  //1
console.log(Number(undefined));             //NaN
console.log(Number(null));                  //0
console.log(Number('1.2'));                 //1.2
console.log(Number('1.2.3'));               //1.2.3
console.log(Number({}));                    //NaN
```

### String

```js
var oStringObject = new String("hello world");
// String 对象的 valueOf() 方法和 toString() 方法都会返回 String 类型的原始值：
console.log(oStringObject.valueOf() == oStringObject.toString());	//输出 "true"
// 和调用 toString() 的不同之处在于，对 null 和 undefined 值强制类型转换可以生成字符串而不引发错误
console.log(new String(null).toString());       //输出 "null"
console.log(String());                          //输出 ""
console.log(String(undefined));                 //输出 "undefined"
console.log(String([]));                        //输出 ""
console.log(String([1, 2, 3]));                 //输出 "1,2,3"
console.log(String({}));                        //输出 "[object Object]"
console.log(String(false));                     //输出 "false"
console.log(String(()=>0));                     //输出 "()=>0"
console.log(String(function(){}));              //输出 "function(){}"
console.log(String([[-1,2,[3]],[4,[5]]]));      //输出 "-1,2,3,4,5"
console.log(oStringObject.charAt(1));	          //输出 "e"
console.log(oStringObject.charCodeAt(1));	      //输出 "101"
console.log(String.fromCharCode(101));	        //输出 "e"
console.log("hello ".concat("world"));	        //输出 "hello world"
console.log(oStringObject.indexOf("o"));		    //输出 "4"
console.log("Blue Whale".indexOf("l", 5));      //输出 8
console.log(oStringObject.lastIndexOf("o"));	  //输出 "7"
console.log("1".padStart(3, "0"));	            //输出 "001"
console.log("1".padEnd(3, "0"));	              //输出 "100"
console.log("yellow".localeCompare("brick"));		//输出 "1"
console.log("yellow".localeCompare("yellow"));	//输出 "0"
console.log("yellow".localeCompare("zoo"));		  //输出 "-1"
console.log(oStringObject.slice(3));		        //输出 "lo world"
console.log(oStringObject.substring(3));		    //输出 "lo world"
console.log(oStringObject.slice(3, 7));		      //输出 "lo w"
console.log(oStringObject.substring(3, 7));	    //输出 "lo w"
console.log(oStringObject.slice(-3));		        //输出 "rld"
console.log(oStringObject.substring(-3));	      //输出 "hello world"
console.log(oStringObject.slice(3, -4));		    //输出 "lo w"
console.log(oStringObject.substring(3, -4));	  //输出 "hel"
console.log(oStringObject.toLocaleUpperCase());	//输出 "HELLO WORLD"
console.log(oStringObject.toUpperCase());		    //输出 "HELLO WORLD"
console.log(oStringObject.toLocaleLowerCase());	//输出 "hello world"
console.log(oStringObject.toLowerCase());		    //输出 "hello world"
console.log(String.raw`\n\5\xxx\uuu\111`);		  //输出 "\n\5\xxx\uuu\111"
var str1 = 'Cats are the best!';
console.log(str1.endsWith('best', 17));         //输出 true
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
console.log(str.match(re));

var greeting = '   Hello world!   ';
console.log(greeting.trim());                   //输出 Hello world!
var str = 'To be, or not to be, that is the question.';
console.log(str.includes('To be'));             //输出 true
```

### Array

#### from

从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

```js
// Array.from(arrayLike[, mapFn[, thisArg]])
// arrayLike  想要转换成数组的伪数组对象或可迭代对象。
// mapFn      可选，如果指定了该参数，新数组中的每个元素会执行该回调函数。
// thisArg    可选，可选参数，执行回调函数 mapFn 时 this 对象。
console.log(Array.from('foo'));                   // ["f", "o", "o"]
console.log(Array.from([1, 2, 3], x => x + x));   // [2, 4, 6]
```

#### isArray

确定传递的值是否是一个 Array。

```js
Array.isArray([1, 2, 3]);   // true
Array.isArray({foo: 123});  // false
Array.isArray("foobar");    // false
Array.isArray(undefined);   // false
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'))
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 
// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype });
```

Polyfill

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

#### of

创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

```js
// Array.of(element0[, element1[, ...[, elementN]]])
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

#### concat

合并两个或多个数组。不会更改现有数组，而是返回一个新数组。

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
console.log(array3);    // ["a", "b", "c", "d", "e", "f"]
```

#### copyWithin

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

```js
// arr.copyWithin(target[, start[, end]])
const array1 = ['a', 'b', 'c', 'd', 'e'];
console.log(array1.copyWithin(0, 3, 4));    // ["d", "b", "c", "d", "e"]
console.log(array1.copyWithin(1, 3));       // ["d", "d", "e", "d", "e"]
[1, 2, 3, 4, 5].copyWithin(-2)              // [1, 2, 3, 1, 2]
[1, 2, 3, 4, 5].copyWithin(0, 3)            // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)         // [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(-2, -3, -1)      // [1, 2, 3, 3, 4]
[].copyWithin.call({length: 5, 3: 1}, 0, 3);// {0: 1, 3: 1, length: 5}
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);                      // Int32Array [3, 4, 5, 4, 5]
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4); // Int32Array [4, 2, 3, 4, 5]
```

#### entries

返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

```js
const array1 = ['a', 'b', 'c'];
const iterator1 = array1.entries();
console.log(iterator1.next().value);  // Array [0, "a"]
console.log(iterator1.next().value);  // Array [1, "b"]
```

#### every

测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```js
const isBelowThreshold = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));    // true
```

#### fill

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```js
// arr.fill(value[, start[, end]])
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));  // [1, 2, 0, 0]
console.log(array1.fill(5, 1));     // [1, 5, 5, 5]
console.log(array1.fill(6));        // [6, 6, 6, 6]
```

#### filter

创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

```js
// var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);    // ["exuberant", "destruction", "present"]
```

#### find

返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```js
// arr.find(callback[, thisArg])
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);   // 12
```

#### findIndex

返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

```js
// arr.findIndex(callback[, thisArg])
const array1 = [5, 12, 8, 130, 44];
const isLargeNumber = (element) => element > 13;
console.log(array1.findIndex(isLargeNumber));     // 3
```

#### flat

会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
// var newArray = arr.flat([depth])
var arr1 = [1, 2, [3, 4]];
arr1.flat();          // [1, 2, 3, 4]
var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();          // [1, 2, 3, 4, [5, 6]]
var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);         // [1, 2, 3, 4, 5, 6]
//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### flatMap

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。

它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

```js
// var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
//     // return element for new_array
// }[, thisArg])
var arr1 = [1, 2, 3, 4];
arr1.map(x => [x * 2]);       // [[2], [4], [6], [8]]
arr1.flatMap(x => [x * 2]);   // [2, 4, 6, 8]
arr1.flatMap(x => [[x * 2]]); // [[2], [4], [6], [8]]
```

#### forEach

对数组的每个元素执行一次提供的函数。

```js
// arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);
const array1 = ['a', 'b', 'c'];
array1.forEach(element => console.log(element));  // "a", "b", "c"
```

#### includes

判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```js
// arr.includes(valueToFind[, fromIndex])
const array1 = [1, 2, 3];
console.log(array1.includes(2));      // true
const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));    // true
console.log(pets.includes('at'));     // false
```

#### indexOf、lastIndexOf

- `indexOf`: 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
- `lastIndexOf`: 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

```js
// arr.indexOf(searchElement[, fromIndex])
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));       // 1
console.log(beasts.indexOf('bison', 2));    // 4
console.log(beasts.indexOf('giraffe'));     // -1

// arr.lastIndexOf(searchElement[, fromIndex])
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
console.log(animals.lastIndexOf('Dodo'));   // 3
console.log(animals.lastIndexOf('Tiger'));  // 1
```

#### join

将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。

如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```js
// arr.join([separator])
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());     // "Fire,Air,Water"
console.log(elements.join(''));   // "FireAirWater"
console.log(elements.join('-'));  // "Fire-Air-Water"
```

#### keys

返回一个包含数组中每个索引键的Array Iterator对象。

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();
for (const key of iterator) {
  console.log(key);   // 0, 1, 2
}
```

#### map

创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
// var new_array = arr.map(function callback(currentValue[, index[, array]]) {
// // Return element for new_array 
// }[, thisArg])
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);    // [2, 8, 18, 32]
```

#### pop

从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

```js
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(plants.pop());    // "tomato"
console.log(plants);          // ["broccoli", "cauliflower", "cabbage", "kale"]
plants.pop();
console.log(plants);          // ["broccoli", "cauliflower", "cabbage"]
```

#### push

将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```js
const animals = ['pigs', 'goats', 'sheep'];
const count = animals.push('cows');
console.log(count);     // 4
console.log(animals);   // ["pigs", "goats", "sheep", "cows"]
animals.push('chickens', 'cats', 'dogs');
console.log(animals);   // ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
```

#### reduce

对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

```js
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(array1.reduce(reducer));    // 10
console.log(array1.reduce(reducer, 5)); // 15
```

#### reduceRight

接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

```js
// arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])
const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
  (accumulator, currentValue) => accumulator.concat(currentValue)
);
console.log(array1);    // [4, 5, 2, 3, 0, 1]
```

#### reverse

将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

```js
const array1 = ['one', 'two', 'three'];
console.log('array1:', array1);     // "array1:" ["one", "two", "three"]
const reversed = array1.reverse();
console.log('reversed:', reversed); // "reversed:" ["three", "two", "one"]
// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);     // "array1:" ["three", "two", "one"]
```

#### shift

从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

```js
const array1 = [1, 2, 3];
const firstElement = array1.shift();
console.log(array1);        // [2, 3]
console.log(firstElement);  // 1
```

#### slice

返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

```js
// arr.slice([begin[, end]])
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));      // ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));   // ["camel", "duck"]
console.log(animals.slice(1, 5));   // ["bison", "camel", "duck", "elephant"]
```

#### some

测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

```js
// arr.some(callback(element[, index[, array]])[, thisArg])
const array = [1, 2, 3, 4, 5];
// checks whether an element is even
const even = (element) => element % 2 === 0;
console.log(array.some(even));    // true
```

#### sort

用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。

```js
// arr.sort([compareFunction])
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);    // ["Dec", "Feb", "Jan", "March"]
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);    // [1, 100000, 21, 30, 4]
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);   // [1, 2, 3, 4, 5]
```

#### splice

过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

```js
// array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);      // ["Jan", "Feb", "March", "April", "June"]
months.splice(4, 1, 'May');
console.log(months);      // ["Jan", "Feb", "March", "April", "May"]
```

#### toLocaleString

返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

```js
// arr.toLocaleString([locales[,options]]);
const array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
const localeString = array1.toLocaleString('en', {timeZone: "UTC"});
console.log(localeString);  // "1,a,12/21/1997, 2:12:00 PM",
```

#### unshift

将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

```js
// arr.unshift(element1, ..., elementN)
const array1 = [1, 2, 3];
console.log(array1.unshift(4, 5));    // 5
console.log(array1);                  // [4, 5, 1, 2, 3]
```

#### values

返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();
for (const value of iterator) {
  console.log(value);   // "a", "b", "c"
}
```

#### @@iterator

和 Array.prototype.values() 属性的初始值是同一个函数对象。

```js
// arr[Symbol.iterator]()
var arr = ['a', 'b', 'c', 'd', 'e'];
var eArr = arr[Symbol.iterator]();
for (let letter of eArr) {
  console.log(letter);
}
var eArr = arr[Symbol.iterator]();
console.log(eArr.next().value); // a
console.log(eArr.next().value); // b
console.log(eArr.next().value); // c
console.log(eArr.next().value); // d
console.log(eArr.next().value); // e
```

### ArrayBuffer

用来表示通用的、固定长度的原始二进制数据缓冲区。

不能直接操作 ArrayBuffer 的内容，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

### Promise

用于表示一个异步操作的最终完成 (或失败), 及其结果值。

```js
// new Promise( function(resolve, reject) {...} /* executor */  );
const promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});
promise1.then(function(value) {
  console.log(value);   // "foo"
});
console.log(promise1);  // [object Promise]

var promiseCount = 0;
function testPromise() {
  let thisPromiseCount = ++promiseCount;
  let log = document.getElementById('log');
  log.insertAdjacentHTML('beforeend', thisPromiseCount + ') 开始 (<small>同步代码开始</small>)<br/>');
  // 新构建一个 Promise 实例：使用Promise实现每过一段时间给计数器加一的过程，每段时间间隔为1~3秒不等
  let p1 = new Promise(
    // resolver 函数在 Promise 成功或失败时都可能被调用
    (resolve, reject) => {
      log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise 开始 (<small>异步代码开始</small>)<br/>');
      // 创建一个异步调用
      window.setTimeout(function() {
        // 填充 Promise
        resolve(thisPromiseCount);
      }, Math.random() * 2000 + 1000);
    }
  );
  // Promise 不论成功或失败都会调用 then
  // catch() 只有当 promise 失败时才会调用
  p1.then(
    // 记录填充值
    function(val) {
        log.insertAdjacentHTML('beforeend', val + ') Promise 已填充完毕 (<small>异步代码结束</small>)<br/>');
    })
  .catch(
    // 记录失败原因
    (reason) => {
        console.log('处理失败的 promise ('+reason+')');
    }
  );
  log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise made (<small>同步代码结束</small>)<br/>');
}
```

#### all

方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);    // [3, 42, "foo"]
});
```

#### allSettled

返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];
Promise.allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));
// "fulfilled"
// "rejected"
```

#### any

接收一个Promise可迭代对象，只要其中的一个 promise 完成，就返回那个已经有完成值的 promise 。如果可迭代对象中没有一个 promise 完成（即所有的 promises 都失败/拒绝），就返回一个拒绝的 promise，返回值还有待商榷：无非是拒绝原因数组或AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和Promise.all()是相反的。

#### race

返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

```js
const promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
});
const promise2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'two');
});
Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// "two"
```

#### reject

返回一个带有拒绝原因的Promise对象。

```js
function resolved(result) {
  console.log('Resolved');
}
function rejected(result) {
  console.error(result);
}
Promise.reject(new Error('fail')).then(resolved, rejected);
// Error: fail
```

#### resolve

返回一个以给定值解析后的Promise 对象。如果该值为promise，返回这个promise；如果这个值是thenable（即带有"then" 方法)），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。

```js
const promise1 = Promise.resolve(123);
promise1.then(function(value) {
  console.log(value);   // 123
});
```

### Proxy

用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

```js
let handler = {
    get: function(target, name){
        return name in target ? target[name] : 37;
    }
};
let p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;
console.log(p.a, p.b);          // 1, undefined
console.log('c' in p, p.c);     // false, 37
```

### RegExp

创建了一个正则表达式对象，用于将文本与一个模式匹配。

```js
var regex1 = /\w+/;
var regex2 = new RegExp('\\w+');
console.log(regex1);              // /\w+/
console.log(regex2);              // /\w+/
console.log(regex1 === regex2);   // false
var regex1 = RegExp('foo*','g');
var str1 = 'table football, foosball';
let array1;
while ((array1 = regex1.exec(str1)) !== null) {
  console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
  // "Found foo. Next starts at 9."
  // "Found foo. Next starts at 19."
}

var str = 'hello world!';
var result = /^hello/.test(str);
console.log(result);              // true
```

### Map

保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

本质上是键值对的集合，类似集合，可以遍历，方法很多可以跟各种数据格式转换。

```js
// new Map([iterable])
var map1 = new Map();
map1.set('a', 'alpha');
map1.set('b', 'beta');
map1.set('g', 'gamma');
console.log(map1.size);               // 3
map1.clear();
console.log(map1.size);               // 0
map1.set('bar', 'foo');
console.log(map1.delete('bar'));      // true
console.log(map1.has('bar'));         // false
map1.set('0', 'foo');
map1.set(1, 'bar');
var iterator1 = map1.entries();
console.log(iterator1.next().value);  // ["0", "foo"]
console.log(iterator1.next().value);  // [1, "bar"]
function logMapElements(value, key, map) {
    console.log("m[" + key + "] = " + value);
}
Map([["foo", 3], ["bar", {}], ["baz", undefined]]).forEach(logMapElements);
// "m[foo] = 3"
// "m[bar] = [object Object]"
// "m[baz] = undefined"
map1.set('bar', 'foo');
console.log(map1.get('bar'));         // "foo"
console.log(map1.get('baz'));         // undefined
map1.set('0', 'foo');
map1.set(1, 'bar');
var iterator1 = map1.keys();
console.log(iterator1.next().value);  // "0"
console.log(iterator1.next().value);  // 1
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");
var mapIter = myMap.values();
console.log(mapIter.next().value);    // "foo"
console.log(mapIter.next().value);    // "bar"
console.log(mapIter.next().value);    // "baz"
var map1 = new Map();
map1.set('0', 'foo');
map1.set(1, 'bar');
var iterator1 = map1[Symbol.iterator]();
for (let item of iterator1) {
  console.log(item);    // ["0", "foo"], [1, "bar"]
}
```

### Set

允许存储任何类型的唯一值，无论是原始值或者是对象引用。

成员唯一、无序且不重复。

```js
const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1.has(1));   // true
console.log(set1.has(5));   // true
console.log(set1.has(6));   // false
var mySet = new Set();
mySet.add(1);
mySet.add(5).add("some text"); // 可以链式调用
console.log(mySet);         // Set [1, 5, "some text"]
mySet.add(5).add(1);
console.log(mySet);         //Set [1, 5]  // 重复的值没有被添加进去

var mySet = new Set();
mySet.add(1);
mySet.add("foo");
mySet.size;       // 2
mySet.has("foo"); // true
mySet.clear();
mySet.size;       // 0
mySet.has("bar")  // false

var mySet = new Set();
mySet.add("foo");
mySet.delete("bar"); // 返回 false，不包含 "bar" 这个元素
mySet.delete("foo"); // 返回 true，删除成功
mySet.has("foo");    // 返回 false，"foo" 已经成功删除

var mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");
var setIter = mySet.entries();
console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]

function logSetElements(value1, value2, set) {
    console.log("s[" + value1 + "] = " + value2);
}
new Set(["foo", "bar", undefined]).forEach(logSetElements);
// "s[foo] = foo"
// "s[bar] = bar"
// "s[undefined] = undefined"

var mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");
var setIter = mySet.values();
console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

### WeakSet

允许将弱保持对象存储在一个集合中。

成员都是对象

成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏。

- 与Set相比，WeakSet 只能是对象的集合，而不能是任何类型的任意值。
- WeakSet持弱引用：集合中对象的引用为弱引用。 如果没有其他的对WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着WeakSet中没有存储当前对象的列表。 正因为这样，WeakSet 是不可枚举的。

```js
var ws = new WeakSet();
var foo = {};
var bar = {};
ws.add(foo);
ws.add(bar);
ws.has(foo);    // true
ws.has(bar);    // true
ws.delete(foo); // 从set中删除 foo 对象
ws.has(foo);    // false, foo 对象已经被删除了
ws.has(bar);    // true, bar 依然存在
ws.clear();
```

### WeakMap

是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

只接受对象作为键名（null除外），不接受其他类型的值作为键名。

键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的。


WeakMap 的 key 只能是 Object 类型。 原始数据类型 是不能作为 key 的（比如 Symbol）。

```js
const wm1 = new WeakMap(),
      wm2 = new WeakMap(),
      wm3 = new WeakMap();
const o1 = {},
      o2 = function(){},
      o3 = window;
wm1.set(o1, 37);
wm1.set(o2, "azerty");
wm2.set(o1, o2);      // value可以是任意值,包括一个对象或一个函数
wm2.set(o3, undefined);
wm2.set(wm1, wm2);    // 键和值可以是任意对象,甚至另外一个WeakMap对象
wm1.get(o2); // "azerty"
wm2.get(o2); // undefined,wm2中没有o2这个键
wm2.get(o3); // undefined,值就是undefined
wm1.has(o2); // true
wm2.has(o2); // false
wm2.has(o3); // true (即使值是undefined)
wm3.set(o1, 37);
wm3.get(o1);    // 37
wm1.has(o1);   // true
wm1.delete(o1);
wm1.has(o1);   // false
```

### isFinite

判断被传入的参数值是否为一个有限数值。

Number.isFinite() 与全局的 isFinite() 函数不同，全局的 isFinite() 会先把检测值转换为 Number ，然后在检测。

Number.isFinite() 不会将检测值转换为 Number对象，如果检测值不是 Number 类型，则返回 false。

```js
console.log(isFinite(1));             // true
console.log(isFinite(1.1));           // true
console.log(isFinite(1e1));           // true
console.log(isFinite(010));           // true
console.log(isFinite(0x10));          // true
console.log(isFinite([]));            // true
console.log(isFinite([1]));           // true
console.log(isFinite(['1']));         // true
console.log(isFinite(null));          // true
console.log(isFinite(Infinity));      // false
console.log(isFinite(NaN));           // false
console.log(isFinite(undefined));     // false
console.log(isFinite({}));            // false
console.log(isFinite('a'));           // false
console.log(isFinite('2a'));          // false
console.log(isFinite('1'));           // true
console.log(Number.isFinite('1'));    // false
```

### isNaN

检查其参数是否是非数字值。

```js
console.log(isNaN(666)); // false
console.log(isNaN("666")); // false
console.log(isNaN("66b")); // true
console.log(isNaN(NaN)); // true
console.log(isNaN(undefined)); // true
console.log(isNaN([26,1])); // false
console.log(isNaN(Infinity)); // false
console.log(isNaN(true)); // false
console.log(isNaN('2e7')); // false
console.log(isNaN([])); // false
console.log(isNaN([26])); // false
console.log(isNaN(['26'])); // false
console.log(isNaN(null)); // false
```

## 运算符

### 一元运算符

#### delete

```js
var o = new Object;
o.name = "David";
alert(o.name);	//输出 "David"
delete o.name;
alert(o.name);	//输出 "undefined"
```

#### void

#### 前增量(++i)/前减量运算符(--i)

#### 后增量(i++)/后减量运算符(i--)

#### 一元加法和一元减法

```js
var sNum = "20";
alert(typeof sNum);	//输出 "string"
var iNum = +sNum;
alert(typeof iNum);	//输出 "number"
```

### 位运算符

#### NOT(~)

```js
var iNum1 = 25;		      //25 等于 00000000000000000000000000011001
var iNum2 = ~iNum1;	    //转换为 11111111111111111111111111100110
alert(iNum2);		        //输出 "-26"
// 等同于
var iNum1 = 25;
var iNum2 = -iNum1 -1;
alert(iNum2);	          //输出 -26
```

#### AND(&)

```js
var iResult = 25 & 3;
alert(iResult);	        //输出 "1"
```

```
 25 = 0000 0000 0000 0000 0000 0000 0001 1001
  3 = 0000 0000 0000 0000 0000 0000 0000 0011
---------------------------------------------
AND = 0000 0000 0000 0000 0000 0000 0000 0001
```

#### OR(|)

```js
var iResult = 25 | 3;
alert(iResult);	        //输出 "27"
```

```
25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
--------------------------------------------
OR = 0000 0000 0000 0000 0000 0000 0001 1011
```

#### XOR(^)

```js
var iResult = 25 ^ 3;
alert(iResult);	        //输出 "26"
```

```
 25 = 0000 0000 0000 0000 0000 0000 0001 1001
  3 = 0000 0000 0000 0000 0000 0000 0000 0011
---------------------------------------------
XOR = 0000 0000 0000 0000 0000 0000 0001 1010
```

#### 左移运算(<<)

```js
var iOld = 2;		        //等于二进制 10
var iNew = iOld << 5;	  //等于二进制 1000000 十进制 64
```

#### 有符号右移运算(>>)

```js
var iOld = 64;		      //等于二进制 1000000
var iNew = iOld >> 5;	  //等于二进制 10 十进制 2
```

#### 无符号右移运算(>>>)

```js
var iOld = 64;		                    //等于二进制 1000000
var iNew = iOld >>> 5;	              //等于二进制 10 十进制 2
var iUnsigned64 = -64 >>> 0;          //4294967232
console.log(iUnsigned64.toString(2)); //11111111111111111111111111000000
console.log(-1>>>31);                 //1
```

### 运算操作

#### Infinity

```js
console.log(Infinity*0);          //NaN
console.log(Infinity*Infinity);   //Infinity
console.log(Infinity*-Infinity);  //-Infinity
console.log(0/Infinity);          //0
console.log(1/0);                 //Infinity
console.log(Infinity/0);          //Infinity
console.log(Infinity/Infinity);   //NaN
console.log(-Infinity/0);         //-Infinity
console.log(Infinity%0);          //NaN
console.log(Infinity%Infinity);   //NaN
console.log(0%0);                 //NaN
console.log(5 + "5");             //"55"
console.log("Blue" < "alpha");    //true
console.log("25" < "3");          //true
console.log("25" < 3);            //false
// 字母 "a" 不能转换成有意义的数字。
// 不过，如果对它调用 parseInt() 方法，返回的是 NaN。
// 根据规则，任何包含 NaN 的关系运算符都要返回 false
console.log("a" < 3);             //false
console.log("a" >= 3);            //false
// 等号和非等号用于处理原始值，全等号和非全等号用于处理对象。
console.log(null == undefined);   //true
console.log("NaN" == NaN);        //false
console.log(5 == NaN);            //false
console.log(NaN == NaN);          //false
console.log(NaN != NaN);          //true
console.log(false == 0);          //true
console.log(true == 1);           //true
console.log(true == 2);           //false
console.log(undefined == 0);      //false
console.log(null == 0);           //false
console.log("5" == 5);            //true
console.log(true || unknown);     //true
console.log(false || unknown);    //Uncaught ReferenceError: unknown is not defined
console.log();//
console.log();//
console.log();//
console.log();//
console.log();//
```

#### 优先级

| 值 | 运算符 | 描述 | 实例 |
| -- | ------ | --- | --- |
| 20 | ( ) | 表达式分组 | (3 + 4) |
| 19 | . | 成员 | person.name |
| 19 | [] | 成员 | person["name"] |
| 19 | () | 函数调用 | myFunction() |
| 19 | new | 创建 | new Date() |
| 17 | ++ | 后缀递增 | i++ |
| 17 | -- | 后缀递减 | i-- |
| 16 | ++ | 前缀递增 | ++i |
| 16 | -- | 前缀递减 | --i |
| 16 | ! | 逻辑否 | !(x==y) |
| 16 | typeof | 类型 | typeof x |
| 15 | ** | 求幂 | (ES7)	10 ** 2 |
| 14 | * | 乘 | 10 * 5 |
| 14 | / | 除 | 10 / 5 |
| 14 | % | 模数除法 | 10 % 5 |
| 13 | + | 加 | 10 + 5 |
| 13 | - | 减 | 10 - 5 |
| 12 | << | 左位移 | x << 2 |
| 12 | >> | 右位移 | x >> 2 |
| 12 | >>> | 右位移（无符号） | x >>> 2 |
| 11 | < | 小于 | x < y |
| 11 | <= | 小于或等于 | x <= y |
| 11 | > | 大于 | x > y |
| 11 | >= | 大于或等于 | 	x >= y |
| 11 | in | 对象中的属性 | "PI" in Math |
| 11 | instanceof | 对象的实例 | instanceof Array |
| 10 | == | 相等 | x == y |
| 10 | === | 严格相等 | x === y |
| 10 | != | 不相等 | x != y |
| 10 | !== | 严格不相等 | x !== y |
| 9 | & | 按位与 | x & y |
| 8 | ^ | 按位 | XOR	x ^ y |
| 7 | &#124; | 按位或 | x | y |
| 6 | && | 逻辑与 | x && y |
| 5 | &#124;&#124; | 逻辑否 | x || y |
| 4 | ? : | 条件 | ? "Yes" : "No" |
| 3 | = | 赋值 | x = y |
| 3 | += | 赋值 | x += y |
| 3 | -= | 赋值 | x -= y |
| 3 | *= | 赋值 | x *= y |
| 3 | %= | 赋值 | x %= y |
| 3 | <<= | 赋值 | x <<= y |
| 3 | >>= | 赋值 | x >>= y |
| 3 | >>>= | 赋值 | x >>>= y |
| 3 | &= | 赋值 | x &= y |
| 3 | ^= | 赋值 | x ^= y |
| 3 | &#124;= | 赋值 | x |= y |
| 2 | yield | 暂停函数 | yield x |
| 1 | , | 逗号 | 7 , 8 |

## 语句/块

### 标签语句

break 语句和 continue 语句都可以与有标签的语句联合使用，返回代码中的特定位置。

```js
var iNum = 0;
outermost:
for (var i=0; i<10; i++) {
  for (var j=0; j<10; j++) {
    if (i == 5 && j == 5) {
    break outermost;
  }
  iNum++;
  }
}
console.log(iNum);	//输出 "55"
```

```js
var iNum = 0;
outermost:
for (var i=0; i<10; i++) {
  for (var j=0; j<10; j++) {
    if (i == 5 && j == 5) {
    continue outermost;
  }
  iNum++;
  }
}
console.log(iNum);	//输出 "95"
```

### with

```js
var sMessage = "hello";
with(sMessage) {
  alert(toUpperCase());	//输出 "HELLO"
}
```

### 闭包（closure）

指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。

## 对象

### 面向对象

1. 封装 - 把相关的信息（无论数据或方法）存储在对象中的能力
2. 聚集 - 把一个对象存储在另一个对象内的能力
3. 继承 - 由另一个类（或多个类）得来类的属性和方法的能力
4. 多态 - 编写能以多种方法运行的函数或方法的能力

### 对象类型

在 ECMAScript 中，所有对象并非同等创建的。

一般来说，可以创建并使用的对象有三种

### 本地对象

`Object`、`Function`、`Array`、`String`、`Boolean`、`Number`、`Date`、`RegExp`、`Error`、`EvalError`、`RangeError`、`ReferenceError`、`SyntaxError`、`TypeError`、`URIError`

### 内置对象

只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。

### 宿主对象

所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。

所有 BOM 和 DOM 对象都是宿主对象。

## 原型

### 构造函数方式

```js
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.showColor = function() {
    alert(this.color);
  };
}
var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);
```

### 原型方式

```js
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
}
Car.prototype.showColor = function() {
  alert(this.color);
};
var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);
```

### 动态原型方法

```js
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  if (typeof Car._initialized == "undefined") {
    Car.prototype.showColor = function() {
      alert(this.color);
    };
    Car._initialized = true;
  }
}
```

### 对象冒充

```js
function ClassA(sColor) {
  this.color = sColor;
  this.sayColor = function () {
    alert(this.color);
  };
}
function ClassB(sColor) {
  ClassA.call(this, sColor);
  // 等同于
  // this.newMethod = ClassA;
  // this.newMethod(sColor);
  // delete this.newMethod;
}
```

### 原型链

原型链的弊端是不支持多重继承。

```js
function ClassA() {
}
ClassA.prototype.color = "blue";
ClassA.prototype.sayColor = function () {
    console.log(this.color);
};
function ClassB() {
}
ClassB.prototype = new ClassA();
ClassB.prototype.name = "";
ClassB.prototype.sayName = function () {
    console.log(this.name);
};
var objA = new ClassA();
var objB = new ClassB();
objA.color = "blue";
objB.color = "red";
objB.name = "John";
objA.sayColor(); // blue
objB.sayColor(); // red
objB.sayName(); // John
console.log(objB instanceof ClassA);	//输出 "true"
console.log(objB instanceof ClassB);	//输出 "true"

function fooA(){}
function fooB(){}
function fooC(){}
function fooD(){}
function fooE(){}
fooA.prototype.a = 1;
fooB.prototype = Object.create(fooA.prototype);
fooB.prototype.b = 2;
fooC.prototype = Object.create(fooB.prototype);
fooC.prototype.c = 3;
fooD.prototype = Object.create(fooC.prototype);
fooD.prototype.d = 4;
fooE.prototype = Object.create(fooD.prototype);
fooE.prototype.e = 5;
var obj = new fooE();
```

### `__proto__`(不推荐)

```js
var obj = {
  a: 1,
  b: {
    c: 2
  }
}
var fooA = function () {
  this.__proto__ = obj;
  this.id = 123;
}
var fooB = function () {
  this.name = 'ab';
}
fooB.prototype = new fooA();
console.log(new fooA());
// { id: 123, __proto__: { a: 1, b: {c: 2}, __proto__: Object.prototype } }
console.log(new fooB());
// { name: 'ab', __proto__: { id: 123, __proto__: { a:1, b:{c:2}, __proto__: Object.prototype } } }
```

## async、await

### Async

```js
async function f() {
  return 1
}
```

这个函数总是返回一个`promise`，如果代码中有`return <非promise>`语句，JavaScript会自动把返回的这个value值包装成`promise`的`resolved`值。

```js
async function f() {
  return 1
}
f().then(alert) // 1
```

也可以显式的返回一个`promise`，这个将会是同样的结果：

```js
async function f() {
  return Promise.resolve(1)
}
f().then(alert) // 1
```

### Await

```js
// 只能在async函数内部使用
let value = await promise
```

`await`可以让JavaScript进行等待，直到一个`promise`执行并返回它的结果，JavaScript才会继续往下执行。

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000)
  })
  let result = await promise;
  // 直到promise返回一个resolve值（*）
  alert(result);
  // 'done!' 
}
f()
```

`await`字面上使得JavaScript等待，直到`promise`处理完成，这并不会花费任何的cpu资源，因为引擎能够同时做其他工作：执行其他脚本，处理事件等等。

不能在常规函数里使用`await`

```js
async function showAvatar() {
    // read our JSON
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    // read github user
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();
    // 展示头像
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    documenmt.body.append(img)
    // 等待3s
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000)
    });
    img.remove();
    return githubUser;
}
showAvatar();
```

# 安全

## CORS

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器，让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。

当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

- 前文提到的由 XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求。
- Web 字体 (CSS 中通过 @font-face 使用跨域字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图
- 使用 drawImage 将 Images/video 画面绘制到 canvas

新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

``` conf
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Origin: http://xxx.xxx
# Access-Control-Allow-Origin: *
Access-Control-Max-Age: 200
```

### 简单请求 

请求不会触发 CORS 预检请求，这样的请求为“简单请求”

满足所有下述条件：

- 使用下列方法之一：

  - GET
  - HEAD
  - POST

- Fetch 规范定义了对 CORS 安全的首部字段集合，不得人为设置该集合之外的其他首部字段：

  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type （需要注意额外的限制）
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width

- Content-Type 的值仅限于下列三者之一：

  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded

### 预检请求

必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。

### 附带身份凭证的请求

Fetch 与 CORS 的一个的特性是，可以基于 HTTP cookies 和 HTTP 认证信息发送身份凭证。

一般而言，对于跨域 XMLHttpRequest 或 Fetch 请求，浏览器不会发送身份凭证信息。

如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位。

```js
// 因为这是一个简单 GET 请求，所以浏览器不会对其发起“预检请求”。
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/credentialed-content/';
function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
```

如果服务器端的响应中未携带 Access-Control-Allow-Credentials: true ，浏览器将不会把响应内容返回给请求的发送者。

对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。

将 Access-Control-Allow-Origin 的值设置为 http://foo.example，则请求将成功执行。

### HTTP 响应首部字段

#### Access-Control-Allow-Origin

```
Access-Control-Allow-Origin: <origin> | *
```

指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。

服务端指定了具体的域名而非“*”，那么响应首部中的 Vary 字段的值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。

#### Access-Control-Expose-Headers

```conf
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
# 默认情况下，只有六种 simple response headers （简单响应首部）可以暴露给外部：
# Cache-Control
# Content-Language
# Content-Type
# Expires
# Last-Modified
# Pragma
# 如果想要让客户端可以访问到其他的首部信息，可以将它们在 Access-Control-Expose-Headers 里面列出来。
```

让服务器把允许浏览器访问的头放入白名单，这样浏览器就能够通过getResponseHeader访问X-My-Custom-Header和 X-Another-Custom-Header 响应头了。

#### Access-Control-Max-Age

```
Access-Control-Max-Age: <delta-seconds>
```

指定了preflight请求的结果能够被缓存多久，delta-seconds 参数表示preflight请求的结果在多少秒内有效。

上限是24小时 （即86400秒），而在Chromium 中则是10分钟（即600秒）。Chromium 同时规定了一个默认值 5 秒。
如果值为 -1，则表示禁用缓存，每一次请求都需要提供预检请求，即用OPTIONS请求进行检测。

#### Access-Control-Allow-Credentials

```
Access-Control-Allow-Credentials: true
```

指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。

当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。

简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

Credentials可以是 cookies, authorization headers 或 TLS client certificates。

#### Access-Control-Allow-Methods

```conf
Access-Control-Allow-Methods: <method>[, <method>]*
# 用逗号隔开的允许使用的 HTTP request methods 列表。
# Access-Control-Allow-Methods: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH
```

用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

#### Access-Control-Allow-Headers

```conf
Access-Control-Allow-Headers: <field-name>[, <field-name>]*
```

用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

以下这些特定的首部是一直允许的：Accept, Accept-Language, Content-Language, Content-Type （但只在其值属于 MIME 类型 application/x-www-form-urlencoded, multipart/form-data 或 text/plain中的一种时）。这些被称作simple headers，无需特意声明它们。


## CSP

HTTP 响应头Content-Security-Policy允许站点管理者控制用户代理能够为指定的页面加载哪些资源。

除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点。

这将帮助防止跨站脚本攻击（Cross-Site Script）（XSS）。

```
Content-Security-Policy: <policy-directive>; <policy-directive>
```

- `child-src`：为 web workers 和其他内嵌浏览器内容（例如用`<frame>`和`<iframe>`加载到页面的内容）定义合法的源地址。

如果开发者希望管控内嵌浏览器内容和 web worker 应分别使用frame-src和worker-src 指令，来相对的取代 child-src。

- `connect-src`：限制能通过脚本接口加载的URL。
- `default-src`：为其他取指令提供备用服务fetch directives。
- `font-src`：设置允许通过@font-face加载的字体源地址。
- `frame-src`： 设置允许通过类似`<frame>`和`<iframe>`标签加载的内嵌内容的源地址。
- `img-src`: 限制图片和图标的源地址
- `manifest-src` ： 限制应用声明文件的源地址。
- `media-src`：限制通过`<audio>`、`<video>`或`<track>`标签加载的媒体文件的源地址。
- `object-src`：限制`<object>`、`<embed>`、`<applet>`标签的源地址。

被object-src控制的元素可能碰巧被当作遗留HTML元素，导致不支持新标准中的功能（例如`<iframe>`中的安全属性sandbox和allow）。

因此建议限制该指令的使用（比如，如果可行，将`object-src`显式设置为`none`）。

- `prefetch-src`: 指定预加载或预渲染的允许源地址。
- `script-src`: 限制JavaScript的源地址。
- `style-src`: 限制层叠样式表文件源。
- `webrtc-src`: 指定WebRTC连接的合法源地址。
- `worker-src`: 限制Worker、SharedWorker或者ServiceWorker脚本源。

文档指令管理文档属性或者worker环境应用的策略。

- `base-uri`: 限制在DOM中`<base>`元素可以使用的URL。
- `plugin-types`: 通过限制可以加载的资源类型来限制哪些插件可以被嵌入到文档中。
- `sandbox`: 类似`<iframe>` sandbox属性，为请求的资源启用沙盒。
- `disown-opener`:  确保资源在导航的时候能够脱离父页面。（windown.opener 对象）

导航指令管理用户能打开的链接或者表单可提交的链接

- `form-action`: 限制能被用来作为给定上下文的表单提交的目标 URL（说白了，就是限制 form 的 action 属性的链接地址）
- `frame-ancestors`: 指定可能嵌入页面的有效父项`<frame>`, `<iframe>`, `<object>`, `<embed>`, or `<applet>`
- `navigation-to`: 限制文档可以通过以下任何方式访问URL (a, form, window.location, window.open, etc.)

报告指令控制 CSP 违规的报告过程. 更多请看 Content-Security-Policy-Report-Only 报头.

report-uri 当出现可能违反CSP的操作时，让客户端提交报告。这些违规报告会以JSON文件的格式通过POST请求发送到指定的URI
report-to Fires a SecurityPolicyViolationEvent.

其他指令 | Other directives

- `block-all-mixed-content`: 当使用HTTPS加载页面时阻止使用HTTP加载任何资源。
- `referrer`: 用来指定会离开当前页面的跳转链接的 referer header 信息。应该使用 Referrer-Policy 替代。
- `require-sri-for`: 需要使用 SRI 作用于页面上的脚本或样式。
- `upgrade-insecure-requests`: 让浏览器把一个网站所有的不安全 URL（通过 HTTP 访问）当做已经被安全的 URL 链接（通过 HTTPS 访问）替代。这个指令是为了哪些有量大不安全的传统 URL 需要被重写时候准备的。

### 多内容安全策略

CSP 允许在一个资源中指定多个策略, 包括通过 Content-Security-Policy 头, 以及 Content-Security-Policy-Report-Only 头，和 <meta> 组件。

```
Content-Security-Policy: default-src 'self' http://example.com; connect-src 'none';
Content-Security-Policy: connect-src http://example.com/; script-src http://example.com/
```

尽管第二个策略允许连接, 第一个策略仍然包括了 connect-src 'none'。

添加了附加的策略后，只会让资源保护的能力更强，也就是说不会有接口可以被允许访问，等同于最严格的策略，connect-src 'none' 强制开启。

### 示例

禁用不安全的内联/动态执行, 只允许通过 https加载这些资源 (images, fonts, scripts, etc.)

```js
// header
Content-Security-Policy: default-src https:

// meta tag
<meta http-equiv="Content-Security-Policy" content="default-src https:">
```

已经存在的一个网站，用了太多内联代码修复问题，而且想确保资源只从 https 加载，并且禁止插件：

```
Content-Security-Policy: default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'
```

还没有开始实施上面的策略；相反，只是开始上报可能会发生违反安全策略的行为：

```
Content-Security-Policy-Report-Only: default-src https:; report-uri /csp-violation-report-endpoint/
```

## XSS

跨站脚本攻击Cross-site scripting (XSS)是一种安全漏洞，攻击者可以利用这种漏洞在网站上注入恶意的客户端代码。当被攻击者登陆网站时就会自动运行这些恶意代码，从而，攻击者可以突破网站的访问权限，冒充受害者。

如果Web应用程序没有部署足够的安全验证，那么，这些攻击很容易成功。浏览器无法探测到这些恶意脚本是不可信的，所以，这些脚本可以任意读取cookie，session tokens，或者其它敏感的网站信息，或者让恶意脚本重写HTML内容。

在以下2种情况下，容易发生XSS攻击：1）数据从一个不可靠的链接进入到一个web应用程序。2）没有过滤掉恶意代码的动态内容被发送给web用户。

恶意内容一般包括 JavaScript，但是，有时候也会包括HTML，FLASH。XSS攻击的形式千差万别，但是，它们的共同点为：将一些隐私数据像cookie、session发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作。

XSS攻击可以分为3类：存储型（持久型）、反射型（非持久型）、基于DOM。

# 技巧/解答

## call/apply

### bind

不使用 call/apply 实现 bind

```js
if (!Function.prototype.bind2) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind2 = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = [];
    if(arguments && arguments.length>1){
      for(var index in arguments){
        if(index=='0'){
          continue;
        }
        args.push(arguments[index]);
      }
    }
    if (typeof thatFunc !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    return function(){
      var args2 = [];
      if(arguments && arguments.length>0){
        for(var index in arguments){
          args2.push(arguments[index]);
        }
      }
      var funcArgs = args.concat(args2);
      if(thatArg){
        var symbol = Symbol();
        thatArg[symbol] = thatFunc;
        thatArg[symbol](...funcArgs);
      } else {
        thatFunc(...funcArgs);
      }
    };
  };
})();
function foo(age){
  console.log(this.name + ': ' + age);
}
foo.bind2({name:'123'})(20);
```

### uncurrying

```js
var obj = {
  "length": 1,
  "0": 1
}
Function.prototype.uncurrying = function() {
  var self = this;
  return function() {
    return Function.prototype.call.apply(self, arguments);
  }
}
var push = Array.prototype.push.uncurrying()
push(obj, 2) //{0: 1, 1: 2, length: 2}
```

## 高阶函数

接受一个或多个函数作为输入

函数的柯里化

接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数。

```js
// 简单实现，参数只能从右到左传递
function createCurry(func, args) {
    var arity = func.length;
    var args = args || [];
    return function() {
        var _args = [].slice.call(arguments);
        [].push.apply(_args, args);
        // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
        if (_args.length < arity) {
            return createCurry.call(this, func, _args);
        }
        // 参数收集完毕，则执行func
        return func.apply(this, _args);
    }
}
```

## 字符串

### StringBuffer 

```js
function StringBuffer () {
  this._strings_ = new Array();
}
StringBuffer.prototype.append = function(str) {
  this._strings_.push(str);
};
StringBuffer.prototype.toString = function() {
  return this._strings_.join("");
};

var buffer = new StringBuffer ();
buffer.append("hello ");
buffer.append("world");
var result = buffer.toString();
```

## 解疑

### setTimeout、Promise、Async/Await 的区别

事件循环分两种情况的，即宏任务(macrotask)和微任务(microtask)。

当主线程任务完成为空去Event Quenu读取函数的时候，是先读取的微任务，当微任务执行完毕之后，才会继续执行宏任务。

执行顺序

- 同步 > 异步
- 微任务 > 宏任务

- 微任务：Promise，process.nextTick。
- 宏任务：整体代码script，setTimeout，setInterval

## 解答

### 将数组扁平化去并除其中重复部分数据

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
```

### 简单讲解一下http2的多路复用

HTTP2采用二进制格式传输，取代了HTTP1.x的文本格式，二进制格式解析更高效。
多路复用代替了HTTP1.x的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。
HTTP2中

同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。
单个连接上可以并行交错的请求和响应，之间互不干扰

### 对TCP三次握手和四次挥手的理解

三次握手：
1、客户端发送syn包到服务器，等待服务器确认接收。
2、服务器确认接收syn包并确认客户的syn，并发送回来一个syn+ack的包给客户端。
3、客户端确认接收服务器的syn+ack包，并向服务器发送确认包ack，二者相互建立联系后，完成tcp三次握手。
四次挥手：中间多了一层 等待服务器再一次响应回复相关数据的过程

### 深度优先遍历和广度优先遍历

递归、队列

用深度优先思想和广度优先思想实现一个拷贝函数

# 浏览器

## AJAX

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML） 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

1. 创建 XMLHttpRequest 对象
2. 设置 onreadystatechange 状态更改事件
3. 调用对象的 open 方法并规定请求类型（GET、POST、PUT、DELETE、HEAD、OPTIONS）、URL以及是否异步处理请求 async(true-异步|false-同步)
4. 可选，setRequestHeader 方法设置请求头
5. 调用对象的 send 方法将请求发送到服务器，当请求类型为 POST、PUT 时，可发送请求数据 send(string)

### 请求头

content-type

```
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
```

- `application/x-www-form-urlencoded`: Form Data
- `multipart/form-data`: Request Payload，可上传文件
- `application/json`: Request Payload
- `text/xml`: Request Payload
- `charset=UTF-8`

### 请求类型比较

所有HTTP请求都是这种格式：HTTP请求头+HTTP请求体。

```
<method> <url> HTTP/1.1
<header1>: <headerValue1>
<header2>: <headerValue2>
...
<headerN>: <headerValueN>

<body data...>
```

- `POST`: 一般只用于新增数据
- `GET`: chrome浏览器限制请求URL长度20000+个字符 一般只用于获取数据
- `PUT`: 只用于更新数据
- `DELETE`: 只用于删除数据
- `HEAD`: 只用于头请求
- `OPTIONS`: 只用于检测是否可访问，用于跨域检测

### 方法/事件

- `getAllResponseHeaders`: 检索资源（文件）的头信息
- `onreadystatechange`: 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。

readyState:

- `0`: 请求未初始化
- `1`: 服务器连接已建立
- `2`: 请求已接收
- `3`: 请求处理中
- `4`: 请求已完成，且响应已就绪

status: 

- `1xx`: 信息响应类，表示接收到请求并且继续处理
- `2xx`: 处理成功响应类，表示动作被成功接收、理解和接受
- `3xx`: 重定向响应类，为了完成指定的动作，必须接受进一步处理
- `4xx`: 客户端错误，客户请求包含语法错误或者是不能正确执行
- `5xx`: 服务端错误，服务器不能正确执行一个正确的请求

```
100——客户必须继续发出请求
101——客户要求服务器根据请求转换HTTP协议版本
200——"OK"交易成功
201——提示知道新文件的URL
202——接受和处理、但处理未完成
203——返回信息不确定或不完整
204——请求收到，但返回信息为空
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
206——服务器已经完成了部分用户的GET请求
300——请求的资源可在多处得到
301——删除请求数据
302——在其他地址发现了请求数据
303——建议客户访问其他URL或访问方式
304——客户端已经执行了GET，但文件未变化
305——请求的资源必须从服务器指定的地址得到
306——前一版本HTTP中使用的代码，现行版本中不再使用
307——申明请求的资源临时性删除
400——错误请求，如语法错误
401——请求授权失败
402——保留有效ChargeTo头响应
403——请求不允许
404——没有发现文件、查询或URl
405——用户在Request-Line字段定义的方法不允许
406——根据用户发送的Accept拖，请求资源不可访问
407——类似401，用户必须首先在代理服务器上得到授权
408——客户端没有在用户指定的饿时间内完成请求
409——对当前资源状态，请求不能完成
410——服务器上不再有此资源且无进一步的参考地址
411——服务器拒绝用户定义的Content-Length属性请求
412——一个或多个请求头字段在当前请求中错误
413——请求的资源大于服务器允许的大小
414——请求的资源URL长于服务器允许的长度
415——请求资源不支持请求项目格式
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求
500——服务器产生内部错误
501——服务器不支持请求的函数
502——服务器暂时不可用，有时是为了防止发生系统过载
503——服务器过载或暂停维修
504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长
505——服务器不支持或拒绝支请求头中指定的HTTP版本
```

### 返回结果

- `responseText`: 获得字符串形式的响应数据。
- `responseXML`: 获得 XML 形式的响应数据。

### 例子

```js
var xmlhttp;
if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
} else {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        console.log(xmlhttp.responseText);
    }
}
xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xmlhttp.send();
```

## 事件处理

- `addEventListener`: 添加监听事件
- `dispatchEvent`: 触发事件
- `removeEventListener`: 移除监听事件

## 元素操作

```js
// 设置HTMLElement对象属性值
var newAttr = document.createAttribute(strAttrName);
newAttr.value=strAttrValue;
ele.attributes.setNamedItem(newAttr);
// 判断元素是否为HTML节点元素
return HTMLElement.prototype.isPrototypeOf(anyTarget);
// html符号转义
a.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];})
// 文件下载
var objBolb = new Blob(['\ufeff'+content],{type:'text/plain,charset=UTF-8'});
var eleLink = document.createElement('a');
eleLink.target = '_blank';
eleLink.href = URL.createObjectURL(objBolb);
eleLink.download = name;
document.body.appendChild(eleLink);
eleLink.click();
eleLink.remove();
// 复制到粘贴板
window.getSelection().removeAllRanges();
var range = document.createRange();
range.selectNode(objTarget);
window.getSelection().addRange(range);
successFul = document.execCommand('copy');
```


## A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

1. 服务器不重启，客户继续工作，就会发现对方没有回应(ETIMEOUT)，路由器聪明的话，则是目的地不可达(EHOSTUNREACH)。
2. 服务器重启后，客户继续工作，然而服务器已丢失客户信息，收到客户数据后响应RST。

# Node

## 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

发出npm install命令，查询node_modules目录之中是否已经存在指定模块，若存在，不再重新安装；
若不存在，npm 向 registry 查询模块压缩包的网址，下载压缩包，存放在根目录下的.npm目录里，解压压缩包到当前项目的node_modules目录。

# React

## React 中 setState 什么时候是同步的，什么时候是异步的？

如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state。

指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

这里所说的同步异步，并不是真正的同步异步，它还是同步执行的。

这里的异步指的是多个state会合成到一起进行批量更新。

```jsx
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);
    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);
    }, 0);
  }
  render() {
    return null;
  }
}
// 输出
// 0
// 0
// 2
// 3
// 1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。
// 2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。
// 3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。
```
