---
title: ECMAScript
date: 2019-12-01 00:15:00
tags:
- javascript
---

## es6-es2015

1. `class` 类

```js
class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    get describe(){
        return `name: ${this.name}, age: ${this.age}`
    }
    toString(){
        return this.describe;
    }
}
class Teacher extends Person {
    get describe(){
        return `position: teacher, ` + super.describe;
    }
}
const man = new Teacher('小明', 20);
console.log(man.toString());
```

<!-- more -->

2. `Module` 模块化

```js
 //test.js
 const name = '小明';
 const age = '20';
 const foo = function(args){
     console.log(args);
 }
 export {name, age, foo};

 // main.js
 import { name, age, foo} from 'test';// test.js
```

3. 箭头函数

```js
setTimeout(a => console.log(a), 2000, 'test')
```

4. 函数参数默认值

```js
function foo(a = 10){
    console.log(a);
}
foo();
foo(11);
```

5. 模板字符串

```js
const name='test';
console.log(`name: ${name}`);
```

6. 解构赋值

```js
const [a, b, c] = ['a1', 'a2', 'a3'];
const [d, ,  ,  e, f='a5'] = [c, b, a, 'a4'];
const {x, y, z} = { x: 10, y: 11, z: 12 };
console.log(`a: ${a}, b: ${b}, c: ${c}`);
console.log(`a: ${d}, b: ${e}, c: ${f}`);
console.log(`a: ${x}, b: ${y}, c: ${z}`);
```

7. 延展操作符(spread/rest)

```js
const arr = ['a1', 'a2', 'a3'];
const obj = { a: 'a1', b: 'a2', c: 'a3' };
console.log(...arr);
console.log([...arr, 'a4', 'a5', ...'bcdefg']);
console.log({...obj, d: 'a4', e: 'a5' })
```

8. 对象属性简写

```js
const name = 'test';
const age = 20;
const person = {
    name,
    age
};
console.log(person);
```

9. Promise

```js
const p = new Promise(function(resolve, reject){
    console.log('start-1');
    setTimeout(resolve, 2000);
});
const p2 = new Promise(function(resolve, reject){
    console.log('start-2');
    setTimeout(reject, 2000);
});
p.then(function(){
    console.log('finish-1');
});
p2.catch(function(){
    console.log('error-2');
});
```

10. `let` 与 `const`

```js
{
    var a = 10;
    let b = 11;
}
console.log(a);
console.log(b);
```

## es7-es2016

1. `Array.prototype.includes`

```js
console.log(['abc','bbb','ccc'].includes('bbb'))
console.log([123,222,333,NaN].includes(NaN))
```

2. `Exponentiation Operator` (求幂运算)

```js
console.log((5**3) === Math.pow(5, 3))
```

## es8-es2017

1. `Object.values/Object.entries`

```js
let obj={a: 'a1', b: 'a2', c: 'a3' };
console.log(Object.values(obj));
console.log(Object.entries(obj));
```

2. `String padding` (字符串填充)

```js
console.log('0.00'.padStart(15));
console.log('1000.00'.padStart(15));
console.log('100,000.00'.padStart(15));
console.log('100,000,000.00'.padStart(15));


console.log('100.00'.padStart(15, '#'));
console.log('100.00'.padEnd(15,'!'));
```

3. `Object.getOwnPropertyDescriptors`

```js
let obj={a: 'a1', b: 'a2', c: 'a3' };
console.log(Object.getOwnPropertyDescriptors(obj));

Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
Object.defineProperties(obj, Object.getOwnPropertyDescriptors(obj));
```

4. `Trailing commas` (函数参数列表和调用中的尾逗号)

```js
function func(a,b,c,){}
let arr=[1,2,3,];
let obj={a: 'a1', b: 'a2', c: 'a3',};
```

5. `async/await` (异步函数)

```js
async function req() {
    const response = await fetch('/');
    return response.statusText;
}
req().then(d => { console.log(d) });
```

6. `SharedArrayBuffer/Atomics` 从共享内存位置读取和写入

```js
const buffer = new SharedArrayBuffer(16);
const uint8 = new Uint8Array(buffer);
uint8[0] = 7;
console.log(Atomics.add(uint8, 0 ,2));
Atomics.and(uint8, 0, 2);
Atomics.compareExchange(uint8, 0, 5, 2);
Atomics.exchange(uint8, 0, 2);
Atomics.load(uint8, 0);
Atomics.or();
Atomics.store();
Atomics.sub();
Atomics.xor();
Atomics.wait();
Atomics.wake();
Atomics.isLockFree(size);
```

## es9-es2018

1. 异步迭代

```js
async function process(array) {
    for await (let i of array) {
        doSomething(i);
    }
}
```

