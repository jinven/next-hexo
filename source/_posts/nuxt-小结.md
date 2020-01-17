---
title: nuxt-小结
date: 2019-12-01 00:48:00
tags:
- vue
- javascript
---

https://zh.nuxtjs.org/guide/installation

一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，主要关注的是应用的 UI渲染。

目标是创建一个灵活的应用框架。

源码示例： https://github.com/jinven/nuxt-app

<!-- more -->

```sh
npx create-nuxt-app <项目名>
cd <project-name>
npm run dev
```

# 目录约定

```
.
├── .nuxt/                         // 默认的 build 输出目录
├── components/                    // 组件目录
├── layouts                        // 布局目录
├── middleware                     // 中间件目录
├── pages                          // 页面目录，里面的文件即路由
├── pages/index.vue                // 首页
├── pages/_app.vue                 // 所有页面的根页面，相当于 layout
├── pages/_document.vuev           // HTML 文件结构，包括 html、head、body
├── pages/***.vue                  // 自定义页面，页面名称就是url路由名称
├── pages/api/***.vue              // api目录，如：/api、/api/user、/api/user/1
├── pages/***/***.vue              // 二级及多级目录，如：/user/1、/post/blog、/post/blog/1
├── plugins                        // 插件目录
├── public                         // 全局文件目录，生成时会复制到生成目录，如 ico
├── static                         // 静态文件目录
├── store                          // 状态树文件目录
├── styles                         // 自定义样式文件目录
├── utils                          // 自定义帮助文件目录
├── nuxt.config.js                 // 合并到 webpack 的配置文件，可配置路由等
└── package.json
```

## 别名

- `~` 或 `@` srcDir目录
- `~~` 或 `@@` rootDir目录

# 配置项

- `build` 允许在自动生成的 vendor.bundle.js 文件中添加一些模块，以减少应用 bundle 的体积
- `css` 定义应用的全局样式文件、模块或第三方库
- `dev` 配置 Nuxt.js 应用是开发还是生产模式
- `env` 定义应用客户端和服务端的环境变量
- `generate` 定义每个动态路由的参数，Nuxt.js 依据这些路由配置生成对应目录结构的静态文件
- `head` 配置应用默认的meta标签
- `loading` 个性化定制 Nuxt.js 使用的加载组件
- `modules` 允许将Nuxt模块添加到项目中
- `modulesDir` 允许定义Nuxt.js应用程序的node_modules文件夹
- `plugins` 配置那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
- `rootDir` 配置 Nuxt.js 应用的根目录
- `router` 覆盖 Nuxt.js 默认的 vue-router 配置
- `server` 允许配置Nuxt.js应用程序的服务器实例变量
- `srcDir` 配置应用的源码目录路径
- `dir` 允许配置Nuxt.js应用程序的自定义目录
- `transition` 个性化配置应用过渡效果属性的默认值

# 路由

`<nuxt-link>`

```html
<template>
  <nuxt-link to="/">首页</nuxt-link>
</template>
```

## 基础路由

若 pages 目录如下：

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## 动态路由

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

=>

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

## 路由参数校验

```js
// pages/users/_id.vue
export default {
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  }
}
```

## 嵌套路由

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

=>

```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

## 动态嵌套路由

```
pages/
--| _category/
-----| _subCategory/
--------| _id.vue
--------| index.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
--| index.vue
```

=>

```js
router: {
  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      name: 'index'
    },
    {
      path: '/:category',
      component: 'pages/_category.vue',
      children: [
        {
          path: '',
          component: 'pages/_category/index.vue',
          name: 'category'
        },
        {
          path: ':subCategory',
          component: 'pages/_category/_subCategory.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/_subCategory/index.vue',
              name: 'category-subCategory'
            },
            {
              path: ':id',
              component: 'pages/_category/_subCategory/_id.vue',
              name: 'category-subCategory-id'
            }
          ]
        }
      ]
    }
  ]
}
```

## 中间件

中间件允许定义一个自定义函数运行在一个页面或一组页面渲染之前。

一个中间件应放置在 middleware/ 目录。

文件名的名称将成为中间件名称(middleware/auth.js将成为 auth 中间件)

```js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

