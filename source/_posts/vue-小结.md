---
title: vue-小结
date: 2019-12-29 16:01:50
tags: node
---

源码： https://github.com/jinven/vue-app
演示： https://vue-app.now.sh/

<!-- more -->

# 搭建

## 初始化项目

```sh
# 全局模块
npm install -g @vue/cli
npm install -g @vue/cli-service-global
vue --version
# 创建项目
vue create vue-app
# 运行项目
cd vue-app
npm start
```

# 使用

## 渲染

```js
`{{ 变量或表达式 }}` 声明式渲染，如：`变量.split('').reverse().join('')`
`<p v-bind:属性="变量" :属性="变量"></p>` 绑定变量到属性，如：`v-bing:id="app"` 等于 `:id="app"`
`<p v-bind:[变量1]="变量2"></p>` 绑定变量到动态属性，如： `<p v-bind:['id']="app"></p>`
`<p v-show="变量"></p>` 隐藏或显示元素
`<p v-if="变量1"></p><p v-else-if="变量2"></p><p v-else></p>` 条件渲染，渲染问题可添加 `key` 属性
`<p v-for="项 in 变量"></p>` 数组循环渲染，接受方法、整数、数组
`<p v-for="(项, index) in 变量"></p>` 数组循环渲染
`<p v-for="项 in 变量" v-bind:key="项.id"></p>` 数组循环渲染，为了可维护加上 `key`
`<a v-on:事件="方法" @事件="方法"></a>` 方法绑定到事件，如：`v-on:click="alert()"` 等于 `@click="alert()"`
`<a v-on:[变量]="方法"></a>` 方法动态绑定到变量值的事件，如：`<a v-on:['click']="alert()"></a>`
`<form v-on:submit.prevent="方法"></form>` 修饰符，表单提交后阻止，相当于 `evnt.preventDefault()`
`<input v-model="变量">` 模型双向绑定
`<p v-html="变量"></p>` 文本变量渲染为html
```

## 组件

组件名有两种，两者等效

- kebab-case `my-component-name`
- PascalCase `MyComponentName`

### vue实例与数据

```js
var data = { a: 1, itemsP: ['a', 'b', 'c'] }
var vm = new Vue({
  el: '#app',
  data: data
})
// vm.a === 1 
// vm.$data === data
// vm.$el === document.getElementById('app')
vm.b = 2 // 不会跟踪 b 的变化
vm.$watch('a', function(newValue, oldValue) {
  // vm.a 改变后调用
})
Vue.set(vm.userProfile, 'age', 27)
// 全局 Vue.set 的别名
vm.$set(vm.items, indexOfItem, newValue)
```

1. 创建之后赋值新属性到 `data` 不会重新渲染
2. 可使用 `Object.freeze(data)` 停止追踪变化

### 自定义组件

- 全局注册： `Vue.component('my-component-name', { ... })`
- 局部注册： `new Vue({ el: '#app', components: { 'component-a': ..., 'component-b: ... } })`

```js
Vue.component('todo-item', {
  data: function(){
    return {
      count: 0
    }
  },
  props: ['todo']
  template: '<li>{{ todo.text }}</li>'
})
var app = new Vue({
  el: '#app',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '其他' },
    ],
    todos: [
      { id: 1, title: 'Do the dishes', },
      { id: 2, title: 'Take out the trash', },
      { id: 3, title: 'Mow the lawn' }
    ],
  }
})
```

```html
<div id="app">
  <ol>
      <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id"></todo-item>
  </ol>
  <ul>
    <!-- 注意 is -->
    <li is="todo-item" v-for="(todo, index) in todos" v-bind:key="todo.id" v-bind:title="todo.title" v-on:remove="todos.splice(index, 1)"></li>
  </ul>
</div>
```

### 自定义 v-model

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```

### 原生事件绑定

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

### .sync 双向绑定

```js
this.$emit('update:title', newTitle)
```

```html
<text-document v-bind:title="doc.title" v-on:update:title="doc.title = $event"></text-document>
<!-- 等同于 -->
<text-document v-bind:title.sync="doc.title"></text-document>
```

### Prop

`camelCase` 的 prop 名需要使用其等价的 `kebab-case` 命名：

```js
Vue.component('blog-post', {
  props: ['postTitle'],
  // ...
})
```

```html
<blog-post post-title="hello"></blog-post>
```

验证：

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

字符串模板不存在这个限制

禁止 `Attribute` 继承

```js
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

