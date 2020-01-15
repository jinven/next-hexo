---
title: typescript
date: 2019-12-01 00:00:40
tags:
- typescript
---

TypeScript是JavaScript的类型化超集，可编译为纯JavaScript。
任何浏览器、主机、操作系统，开源。

<!-- more -->

# 说明

## 安装 

```sh
npm install -g typescript
```

## 第一个TypeScript文件


1. 新建 `greeter.ts` 文件

```ts
// 接口
interface Person {
    // 字符串类型属性
    firstName: string;
    lastName: string;
}
// 类
class Student {
    fullName: string;
    // 构造函数，public 等同于创建了同名的成员变量
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
// 定义函数，第一个参数为有Person接口形式的数据
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
```

2. 新建 `greeter.html` 文件

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

3. 编译代码

```sh
tsc greeter.ts
```

4. 在浏览器里打开 `greeter.html` 查看页面

将输出 `greeter.js` 结果文件

## tsconfig.json

目录存在 `tsconfig.json` 文件，说明此目录是 `TypeScript` 项目

# 基础类型

```ts
// 布尔值
let isDone: boolean = false;
// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
// 字符串
let name: string = "bob";
let sentence: string = `Hello, my name is ${ name }.`;
// 数组
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
// 元组 Tuple
let x: [string, number] = ['hello', 10];
// 枚举
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
let colorName: string = Color[2];
// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
// Object，允许赋任意值，但是不能调用任意方法
let prettySure: Object = 4;
// Void，函数没有返回值时，变量没有什么用，只能赋值undefined和null
function warnUser(): void {
    console.log("This is my warning message");
}
let unusable: void = undefined;
// Null 和 Undefined，和void相似，本身的类型用处不大
let u: undefined = undefined;
let n: null = null;
// Never，永不存在的值的类型
function error(message: string): never {
    throw new Error(message);
}
function fail() {
    return error("Something failed");
}
function infiniteLoop(): never {
    while (true) {
    }
}
// 类型断言
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

# 变量声明

- `var`： 全局或同一函数下，声明有效，在条件语句、块语句中声明，块外有效
- `let`： 块外无效，必须先定义后使用，同一块不能重复定义，不同块、作用域，相同名称不同变量
- `const`： 声明时必须赋值，不可重新赋值

## 解构

```js
// 解构数组
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
function f([first, second]: [number, number]) {
}
f(input);
let [first, ...rest] = [1, 2, 3, 4]; // first = 1, rest = [2, 3, 4]
let [, second, , fourth] = [1, 2, 3, 4];
// 对象解构
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
({ a, b } = { a: "baz", b: 101 });
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
let { a: newName1, b: newName2 } = o;
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
// 函数声明
type C = { a: string, b?: number }
function f({ a, b }: C): void {
}
function f({ a="", b=0 } = {}): void {
}
f();
function f({ a, b = 0 } = { a: "" }): void {
}
f({ a: "yes" });
f();
// 展开，会丢失方法
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
let search = { food: "rich", ...defaults };
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p;
```

# 接口

```ts
interface LabelledValue {
  label: string;
}
// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}
// 只读属性，属性用readonly，变量用const
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
a = ro as number[];
// 类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function(source: string, subString: string) ： boolean {
  let result = source.search(subString);
  return result > -1;
}
// 可索引的类型
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
// 类类型
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
// 继承接口
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
// 接口继承类
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select() { }
}
class TextBox extends Control {
    select() { }
}
class Location {
}
```

# 类

```ts
// 继承
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
// 修饰符，默认为 public
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
// 参数属性
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
// 存取器
let passcode = "secret passcode";
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        } else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
// 静态属性
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}
let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
// 抽象类
abstract class Department {
    constructor(public name: string) {
    }
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

# 函数

```ts
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
// 推断类型，x、y推断为number类型
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
// 默认参数
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
// 剩余参数
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
// this和箭头函数
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
// this参数
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
```

# 泛型

```ts
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString");
let output = identity("myString");
// 泛型类型
let myIdentity: <T>(arg: T) => T = identity;
let myIdentity: <U>(arg: U) => U = identity;
interface GenericIdentityFn {
    <T>(arg: T): T;
}
let myIdentity: GenericIdentityFn = identity;
interface GenericIdentityFn<T> {
    (arg: T): T;
}
let myIdentity: GenericIdentityFn<number> = identity;
// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
// 泛型约束
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity(3);
loggingIdentity({length: 10, value: 3});
class BeeKeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numLegs: number;
}
class Bee extends Animal {
    keeper: BeeKeeper;
}
class Lion extends Animal {
    keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```

# 枚举

```ts
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
enum Response {
    No = 0,
    Yes = 1,
}
function respond(recipient: string, message: Response): void {
}
respond("Princess Caroline", Response.Yes)
// 字符串枚举
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
// 异构枚举
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
// 计算的和常量成员
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
// 运行时的枚举
enum E {
    X, Y, Z
}
function f(obj: { X: number }) {
    return obj.X;
}
f(E);
// 反向映射
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a];
// const枚举
const enum Enum {
    A = 1,
    B = A * 2
}
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
// 外部枚举
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```

# 类型推论

```ts
let x = 3;
let x = [0, 1, null];
let zoo = [new Rhino(), new Elephant(), new Snake()];
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
// 上下文类型
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);
};
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}
```

# 类型兼容性

```ts
interface Named {
    name: string;
}
class Person {
    name: string;
}
let p: Named;
p = new Person();
let x: Named;
let y = { name: 'Alice', location: 'Seattle' };
x = y;
function greet(n: Named) {
    console.log('Hello, ' + n.name);
}
greet(y);
// 比较两个函数
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x;
x = y; // Error
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});
x = y; 
y = x; // Error, because x() lacks a location property
// 函数参数双向协变
enum EventType { Mouse, Keyboard }
interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
}
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));
listenEvent(EventType.Mouse, (e: number) => console.log(e));
// 可选参数及剩余参数
function invokeLater(args: any[], callback: (...args: any[]) => void) {
}
invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));
// 枚举
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };
let status = Status.Ready;
status = Color.Green;  // Error
// 类
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}
class Size {
    feet: number;
    constructor(numFeet: number) { }
}
let a: Animal;
let s: Size;
a = s;
s = a;
// 泛型
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;
x = y;
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y;  // Error, because x and y are not compatible
let identity = function<T>(x: T): T {
}
let reverse = function<U>(y: U): U {
}
identity = reverse;
```

# 高级类型

```ts
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}
class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
// 联合类型
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft("Hello world", 4);
// 类型保护与区分类型
interface Bird {
    fly();
    layEggs();
}
interface Fish {
    swim();
    layEggs();
}
function getSmallPet(): Fish | Bird {
}
let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}
// 用户自定义的类型保护
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}
// typeof类型保护
function isNumber(x: any): x is number {
    return typeof x === "number";
}
function isString(x: any): x is string {
    return typeof x === "string";
}
function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
// instanceof类型保护
interface Padder {
    getPaddingString(): string
}
class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}
class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}
function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}
let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
// 可以为null的类型
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null;
sn = undefined; // error, 'undefined'不能赋值给'string | null'
// 可选参数和可选属性
function f(x: number, y?: number) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'
class C {
    a: number;
    b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'
// 类型保护和类型断言
function f(sn: string | null): string {
    return sn || "default";
}
// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
    name: string;
}
var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
// 接口 vs. 类型别名
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
// 字符串字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
        } else if (easing === "ease-out") {
        } else if (easing === "ease-in-out") {
        } else {
            // error! should not pass null or undefined.
        }
    }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
function createElement(tagName: string): Element {
}
// 数字字面量类型
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
}
function foo(x: number) {
    if (x !== 1 || x !== 2) {
        // Operator '!==' cannot be applied to types '1' and '2'.
    }
}
// 可辨识联合
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
// 完整性检查
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) : number {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
// 多态的 this类型
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}
let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}
let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
// 索引类型
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}
interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']);
// 索引类型和字符串索引签名
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
// 映射类型
interface PersonPartial {
    name?: string;
    age?: number;
}
// 由映射类型进行推断
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}
let originalProps = unproxify(proxyProps);
// 预定义的有条件类型
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void
type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]
function f1(s: string) {
    return { a: 1, b: s };
}
class C {
    x = 0;
    y = 0;
}
type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error
type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error
```

# Symbols

- Symbol.hasInstance： 方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
- Symbol.isConcatSpreadable： 布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。
- Symbol.iterator： 方法，被for-of语句调用。返回对象的默认迭代器。
- Symbol.match： 方法，被String.prototype.match调用。正则表达式用来匹配字符串。
- Symbol.replace： 方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。
- Symbol.search： 方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。
- Symbol.species： 函数值，为一个构造函数。用来创建派生对象。
- Symbol.split： 方法，被String.prototype.split调用。正则表达式来用分割字符串。
- Symbol.toPrimitive： 方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。
- Symbol.toStringTag： 方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。
- Symbol.unscopables： 对象，它自己拥有的属性会被with作用域排除在外。

```ts
let sym1 = Symbol();
let sym2 = Symbol("key");
let sym3 = Symbol("key");
sym2 === sym3; // false, symbols是唯一的
let obj = {
    [sym1]: "value"
};
console.log(obj[sym1]); // "value"
class C {
    [sym1](){
       return "C";
    }
}
let c = new C();
let className = c[sym1](); // "C"
```

# 迭代器和生成器

```ts
// for..of
let someArray = [1, "string", false];
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
// for..in
let list = [4, 5, 6];
for (let i in list) {
    console.log(i); // "0", "1", "2",
}
for (let i of list) {
    console.log(i); // "4", "5", "6"
}
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";
for (let pet in pets) {
    console.log(pet); // "species"
}
for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}
```

# 模块

```ts
// 导出
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
// 导入
import { ZipCodeValidator } from "./ZipCodeValidator";
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
// 默认导出
export default $;
import $ from "JQuery";
// export = 和 import = require()
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export = ZipCodeValidator;
import zip = require("./ZipCodeValidator");
// 生成模块代码
import m = require("mod");
export let t = m.something + 1;
// 外部模块 node.d.ts
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }
    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}
declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
// 模块声明通配符
declare module "*!text" {
    const content: string;
    export default content;
}
declare module "json!*" {
    const value: any;
    export default value;
}
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);
```

# 命名空间

```ts
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
// 别名
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square();
// 外部命名空间
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }
    export interface Event {
        x: number;
        y: number;
    }
    export interface Base extends Selectors {
        event: Event;
    }
}
declare var d3: D3.Base;
```

# 模块解析

# 声明合并

```ts
// 合并接口
interface Box {
    height: number;
    width: number;
}
interface Box {
    scale: number;
}
let box: Box = {height: 5, width: 6, scale: 10};
interface Cloner {
    clone(animal: Animal): Animal;
}
interface Cloner {
    clone(animal: Sheep): Sheep;
}
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

# JSX

使用JSX必须：

- 给文件一个.tsx扩展名
- 启用jsx选项

```ts
// as操作符
var foo = <foo>bar;
var foo = bar as foo;
// 类型检查
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}
<foo />; // 正确
<bar />; // 错误
// 基于值的元素
import MyComponent from "./myComponent";
<MyComponent />; // 正确
<SomeOtherComponent />; // 错误
// 无状态函数组件
interface FooProp {
    name: string;
    X: number;
    Y: number;
}
declare function AnotherComponent(prop: {name: string});
function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name={prop.name} />;
}
const Button = (prop: {value: string}, context: { color: string }) => <button>
interface ClickableProps {
    children: JSX.Element[] | JSX.Element
}
interface HomeProps extends ClickableProps {
    home: JSX.Element;
}
interface SideProps extends ClickableProps {
    side: JSX.Element | string;
}
function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element {
}
// 类组件
class MyComponent {
    render() {}
}
var myComponent = new MyComponent();
function MyFactoryFunction() {
    return {
        render: () => {
        }
    }
}
var myComponent = MyFactoryFunction();
declare namespace JSX {
    interface ElementClass {
    render: any;
    }
}
class MyComponent {
    render() {}
}
function MyFactoryFunction() {
    return { render: () => {} }
}
<MyComponent />; // 正确
<MyFactoryFunction />; // 正确
class NotAValidComponent {}
function NotAValidFactoryFunction() {
    return {};
}
<NotAValidComponent />; // 错误
<NotAValidFactoryFunction />; // 错误
// 属性类型检查
declare namespace JSX {
    interface IntrinsicElements {
    foo: { bar?: boolean }
    }
}
<foo bar />;
declare namespace JSX {
    interface ElementAttributesProperty {
    props; // 指定用来使用的属性名
    }
}
class MyComponent {
    // 在元素实例类型上指定属性
    props: {
    foo?: string;
    }
}
<MyComponent foo="bar" />
```

# 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

一个@sealed装饰器，这样定义sealed函数：

```ts
function sealed(target) {
    // do something with "target" ...
}
```

装饰器工厂

```ts
function color(value: string) {
    return function (target) { //  装饰器
        // do something with "target" and "value"...
    }
}
```

装饰器组合

- 书写在同一行上：

```ts
@f @g x
```

- 书写在多行上：

```ts
@f
@g
x
```

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}
class C {
    @f()
    @g()
    method() {}
}

// f(): evaluated
// g(): evaluated
// g(): called
// f(): called
```

装饰器求值，类中不同声明上的装饰器将按以下规定的顺序应用：

- 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
- 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
- 参数装饰器应用到构造函数。
- 类装饰器应用到类。

类装饰器

```ts
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

方法装饰器

```ts
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

访问器装饰器

```ts
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
```

属性装饰器

```ts
import "reflect-metadata";
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
```

参数装饰器

```ts
import "reflect-metadata";
const requiredMetadataKey = Symbol("required");
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments);
    }
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
```

# Mixins

```ts
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

# 三斜线指令

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

```ts
/// <reference path="..." />
/// <reference path="..." />指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。
```

`/// <reference types="..." />` 与 `/// <reference path="..." />` 指令相似，这个指令是用来声明 依赖的； 
一个 `/// <reference types="..." />` 指令则声明了对某个包的依赖。

`/// <reference no-default-lib="true"/>`
这个指令把一个文件标记成默认库

`/// <amd-module />`
默认情况下生成的AMD模块都是匿名的