中间件执行流程顺序：

1. nuxt.config.js
2. 匹配布局
3. 匹配页面

中间件可以异步执行,只需要返回一个 Promise 或使用第2个 callback 作为第一个参数：

```js
// middleware/stats.js
import axios from 'axios'
export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}

// nuxt.config.js
module.exports = {
  router: {
    middleware: 'stats'
  }
}

// pages/index.vue 或者 layouts/default.vue
export default {
  middleware: 'stats'
}
```

# 视图

## 模板

定制化默认的 html 模板，只需要在应用根目录下创建一个 app.html 的文件

```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 布局

允许你扩展默认的布局，或在 layout 目录下创建自定义的布局。

### 默认布局

可通过添加 layouts/default.vue 文件来扩展应用的默认布局。

默认布局的源码如下：

```html
<template>
  <nuxt/>
</template>
```

### 自定义布局

layouts 目录中的每个文件 (顶级) 都将创建一个可通过页面组件中的 layout 属性访问的自定义布局。

假设创建一个 博客布局 并将其保存到 `layouts/blog.vue`:

```html
<template>
  <div>
    <div>我的博客导航栏在这里</div>
    <nuxt/>
  </div>
</template>
```

然后告诉页面 `pages/posts.vue` 使用 自定义布局：

```html
<template>
<!-- Your template -->
</template>
<script>
export default {
  layout: 'blog'
  // page component definitions
}
</script>
```

### 错误页面

可以通过编辑 `layouts/error.vue` 文件来定制化错误页面.

如：

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>
<script>
export default {
  props: ['error'],
  layout: 'blog' // 可以为错误页面指定自定义的布局
}
</script>
```

### 页面

实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的功能特性）以便能快速开发通用应用。

如：

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>
<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>
<style>
.red {
  color: red;
}
</style>
```

Nuxt.js 为页面提供的特殊配置项：

- `asyncData` 最重要的一个键, 支持 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
- `fetch` 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
- `head` 配置当前页面的 Meta 标签。
- `layout` 指定当前页面使用的布局（layouts 根目录下的布局文件）。
- `loading` 如果设置为false，则阻止页面自动调用this.$nuxt.$loading.finish()和this.$nuxt.$loading.start()，可以手动控制它，仅适用于在nuxt.config.js中设置loading的情况下。
- `transition` 指定页面切换的过渡动效。
- `scrollToTop` 布尔值，默认: false。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于嵌套路由的应用场景。
- `validate` 校验方法用于校验动态路由的参数。
- `middleware` 指定页面的中间件，中间件会在页面渲染之前被调用。

### HTML 头部

Nuxt.js 使用了 vue-meta 更新应用的 头部标签(Head) and html 属性。

Nuxt.js 使用以下参数配置 vue-meta:

```js
{
  keyName: 'head', // 设置 meta 信息的组件对象的字段，vue-meta 会根据这 key 值获取 meta 信息
  attribute: 'n-head', // vue-meta 在监听标签时所添加的属性名
  ssrAttribute: 'n-head-ssr', // 让 vue-meta 获知 meta 信息已完成服务端渲染的属性名
  tagIDKeyName: 'hid' // 让 vue-meta 用来决定是否覆盖还是追加 tag 的属性名
}
```

### 默认 Meta 标签

允许在 nuxt.config.js 里定义应用所需的所有默认 meta 标签，在 head 字段里配置就可以了：

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

### 个性化特定页面的 Meta 标签

# 异步数据

Nuxt.js 扩展了 Vue.js，增加了一个叫 asyncData 的方法，使得可以在设置组件的数据之前能异步获取或处理数据。

## asyncData 方法

asyncData方法会在组件（限于页面组件）每次加载之前被调用。

它可以在服务端或路由更新之前被调用。 

在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，可以利用 asyncData方法来获取数据，Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件。

提供了几种不同的方法来使用 asyncData 方法：

1. 返回一个 Promise, nuxt.js会等待该Promise被解析之后才会设置组件的数据，从而渲染组件.
2. 使用 async 或 await

如果项目中直接使用了node_modules中的axios，并且使用axios.interceptors添加拦截器对请求或响应数据进行了处理，确保使用 axios.create创建实例后再使用。

否则多次刷新页面请求服务器，服务端渲染会重复添加拦截器，导致数据处理错误。

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  // ...
})
```