### $attrs

元素或组件的属性 `attribute`

### 生命周期钩子

顺序

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`
- `updated`

使用 keep-alive 后出现：

- `activated`
- `deactivated`

```js
new Vue({
  beforeCreate: ...
  created: ...
  beforeMount: ...
  mounted: ...
  beforeUpdate: ...
  updated: ...
  beforeDestroy: ...
  destroyed: ...
  updated: ...
  activated: ...
  deactivated: ...
})
```

### 方法

```js
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello'
  },
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```

使用

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

### 事件修饰符

```
.stop 阻止单击事件继续传播
.prevent 提交事件不再重载页面
.capture 添加事件监听器时使用事件捕获模式，内部元素触发的事件先在此处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 只会触发一次
.passive 提升移动端的性能
```

修饰符可以串联

```html
<a v-on:click.stop="doThis"></a>
<form v-on:submit.prevent="onSubmit"></form>
<a v-on:click.stop.prevent="doThat"></a>
<form v-on:submit.prevent></form>
<div v-on:click.capture="doThis">...</div>
<div v-on:click.self="doThat">...</div>
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
<a v-on:click.once="doThis"></a>
<input v-on:keyup.enter="submit">
<input v-on:keyup.page-down="onPageDown">
<input @keyup.alt.67="clear">
<div @click.ctrl="doSomething">Do something</div>
<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

```
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
.ctrl
.alt
.shift
.meta
```

### 表单修饰符

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
<input v-model.number="age" type="number">
<input v-model.trim="msg">
```

### 计算属性

```js
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello',
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    },
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    },
    fullName2: {
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
})
```

使用

```html
<p>{{ message }}</p>
<p>{{ reversedMessage }}</p>
<p>{{ fullName }}</p>
<p>{{ fullName2 }}</p>
```

### 侦听属性

```html
<div id="app">
  <p>{{ fullName }}</p>
  <p>Ask a yes/no question: <input v-model="question"></p>
  <p>{{ answer }}</p>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar',
    question: 'are you ok?',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    },
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api').then(function (response) {
        vm.answer = _.capitalize(response.data.answer)
      }).catch(function (error) {
        vm.answer = 'Error! Could not reach the API. ' + error
      })
    }
  }
})
// 或者
// https://cn.vuejs.org/v2/api/#vm-watch
vm.$watch('firstName', ...)
```

### class、style

class

```html
<div v-bind:class="{ active: isActive }"></div>
<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

style

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="[baseStyles, overridingStyles]"></div>
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

### $emit、$event

`$emit` 触发父组件事件
`$event` 访问到子组件抛出的值

```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text', 0.1)">Enlarge text</button>
      <div v-html="post.content"></div>
    </div>
  `
})
new Vue({
  el: '#app',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ],
    postFontSize: 1
  },
  methods: {
    onEnlargeText: function(enlargeAmount) {
      this.postFontSize += enlargeAmount
    }
  }
})
```

```html
<div id="app">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post v-for="post in posts" v-bind:key="post.id" v-bind:post="post" v-on:enlarge-text="postFontSize += $event"></blog-post>
    <!-- 等同于 v-on:enlarge-text="onEnlargeText" -->
  </div>
</div>
```

`$event`

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `<input v-bind:value="value" v-on:input="$emit('input', $event.target.value)">`
})
```

```html
<input v-model="searchText">
<!-- 等于 -->
<input v-bind:value="searchText" v-on:input="searchText = $event.target.value">
<custom-input v-model="searchText"></custom-input>
<!-- 等于 -->
<custom-input v-bind:value="searchText" v-on:input="searchText = $event"></custom-input>
```

### slot、slot-scope、v-slot

`v-slot` 已取代 `slot`、`slot-scope`
`v-slot` 只能添加在 `<template>` 或 子组件包含 `<template>` 的父组件上

缩写： `v-slot:header` 等同于 `#header`

```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

```html
<alert-box>Something bad happened.</alert-box>
<!-- 等同于 -->
<div class="demo-alert-box"><strong>Error!</strong>Something bad happened.</div>
```

`template`

定义一个 `base-layout` 组件

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

使用组件

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

渲染结果

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

### is

```html
<!-- 非 table 元素的 blog-post-row 会渲染出错 -->
<table><blog-post-row></blog-post-row></table>
<!-- 防止 blog-post-row 为无效元素 -->
<table><tr is="blog-post-row"></tr></table>
<component v-bind:is="currentTabComponent"></component>
```

### keep-alive

保持组件的状态

https://jsfiddle.net/chrisvfritz/Lp20op9o/

```html
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

