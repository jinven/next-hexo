---
title: NUXTJS
date: 2019-12-29 16:00:47
tags: 
- vue
- javascript
---

https://zh.nuxtjs.org/

## create-nuxt-app 安装(推荐)

```sh
npx create-nuxt-app <项目名>
```

- 服务器端框架: None
- UI框架: Element UI
- 测试框架: Jest
- Nuxt模式: Universal
- axios module
- EsLint
- Prettier

运行完后：

```sh
cd <项目名>
npm run dev
```

http://localhost:3000/

<!-- more -->

## 从头开始新建项目

```sh
mkdir <项目名>
cd <项目名>
```

新建 `package.json` 文件如下：

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt"
  }
}
```

#### 安装 `nuxt`

```sh
npm install --save nuxt
```

#### pages 目录

```sh
mkdir pages
```

创建 `pages/index.vue` 页面：

```html
<template>
  <h1>Hello world!</h1>
</template>
```

启动项目：

```sh
npm run dev
```

http://localhost:3000/

## 目录结构

#### 资源目录

- `assets`:  用于组织未编译的静态资源如 LESS、SASS 或 JavaScript

#### 组件目录

- `components`: 用于组织应用的 Vue.js 组件，这些组件不会像页面组件那样有 asyncData 方法的特性

#### 布局目录

- `layouts`: 用于组织应用的布局组件

#### 中间件目录

- `middleware`: 用于存放应用的中间件

#### 页面目录

- `pages`: 用于组织应用的路由及视图，Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置

#### 插件目录

- `plugins`: 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件

#### 静态文件目录

- `static`: 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下

例子: /static/robots.txt 映射至 /robots.txt

#### Store 目录

- `store`: 用于组织应用的 Vuex 状态树 文件。 Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置

#### nuxt.config.js 文件

- `nuxt.config.js`: 用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置

#### package.json 文件

- `package.json`: 用于描述应用的依赖关系和对外暴露的脚本接口

#### 别名

| 别名 | 目录 |
| -------- | -------- |
| ~ 或 @   | srcDir |
| ~~ 或 @@ | rootDir |

默认情况下，srcDir 和 rootDir 相同

在 vue 模板中, 如果需要引入 assets 或者 static 目录, 使用 ~/assets/your_image.png 和 ~/static/your_image.png方式。

## 配置

Nuxt.js 默认的配置涵盖了大部分使用情形，可通过 nuxt.config.js 来覆盖默认的配置。

#### build 构建配置

https://zh.nuxtjs.org/api/configuration-build/

如：

```js
module.exports = {
    build: {
        analyze: true
        // or
        analyze: {
        analyzerMode: 'static'
        }
    }
}
```

- `analyze` 使用 webpack-bundle-analyzer 分析并可视化构建后的打包文件，可以基于分析结果来决定如何优化它。
- `babel` 为 JS 和 Vue 文件设定自定义的 babel 配置
- `cache` 启用缓存 terser-webpack-plugin 和 cache-loader
- `crossorigin` 在生成的HTML中的 `<link rel="stylesheet">` 和 `<script>` 标记上配置 crossorigin 属性
- `cssSourceMap` 开启 CSS Source Map 支持
- `devMiddleware` [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
- `devtools` 配置是否允许 [vue-devtools](https://github.com/vuejs/vue-devtools) 调试
- `extend` 为客户端和服务端的构建配置进行手工的扩展处理
- `loaders in extend` loaders具有与之相同的对象结构 build.loaders, 可以在extend中更改loaders的选项
- `extractCSS` 使用Vue 服务器端渲染指南启用常见CSS提取
- `filenames` 自定义打包文件名
- `friendlyErrors` [友好的错误 Webpack 插件](https://github.com/nuxt/friendly-errors-webpack-plugin)
- `hardSource` 开启 [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)
- `hotMiddleware` [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
- `html.minify` 用于压缩在构建打包过程中创建的HTML文件配置 [html-minifier](https://github.com/kangax/html-minifier) 的插件（将应用于所有模式）
- `loaders` 自定义 webpack 加载器
- `loaders.file` [file-loader 配置](https://github.com/webpack-contrib/file-loader#options)
- `loaders.fontUrl and loaders.imgUrl` [url-loader 配置](https://github.com/webpack-contrib/url-loader#options)
- `loaders.pugPlain` [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader) 或 [Pug compiler 配置](https://pugjs.org/api/reference.html#options)
- `loaders.vue` [vue-loader 配置](https://vue-loader.vuejs.org/options.html)
- `loaders.css and loaders.cssModules` [css-loader 配置](https://github.com/webpack-contrib/css-loader#options)，cssModules是使用的loader选项 [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html#css-modules)
- `loaders.less` 可以通过loaders.less将任何Less特定选项传递给less-loader，[Less 文档](http://lesscss.org/usage/#command-line-usage-options)
- `loaders.sass and loaders.scss` 加载 sass 或 scss
- `loaders.vueStyle` [vue-style-loader 配置](https://github.com/vuejs/vue-style-loader#options)
- `optimization` 优化，[Webpack Optimization](https://webpack.js.org/configuration/optimization)
- `terser` 设置为false可以禁用此插件，[webpack-contrib/terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
- `optimizeCSS` OptimizeCSSAssets 插件配置 [NMFR/optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
- `parallel` 在webpack构建打包中开启 [thread-loader](https://github.com/webpack-contrib/thread-loader#thread-loader)
- `plugins` 配置 Webpack 插件
- `postcss` 自定义 [postcss](https://github.com/postcss/postcss) 配置
- `profile` [WebpackBar](https://github.com/nuxt/webpackbar#profile)
- `publicPath` 允许将dist文件上传到CDN来获得最快渲染性能，只需将publicPath设置为CDN即可
- `quiet` 控制部分构建信息输出日志
- `splitChunks` 如果代码分模块用于 layout, pages 和 commons (常用: vue|vue-loader|vue-router|vuex...)
- `ssr` 为服务器端渲染创建特殊的webpack包
- `styleResources` 当需要在页面中注入一些变量和mixin而不必每次都导入它们时
- `templates` 允许自定义自己的模板，这些模板将基于Nuxt配置进行渲染。 此功能特别适用于使用 [modules](https://zh.nuxtjs.org/guide/modules)
- `transpile` 如果要使用Babel与特定的依赖关系进行转换，可以在build.transpile中添加它们，transpile中的选项可以是字符串或正则表达式对象，用于匹配依赖项文件名
- `vueLoader` 已删除，使用 `build.loaders.vue` 替代
- `vendor` 已废弃，但保留使用方法作为兼容低版本处理
- `watch` 监听文件更改。此功能特别适用用在 [modules](https://zh.nuxtjs.org/guide/modules)
- `followSymlinks` 允许在文件夹（例如“pages”文件夹）中使用符号链接

#### css 配置

https://zh.nuxtjs.org/api/configuration-css/

在 Nuxtjs 里配置全局的 CSS 文件、模块、库。 (每个页面都会被引入)

如使用 sass：

```sh
npm install --save-dev node-sass sass-loader
```

```js
module.exports = {
  css: [
    // 直接加载一个 Node.js 模块。（在这里它是一个 Sass 文件）
    'bulma',
    // 项目里要用的 CSS 文件
    '@/assets/css/main.css',
    // 项目里要使用的 SCSS 文件
    '@/assets/css/main.scss'
  ]
}
```

#### dev

https://zh.nuxtjs.org/api/configuration-dev

配置 Nuxt.js 应用是开发模式还是生产模式。

dev 属性的值会被 nuxt 命令 覆盖：

- 当使用 nuxt 命令时，dev 会被强制设置成 true
- 当使用 nuxt build， nuxt start 或 nuxt generate 命令时，dev 会被强制设置成 false

```js
// nuxt.config.js
module.exports = {
    dev: (process.env.NODE_ENV !== 'production')
}
```

```js
// server.js
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000
// 传入配置初始化 Nuxt.js 实例
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)
// 在开发模式下进行编译
if (config.dev) {
    new Builder(nuxt).build()
}
// 监听指定端口
app.listen(port, '0.0.0.0')
console.log('服务器运行于 localhost:' + port)
```

```js
// package.json
{
    "scripts": {
        "dev": "node server.js",
        "build": "nuxt build",
        "start": "NODE_ENV=production node server.js"
    }
}
```

```sh
npm install --save-dev cross-env
npm run dev
```

#### env 环境变量配置

https://zh.nuxtjs.org/api/configuration-env/

可以配置在客户端和服务端共享的环境变量。

```js
module.exports = {
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    }
}
```

可以使用 env 属性配置第三方服务的公钥信息
可以通过以下两种方式来使用 baseUrl 变量：

- 通过 process.env.baseUrl
- 通过 context.baseUrl，参考 [context api](https://zh.nuxtjs.org/api#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1)

如：

```js
// plugins/axios.js
import axios from 'axios'
export default axios.create({
    baseURL: process.env.baseUrl
})

