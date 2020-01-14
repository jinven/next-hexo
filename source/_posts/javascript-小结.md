---
title: javascript-小结
date: 2019-12-29 16:01:49
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

var、let、const、class、function

## 关键字

break、case、catch、continue、default、delete、do、else、finally、for、if、in、instanceof、new、return、switch、this、throw、try、typeof、void、while、with、debugger、exports、import、static、super、async、wait

## 常用函数

Symbol、Number、Object、Boolean、String、Function、ArrayBuffer、AudioBufferSourceNode、Blob、FileReader、Map、Promise、Range、RegExp、Set、TypeError、Uint8Array、Uint32Array、WeakMap、WeakSet、Worker

## 值

- 原始值

存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。

5 种原始类型：Undefined、Null、Boolean、Number 和 String

- 引用值

存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处。

## typeof 

返回下列值之一：

- `undefined` 如果变量是 Undefined 类型的
- `boolean` 如果变量是 Boolean 类型的
- `number` 如果变量是 Number 类型的
- `string` 如果变量是 String 类型的
- `object` 如果变量是一种引用类型或 Null 类型的

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

#### defineProperty

```js
var obj = {};
Object.defineProperty(obj, 'name', { value: 'n' });
```

#### getOwnPropertySymbols

```js
var obj = {};
var symbol = Symbol();
obj[symbol] = 123;
Object.getOwnPropertySymbols(obj);
```

### Boolean

```js
var oBooleanObject = new Boolean(true);
// 覆盖了 Object 对象的 ValueOf() 方法，返回原始值，即 true 和 false。
// ToString() 方法也会被覆盖，返回字符串 "true" 或 "false"。
var oFalseObject = new Boolean(false);
var bResult = oFalseObject && true;	//输出 true
```

### Number

```js
var oNumberObject = new Number(68);
var iNumber = oNumberObject.valueOf();
// 返回的是具有指定位数小数的数字的字符串表示，能表示具有 0 到 20 位小数的数字，超过这个范围的值会引发错误。
console.log(oNumberObject.toFixed(2));  //输出 "68.00"
// 返回的是用科学计数法表示的数字的字符串形式。
console.log(oNumberObject.toExponential(1));  //输出 "6.8e+1"
// 返回数字的预定形式或指数形式。它有一个参数，即用于表示数的数字总数（不包括指数）。
console.log(oNumberObject.toPrecision(1));  //输出 "7e+1"
console.log(oNumberObject.toPrecision(2));  //输出 "68"
console.log(oNumberObject.toPrecision(3));  //输出 "68.0"
```

### String

```js
var oStringObject = new String("hello world");
// String 对象的 valueOf() 方法和 toString() 方法都会返回 String 类型的原始值：
console.log(oStringObject.valueOf() == oStringObject.toString());	//输出 "true"
// 和调用 toString() 的不同之处在于，对 null 和 undefined 值强制类型转换可以生成字符串而不引发错误
console.log(new String(null).toString());       //输出 "null"
console.log(oStringObject.charAt(1));	          //输出 "e"
console.log(oStringObject.charCodeAt(1));	      //输出 "101"
console.log(String.fromCharCode(101));	        //输出 "e"
console.log("hello ".concat("world"));	        //输出 "hello world"
console.log(oStringObject.indexOf("o"));		    //输出 "4"
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
```

### instanceof 

在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 "object"。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。

```js
var a = new String('a')
var arr = []
console.log(typeof a);	            //输出 "object"
console.log(a instanceof String);	  //输出 "true"
console.log(typeof arr);	            //输出 "object"
console.log(arr instanceof Array);	  //输出 "true"
```

## 一元运算符

### delete

```js
var o = new Object;
o.name = "David";
alert(o.name);	//输出 "David"
delete o.name;
alert(o.name);	//输出 "undefined"
```

### void

### 前增量(++i)/前减量运算符(--i)

### 后增量(i++)/后减量运算符(i--)

### 一元加法和一元减法

```js
var sNum = "20";
alert(typeof sNum);	//输出 "string"
var iNum = +sNum;
alert(typeof iNum);	//输出 "number"
```

## 位运算符

### NOT(~)

```js
var iNum1 = 25;		      //25 等于 00000000000000000000000000011001
var iNum2 = ~iNum1;	    //转换为 11111111111111111111111111100110
alert(iNum2);		        //输出 "-26"
// 等同于
var iNum1 = 25;
var iNum2 = -iNum1 -1;
alert(iNum2);	          //输出 -26
```

### AND(&)

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

### OR(|)

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

### XOR(^)

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

### 左移运算(<<)

