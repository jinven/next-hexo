---
title: AMD、CommonJS
date: 2019-12-01 00:05:00
tags:
- javascript
---

## `CommonJS`

CommonJS是服务器端模块的规范，Node.js采用了这个规范。

根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。

CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。

<!-- more -->

```js
// foobar.js

//私有变量
var test = 123;
//公有方法
function foobar () {
    this.foo = function () {
        // do someing ...
    }
    this.bar = function () {
        //do someing ...
    }
}
//exports对象上的方法和变量是公有的
var foobar = new foobar();
exports.foobar = foobar;
```

```js
//require方法默认读取js文件，所以可以省略js后缀
var test = require('./boobar').foobar;
test.bar();
```

## `AMD`

AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义".
AMD设计出一个简洁的写模块API：

`define(id?, dependencies?, factory);`

- 第一个参数 id 为字符串类型，表示了模块标识，为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。
- 第二个参数，dependencies ，是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。
- 第三个参数，factory，是一个需要进行实例化的函数或者一个对象

通过参数的排列组合，这个简单的API可以从容应对各种各样的应用场景，如下所述。

- 定义无依赖的模块

    ```js
    define( {
        add : function( x, y ){
            return x + y ;
        }
    } );
    ```

- 定义有依赖的模块

    ```js
    define(["alpha"], function( alpha ){
        return {
            verb : function(){
                return alpha.verb() + 1 ;
            }
        }
    });
    ```

- 定义数据对象模块

    ```js
    define({
        users: [],
        members: []
    });
    ```

- 具名模块

    ```js
    define("alpha", [ "require", "exports", "beta" ], function( require, exports, beta ){
        export.verb = function(){
            return beta.verb();
            // or:
            return require("beta").verb();
        }
    });
    ```

- 包装模块

    ```js
    define(function(require, exports, module) {
        var a = require('a'),
            b = require('b');

        exports.action = function() {};
    } );
    ```

不考虑多了一层函数外，格式和Node.js是一样的：使用require获取依赖模块，使用exports导出API。

除了define外，AMD还保留一个关键字require。require 作为规范保留的全局标识符，可以实现为 module loader，也可以不实现

模块加载

`require([module], callback)`

AMD模块化规范中使用全局或局部的require函数实现加载一个或多个模块，所有模块加载完成之后的回调函数。

- `[module]`：是一个数组，里面的成员就是要加载的模块；
- `callback`：是模块加载完成之后的回调函数。

例如：加载一个math模块，然后调用方法 math.add(2, 3);

```js
require(['math'], function(math) {
　math.add(2, 3);
});
```

## `RequireJS`

RequireJS 是一个前端的模块化管理的工具库，遵循AMD规范，它的作者就是AMD规范的创始人 James Burke。所以说RequireJS是对AMD规范的阐述一点也不为过。

RequireJS 的基本思想为：通过一个函数来将所有所需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），我们所有的关于新模块的业务代码都在这个函数内部操作，其内部也可无限制的使用已经加载进来的以来的模块。

`<script data-main='scripts/main' src='scripts/require.js'></script>`

那么scripts下的main.js则是指定的主代码脚本文件，所有的依赖模块代码文件都将从该文件开始异步加载进入执行。

define用于定义模块，RequireJS要求每个模块均放在独立的文件之中。按照是否有依赖其他模块的情况分为独立模块和非独立模块。

- 独立模块，不依赖其他模块。直接定义：

    ```js
    define({
        method1: function(){},
        method2: function(){}
    });
    ```

    等价于

    ```js
    define(function() {
        return {
            method1: function(){},
            method2: function(){}
        }
    });
    ```

- 非独立模块，对其他模块有依赖。

    ```js
    define([ 'module1', 'module2' ], function(m1, m2) {
        ...
    });
    ```

    ```js
    define(function(require) {
        var m1 = require('module1'),
            m2 = require('module2');
        ...
    });
    ```

    简单看了一下RequireJS的实现方式，其 require 实现只不过是提取 require 之后的模块名，将其放入依赖关系之中。

- require方法调用模块

    在require进行调用模块时，其参数与define类似。

    ```js
    require(['foo', 'bar'], function(foo, bar) {
        foo.func();
        bar.func();
    } );
    ```

    在加载 foo 与 bar 两个模块之后执行回调函数实现具体过程。

    当然还可以如之前的例子中的，在define定义模块内部进行require调用模块

    ```js
    define(function(require) {
        var m1 = require( 'module1' ),
            m2 = require( 'module2' );
        ...
    });
    ```

    define 和 require 这两个定义模块，调用模块的方法合称为AMD模式，定义模块清晰，不会污染全局变量，清楚的显示依赖关系。AMD模式可以用于浏览器环境并且允许非同步加载模块，也可以按需动态加载模块。

## `CMD`、`SeaJS`

CMD是SeaJS 在推广过程中对模块定义的规范化产出

- 对于依赖的模块AMD是提前执行，CMD是延迟执行。不过RequireJS从2.0开始，也改成可以延迟执行（根据写法不同，处理方式不通过）。
- CMD推崇依赖就近，AMD推崇依赖前置。

```js
//AMD
define(['./a','./b'], function (a, b) {
    //依赖一开始就写好
    a.test();
    b.test();
});
//CMD
define(function (requie, exports, module) {
    //依赖可以就近书写
    var a = require('./a');
    a.test();
    ...
    //软依赖
    if (status) {
     
        var b = requie('./b');
        b.test();
    }
});
```

虽然 AMD也支持CMD写法，但依赖前置是官方文档的默认模块定义写法。

- AMD的API默认是一个当多个用，CMD严格的区分推崇职责单一。例如：AMD里require分全局的和局部的。CMD里面没有全局的 require，提供 seajs.use()来实现模块系统的加载启动。CMD里每个API都简单纯粹。

## `UMD`

UMD是AMD和CommonJS的糅合

AMD模块以浏览器第一的原则发展，异步加载模块。

CommonJS模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。

这迫使人们又想出另一个更通用的模式UMD （Universal Module Definition）。希望解决跨平台的解决方案。

UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。

在判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。

```js
(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});
```