// index.vue
import axios from '~/plugins/axios'
```

自动注入环境变量

如果在构建阶段定义以NUXT_ENV_开头的环境变量，例如：NUXT_ENV_COOL_WORD=freezing nuxt build，它们将自动注入环境变量中。请注意，它们可能优先于nuxt.config.js中具有相同名称的已定义变量。

process.env == {}

Nuxt使用webpack的definePlugin来定义环境变量。这意味着Node.js中的process或process.env既不可用也不能定义。nuxt.config.js中定义的每个env属性都单独映射到process.env.xxxx并在编译期间进行转换编译。

`console.log(process.env)` 将输出{}
`console.log(process.env.test)` 仍将输出定义的值

若已设置 `env.test ='testing123'`

```js
// 编译前：
if (process.env.test == 'testing123')

// 编译后：
if ('testing123' == 'testing123')
```

#### generate

https://zh.nuxtjs.org/api/configuration-generate/

生成静态站点的具体方式，当运行 nuxt generate 命令或在编码中调用 nuxt.generate() 时，Nuxt.js 会使用 generate 属性的配置。

- `dir` 生成的目录名称
- `devtools` 是否允许 vue-devtools 调试
- `fallback` 在将生成的站点部署到静态主机时，可以使用此文件。它将回退到模式：`mode:'spa'`
- `interval` 两个渲染周期之间的间隔，以避免使用来自Web应用程序的API调用互相干扰
- `minify` 不推荐使用，使用 [build.html.minify](https://zh.nuxtjs.org/api/configuration-build#html-minify) 替代
- `routes` 执行 generate 命令时，[动态路由](https://zh.nuxtjs.org/guide/routing#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1) 会被忽略
- `subFolders` 为每个路由创建一个目录并生成index.html文件
- `并发` 路由的生成是并发的，generate.concurrency指定在一个线程中运行的路由数量

返回一个 Promise 对象的函数

```js
const axios = require('axios')
module.exports = {
    generate: {
        routes () {
        return axios.get('https://my-api/users')
            .then((res) => {
            return res.data.map((user) => {
                return '/users/' + user.id
            })
            })
        }
    }
}
```

返回回调函数

```js
const axios = require('axios')
module.exports = {
    generate: {
        routes (callback) {
        axios.get('https://my-api/users')
            .then((res) => {
            const routes = res.data.map((user) => {
                return '/users/' + user.id
            })
            callback(null, routes)
            })
            .catch(callback)
        }
    }
}
```

加速带有有效载荷(payload)的动态路由生成

```js
// nuxt.config.js
import axios from 'axios'
export default {
    generate: {
        routes () {
        return axios.get('https://my-api/users')
            .then((res) => {
            return res.data.map((user) => {
                return {
                route: '/users/' + user.id,
                payload: user
                }
            })
            })
        }
    }
}

// users/_id.vue
async asyncData ({ params, error, payload }) {
    if (payload) return { user: payload }
    else return { user: await backend.fetchUser(params.id) }
}
```

#### head

https://zh.nuxtjs.org/api/configuration-head/

可以在 nuxt.config.js 中配置应用的 meta 信息


```js
module.exports = {
    head: {
        titleTemplate: '%s - Nuxt.js',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Meta description' }
        ]
    }
}
```

也可以在页面组件中使用 head 配置并通过 this 关键字来获取组件的数据

使用了 [vue-meta](https://github.com/nuxt/vue-meta) 更新应用的 头部标签(Head) 和 html 属性

```html
<template>
    <h1>{{ title }}</h1>
</template>
<script>
export default {
    data () {
        return {
            title: 'Hello World!'
        }
    },
    head () {
        return {
            title: this.title,
            meta: [
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    }
}
</script>
```

为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号

#### loading

在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。可以定制它的样式，禁用或者创建自己的加载组件。

```js
export default {
    mounted () {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
    }
}
```

如果要在mounted方法中启动它，请确保使用this.$nextTick来调用它，因为$loading可能无法立即使用。

禁用加载进度条

页面切换的时候如果不想显示加载进度条，可以在 nuxt.config.js 里面增加 loading: false 的配置：

```js
module.exports = {
    loading: false
}
```

- 个性化加载进度条

以下表格为进度条定制化时可用到的配置项及其说明。

| 键 | 类型 | 默认值 | 描述 |
| -- | --- | ------- | --- |
| color | String | 'black' | 进度条的颜色 |
| failedColor | String | 'red' | 页面加载失败时的颜色 （当 data 或 fetch 方法返回错误时）。 |
| height | String | '2px' | 进度条的高度 (在进度条元素的 style 属性上体现)。 |
| throttle | Number | 200 | 在ms中，在显示进度条之前等待指定的时间。用于防止条形闪烁。 |
| duration | Number | 5000 | 进度条的最大显示时长，单位毫秒。Nuxt.js 假设页面在该时长内加载完毕。 |
| continuous | Boolean | false | 当加载时间超过duration时，保持动画进度条。 |
| css | Boolean | true | 设置为false以删除默认进度条样式（并添加自己的样式）。 |
| rtl | Boolean | false | 从右到左设置进度条的方向。 |

如一个5像素高的蓝色进度条：

```js
module.exports = {
    loading: {
        color: 'blue',
        height: '5px'
    }
}
```

- 自定义加载组件

可以新建一个加载组件替代 Nuxt.js 默认的。 使用自己的加载组件，需要在 loading 配置项里指定组件的路径，Nuxt.js 会自动调用该组件。

自定义组件需要实现以下接口方法：

| 方法 | 是否必须 | 描述 |
| start() | 是 | 路由更新（即浏览器地址变化）时调用, 请在该方法内显示组件。 |
| finish() | 是 | 路由更新完毕（即asyncData方法调用完成且页面加载完）时调用，请在该方法内隐藏组件。 |
| fail() | 否 | 路由更新失败时调用（如asyncData方法返回异常）。 |
| increase(num) | 否 | 页面加载过程中调用, num 是小于 100 的整数。 |

可以在 components 目录下创建自定义的加载组件，如 `components/loading.vue`：

```html
<template lang="html">
    <div class="loading-page" v-if="loading">
        <p>Loading...</p>
    </div>
</template>
<script>
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start () {
            this.loading = true
        },
        finish () {
            this.loading = false
        }
    }
}
</script>
<style scoped>
.loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
}
</style>
```

```js
// nuxt.config.js
module.exports = {
    loading: '~components/loading.vue'
}
```

- 进度条时长说明

Loading组件不可能事先知道多长时间。加载新页面将需要。因此，无法将进度条准确地设置为100%的加载时间。

Nuxt的加载组件通过设置 duration 来部分解决这个问题，这应该设置为 guestimate 加载过程需要多长时间。 除非使用自定义加载组件，否则进度条将始终在 duration 时间内从0%移至100%（无论实际进度如何）。 当加载时间超过 duration 时，进度条将保持100%直到加载完成。

可以通过将continuous设置为true来更改默认行为，然后在达到100%后，进度条将在duration时间内再次收缩回0%。当达到0%后仍未完成加载时，它将再次从0%开始增长到100%，这将重复直到加载完成。

#### modules

https://zh.nuxtjs.org/api/configuration-modules/

可以扩展它的核心功能并添加无限的集成。

```js
export default {
    modules: [
        // Using package name
        '@nuxtjs/axios',
        // Relative to your project srcDir
        '~/modules/awesome.js',
        // Providing options
        ['@nuxtjs/google-analytics', { ua: 'X1234567' }],
        // Inline definition
        function () { }
    ]
}
```

模块开发通常会提供额外需要的步骤和使用细节。

Nuxt.js尝试使用节点需求路径（在node_modules中）解析modules数组中的每个项目，如果使用~别名，则将从项目srcDir中解析。模块按顺序执行，因此顺序很重要。

模块应该导出一个函数来增强nuxt 构建 / 运行，并可选择返回一个promise，直到它们的工作完成。请注意，它们在运行时是必需的，因此如果依赖于现代ES6功能，应该已经进行了转换。


#### modulesDir

用于设置路径解析的模块目录，例如：webpack resolveLoading，nodeExternal和postcss。

配置路径为相对路径[options.rootDir](https://zh.nuxtjs.org/api/configuration-rootdir) (默认: `process.cwd()`)

```js
export default {
    modulesDir: ['../../node_modules']
}
```

#### plugins

https://zh.nuxtjs.org/api/configuration-plugins/

使用 Vue.js 插件

```js
// nuxt.config.js
module.exports = {
    plugins: ['~plugins/vue-notifications']
}