### 异步组件

只在需要的时候才从服务器加载

`setTimout` 模拟加载

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

webpack [code-splitting 功能](https://webpack.js.org/guides/code-splitting/)

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

`Promise`

```js
// 全局注册
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
// 局部注册
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

加载状态

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

### provide / inject

父组件向所有子级组件注入依赖

https://jsfiddle.net/chrisvfritz/Lp20op9o/

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}
// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
const Child = {
  inject: {
    foo: { default: 'foo' }
  }
}
```

### 递归组件

可以自己的模板中调用自身

```js
Vue.component('unique-name-of-my-component', {
  name: 'stack-overflow',
  template: '<div><stack-overflow></stack-overflow></div>'
  // ...
})
```

### inline-template 内联模板

内容作为模板，而不作为内容

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

### X-Template

```js
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

### 过渡

```
v-enter
v-enter-active
v-enter-to
v-leave
v-leave-active
v-leave-to
```

`transition` 常用过渡： `fade`、`slide-fade`、`bounce`

```html
<div id="app">
  <button v-on:click="show = !show">Toggle</button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

自定义过渡类名

```
enter-class
enter-active-class
enter-to-class (2.1.8+)
leave-class
leave-active-class
leave-to-class (2.1.8+)
```

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
<div id="example-3">
  <button @click="show = !show">Toggle render</button>
  <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#example-3',
  data: {
    show: true
  }
})
```

https://cn.vuejs.org/v2/guide/transitions.html

## this

### $root 访问根实例

`this.$root` 子组件中使用

### $parent 访问父级组件

`this.$parent` 子组件中使用

### $refs 子组件实例或子元素

```html
<input ref="input">
<base-input ref="usernameInput"></base-input>
```

```js
new Vue({
  methods: {
    focus: function(){
      console.log(this.$refs.usernameInput)
      this.$refs.input.focus()
    }
  }
})
```

### 侦听事件

```js
`$on(eventName, eventHandler)` 侦听一个事件
`$once(eventName, eventHandler)` 一次性侦听一个事件
`$off(eventName, eventHandler)` 停止侦听一个事件
```

### $forceUpdate()

迫使 Vue 实例重新渲染

### $nextTick( [callback] )

### $destroy()

完全销毁一个实例

### $mount( [elementOrSelector] )

手动地挂载一个未挂载的实例

```js
var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})
// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')
// 等同于
new MyComponent({ el: '#app' })
// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)
```

### $isServer

是否运行于服务器

### $slots

访问被插槽分发的内容
如：`v-slot:foo` 中的内容将会在 `this.$slots.foo` 中被找到

## 自定义指令

全局指令

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

局部指令

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

使用

```html
<input v-focus>
```

钩子函数

- `bind`： 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`： 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`： 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`： 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind`： 只调用一次，指令与元素解绑时调用。

## 渲染函数 & JSX

```html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

