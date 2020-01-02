---
title: npm-发布
date: 2019-12-29 16:01:54
tags: node
---

# 初始化项目

1. 新建目录并初始化

```sh
mkdir publish-test
cd publish-test 
npm init -y
```

2. 修改 `package.json` 信息，如：

```json
{
    "name": "publish-test",
    "version": "1.0.0",
    "description": "first publish test.",
    "main": "index.js",
    "script:": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node index.js"
    },
    "keywords": [],
    "author": "auser",
    "license": "ISC"
}
```

3. 创建 `index.js` 文件

```js
console.log('publish-test', 'index.js')
```

# 注册 npm 账号

1. 前往官网注册账号： https://www.npmjs.com/

2. 确保npm源为官方库

```sh
npm config set registry https://registry.npmjs.org
```

# 发布

1. 执行发布命令

```sh
npm publish
```

2. 打开个人页面查看发布信息

# 其他项目中安装

1. 创建测试项目

```sh
mkdir publish-test-install
cd publish-test-install
npm init -y
```

2. 安装项目

```sh
npm install --save-dev publish-test
```

3.  `package.json` 文件查看是否安装成功，并在 `scripts` 下添加指令

```json
{
    "scripts": {
        "start": "node index.js"
    }
}
```

4. 创建 `index.js`

```js
require('publish-test')
```

5. 运行测试

```sh
npm start
# 或
node index.js
```
