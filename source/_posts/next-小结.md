---
title: next-小结
date: 2019-12-29 16:01:47
tags:
- react
- javascript
---

https://nextjs.org/

一个轻量级的 React 服务端渲染应用框架。

源码示例： https://github.com/jinven/next-demo

<!-- more -->

```sh
npm install --save next react react-dom
```

```json
// package.json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

# 目录约定

```
.
├── .next/                         // 默认的 build 输出目录
├── components/                    // 自定义组件
├── config/
    ├── config.js                  // 配置
├── pages                          // 页面目录，里面的文件即路由
├── pages/index.js                 // 首页
├── pages/_app.js                  // 所有页面的根页面，相当于 layout
├── pages/_document.js             // HTML 文件结构，包括 html、head、body
├── pages/***.js                   // 自定义页面，页面名称就是url路由名称
├── pages/api/***.js               // api目录，如：/api、/api/user、/api/user/1
├── pages/***/***.js               // 二级及多级目录，如：/user/1、/post/blog、/post/blog/1
├── public                         // 全局文件目录，生成时会复制到生成目录，如 ico
├── static                         // 自定义静态文件目录
├── styles                         // 自定义样式文件目录
├── utils                          // 自定义帮助文件目录
├── next.config.js                 // 合并到 webpack 的配置文件，可配置路由等
├── server.js                      // 自定义服务启动文件
└── package.json
```

# 首页

```js
// /pages/index.js
function HomePage() {
  return <div>Welcome to Next.js!</div>
}
export default HomePage
```

# getInitialProps

服务端运行执行，可异步执行，返回对象到页面的 props，只能在 pages 页面中，不能在子组件

参数：

- `pathname` - URL 的 path 部分
- `query` - URL 的 query 部分，并被解析成对象
- `asPath` - 显示在浏览器中的实际路径（包含查询部分），为String类型
- `req` - HTTP 请求对象 (只有服务器端有)
- `res` - HTTP 返回对象 (只有服务器端有)
- `jsonPageRes` - 获取数据响应对象 (只有客户端有)
- `err` - 渲染过程中的任何错误

```js
// /pages/index.js
import fetch from 'isomorphic-unfetch'
function HomePage({ stars }) {
  return <div>Next stars: {stars}</div>
}
HomePage.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}
export default HomePage
```

# CSS支持

## styled-jsx

样式只会在当前组件生效

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```

## CSS-in-JS

```jsx
function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>
}
export default HiThere
```

## css插件

- [@zeit/next-css](https://github.com/zeit/next-plugins/tree/master/packages/next-css)
- [@zeit/next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass)
- [@zeit/next-less](https://github.com/zeit/next-plugins/tree/master/packages/next-less)
- [@zeit/next-stylus](https://github.com/zeit/next-plugins/tree/master/packages/next-stylus)

### scss

```sh
npm install --save @zeit/next-sass node-sass
```

```scss
// /styles/scss.scss
.example {
  font-size: 52px;
}
```

```jsx
// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true
})

// /pages/index.js
import css from  '../styles/scss.scss'
export default () => (
  <div>
    <h1 className={css.example}>scss</h1>
  </div>
)
```

## 动态路由

- pages/post/[参数名称].js
- pages/post/[参数名称1]/[参数名称2].js

```jsx
// /pages/post/[pid].js
import { useRouter } from 'next/router'
const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  return <p>Post: {pid}</p>
}
export default Post
```

## 影子路由

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// Current URL is '/'
function Page() {
  const router = useRouter()
  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', null, { shallow: true })
  }, [])
  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}
export default Page
```

## 自定义服务启动

```js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    console.log('server.js')
    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

## serverless

```js
// next.config.js
module.exports = {
  target: 'serverless',
}
```