### 返回 Promise

```js
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
      })
  }
}
```

### 使用 async或await

```js
export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

### 使用回调函数

```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        callback(null, { title: res.data.title })
      })
  }
}
```

### 返回对象

如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。

```js
export default {
  data () {
    return { foo: 'bar' }
  }
}
```

### 数据的展示

asyncData 方法返回的数据在融合 data 方法返回的数据后，一并返回给模板进行展示，如：

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## 上下文对象

### 使用 req/res(request/response) 对象

```js
export default {
  async asyncData ({ req, res }) {
    // 请检查您是否在服务器端
    // 使用 req 和 res
    if (process.server) {
      return { host: req.headers.host }
    }
    return {}
  }
}
```

### 访问动态路由数据

```js
export default {
  async asyncData ({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  }
}
```

## 错误处理

```js
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

如果使用回调函数的方式, 可以将错误的信息对象直接传给该回调函数，Nuxt.js 内部会自动调用 error 方法：

```js
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        callback(null, { title: res.data.title })
      })
      .catch((e) => {
        callback({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

# 资源文件

## Webpack 构建

默认情况下, vue-loader自动使用 css-loader 和Vue模板编译器来编译处理vue文件中的样式和模板。

在此编译过程中，所有的资源URL例如 `<img src="...">`、 `background: url(...)` 和 CSS中的 `@import` 均会被解析成模块通过 require 引用。

如目录结构：

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

如果在CSS代码中使用 `url('~assets/image.png')`, 那么编译后它将被转换成 `require('~/assets/image.png')`。

如果在 `pages/index.vue` 中使用以下代码引用图片资源：

```html
<template>
  <img src="~/assets/image.png">
</template>
```

编译会转换成

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

Nuxt.js 默认的加载器配置如下：

```js
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

文件（图片或字体）的尺寸小于1K的时候，它将会被转换成 Base-64 data URL 来内联引用；

否则它将被拷贝至指定的子目录（在 .nuxt 目录下），并被重命名（加上7位的哈希码作为版本标识）以实现更好的缓存策略。

## 静态文件

如果静态资源文件需要 Webpack 做构建编译处理，可以放到 assets 目录，否则可以放到 static 目录中去。

# 插件

Nuxt.js允许在运行Vue.js应用程序之前执行js插件。这在需要使用自己的库或第三方模块时特别有用。

## 使用第三方模块

可以在应用中使用第三方模块，一个典型的例子是在客户端和服务端使用 axios 做 HTTP 请求。

```html
<template>
  <h1>{{ title }}</h1>
</template>
<script>
import axios from 'axios'
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
```

## 使用 Vue 插件

如想使用 vue-notifications 显示应用的通知信息

增加文件 `plugins/vue-notifications.js`：

```js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
Vue.use(VueNotifications)
```

在 nuxt.config.js 内配置 plugins 如下：

```js
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

### ES6 插件

```js
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```

## 注入 $root 和 context

有时希望在整个应用程序中使用某个函数或属性值，此时，需要将它们注入到Vue实例（客户端），context（服务器端）甚至 store(Vuex)。

按照惯例，新增的属性或方法名使用$作为前缀。

### 注入 Vue 实例

将内容注入Vue实例，避免重复引入，在Vue原型上挂载注入一个函数，所有组件内都可以访问(不包含服务器端)。

```js
// plugins/vue-inject.js
import Vue from 'vue'
Vue.prototype.$myInjectedFunction = string => console.log('This is an example', string)

// nuxt.config.js
export default {
  plugins: ['~/plugins/vue-inject.js']
}

// example-component.vue
export default {
  mounted () {
    this.$myInjectedFunction('test')
  }
}
```

### 注入 context

context注入方式和在其它vue应用程序中注入类似。

```js
// plugins/ctx-inject.js
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = string => console.log('Okay, another function', string)
}