// plugins/vue-notifications.js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
Vue.use(VueNotifications)
```

所有插件会在 Nuxt.js 应用初始化之前被加载导入。

每次使用 `Vue.use()` 时，需要在 `plugins/` 目录下创建相应的插件文件，并在 `nuxt.config.js` 中的 plugins 配置项中配置插件的路径。

#### rootDir

设置 Nuxt.js 应用的根目录。

该配置项的值会被 [nuxt 命令行](https://zh.nuxtjs.org/guide/commands) 指定的路径参数覆盖（例如：`nuxt my-app/` 会将 `rootDir` 的值覆盖设置为 `my-app/` 目录对应的绝对路径）。

该配置项一般是 [编码中使用 Nuxt.js](https://zh.nuxtjs.org/api/nuxt) 时才会被用到。

该配置项的一个限制是应用的 node_modules 目录必须在 rootDir 目录内。 应用的源码目录（srcDir）则无此限制，具体查看 [srcDir 属性配置](https://zh.nuxtjs.org/api/configuration-srcdir)。

#### router

https://zh.nuxtjs.org/api/configuration-router/

可以个性化配置 Nuxt.js 应用的路由（[vue-router](https://router.vuejs.org/zh-cn/)）。

- `base` 应用的根URL。如果整个单页面应用的所有资源可以通过 `/app/` 来访问，那么 `base` 配置项的值需要设置为 `'/app/'`
- `routeNameSplitter` 路由名称之间的分隔符。
- `extendRoutes` 扩展Nuxt.js创建的路由
- `linkActiveClass` 全局配置 [<nuxt-link>](https://zh.nuxtjs.org/api/components-nuxt-link) 组件默认的激活类名
- `linkExactActiveClass` 全局配置 [<nuxt-link>](https://zh.nuxtjs.org/api/components-nuxt-link) 默认的active class
- `linkPrefetchedClass` 全局配置 [<nuxt-link>](https://zh.nuxtjs.org/api/components-nuxt-link) 默认值(默认情况下禁用功能)
- `middleware` 为应用的每个页面设置默认的中间件
- `mode` 配置路由的模式，鉴于服务端渲染的特性，不建议修改该配置
- `scrollBehavior` 用于个性化配置跳转至目标页面后的页面滚动位置。每次页面渲染后都会调用 scrollBehavior 配置的方法
- `parseQuery / stringifyQuery` 提供自定义查询字符串解析/字符串化功能。覆盖默认值
- `prefetchLinks` 在视图中检测到时，配置 [<nuxt-link>](https://zh.nuxtjs.org/api/components-nuxt-link) 用来预获取代码分割页面
- `fallback` 当浏览器不支持history.pushState但模式设置为history时，控制路由器是否应回退

#### server

https://zh.nuxtjs.org/api/configuration-server/

为应用程序内部nuxt.config.js中定义服务器访问主机和端口.

```js
export default {
    server: {
        port: 8000, // default: 3000
        host: '0.0.0.0' // default: localhost,
    }
}
```

- HTTPS

```js
import path from 'path'
import fs from 'fs'
export default {
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
    }
}
```

- sockets

```js
export default {
    server: {
        socket: '/tmp/nuxt.socket'
    }
}
```

- timing

启用`server.timing`选项会添加一个中间件来测量服务器端渲染过程中经过的时间，并将其作为'Server-Timing'添加到标头中

- 使用时序配置的示例

`server.timing`可以是提供选项的对象。目前，支持total(直接跟踪服务器端渲染所花费的全部时间)

```js
export default {
    server: {
        timing: {
            total: true
        }
    }
}
```

- 使用 timing api

当启用server.time时，timing api也被注入服务器端的response。

```js
res.timing.start(name, description)
res.timing.end(name)
```

在 servermiddleware 中使用计时的示例

```js
export default function (req, res, next) {
    res.timing.start('midd', 'Middleware timing description')
    // server side operation..
    // ...
    res.timing.end('midd')
    next()
}
```

然后server-timing头将包含在响应头中，如：

```js
Server-Timing: midd;desc="Middleware timing description";dur=2.4
```

#### srcDir

设置 Nuxt.js 应用的源码目录

```js
module.exports = {
    srcDir: 'client/'
}
```

应用的目录结构应为：

```
-| app/
---| node_modules/
---| client/
------| pages/
------| components/
---| nuxt.config.js
---| package.json
```

当在现有的服务中集成使用 Nuxt.js 时，该配置项才有使用价值。可以将 Nuxt.js 的依赖包和原服务的 npm 依赖包一起组织至一个 package.json 文件中。

#### dir

定义Nuxt.js应用程序的自定义目录

```js
export default {
    dir: {
        assets: 'custom-assets',
        layouts: 'custom-layouts',
        middleware: 'custom-middleware',
        pages: 'custom-pages',
        static: 'custom-static',
        store: 'custom-store'
    }
}
```

#### transition

用于设置页面切换过渡效果的默认属性值。

```js
module.exports = {
    transition: 'page'
    // or
    transition: {
        name: 'page',
        mode: 'out-in',
        beforeEnter (el) {
            console.log('Before enter...');
        }
    }
}
```

`transition` 用于设置页面切换 [过渡效果](https://zh.nuxtjs.org/api/pages-transition#object) 的默认属性值。

- `layoutTransition` 用于设置布局过渡的默认属性。配置与 layout 相同

```js
export default {
    layoutTransition: 'layout'
    // or
    transition: {
        name: 'layout',
        mode: 'out-in'
    }
}
```

全局配置示例 css:

```css
.layout-enter-active, .layout-leave-active {
    transition: opacity .5s
}
.layout-enter, .layout-leave-active {
    opacity: 0
}
```


## 路由

Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。

要在页面之间使用路由，我们建议使用 [<nuxt-link>](https://zh.nuxtjs.org/api/components-nuxt-link) 标签。

```html
<template>
    <nuxt-link to="/">首页</nuxt-link>
