---
title: node-babel
date: 2019-12-01 00:35:00
tags: 
- node
- javascript
---

babel-node是一个与Node.js CLI完全相同的CLI，具有在运行Babel预设和插件之前进行编译的附加好处。

<!-- more -->

- [babel](https://github.com/babel/babel)
- [core-js](https://github.com/zloirock/core-js)
- [polyfill](https://github.com/financial-times/polyfill-service)


# `.babelrc`

Babel的配置文件

```js
{
  "presets": [],
  "plugins": []
}
```


- `presets` 转码规则

    ```sh
    # ES2015转码规则
    $ npm install --save-dev babel-preset-es2015
    # react转码规则
    $ npm install --save-dev babel-preset-react
    # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
    $ npm install --save-dev babel-preset-stage-0
    $ npm install --save-dev babel-preset-stage-1
    $ npm install --save-dev babel-preset-stage-2
    $ npm install --save-dev babel-preset-stage-3
    ```

    如：

    ```js
    {
        "presets": [
            "es2015",
            "react",
            "stage-2"
        ],
        "plugins": []
    }
    ```

# `babel-cli`

命令行转码

```sh
$ npm install --global babel-cli

# 转码结果输出到标准输出
$ babel demo01.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel demo01.js --out-file demo01_compiled.js
# 或者
$ babel demo01.js -o demo01_compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

`babel-cli` 安装在项目之中

```sh
$ npm install --save-dev babel-cli
```

`package.json`

```js
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```

```sh
$ npm run build
```

# `babel-node`

babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

```sh
babel-node demo01.js
```

`package.json`

```js
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```

# `babel-register`

babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。

```sh
$ npm install --save-dev babel-register
```

使用时，必须首先加载babel-register

```js
require("babel-register");
require("./index.js");
```

# `babel-core`

如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。

```sh
$ npm install babel-core --save
```

```js
var babel = require('babel-core');
// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }
// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});
// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }
// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

配置对象options，可以参看官方文档 http://babeljs.io/docs/usage/options/

如：

```js
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

# `babel-polyfill`

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

```sh
$ npm install --save babel-polyfill
```

在脚本头部，加入如下一行代码。

```js
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

# 浏览器环境

从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果没有或不想使用构建工具，可以通过安装5.x版本的babel-core模块获取。

```sh
$ npm install babel-core@old
```

# 在线转换

https://babeljs.io/repl/

# 与其他工具的配合

许多工具需要Babel进行前置转码，如：ESLint和Mocha

ESLint 用于静态检查代码的语法和风格

```sh
$ npm install --save-dev eslint babel-eslint
```

项目根目录下，新建一个配置文件 `.eslint`，在其中加入 `parser` 字段

```js
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```

`package.json`

```js  
{
    "name": "my-module",
    "scripts": {
        "lint": "eslint my-files.js"
    },
    "devDependencies": {
        "babel-eslint": "...",
        "eslint": "..."
    }
}
```

`Mocha` 则是一个测试框架

`package.json`

```js
"scripts": {
  "test": "mocha --ui qunit --compilers js:babel-core/register"
}
```

`--compilers` 参数指定脚本的转码器，规定后缀名为js的文件，都需要使用 `babel-core/register` 先转码