2. Promise.finally()

```js
function doSomething() {
    doSomething1()
        .then(doSomething2)
        .then(doSomething3)
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            // finish here!
        });
}
```

3. Rest/Spread 属性

```js
restParam(1, 2, 3, 4, 5);
const obj = { a: 1, b: 2, c : 3 };
function restParam(p1, p2, ...p3) {
  // p1 = 1
  // p2 = 2
  // p3 = [3, 4, 5]
}
const { a, ...x } = obj;
function foo({ a, ...x }){

}
foo(obj);
// a = 1,
// x = { b: 2, c: 3 }
```

4. 正则表达式命名捕获组（Regular Expression Named Capture Groups）

```js
const
  reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match[1], // 2018
  month  = match[2], // 04
  day    = match[3]; // 30
```

5. 正则表达式反向断言（lookbehind）

```js
const
  reLookahead = /\D(?=\d+)/,
  match       = reLookahead.exec('$123.89');
console.log( match[0] ); // $

const
  reLookbehind = /(?<=\D)\d+/,
  match        = reLookbehind.exec('$123.89');
console.log( match[0] ); // 123.89
```

6. 正则表达式dotAll模式

```js
/hello.world/.test('hello\nworld');  // false
/hello.world/s.test('hello\nworld'); // true
```

7. 正则表达式 Unicode 转义

```js
const reGreekSymbol = /\p{Script=Greek}/u;
reGreekSymbol.test('π'); // true
```

8. 非转义序列的模板字符串

```js
let str = String.raw`Hi\n\5\xxx\uuu\111`;
console.log(str.length);
console.log(str.split('').join(''));

function latex(str) { 
    return { "cooked": str[0], "raw": str.raw[0] }
}
console.log(latex`\unicode`);
```

## es10-es2019

1. 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配

    以前，这些符号在字符串文字中被视为行终止符，因此使用它们会导致SyntaxError异常。

2. 更加友好的 JSON.stringify

    如果输入 Unicode 格式但是超出范围的字符，在原先JSON.stringify返回格式错误的Unicode字符串。现在实现了一个改变JSON.stringify的第3阶段提案，因此它为其输出转义序列，使其成为有效Unicode（并以UTF-8表示）

3. 新增了Array的flat()方法和flatMap()方法

    flat()和flatMap()本质上就是是归纳（reduce） 与 合并（concat）的操作。

```js
let arr = [1, 2, [3, 4]];
arr.flat();
arr = [1, 2, [3, 4, [5, 6]]];
arr.flat(); 
arr.flat(2);
arr.flat(Infinity);
arr = [1, 2, , 4, 5];
arr.flat();

arr = [1, 2, 3, 4];
arr.map(x => [x * 2]); 
// [[2], [4], [6], [8]]
arr.flatMap(x => [x * 2]);
// [2, 4, 6, 8]
// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
```


4. 新增了String的trimStart()方法和trimEnd()方法

5. Object.fromEntries()

```js
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }

const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

6. Symbol.prototype.description

```js
const sym = Symbol('The description');
console.log(sym.description=='The description');
```

7. String.prototype.matchAll

```js
const regexp = RegExp('foo*','g');
const str = 'table football, foosball';
while ((matches = regexp.exec(str)) !== null) {
  console.log(`Found ${matches[0]}. Next starts at ${regexp.lastIndex}.`);
  // expected output: "Found foo. Next starts at 9."
  // expected output: "Found foo. Next starts at 19."
}

let matches = str.matchAll(regexp);
for (const match of matches) {
  console.log(match);
}
// Array [ "foo" ]
// Array [ "foo" ]

// matches iterator is exhausted after the for..of iteration
// Call matchAll again to create a new iterator
matches = str.matchAll(regexp);
Array.from(matches, m => m[0]);
// Array [ "foo", "foo" ]

var regexp = /t(e)(st(\d?))/g;
var str = 'test1test2';

str.match(regexp); 
// Array ['test1', 'test2']
let array = [...str.matchAll(regexp)];

array[0];
// ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]
array[1];
// ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]
```

8. Function.prototype.toString()现在返回精确字符，包括空格和注释

```js
function /* comment */ foo /* another comment */() {}
const bar /* comment */ = /* another comment */ () /* another2 comment */ => {};
console.log(foo.toString());
console.log(bar.toString());
```

9. 简化try {} catch {},修改 catch 绑定

```js
try {} catch {}
```

10. 新的基本数据类型BigInt

```js
String、Number、Boolean、Null、Undefined、Symbol、BigInt
```

11. globalThis
12. import()
13. Legacy RegEx
14. 私有的实例方法和访问器
