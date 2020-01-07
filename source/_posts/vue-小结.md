---
title: vue-小结
date: 2020-01-06 09:33:59
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

- `{`{ 变量 }`}` 声明式渲染
- `<p v-bind:属性="变量"></p>` 绑定变量到属性
- `<p v-if="变量"></p>` 条件渲染
- `<p v-for="项 in 变量"></p>` 数组循环渲染
- `<a v-on:事件="方法"></a>` 方法绑定到事件
- `< input v-model="变量">` 模型双向绑定
- ``

## 组件

### 自定义组件

```js
Vue.component('todo-item', {
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
        ]
    }
})
```

```html
<div id="app">
    <ol>
        <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id"></todo-item>
    </ol>
</div>
```

# vuex

# 国际化