```js
var iOld = 2;		        //等于二进制 10
var iNew = iOld << 5;	  //等于二进制 1000000 十进制 64
```

### 有符号右移运算(>>)

```js
var iOld = 64;		      //等于二进制 1000000
var iNew = iOld >> 5;	  //等于二进制 10 十进制 2
```

### 无符号右移运算(>>>)

```js
var iOld = 64;		                    //等于二进制 1000000
var iNew = iOld >>> 5;	              //等于二进制 10 十进制 2
var iUnsigned64 = -64 >>> 0;          //4294967232
console.log(iUnsigned64.toString(2)); //11111111111111111111111111000000
console.log(-1>>>31);                 //1
```

## 运算

### Infinity

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

## 标签语句

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

## with

```js
var sMessage = "hello";
with(sMessage) {
  alert(toUpperCase());	//输出 "HELLO"
}
```

## 函数

### arguments

无需明确指出参数名，就能访问它们。

`arguments.length`: 参数个数。
`arguments.callee`: 当前正在执行的函数。

### Function

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

### AOP

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

### Object.prototype.toString.call/apply

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

### call/apply

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

### bind

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

## 闭包（closure）

指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。

## 面向对象

1. 封装 - 把相关的信息（无论数据或方法）存储在对象中的能力
2. 聚集 - 把一个对象存储在另一个对象内的能力
3. 继承 - 由另一个类（或多个类）得来类的属性和方法的能力
4. 多态 - 编写能以多种方法运行的函数或方法的能力

## 对象类型

在 ECMAScript 中，所有对象并非同等创建的。

一般来说，可以创建并使用的对象有三种

## 本地对象

`Object`、`Function`、`Array`、`String`、`Boolean`、`Number`、`Date`、`RegExp`、`Error`、`EvalError`、`RangeError`、`ReferenceError`、`SyntaxError`、`TypeError`、`URIError`

## 内置对象

只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。