```js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

## createElement

```js
// @returns {VNode}
createElement(
  // 一个 HTML 标签名、组件选项对象，或者 resolve 了上述任何一种的一个 async 函数。必填项。
  'div',
  // 一个与模板中属性对应的数据对象。可选。
  {
  },
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

数据对象

```js
{
  // 与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 属性内，但不再支持如 `v-on:keyup.enter` 这样的修饰器。需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue` 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为 { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层属性
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

## 过滤器

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}
{{ message | filterA | filterB }}
{{ message | filterA('arg1', arg2) }}
<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

```js
// 局部
{
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
// 全局
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

# mixin

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

## 合并

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created: function () {
    console.log('混入对象的钩子被调用')
  },
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}
new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  },
  created: function () {
    console.log('组件钩子被调用')
    console.log(this.$data)
    this.foo()
    this.bar()
    this.conflicting()
    // => "混入对象的钩子被调用"
    // => "组件钩子被调用"
    // => { message: "goodbye", foo: "abc", bar: "def" }
    // => "foo"
    // => "bar"
    // => "from self"
  }
})
```

## 全局混入

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

## 自定义选项合并策略

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

# 插件

https://cn.vuejs.org/v2/guide/plugins.html

1. 添加全局方法或者属性。如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
// Vue.use(MyPlugin, { someOption: true })
new Vue({
  // ...组件选项
})
```

# vuex

https://vuex.vuejs.org/zh/

## 安装

```sh
npm install vuex --save
```

装载

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

## 使用

- State 必须是纯粹状态对象数据
- Getter 从 store 中的 state 中派生出一些状态
- Mutation 状态的唯一方法，进行状态更改的地方，接受 state 作为第一个参数，必须是同步函数
- Action 提交的是 mutation，而不是直接变更状态，可以包含任意异步操作
- Module 将 store 分割成模块，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

```js
const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => state.todos.find(todo => todo.id === id)
  },
  mutations: {
    increment (state) {
      state.count++
    },
    incrementBy (state, payload) {
      state.count += payload.amount
    }
  },
  actions: {
    increment (context) {
      conext.commit('increment')
    },
    incrementAsync ({ commit }, payload) {
      setTimeout(() => {
        commit('incrementBy', payload)
      }, 1000)
    },
    async actionA({ commit }) {
      commit('gotData', await getDate())
    },
    async actionB({ dispatch, commit }) {
      await dispatch('actionA')
      commit('gotOtherData', await getOtherData())
    }
  }
})
// 组件中使用
// this.$store.getters.doneTodos
// this.$store.getters.doneTodosCount
// this.$store.getters.getTodoById(2)
// this.$store.commit('increment')
// this.$store.commit('incrementBy', { amount: 10 })
// this.$store.commit({ type: 'incrementBy', amount: 10 })
// this.$store.dispatch('increment')
// this.$store.dispatch({ type: 'incrementAsync', amount: 10 })
```

1. mapState 生成计算属性： `computed: mapState({ count: state => state.count, ... })`

计算属性于state名称相同时，可以传字符串数组： `computed: mapState(['count', ...])`
与本地计算属性混用： `computed: { 本地计算属性, ...mapState(['count', ...]) }`

2. mapGetters 映射 getter 到局部计算属性： `computed: { ...mapGetters(['doneTodosCount', ...])}`

指定名称映射： `mapGetters({ doneCount: 'doneTodosCount' })`

3. mapMutations 映射 mutations 到方法： `methods: { ...mapMutations(['increment']), ... }`

4. mapActions 映射 actions 到方法： `methods: { ...mapActions(['increment']), ... }`

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

登录状态管理

```js
// /src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let isLogin = false;
if(window.localStorage){
  isLogin = window.localStorage.getItem('IsLogin')=='true';
}
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isLogin: isLogin
  },
  getters:{
    isLogin: state => state.isLogin
  },
  mutations: {
    userStatus(state, flag){
      state.isLogin = flag
    },
    logout(state){
      state.isLogin = false;
      localStorage.removeItem('IsLogin');
    }
  },
  actions: {
    userLogin({commit}, flag){
      commit('userStatus', flag)
    }
  },
  modules: {
  }
})
```

```js
// /src/App.vue
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',
  computed:{
    ...mapState(['isLogin'])
  },
  methods: {
    login() {
      this.$store.dispatch('userLogin',true);
    }
  }
  mounted(){
    console.log(this.isLogin ? '已登录' : '未登录')
  }
}
```

# 路由

https://router.vuejs.org/zh/

安装

```sh
npm install vue-router
```

使用

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

## 快速

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

## 动态路由

```js
const User = {
  template: '<div>User</div>'
}
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

## 导航守卫

```js
const router = new VueRouter({ ... })
//  全局前置守卫
router.beforeEach((to, from, next) => {
  // ...
  next()
})
// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // ...
  next()
})
// 全局后置钩子
router.afterEach((to, from) => {
  // ...
  
})
```

流程

- 导航被触发。
- 在失活的组件里调用离开守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

# 国际化

https://www.npmjs.com/package/vue-i18n

安装

```sh
npm install vue-i18n
```

装载 

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
```

## 使用

```js
// /src/js/langs.js
export default {
    en: {
      Home: 'Home',
    },
    zh: {
      Home: '主页',
    }
  }
```

```js
// /src/main.js
import VueI18n from 'vue-i18n'
import messages from './js/langs'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages,
  silentTranslationWarn: true,
})
new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
```

```js
// /src/App.vue
<template>
  <div id="app">
      <p>{{$t('Home')}}</p>
  </div>
</template>
```