// nuxt.config.js
export default {
  plugins: ['~/plugins/ctx-inject.js']
}

// ctx-example-component.vue
export default {
  asyncData (context) {
    context.app.myInjectedFunction('ctx!')
  }
}
```

### 同时注入

```js
// plugins/combined-inject.js
export default ({ app }, inject) => {
  inject('myInjectedFunction', string => console.log('That was easy!', string))
}

// nuxt.config.js
export default {
  plugins: ['~/plugins/combined-inject.js']
}

// ctx-example-component.vue
export default {
  mounted () {
    this.$myInjectedFunction('works in mounted')
  },
  asyncData (context) {
    context.app.$myInjectedFunction('works with context')
  }
}

// store/index.js
export const state = () => ({
  someValue: ''
})
export const mutations = {
  changeSomeValue (state, newValue) {
    this.$myInjectedFunction('accessible in mutations')
    state.someValue = newValue
  }
}
export const actions = {
  setSomeValueToWhatever ({ commit }) {
    this.$myInjectedFunction('accessible in actions')
    const newValue = 'whatever'
    commit('changeSomeValue', newValue)
  }
}
```

## 只在客户端使用的插件

```js
// nuxt.config.js
module.exports = {
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false }
  ]
}

// plugins/vue-notifications.js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
Vue.use(VueNotifications)
```

### 传统命名插件

如果假设插件仅在 客户端 或 服务器端 运行，则 .client.js 或 .server.js可以作为插件文件的扩展名应用，该文件将自动包含在相应客户端或者服务端上。

```js
// nuxt.config.js:
export default {
  plugins: [
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server
  ]
}
```

# 模块

模块是Nuxt.js扩展，可以扩展其核心功能并添加无限的集成。

在使用Nuxt开发应用程序时，很快就会发现框架的核心功能还不够。

Nuxt可以使用配置选项和插件进行扩展，但是在多个项目中维护这些自定义是繁琐、重复和耗时的。 

官方 模块:

- `@nuxt/http`: 基于ky-universal的轻量级和通用的HTTP请求
- `@nuxtjs/axios`: 安全和使用简单Axios与Nuxt.js集成用来请求HTTP
- `@nuxtjs/pwa`: 使用经过严格测试，更新且稳定的PWA解决方案来增强Nuxt
- `@nuxtjs/auth`: Nuxt.js的身份验证模块，提供不同的方案和验证策略

# Vuex 状态树

对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。

这就是为什么 Nuxt.js 内核实现了 Vuex。

## 使用状态树

Nuxt.js 会尝试找到应用根目录下的 store 目录，如果该目录存在，它将做以下的事情：

1. 引用 vuex 模块
2. 将 vuex 模块 加到 vendors 构建配置中去
3. 设置 Vue 根实例的 store 配置项

Nuxt.js 支持两种使用 store 的方式

- 模块方式： store 目录下的每个 .js 文件会被转换成为状态树指定命名的子模块 （当然，index 是根模块）
- Classic(不建议使用)： store/index.js返回创建Vuex.Store实例的方法。

无论使用那种模式，state的值应该始终是function，为了避免返回引用类型，会导致多个实例相互影响。

#### 普通方式

Nuxt.js允许拥有一个 store 目录，其中包含与模块对应的每个文件。

只需将状态导出为 函数，将变量和操作导出：

```js
// store/index.js
export const state = () => ({
  counter: 0
})
export const mutations = {
  increment (state) {
    state.counter++
  }
}