## 宿主对象

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
```

### __proto__

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

## 优先级

# 技巧

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







Number.MAX_VALUE = 1.7976931348623157e+308
Number.MIN_VALUE = 5e-324
Number.POSITIVE_INFINITY = Infinity
Number.NEGATIVE_INFINITY = -Infinity
(NaN == NaN) = false


# 关键词

debugger

## 添加、触发、移除监听

- addEventListener
- dispatchEvent
- removeEventListener


设置HTMLElement对象属性值
var newAttr = document.createAttribute(strAttrName);
newAttr.value=strAttrValue;
ele.attributes.setNamedItem(newAttr);
判断元素是否为HTML节点元素
return HTMLElement.prototype.isPrototypeOf(anyTarget);
html符号转义
a.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];})
文件下载
var objBolb = new Blob(['\ufeff'+content],{type:'text/plain,charset=UTF-8'});
var eleLink = document.createElement('a');
eleLink.target = '_blank';
eleLink.href = URL.createObjectURL(objBolb);
eleLink.download = name;
document.body.appendChild(eleLink);
eleLink.click();
eleLink.remove();
复制到粘贴板
window.getSelection().removeAllRanges();
var range = document.createRange();
range.selectNode(objTarget);
window.getSelection().addRange(range);
successFul = document.execCommand('copy');












# 类型判断

typeof 
instanceOf
isFinite
isNaN
isNaN("666") = false
isNaN("66b") = true
\0nnn	八进制
\xnn	十六进制
\unnnn	十六进制

# 对象

Object

# 函数

function

Object.assign
    <script src="https://cn.vuejs.org/js/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>

slice
reverse

NumberObject.toString(radix)  radix	可选。规定表示数字的基数，使 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。
arrayObject.toString()返回值与没有参数的 join() 方法返回的字符串相同。
var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr.toString()George,John,Thomas
booleanObject.toString()返回字符串 "true" 或 "false"。
dateObject.toString()使用本地时间表示。
parseInt()首先查看位置 0 处的字符，判断它是否是个有效数字；如果不是，该方法将返回 NaN，不再继续执行其他操作。但如果该字符是有效数字，该方法将查看位置 1 处的字符，进行同样的测试。这一过程将持续到发现非有效数字的字符为止，此时 parseInt() 将把该字符之前的字符串转换成数字。把字符串 "12345red" 转换成整数，那么 parseInt() 将返回 12345。字符串中包含的数字字面量会被正确转换为数字，比如 "0xA" 会被正确转换为数字 10。不过，字符串 "22.5" 将被转换成 22，因为对于整数来说，小数点是无效字符。还有基模式，可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数。基是由 parseInt() 方法的第二个参数指定的，parseInt(string, radix)string	必需。要被解析的字符串。radix	
可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。

如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
parseFloat()从位置 0 开始查看每个字符，直到找到第一个非有效的字符为止，然后把该字符之前的字符串转换成整数。第一个出现的小数点是有效字符。如果有两个小数点，第二个小数点将被看作无效的。字符串 "11.22.33" 将被解析成 11.22。字符串必须以十进制形式表示浮点数，没有基模式。
Boolean()
var b1 = Boolean("");		//false - 空字符串
var b2 = Boolean("hello");		//true - 非空字符串
var b1 = Boolean(50);		//true - 非零数字
var b1 = Boolean(null);		//false - null
var b1 = Boolean(0);		//false - 零
var b1 = Boolean(new object());	//true - 对象
Number()
Number(false)	0
Number(true)	1
Number(undefined)	NaN
Number(null)	0
Number("1.2")	1.2
Number("12")	12
Number("1.2.3")	NaN
Number(new object())	NaN
Number(50)	50
String()
var s1 = String(null);	//"null"
var oNull = null;
var s2 = oNull.toString();	//会引发错误
String(123)"123"
String([1,2,3])"1,2,3"
要执行这种强制类型转换，只需要调用作为参数传递进来的值的 toString() 方法，即把 12 转换成 "12"，把 true 转换成 "true"，把 false 转换成 "false"，以此类推。

强制转换成字符串：






	
	
	
	
	
	
	
	
	
	
	

Access-Control-Allow-Credentials: true

Access-Control-Allow-Headers: content-type

Access-Control-Allow-Origin: http://xxx.xxx

Access-Control-Max-Age: 200

Async
async function f() {
    return 1
}
这个函数总是返回一个promise，如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。

async function f() {
    return 1
}
f().then(alert) // 1
也可以显式的返回一个promise，这个将会是同样的结果：

async function f() {
    return Promise.resolve(1)
}
f().then(alert) // 1
Await
// 只能在async函数内部使用
let value = await promise
await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。

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
await字面上使得JavaScript等待，直到promise处理完成，这并不会花费任何的cpu资源，因为引擎能够同时做其他工作：执行其他脚本，处理事件等等。

不能在常规函数里使用await
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

String.raw 非转义序列的模板字符串，如： String.rawHi\n\5\xxx\uuu\111





ArrayBuffer


function Func(){console.log(this.constructor())}




# ECMAScript 对象类型


# StringBuffer 

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


# 高阶函数

接受一个或多个函数作为输入.




函数的柯里化

接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数。

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

Set成员唯一、无序且不重复


Map
本质上是键值对的集合，类似集合
可以遍历，方法很多可以跟各种数据格式转换

WeakSet 
成员都是对象
成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
不能遍历，方法有add、delete、has

WeakMap
只接受对象作为键名（null除外），不接受其他类型的值作为键名
键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
不能遍历，方法有get、set、has、delete

深度优先遍历和广度优先遍历
递归、队列

用深度优先思想和广度优先思想实现一个拷贝函数

setTimeout、Promise、Async/Await 的区别

Async/Await 如何通过同步的方式实现异步

将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})

简单讲解一下http2的多路复用
HTTP2采用二进制格式传输，取代了HTTP1.x的文本格式，二进制格式解析更高效。
多路复用代替了HTTP1.x的序列和阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。在HTTP1.x中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接都限制。
HTTP2中

同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。
单个连接上可以并行交错的请求和响应，之间互不干扰

对TCP三次握手和四次挥手的理解
三次握手：
1、客户端发送syn包到服务器，等待服务器确认接收。
2、服务器确认接收syn包并确认客户的syn，并发送回来一个syn+ack的包给客户端。
3、客户端确认接收服务器的syn+ack包，并向服务器发送确认包ack，二者相互建立联系后，完成tcp三次握手。
四次挥手：中间多了一层 等待服务器再一次响应回复相关数据的过程

### A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

1. 服务器不重启，客户继续工作，就会发现对方没有回应(ETIMEOUT)，路由器聪明的话，则是目的地不可达(EHOSTUNREACH)。
2. 服务器重启后，客户继续工作，然而服务器已丢失客户信息，收到客户数据后响应RST。

# Node

介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？
发出npm install命令
查询node_modules目录之中是否已经存在指定模块
若存在，不再重新安装
若不存在
npm 向 registry 查询模块压缩包的网址
下载压缩包，存放在根目录下的.npm目录里
解压压缩包到当前项目的node_modules目录


# React

React 中 setState 什么时候是同步的，什么时候是异步的？
如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state。
指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。
在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。
这里所说的同步异步， 并不是真正的同步异步， 它还是同步执行的。

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