</template>
```

#### 基础路由

假设 pages 的目录结构如下：

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

#### 动态路由

在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。

以下目录结构：

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Nuxt.js 生成对应的路由配置表为：

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

名称为 `users-id` 的路由路径带有 `:id?` 参数，表示该路由是可选的。

如果想将它设置为必选的路由，需要在 `users/_id` 目录内创建一个 `index.vue` 文件。

generate 命令会忽略动态路由: [API Configuration generate](https://zh.nuxtjs.org/api/configuration-generate#routes)

#### 路由参数校验

Nuxt.js 可以在动态路由组件中定义参数校验方法。

例子： `pages/users/_id.vue`

```js
export default {
    validate ({ params }) {
        // 必须是number类型
        return /^\d+$/.test(params.id)
    }
}
```

如果校验方法返回的值不为 `true` 或 `Promise` 中 resolve 解析为 `false` 或抛出Error ， Nuxt.js 将自动加载显示 404 错误页面或 500 错误页面。

[页面校验API](https://zh.nuxtjs.org/api/pages-validate)

#### 嵌套路由

可以通过 vue-router 的子路由创建 Nuxt.js 应用的嵌套路由。

创建内嵌子路由，需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。

在父组件(`.vue`文件) 内增加 `<nuxt-child/>` 用于显示子视图内容。

文件结构如：

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

自动生成的路由配置如下：

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

#### 动态嵌套路由

这个应用场景比较少见，但是 Nuxt.js 仍然支持：在动态路由下配置动态子路由。

文件结构如下：

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

自动生成的路由配置如下：

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

#### 未知嵌套深度的动态嵌套路由

如果不知道URL结构的深度，可以使用 `_.vue` 动态匹配嵌套路径。这将处理与更具体请求不匹配的情况。

文件结构:

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

将处理这样的请求：


| Path | File |
| ---- | ---- |
| `/` | `index.vue` |
| `/people` | `people/index.vue` |
| `/people/123` | `people/_id.vue` |
| `/about` | `_.vue` |
| `/about/careers` | `_.vue` |
| `/about/careers/chicago` | `_.vue` |

处理[404页面](https://zh.nuxtjs.org/guide/async-data#handling-errors)，现在符合 `_.vue` 页面的逻辑。

#### 命名视图

要渲染命名视图，可以在布局(`layout`) / 页面(`page`)中使用 `<nuxt name="top"/>` 或 `<nuxt-child name="top"/>` 组件。

要指定页面的命名视图，需要在 `nuxt.config.js` 文件中扩展路由器配置：

```js
export default {
    router: {
        extendRoutes (routes, resolve) {
            const index = routes.findIndex(route => route.name === 'main')
            routes[index] = {
                ...routes[index],
                components: {
                    default: routes[index].component,
                    top: resolve(__dirname, 'components/mainTop.vue')
                },
                chunkNames: {
                    top: 'components/mainTop'
                }
            }
        }
    }
}
```

需要使用两个属性 `components` 和 `chunkNames` 扩展路由。此配置示例中的命名视图名称为 `top` 。

#### SPA fallback

也可以为动态路由启用SPA fallback。

在使用mode:'spa'模式下，Nuxt.js将输出一个与index.html相同的额外文件。

如果没有文件匹配，大多数静态托管服务可以配置为使用SPA模板。

生成文件不包含头信息或任何HTML，但它仍将解析并加载API中的数据。

在nuxt.config.js文件中启用它：

```js
export default {
    generate: {
        fallback: true, // if you want to use '404.html'
        fallback: 'my-fallback/file.html' // if your hosting needs a custom location
    }
}
```

- 在Surge上实现

Surge [可以处理](https://surge.sh/help/adding-a-custom-404-not-found-page) `200.html` 和 `404.html`，`generate.fallback` 默认设置为 `200.html`，因此无需更改它。

- 在 GitHub Pages 和 Netlify 上实现

GitHub Pages 和 Netlify 自动识别 `404.html` 文件，所以需要做的就是将 `generate.fallback` 设置为 `true`！

- 在 Firebase Hosting 上实现

要在Firebase Hosting上使用，将 `generate.fallback` 配置为 `true` 并使用以下[配置](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites)：

```js
{
    "hosting": {
        "public": "dist",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [
            {
                "source": "**",
                "destination": "/404.html"
            }
        ]
    }
}
```

#### 过渡动效

Nuxt.js 使用 Vue.js 的 [<transition>](http://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) 组件来实现路由切换时的过渡动效。

#### 全局过渡动效设置

Nuxt.js 默认使用的 [过渡效果](https://zh.nuxtjs.org/api/pages-transition) 名称为 page

如果想让每一个页面的切换都有淡出 (fade) 效果，需要创建一个所有路由共用的 CSS 文件。

所以可以在 `assets/` 目录下创建这个文件：

在全局样式文件 `assets/main.css` 里添加一下样式：

```css
.page-enter-active, .page-leave-active {
    transition: opacity .5s;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
```

然后添加到 `nuxt.config.js` 文件中：

```js
module.exports = {
    css: [
        'assets/main.css'
    ]
}
```

#### 页面过渡动效设置

如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 `transition` 字段即可：

在全局样式 `assets/main.css` 中添加一下内容：

```css
.test-enter-active, .test-leave-active {
    transition: opacity .5s;
}
.test-enter, .test-leave-active {
    opacity: 0;
}
```

然后将页面组件中的 `transition` 属性的值设置为 test 即可：

```js
export default {
    transition: 'test'
}
```

#### 中间件

中间件允许定义一个自定义函数运行在一个页面或一组页面渲染之前。

每一个中间件应放置在 `middleware/` 目录。文件名的名称将成为中间件名称(`middleware/auth.js` 将成为 `auth` 中间件)。

一个中间件接收 [context](https://zh.nuxtjs.org/api#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1) 作为第一个参数：

```js
export default function (context) {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

中间件执行流程顺序：

1. `nuxt.config.js`
2. 匹配布局
3. 匹配页面

中间件可以异步执行,只需要返回一个 `Promise` 或使用第2个 `callback` 作为第一个参数：

```js
// middleware/stats.js
import axios from 'axios'
export default function ({ route }) {
    return axios.post('http://my-stats-api.com', {
        url: route.fullPath
    })
}
```


然后在 `nuxt.config.js` 、 `layouts` 或者 `pages` 中使用中间件:

```js
// nuxt.config.js
module.exports = {
    router: {
        middleware: 'stats'
    }
}
```

现在，`stats` 中间件将在每个路由改变时被调用。

也可以将 `middleware` 添加到指定的布局或者页面:

`pages/index.vue` 或者 `layouts/default.vue`

```js
export default {
    middleware: 'stats'
}
```

[example-auth0](https://github.com/nuxt/example-auth0)

## 视图

在 Nuxt.js 应用中为指定的路由配置数据和视图，包括应用模板、页面、布局和HTML头部等内容。

![img](https://zh.nuxtjs.org/nuxt-views-schema.svg)

#### 模板

可以定制化 Nuxt.js 默认的应用模板。

定制化默认的 html 模板，只需要在应用根目录下创建一个 app.html 的文件。

默认模板为：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
    <head {{ HEAD_ATTRS }}>
        {{ HEAD }}
    </head>
    <body {{ BODY_ATTRS }}>
        {{ APP }}
    </body>
</html>
```

可以修改模板添加 IE 的条件表达式：

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

#### 布局

Nuxt.js 允许扩展默认的布局，或在 `layout` 目录下创建自定义的布局。

#### 默认布局

可通过添加 `layouts/default.vue` 文件来扩展应用的默认布局。

别忘了在布局文件中添加 `<nuxt/>` 组件用于显示页面的主体内容。

默认布局的源码如下：

```html
<template>
    <nuxt/>
</template>
```

#### 自定义布局

`layouts` 目录中的每个文件 (顶级) 都将创建一个可通过页面组件中的 `layout` 属性访问的自定义布局。

创建一个 `博客布局` 并将其保存到 `layouts/blog.vue`:

```html
<template>
    <div>
        <div>我的博客导航栏在这里</div>
        <nuxt/>
    </div>
</template>
```

然后必须告诉页面 (即`pages/posts.vue`) 使用自定义布局：

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

[API 页面 布局](https://zh.nuxtjs.org/api/pages-layout)

#### 错误页面

可以通过编辑 `layouts/error.vue` 文件来定制化[错误页面](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue)

虽然此文件放在 `layouts` 文件夹中, 但应该将它看作是一个 页面(page).

这个布局文件不需要包含 `<nuxt/>` 标签。可以把这个布局文件当成是显示应用错误（404，500等）的组件。

例子 `layouts/error.vue`:

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
    layout: 'blog' // 你可以为错误页面指定自定义的布局
}
</script>
```

#### 页面

页面组件实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的功能特性）以便能快速开发通用应用。

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

Nuxt.js 为页面提供的特殊 [配置](https://zh.nuxtjs.org/api) 项：

| 属性名 | 描述 |
| ----- | ----- |
| asyncData | 最重要的一个键, 支持 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。 |
| fetch | 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。详情请参考 关于fetch方法的文档。 |
| head | 配置当前页面的 Meta 标签, 详情参考 页面头部配置API。 |
| layout | 指定当前页面使用的布局（layouts 根目录下的布局文件）。详情请参考 关于 布局 的文档。 |
| loading | 如果设置为false，则阻止页面自动调用this.$nuxt.$loading.finish()和this.$nuxt.$loading.start(),您可以手动控制它,请看例子,仅适用于在nuxt.config.js中设置loading的情况下。请参考API配置 loading 文档。 |
| transition | 指定页面切换的过渡动效, 详情请参考 页面过渡动效。 |
| scrollToTop | 布尔值，默认: false。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 嵌套路由的应用场景。 |
| validate | 校验方法用于校验 动态路由的参数。 |
| middleware | 指定页面的中间件，中间件会在页面渲染之前被调用， 请参考 路由中间件。 |

#### HTML 头部

Nuxt.js 使用了 [vue-meta](https://github.com/nuxt/vue-meta) 更新应用的 `头部标签(Head)` 和 `html 属性`。

Nuxt.js 使用以下参数配置 `vue-meta`:

```js
{
    keyName: 'head', // 设置 meta 信息的组件对象的字段，vue-meta 会根据这 key 值获取 meta 信息
    attribute: 'n-head', // vue-meta 在监听标签时所添加的属性名
    ssrAttribute: 'n-head-ssr', // 让 vue-meta 获知 meta 信息已完成服务端渲染的属性名
    tagIDKeyName: 'hid' // 让 vue-meta 用来决定是否覆盖还是追加 tag 的属性名
}
```

#### 默认 Meta 标签

Nuxt.js 允许在 `nuxt.config.js` 里定义应用所需的所有默认 meta 标签，在 head 字段里配置就可以了：

注意: Nuxt.js 使用 hid 而不是默认值 vmid 识别元素key

一个使用自定义 `viewport` 和 `谷歌字体` 的配置示例：

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

#### 个性化特定页面的 Meta 标签

关于个性化特定页面的 Meta 标签，请参考 [页面头部配置API](https://zh.nuxtjs.org/api/pages-head)。

注意: 为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为meta标签配一个唯一的标识编号。

## 异步数据

Nuxt.js 扩展了 Vue.js，增加了一个叫 `asyncData` 的方法，可以在设置组件的数据之前能异步获取或处理数据。

### asyncData 方法

`asyncData`方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。 

在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，可以利用 `asyncData` 方法来获取数据，Nuxt.js 会将 `asyncData` 返回的数据融合组件 `data` 方法返回的数据一并返回给当前组件。

注意：由于`asyncData`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

Nuxt.js 提供了几种不同的方法来使用 `asyncData` 方法，可以选择自己熟悉的一种来用：

1. 返回一个 `Promise`, nuxt.js会等待该 `Promise` 被解析之后才会设置组件的数据，从而渲染组件.
2. 使用 [async 或 await](https://github.com/lukehoban/ecmascript-asyncawait)

使用 [axios](https://github.com/mzabriskie/axios) 重构 HTTP 请求, 强烈建议 使用 [axios 模块](https://axios.nuxtjs.org/) 用于Nuxt项目中。

如果项目中直接使用了 `node_modules` 中的 `axios`，并且使用 `axios.interceptors` 添加拦截器对请求或响应数据进行了处理，确保使用 `axios.create` 创建实例后再使用。

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

#### 返回 Promise

````js
export default {
    asyncData ({ params }) {
        return axios.get(`https://my-api/posts/${params.id}`)
        .then((res) => {
            return { title: res.data.title }
        })
    }
}
````

#### 使用 async或await

```js
export default {
    async asyncData ({ params }) {
        const { data } = await axios.get(`https://my-api/posts/${params.id}`)
        return { title: data.title }
    }
}
```

#### 使用 回调函数

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

#### 返回 对象

如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。

```js
export default {
    data () {
        return { foo: 'bar' }
    }
}
```

#### 数据的展示

`asyncData` 方法返回的数据在融合 `data` 方法返回的数据后，一并返回给模板进行展示，如：

```html
<template>
    <h1>{{ title }}</h1>
</template>
```

### 上下文对象

可通过 [API context](https://zh.nuxtjs.org/api/context) 来了解该对象的所有属性和方法。

#### 使用 req/res(request/response) 对象

在服务器端调用asyncData时，您可以访问用户请求的req和res对象。

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

#### 访问动态路由数据

可以使用注入 `asyncData` 属性的 `context` 对象来访问动态路由数据。

例如，可以使用配置它的文件或文件夹的名称访问动态路径参数。

所以，如果定义一个名为 `_slug.vue` 的文件，可以通过 `context.params.slug` 来访问它。

```js
export default {
    async asyncData ({ params }) {
        const slug = params.slug // When calling /abc the slug will be "abc"
        return { slug }
    }
}
```

#### 监听 query 参数改变

默认情况下，query的改变不会调用 `asyncData` 方法。

如果要监听这个行为，例如，在构建分页组件时，您可以设置应通过页面组件的 `watchQuery` 属性监听参数。

### 错误处理

Nuxt.js 在上下文对象 `context` 中提供了一个 `error(params)` 方法，可以通过调用该方法来显示错误信息页面。

params.statusCode 可用于指定服务端返回的请求状态码。

返回 `Promise` 方式例子：

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

如果使用 `回调函数` 的方式, 可以将错误的信息对象直接传给该回调函数， Nuxt.js 内部会自动调用 `error` 方法：

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

如果想定制 Nuxt.js 默认的错误提示页面，请参考 [页面布局](https://zh.nuxtjs.org/guide/views#%E5%B8%83%E5%B1%80)

## 资源文件

默认情况下 Nuxt 使用 vue-loader、file-loader 以及 url-loader 这几个 Webpack 加载器来处理文件的加载和引用。

对于不需要通过 Webpack 处理的静态资源文件，可以放置在 `static` 目录中。

### Webpack 构建

默认情况下, [vue-loader](http://vue-loader.vuejs.org/en/) 自动使用 `css-loader` 和Vue模板编译器来编译处理vue文件中的样式和模板。

在此编译过程中，所有的资源URL例如 `<img src="...">`、 `background: url(...)` 和 CSS中的 `@import` 均会被解析成模块通过 `require` 引用。

举个例子, 有以下文件目录结构：

```
-| assets/
----| image.png
-| pages/
----| index.vue
```

如果在CSS代码中使用 `url('~assets/image.png')`, 那么编译后它将被转换成 `require('~/assets/image.png')`

注意: 从Nuxt 2.0开始，`~/alias`将无法在CSS文件中正确解析。必须在url CSS引用中使用`~assets`（没有斜杠）或`@`别名，即`background:url("~assets/banner.svg")`

又或者如果在 `pages/index.vue` 中使用以下代码引用图片资源：

```html
<template>
    <img src="~/assets/image.png">
</template>
```

那么编译后会被转换成：

```js
createElement('img', { attrs: { src: require('~/assets/image.png') } })
```

`.png` 并非 JavaScript 文件, 因此 Nuxt.js 通过配置Webpack使用 [file-loader](https://github.com/webpack/file-loader) 和 [url-loader](https://github.com/webpack/url-loader) 这两个加载器来处理此类引用。

这样做的好处有：

- `file-loader` 能指定从什么地方拷贝资源文件以及发布后放到哪个目录去，并能使用版本哈希码来重命名发布后的文件来实现增量更新和更好的缓存策略。
- `url-loader` 能根据指定的文件大小阈值，来判断一个文件是转换成内联的base-64码（如果该文件尺寸小于该阈值）还是使用 `file-loader` 来降级处理。小文件base-64化能有效减少HTTP请求数。

实际上, Nuxt.js 默认的加载器配置如下：

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

也即文件（图片或字体）的尺寸小于1K的时候，它将会被转换成 Base-64 data URL 来内联引用；

否则它将被拷贝至指定的子目录（在 `.nuxt` 目录下），并被重命名（加上7位的哈希码作为版本标识）以实现更好的缓存策略。

当用 `nuxt` 命令运行应用时，`pages/index.vue` 中的模板代码：

```html
<template>
    <img src="~/assets/image.png">
</template>
```

将被编译生成：

```html
<img src="/_nuxt/img/image.0c61159.png">
```

如果想更新这些加载器的配置或者禁用他们，请参考 [build.extend](https://zh.nuxtjs.org/api/configuration-build#extend)

### 静态文件

如果静态资源文件需要 Webpack 做构建编译处理，可以放到 `assets` 目录，否则可以放到 `static` 目录中去。

Nuxt 服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下，像 `robots.txt` 或 `sitemap.xml` 这种类型的文件就很适合放到 `static` 目录中。

可以在代码中使用根路径 `/` 结合资源相对路径来引用静态资源：

```html
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png"/>
<!-- 引用 assets 目录下经过 webpack 构建处理后的图片 -->
<img src="~/assets/my-image-2.png"/>
```

## 插件

Nuxt.js允许在运行Vue.js应用程序之前执行js插件。这在需要使用自己的库或第三方模块时特别有用。

需要注意的是，在任何 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个方法会在 客户端和服务端被调用。

其他生命周期函数仅在客户端被调用。

### 使用第三方模块

可以在应用中使用第三方模块，一个典型的例子是在客户端和服务端使用 `axios` 做 HTTP 请求。

`npm install --save axios`

在页面内使用：

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

### 使用 Vue 插件

假如想使用 [vue-notifications](https://github.com/se-panfilov/vue-notifications) 显示应用的通知信息，需要在程序运行前配置好这个插件。

```js
// plugins/vue-notifications.js
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
Vue.use(VueNotifications)

// nuxt.config.js
module.exports = {
    plugins: ['~/plugins/vue-notifications']
}
```

想了解更多关于 plugins 的配置，请参考 [插件 API 文档](https://zh.nuxtjs.org/api/configuration-plugins)

#### ES6 插件

如果插件位于 `node_modules` 并导出模块，需要将其添加到 `transpile` 构建选项：

```js
module.exports = {
    build: {
        transpile: ['vue-notifications']
    }
}
```

您可以参考 [构建配置](https://zh.nuxtjs.org/api/configuration-build/#transpile) 文档来获取更多构建选项。

### 注入 $root 和 context

有时希望在整个应用程序中使用某个函数或属性值，此时，需要将它们注入到Vue实例（客户端），context（服务器端）甚至 store(Vuex)。

按照惯例，新增的属性或方法名使用 `$` 作为前缀。

#### 注入 Vue 实例

将内容注入Vue实例，避免重复引入，在Vue原型上挂载注入一个函数，所有组件内都可以访问(不包含服务器端)。

```js
// plugins/vue-inject.js:
import Vue from 'vue'
Vue.prototype.$myInjectedFunction = string => console.log('This is an example', string)

// nuxt.config.js:
export default {
    plugins: ['~/plugins/vue-inject.js']
}

// 这样，就可以在所有Vue组件中使用该函数。
// example-component.vue:
export default {
  mounted () {
    this.$myInjectedFunction('test')
  }
}
```

#### 注入 context

context注入方式和在其它vue应用程序中注入类似。

```js
// plugins/ctx-inject.js:
export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    app.myInjectedFunction = string => console.log('Okay, another function', string)
}

// nuxt.config.js:
export default {
    plugins: ['~/plugins/ctx-inject.js']
}

// 现在，只要您获得context，你就可以使用该函数（例如在asyncData和fetch中）。 
// ctx-example-component.vue:
export default {
    asyncData (context) {
        context.app.myInjectedFunction('ctx!')
    }
}
```

#### 同时注入

如果需要同时在 `context`，`Vue` 实例，甚至 `Vuex` 中同时注入，可以使用 `inject` 方法，它是plugin导出函数的第二个参数。

将内容注入Vue实例的方式与在Vue应用程序中进行注入类似。系统会自动将 `$` 添加到方法名的前面。

```js
// plugins/combined-inject.js:
export default ({ app }, inject) => {
    inject('myInjectedFunction', string => console.log('That was easy!', string))
}

// nuxt.config.js:
export default {
    plugins: ['~/plugins/combined-inject.js']
}

// 现在就可以在context，或者Vue实例中的this，或者Vuex的actions/mutations方法中的this来调用myInjectedFunction方法。
// ctx-example-component.vue:
export default {
    mounted () {
        this.$myInjectedFunction('works in mounted')
    },
    asyncData (context) {
        context.app.$myInjectedFunction('works with context')
    }
}

// store/index.js:
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

#### 只在客户端使用的插件

不支持ssr的系统，插件只在浏览器里使用，这种情况下下，可以用 `ssr: false` ，使得插件只会在客户端运行。

例子：

```js
// nuxt.config.js:
module.exports = {
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false }
  ]
}

// plugins/vue-notifications.js:
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
Vue.use(VueNotifications)
```

您可以通过检测`process.server`这个变量来控制插件中的某些脚本库只在服务端使用。

当值为 `true` 表示是当前执行环境为服务器中。 

此外，可以通过检查 `process.static` 是否为 `true` 来判断应用是否通过 `nuxt generator` 生成。

也可以组合 `process.server` 和 `process.static` 这两个选项，确定当前状态为服务器端渲染且使用 `nuxt generate` 命令运行。

注意：由于 `Nuxt.js 2.4`，模式已被引入作为插件的选项来指定插件类型，可能的值是：`client` 或 `server`, `ssr:false` 在下一个主要版本中弃用,将过渡为 `mode: 'client'`。

例子:

```js
// nuxt.config.js:
export default {
    plugins: [
        { src: '~/plugins/both-sides.js' },
        { src: '~/plugins/client-only.js', mode: 'client' },
        { src: '~/plugins/server-only.js', mode: 'server' }
    ]
}
```

#### 传统命名插件

如果假设插件仅在 *客户端* 或 *服务器端* 运行，则 `.client.js` 或 `.server.js` 可以作为插件文件的扩展名应用，该文件将自动包含在相应客户端或者服务端上。

例子:

```js
nuxt.config.js:
export default {
    plugins: [
        '~/plugins/foo.client.js', // only in client side
        '~/plugins/bar.server.js', // only in server side
        '~/plugins/baz.js' // both client & server
    ]
}
```

## 模块

模块是Nuxt.js扩展，可以扩展其核心功能并添加无限的集成。

### 介绍

在使用Nuxt开发应用程序时，很快就会发现框架的核心功能还不够。 

Nuxt可以使用配置选项和插件进行扩展，但是在多个项目中维护这些自定义是繁琐、重复和耗时的。 

另一方面，开箱即用支持每个项目的需求将使Nuxt非常复杂且难以使用。

这就是Nuxt提供更高阶模块系统的原因，可以轻松扩展核心。 模块只是在引导Nuxt时按顺序调用的函数。 

框架在加载之前等待每个模块完成。 如此，模块几乎可以自定义Nuxt的任何地方。 

可以使用功能强大的 [Hookable](https://github.com/nuxt/nuxt.js/blob/dev/packages/core/src/hookable.js) Nuxt.js系统来完成特定事件的任务。

最重要的是, Nuxt模块可以合并到npm包中。 这使得它们易于跨项目开发重用并与Nuxt社区共享, 可以创建一个高质量的Nuxt附加组件生态系统。

### Nuxt.js 模块列表

Nuxt.js 团队提供 官方 模块:

- [@nuxt/http](https://http.nuxtjs.org/): 基于 [ky-universal](https://github.com/sindresorhus/ky-universal) 的轻量级和通用的HTTP请求
- [@nuxtjs/axios](https://axios.nuxtjs.org/): 安全和使用简单Axios与Nuxt.js集成用来请求HTTP
- [@nuxtjs/pwa](https://pwa.nuxtjs.org/): 使用经过严格测试，更新且稳定的PWA解决方案来增强Nuxt
- [@nuxtjs/auth](https://auth.nuxtjs.org/): Nuxt.js的身份验证模块，提供不同的方案和验证策略

Nuxt.js社区制作的模块列表可在 https://github.com/topics/nuxt-module 中查询

### 基本模块

如上所述，模块只是简单的功能。它们可以打包为 `npm` 模块或直接包含在项目源代码中。

```js
// modules/simple.js
export default function SimpleModule (moduleOptions) {
    // Write your code here
}
// REQUIRED if publishing as an npm package
// module.exports.meta = require('./package.json')
```

`moduleOptions`

这是用户使用 `modules` 数组传递对象，可以使用它来定制它的行为。

`this.options`

可以使用此属性直接访问Nuxt选项。这是 `nuxt.config.js`，其中包含所有默认选项，可用于模块之间的共享选项。

`this.nuxt`

这是对当前Nuxt实例的引用。 请参考 [Nuxt class docs for available methods](https://zh.nuxtjs.org/api/internals-nuxt)

`this`

modules中的context, 请参考 [ModuleContainer](https://zh.nuxtjs.org/api/internals-module-container) 来查看可用的方法。

`module.exports.meta`

如果要将模块发布为npm包，则需要配置此选项。Nuxt内部使用 `meta` 来更好地处理包。

```js
// nuxt.config.js
export default {
    modules: [
        // Simple usage
        '~/modules/simple'

        // Passing options
        ['~/modules/simple', { token: '123' }]
    ]
}
```

然后，告诉Nuxt为项目加载一些特定模块，并将可选参数作为选项。 请参考 [模块配置](https://zh.nuxtjs.org/api/configuration-modules)

### 异步模块

并非所有模块都会同步完成所有操作，例如：可能希望开发一个需要获取某些API或执行异步IO的模块。

为此，Nuxt支持在异步模块中返回Promise或调用回调。

#### 使用 async/await

请注意，仅在 `Node.js > 7.2` 中支持使用 `async` / `await。` 因此，至少要警告用户使用它们时Node.js版本不能低于7.2。 

对于大量异步模块或更好的传统支持，可以使用bundler将其转换为兼容较旧的Node.js版本或Promise方法。

```js
import fse from 'fs-extra'
export default async function asyncModule () {
    // You can do async works here using `async`/`await`
    const pages = await fse.readJson('./pages.json')
}
```

#### 返回 Promise

```js
import axios from 'axios'
export default function asyncModule () {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data.map(user => '/users/' + user.username))
        .then((routes) => {
        // Do something by extending Nuxt routes
        })
}
```

#### 使用回调

```js
import axios from 'axios'
export default function asyncModule (callback) {
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data.map(user => '/users/' + user.username))
        .then((routes) => {
        callback()
        })
}
```

### 常见模块

#### 优先级最高选项

有时在 `nuxt.config.js` 中注册模块时可以使用顶级选项更方便，这允许组合多个选项源。

```js
// nuxt.config.js
export default {
    modules: [
        ['@nuxtjs/axios', { anotherOption: true }]
    ],

    // axios module is aware of this by using `this.options.axios`
    axios: {
        option1,
        option2
    }
}

// module.js
export default function (moduleOptions) {
    const options = Object.assign({}, this.options.axios, moduleOptions)
    // ...
}
```

#### 提供插件

通常，模块在添加时需提供一个或多个插件。 

例如：`bootstrap-vue` 模块需要将自己注册到 `Vue` 中。 为此可以使用 `this.addPlugin` 方法。

```js
// plugin.js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
Vue.use(BootstrapVue)

// module.js
import path from 'path'
export default function nuxtBootstrapVue (moduleOptions) {
    // Register `plugin.js` template
    this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

#### 模板插件

已注册的模板和插件可以利用 [lodash templates](https://lodash.com/docs/4.17.4#template) 模板有条件地更改已注册插件的输出。

```js
// plugin.js
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')
<% if (options.debug) { %>
// Dev only code
<% } %>

// module.js
import path from 'path'
export default function nuxtBootstrapVue (moduleOptions) {
    // Register `plugin.js` template
    this.addPlugin({
        src: path.resolve(__dirname, 'plugin.js'),
        options: {
            // Nuxt will replace `options.ua` with `123` when copying plugin to project
            ua: 123,
            // conditional parts with dev will be stripped from plugin code on production builds
            debug: this.options.dev
        }
  })
}
```

#### 添加CSS库

考虑是否存在CSS库以避免重复，并添加一个选项来禁用模块中的CSS库。

```js
// module.js
export default function (moduleOptions) {
    if (moduleOptions.fontAwesome !== false) {
        // Add Font Awesome
        this.options.css.push('font-awesome/css/font-awesome.css')
    }
}
```

#### Emit assets

我们可以注册webpack插件用来在构建期间发出资源。

```js
// module.js
export default function (moduleOptions) {
    const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()
    this.options.build.plugins.push({
        apply (compiler) {
        compiler.plugin('emit', (compilation, cb) => {
            // This will generate `.nuxt/dist/info.txt' with contents of info variable.
            // Source can be buffer too
            compilation.assets['info.txt'] = { source: () => info, size: () => info.length }
            cb()
        })
        }
    })
}
```

#### 注册自定义 loaders

可以使用 `this.extendBuild` 在 `nuxt.config.js` 中执行与 `build.extend` 相同的操作。

```js
// module.js
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
        // `.foo` Loader
        config.module.rules.push({
            test: /\.foo$/,
            use: [...]
        })
        // Customize existing loaders
        // Refer to source code for Nuxt internals:
        // https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/webpack/base.js
        const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```

### 在指定钩子上运行任务

模块可能只需要在特定条件下执行操作，而不仅仅是在Nuxt初始化期间。

可以使用强大的 [Tapable](https://github.com/webpack/tapable) 插件来执行特定事件的任务。

Nuxt将等待钩子返回 `Promise` 或被定义为 `async`。

```js
export default function () {
    // Add hook for modules
    this.nuxt.hook('module', (moduleContainer) => {
        // This will be called when all modules finished loading
    })
    // Add hook for renderer
    this.nuxt.hook('renderer', (renderer) => {
        // This will be called when renderer was created
    })
    // Add hook for build
    this.nuxt.hook('build', async (builder) => {
        // This will be called once when builder created
        // We can even register internal hooks here
        builder.hook('compile', ({ compiler }) => {
        // This will be run just before webpack compiler starts
        })
    })
    // Add hook for generate
    this.nuxt.hook('generate', async (generator) => {
        // This will be called when a Nuxt generate starts
    })
}
```

### Module package commands

实验性的

从 `v2.4.0` 开始，可以通过Nuxt模块的包(package)添加自定义nuxt命令。

为此，必须 `NuxtCommand` 在定义命令时遵循API规则。

示例 `my-module/bin/command.js`：

```js
#!/usr/bin/env node
const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')
NuxtCommand.run({
    name: 'command',
    description: 'My Module Command',
    usage: 'command <foobar>',
    options: {
        foobar: {
            alias: 'fb',
            type: 'string',
            description: 'Simple test string'
        }
    },
    run (cmd) {
        consola.info(cmd.argv)
    }
})
```

这里有一些值得注意的事情。首先，注意调用 `/usr/bin/env` 来检索Node可执行文件。

另请注意，ES模块语法不能用于命令，除非手动合并 [esm](https://github.com/standard-things/esm) 到代码中。

接下来，将注意到如何使用 `NuxtCommand.run()` 指定命令的设置和行为。定义选项 `options`，通过解析 [minimist](https://github.com/substack/minimist)。

解析参数后，`run()` 将使用 `NuxtCommand` 实例作为第一个参数自动调用。

在上面的示例中，`cmd.argv` 用于检索解析的命令行参数。

有更多的方法和属性 `NuxtCommand --` 将提供有关它们的文档，因为此功能将进一步测试和改进。

要使命令可以通过Nuxt CLI识别bin，请使用 `nuxt-module` 约定将其列在 `package.json` 的部分下，该约定module与包名称相关。

使用此二进制文件，可以根据 `argv` 需要进一步解析更多 `subcommands` 命令。

```js
{
    "bin": {
        "nuxt-foobar": "./bin/command.js"
    }
}
```

一旦安装了软件包(通过NPM或Yarn)，就可以 `nuxt foobar ...` 在命令行上执行。

modules有许多钩子和可能性。请参考 [Nuxt Internals](https://zh.nuxtjs.org/api/internals) 了解有关Nuxt内部API的更多信息。

## Vuex 状态树

对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。这就是为什么 Nuxt.js 内核实现了 [Vuex](https://github.com/vuejs/vuex)。

### 使用状态树

Nuxt.js 会尝试找到应用根目录下的 `store` 目录，如果该目录存在，它将做以下的事情：

1. 引用 `vuex` 模块
2. 将 `vuex` 模块 加到 vendors 构建配置中去
3. 设置 `Vue` 根实例的 `store` 配置项

Nuxt.js 支持两种使用 `store` 的方式，可以择一使用：

- 模块方式： `store` 目录下的每个 `.js` 文件会被转换成为状态树 [指定命名的子模块](http://vuex.vuejs.org/en/modules.html) （当然，`index` 是根模块）
- Classic(不建议使用)： `store/index.js` 返回创建Vuex.Store实例的方法。

无论使用那种模式，`state` 的值应该始终是 `function`，为了避免返回引用类型，会导致多个实例相互影响。

#### 普通方式

Nuxt.js允许您拥有一个 `store` 目录，其中包含与模块对应的每个文件。

首先，只需将状态导出为 函数，将变量和操作作为 `store/index.js` 中的对象导出：

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

然后，可以拥有 `store/todos.js` 文件：

```js
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
```

Vuex将如下创建：

```js
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

在 `pages/todos.vue` 中，使用 `todos` 模块：

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

模块方法也适用于顶级定义，而无需在 `store` 目录中实现子目录

示例：创建文件 `store/state.js` 并添加以下内容

```js
export default () => ({
    counter: 0
})
```

相应的可以在文件夹中添加 `store/mutations.js`

```js
export default {
    increment (state) {
        state.counter++
    }
}
```

#### 模块文件

可以将模块文件分解为单独的文件：`state.js`, `actions.js`, `mutations.js` 和 `getters.js`。

如果使用 `index.js` 来维护 `state`, `getters`, `actions` 和 `mutations`，同时具有单个单独的操作文件，那么仍然可以正确识别该文件。

注意：在使用拆分文件模块时，必须记住使用箭头函数功能， `this` 在词法上可用。词法范围 `this` 意味着它总是指向引用箭头函数的所有者。
如果未包含箭头函数，那么 `this` 将是未定义的(`undefined`)。解决方案是使用 "normal" 功能，该功能会将 `this` 指向自己的作用域，因此可以使用。

#### 插件

可以将其他插件添加到store（在模块模式下），将其放入 `store/index.js` 文件中：

```js
import myPlugin from 'myPlugin'
export const plugins = [ myPlugin ]
export const state = () => ({
    counter: 0
})
export const mutations = {
    increment (state) {
        state.counter++
    }
}
```

有关插件的更多信息: [Vuex 文档](https://vuex.vuejs.org/en/plugins.html)

### fetch 方法

*fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。*

关于 `fetch` 方法的更多信息，请参考 [页面 fetch 方法API](https://zh.nuxtjs.org/api/pages-fetch)。

### nuxtServerInit 方法

如果在状态树中指定了 `nuxtServerInit` 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第2个参数传给它（服务端调用时才会）。
当想将服务端的一些数据传到客户端时，这个方法是非常好用的。

举个例子，假设服务端的会话状态树里可以通过 `req.session.user` 来访问当前登录的用户。将该登录用户信息传给客户端的状态树，只需更新 `store/index.js`：

```js
actions: {
    nuxtServerInit ({ commit }, { req }) {
        if (req.session.user) {
            commit('user', req.session.user)
        }
    }
}
```

*如果使用_状态树模块化_的模式，只有主模块（即 `store/index.js`）适用设置该方法（其他模块设置了也不会被调用）。*

这时 [context](https://zh.nuxtjs.org/api/context) 被赋予 `nuxtServerInit` 作为第二个参数，它与 `asyncData` 或 `fetch` 方法相同。

`nuxtServerInit` 方法接收的上下文对象和 `fetch` 的一样，但不包括 `context.redirect()` 和 `context.error()`。

注意：异步 `nuxtServerInit` 操作必须返回 `Promise` 来通知 `nuxt` 服务器等待它们。

```js
actions: {
    async nuxtServerInit({ dispatch }) {
        await dispatch('core/load')
    }
}
```

### Vuex 严格模式

默认情况下，在开发模式下启用严格模式，在生产模式下关闭模式。要在dev中禁用严格模式，请遵循以下示例。

#### Module Mode

`export const strict = false`

#### 经典模式

*此功能已经弃用，将在Nuxt 3中删除。*

要使用经典模式创建Vuex，应该创建 `store/index.js` 到处返回Vuex实例的方法的文件：

```js
import Vuex from 'vuex'
const createStore = () => {
    return new Vuex.Store({
        strict: false,
        state: () => ({
            counter: 0
        }),
        mutations: {
            increment (state) {
                state.counter++
            }
        }
    })
}
export default createStore
```

*不需要安装，因为Vuex由Nuxt.js提供。*

现在可以在组件中使用 `this.$store`：

```html
<template>
    <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```

## 支持 TypeScript

Nuxt.js 对 typescript 有着完整的支持包括（包括运行和编译期）。文档请参阅 https://typescript.nuxtjs.org/。

## 命令和部署

Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。

### 命令列表

| 命令 | 描述 |
| ---- | ---- |
| nuxt | 启动一个热加载的Web服务器（开发模式） localhost:3000。 |
| nuxt build | 利用webpack编译应用，压缩JS和CSS资源（发布用）。 |
| nuxt start | 以生产模式启动一个Web服务器 (需要先执行`nuxt build`)。 |
| nuxt generate | 编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。 |

如果使用了 `Koa/Express` 等 Node.js Web 开发框架，并使用了 Nuxt 作为中间件，可以自定义 Web 服务器的启动入口：

| 命令 | 描述 |
| ---- | ---- |
| NODE_ENV=development nodemon server/index.js | 启动一个热加载的自定义 Web 服务器（开发模式）。 |
| NODE_ENV=production node server/index.js | 以生产模式启动一个自定义 Web 服务器 (需要先执行 nuxt build)。 |

参数

可以使用 `--help` 命令来获取详细用法。常见的命令有：

- `--config-file` 或 `-c`: 指定 `nuxt.config.js` 的文件路径。
- `--spa` 或 `-s`: 禁用服务器端渲染，使用SPA模式
- `--unix-socket` 或 `-n`: 指定UNIX Socket的路径。

可以将这些命令添加至 `package.json`：

```json
"scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
}
```

这样可以通过 `npm run <command>` 来执行相应的命令。如: `npm run dev`。

提示: 要将参数传递给npm命令，需要一个额外的`--`脚本名称(例如：`npm run dev --参数 --spa`)

### 开发模式

可通过以下命令以开发模式启动带热加载特性的 Nuxt 服务：

```
nuxt
// 或
npm run dev
```

### 发布部署

Nuxt.js 提供了两种发布部署应用的方式：服务端渲染应用部署 和 静态应用部署。

#### 服务端渲染应用部署

部署 Nuxt.js 服务端渲染的应用不能直接使用 `nuxt` 命令，而应该先进行编译构建，然后再启动 Nuxt 服务，可通过以下两个命令来完成：

```
nuxt build
nuxt start
```

推荐的 `package.json` 配置如下：

```json
{
    "name": "my-app",
    "dependencies": {
        "nuxt": "latest"
    },
    "scripts": {
        "dev": "nuxt",
        "build": "nuxt build",
        "start": "nuxt start"
    }
}
```

提示： 建议将 `.nuxt` 加入 `.npmignore` 和 `.gitignore` 文件中。

#### 静态应用部署

Nuxt.js 可依据路由配置将应用静态化，可以将应用部署至任何一个静态站点主机服务商。

可利用下面的命令生成应用的静态目录和文件：

`npm run generate`

这个命令会创建一个 `dist` 文件夹，所有静态化后的资源文件均在其中。

如果项目需要用到 [动态路由](https://zh.nuxtjs.org/guide/routing#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)，请移步 [generate配置API](https://zh.nuxtjs.org/api/configuration-generate) 了解如何让 Nuxt.js 生成此类动态路由的静态文件。

注意：使用 `nuxt generate` 静态化应用的时候, 传给 [asyncData()](https://zh.nuxtjs.org/guide/async-data#asyncdata-%E6%96%B9%E6%B3%95) 和 [fetch()](https://zh.nuxtjs.org/guide/vuex-store#fetch-%E6%96%B9%E6%B3%95) 方法的 [上下文对象](https://zh.nuxtjs.org/api#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1) 不会包含 `req` 和 `res` 两个属性。

#### 单页面应用程序部署 (SPA)

`nuxt generate` 在 build/generate 时间内仍然需要SSR引擎，同时具有预渲染所有页面的优势，并具有较高的SEO优化和页面加载能力。

内容在构建时生成。例如，不能将它用于内容依赖于用户身份验证或实时API的应用程序（至少对于第一次加载）。

SPA应用的想法很简单！ 使用时启用SPA模式 `mode: 'spa'` 或 `--spa`，并且运行打包，生成在导报后自动启动，生成包含常见的meta和资源链接，但不包含页面内容。

因此，对于SPA部署，必须执行以下操作：

- 将`nuxt.config.js`中的`mode`更改为`spa`。
- 运行 `npm run build`
- 自动生成 `dist/` 文件夹，部署到您的服务器，如Surge，GitHub Pages或nginx。

另一种可能的部署方法是在`spa`模式下将Nuxt用作框架中的中间件。
这有助于减少服务器负载，并在无法进行SSR的项目中使用Nuxt。

请参考 [如何在 Heroku 上部署?](https://zh.nuxtjs.org/faq/github-pages) 来查看更多部署信息。

请参考 [如何在 GitHub Pages 上部署?](https://zh.nuxtjs.org/faq/github-pages) 查看如何部署到GitHub页面的更多详细信息。

## 开发工具

*测试是 Web 应用开发过程中不可获缺的工作。*

### 端对端测试

[ava](https://github.com/avajs/ava) 是一个很强大的 JavaScript 测试框架，结合 [jsdom](https://github.com/tmpvar/jsdom)，可以轻松地给 `nuxt` 应用进行端对端测试。

添加 `ava` 和 `jsdom` 作为项目的开发依赖：

`npm install --save-dev ava jsdom`

在 `package.json` 中添加测试脚本，并配置 `ava` 如果编译待测试的文件：

`package.json`

```json
"scripts": {
    "test": "ava",
},
"ava": {
    "require": [
        "babel-register"
    ]
},
"babel": {
    "presets": [
        "es2015"
    ]
}
```

接下来在 `test` 目录下编写单元测试的逻辑代码：

`mkdir test`

有这样一个页面 `pages/index.vue`：

```html
<template>
    <h1 class="red">Hello {{ name }}!</h1>
</template>
<script>
export default {
    data () {
        return { name: 'world' }
    }
}
</script>
<style>
.red {
    color: red;
}
</style>
```

当我们利用 `npm run dev` 启动开发服务器的时候，用浏览器打开 http://localhost:3000 ，我们能看到红色的 `Hello world` 标题。

添加一个单元测试文件 `test/index.test.js`：

```js
import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
// 我们用一个变量保留 nuxt 和 server 实例的引用
// 这样可以在单元测试结束之后关掉它们
let nuxt = null
// 初始化 Nuxt.js 并创建一个监听 localhost:4000 的服务器
test.before('Init Nuxt.js', async (t) => {
    const rootDir = resolve(__dirname, '..')
    let config = {}
    try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
    config.rootDir = rootDir // 项目目录
    config.dev = false // 生产构建模式
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    nuxt.listen(4000, 'localhost')
})
// 测试生成的html
test('路由 / 有效且能渲染 HTML', async (t) => {
    const context = {}
    const { html } = await nuxt.renderRoute('/', context)
    t.true(html.includes('<h1 class="red">Hello world!</h1>'))
})
// 测试元素的有效性
test('路由 / 有效且渲染的HTML有特定的CSS样式', async (t) => {
    const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
    const element = window.document.querySelector('.red')
    t.not(element, null)
    t.is(element.textContent, 'Hello world!')
    t.is(element.className, 'red')
    t.is(window.getComputedStyle(element).color, 'red')
})
// 关掉服务器和Nuxt实例，停止文件监听。
test.after('Closing server and nuxt.js', (t) => {
    nuxt.close()
})
```

运行上面的单元测试：

`npm test`

实际上 `jsdom` 会有一定的限制性，因为它背后并没有使用任何的浏览器引擎，但是也能涵盖大部分关于 dom元素 的测试了。 
如果想使用真实的浏览器引擎来测试应用，推荐 [Nightwatch.js](http://nightwatchjs.org/)。

### ESLint

*ESLint 是一个很棒的工具，帮助我们提升代码的规范和质量。*

在 Nuxt.js 中集成 [ESLint](http://eslint.org/) 是非常简单的，首先需要安装 ESLint 的一系列依赖包：

```
npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node
```

然后, 在项目根目录下创建 `.eslintrc.js` 文件用于配置 ESLint：

```js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'eslint:recommended',
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/recommended',
        'plugin:prettier/recommended'
    ],
    // 校验 .vue 文件
    plugins: [
        'vue'
    ],
    // 自定义规则
    rules: {
        'semi': [2, 'never'],
        'no-console': 'off',
        'vue/max-attributes-per-line': 'off',
        'prettier/prettier': ['error', { 'semi': false }]
    }
}
```

最后，在 `package.json` 文件中添加一个 `lint` 和 `lintfix` 脚本命令：

```json
"scripts": {
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "lintfix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
}
```

现在可以启动 `lint` 来检查错误：

`npm run lint`

或者 `lintfix` 还可以修复那些可修复的

`npm run lintfix`

ESLint将检测校验所有JavaScript和Vue文件，同时忽略`.gitignore`中定义的被忽略文件。

还建议通过webpack启用ESLint热更新模式。这样ESLint将在`npm run dev`时保存。只需将以下内容添加到`nuxt.config.js`：

```js
...
    /*
    ** Build configuration
    */
    build: {
    /*
        ** 您可以在这里扩展webpack配置
    */
    extend(config, ctx) {
        // Run ESLint on save
        if (ctx.isDev && ctx.isClient) {
            config.module.rules.push({
                enforce: "pre",
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                exclude: /(node_modules)/
            })
        }
        }
    }
```

有个最佳实践是在 `package.json` 中增加 `"precommit": "npm run lint" `，这样可以实现每次提交代码之前自动进行代码检测校验。