// store/todos.js
export const state = () => ({
  list: []
})
export const mutations = {
  add (state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}

// Vuex将如下创建
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      namespaced: true,
      state: () => ({
        list: []
      }),
      mutations: {
        add (state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        remove (state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle (state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```

`pages/todos.vue`

```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>
<style>
.done {
  text-decoration: line-through;
}
</style>
```

```js
// store/state.js
export default () => ({
  counter: 0
})

// store/mutations.js
export default {
  increment (state) {
    state.counter++
  }
}
```

### 模块文件

可以将模块文件分解为单独的文件：state.js,actions.js,mutations.js和getters.js。

如果使用index.js来维护state,getters,actions和mutations，同时具有单个单独的操作文件，那么仍然可以正确识别该文件。

### 插件

可以将其他插件添加到store（在模块模式下），将其放入store/index.js文件中：

```js
export const state = () => ({
  counter: 0
})
export const mutations = {
  increment (state) {
    state.counter++
  }
}
```

## fetch 方法

fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。

## nuxtServerInit 方法

如果在状态树中指定了 nuxtServerInit 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第2个参数传给它（服务端调用时才会）。

当想将服务端的一些数据传到客户端时，这个方法是好用的。

举个例子，假设我们服务端的会话状态树里可以通过 req.session.user 来访问当前登录的用户。

将该登录用户信息传给客户端的状态树，只需更新 store/index.js 如下：

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

如果使用_状态树模块化_的模式，只有主模块（即 store/index.js）适用设置该方法（其他模块设置了也不会被调用）。

这时context被赋予nuxtServerInit作为第二个参数，它与asyncData或fetch方法相同。

nuxtServerInit 方法接收的上下文对象和 fetch 的一样，但不包括 context.redirect() 和 context.error()。

注意：异步nuxtServerInit操作必须返回Promise来通知nuxt服务器等待它们。

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

## Vuex 严格模式

默认情况下，在开发模式下启用严格模式，在生产模式下关闭模式。要在dev中禁用严格模式，请遵循以下示例。

### Module Mode

```js
export const strict = false
```

### 经典模式

此功能已经弃用，将在Nuxt 3中删除。

# 支持 TypeScript

Nuxt.js 对 typescript 有着完整的支持包括（包括运行和编译期）。

# 命令

Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。

## 命令列表

- `nuxt`	启动一个热加载的Web服务器（开发模式） localhost:3000。
- `nuxt build`	利用webpack编译应用，压缩JS和CSS资源（发布用）。
- `nuxt start`	以生产模式启动一个Web服务器 (需要先执行nuxt build)。
- `nuxt generate`	编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。

如果使用了 Koa/Express 等 Node.js Web 开发框架，并使用了 Nuxt 作为中间件，可以自定义 Web 服务器的启动入口：

- `NODE_ENV=development nodemon server/index.js`	启动一个热加载的自定义 Web 服务器（开发模式）。
- `NODE_ENV=production node server/index.js`	以生产模式启动一个自定义 Web 服务器 (需要先执行 nuxt build)。

## 开发模式

```js
nuxt
// 或
npm run dev
```

## 发布部署

### 服务端渲染应用部署

部署 Nuxt.js 服务端渲染的应用不能直接使用 nuxt 命令，而应该先进行编译构建，然后再启动 Nuxt 服务，可通过以下两个命令来完成：

```
nuxt build
nuxt start
```

### 静态应用部署

Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主机服务商。

可利用下面的命令生成应用的静态目录和文件：

```sh
npm run generate
```

### 单页面应用程序部署 (SPA)
