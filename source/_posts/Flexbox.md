---
title: Flexbox
date: 2019-12-01 00:05:01
tags:
- css
---


布局中的项目可以增长和缩小。可以将空间分配给项目本身，或者在项目之间或周围分配空间。
采用 flex 布局的元素，称为 flex 容器(flex container)， flex 容器所有的子元素自动成为容器成员。

<!-- more -->

# Flexbox 布局 (Flexible Box Layout)

默认存在两根轴：水平的主轴(main-axis)和垂直的交叉轴(cross-axis)。

![flex](https://www.w3.org/TR/css-flexbox-1/images/flex-direction-terms.svg)

- 元素默认沿主轴排列；
- 主轴的开始位置(与边框的交叉点)叫做 main-start ，结束位置叫做 main end；
- 交叉轴的开始位置叫做 cross-start ，结束位置叫做 cross-end；
- 单个项目占据的主轴空间叫做 main-size ，占据的交叉轴空间叫做 cross-size 。

Flexbox 可以对齐主轴或横轴上的项目，从而提供对一组项目的大小和对齐的高级控制，大多数场景下，使用 flex-direction、align-items 和 justify-content 三个样式属性就已经能满足大多数布局需求，换而言之如果熟悉 Flexbox 就可以应对大多数场景下的布局需求。

设为 Flex 布局以后，子元素的 float 、 clear 和 vertical-align 属性将失效。


## Flex Container 属性

在规范中， Flex Container 上，一共有七个属性可以设置，但是 flex-flow 在 React Native 上是不支持的。

### `flex-direction`

属性指定了flex 元素是如何在 flex 容器中布局的，定义了主轴的方向(正方向或反方向)。

支持的值：

- `row`: flex 容器的主轴被定义为与文本方向相同。 主轴起点和主轴终点与内容方向相同。
- `row-reverse`: 表现和 row 相同，但是置换了主轴起点和主轴终点。
- `column`: flex 容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同。
- `column-reverse`: 表现和 column 相同，但是置换了主轴起点和主轴终点。

### `flex-wrap`

指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许控制行的堆叠方向。默认值为 nowrap。

支持的值：

- `nowrap`: 不换行。flex 元素被摆放到到一行，这可能导致溢出 flex 容器。交叉轴的起点会根据 flex-direction 的值相当于 start 或 before。
- `wrap`: flex 元素被打断到多个行中。交叉轴的起点会根据 flex-direction 的值选择等于start 或before。交叉轴的终点为确定的交叉轴的起点的另一端。
- `wrap-reverse`: 和 wrap 的行为一样，但是交叉轴的起点和交叉轴的终点互换。

### `flex-flow`

属性是 flex-direction 和 flex-wrap 的简写。默认值为 row nowrap。

语法格式

- `<'flex-direction'> || <'flex-wrap'>`

### `align-items`

属性将所有直接子节点上的 align-self 值设置为一个组。 align-self 属性设置项目在其包含块中在交叉轴方向上的对齐方式。默认值为 stretch。

| 值 | 意义 |
| -- | ---- |
| stretch | flex 元素在交叉轴方向拉伸到与容器相同的高度或宽度（flex 元素不能固定尺寸） |
| flex-start | 交叉轴的起点对齐 |
| flex-end | 交叉轴的终点对齐 |
| center | 交叉轴的中点对齐 |
| baseline | 元素第一行文字的基线对齐 |

### `align-content`

属性设置了如何沿着 flex 容器的交叉轴和在 flex 元素之间和周围分配空间。默认值为 stretch。

该属性对单行弹性盒子模型无效。（即：带有 flex-wrap: nowrap 的 flex 容器）。

| 值 | 意义 |
| -- | ---- |
| stretch | 拉伸所有 flex 元素来填满剩余空间。剩余空间平均的分配给每一个 flex 元素 |
| flex-start | 所有 flex 元素从垂直轴起点开始填充。第一个 flex 元素的垂直轴起点边和 flex 容器的垂直轴起点边对齐。接下来的每一个 flex 元素紧跟前一个 flex 元素。 |
| flex-end | 所有 flex 元素从垂直轴末尾开始填充。最后一个 flex 元素的垂直轴终点和容器的垂直轴终点对齐。同时所有后续 flex 元素与前一个对齐。 |
| center | 所有 flex 元素朝向容器的中心填充。每 flex 元素互相紧挨，相对于容器居中对齐。容器的垂直轴起点边和第一个 flex 元素的距离相等于容器的垂直轴终点边和最后一个 flex 元素的距离。 |
| space-between | 所有 flex 元素在容器中平均分布。相邻两 flex 元素间距相等。容器的垂直轴起点边和终点边分别与第一个 flex 元素和最后一个 flex 元素的边对齐。 |
| space-around | 所有 flex 元素在 flex 容器中平均分布，相邻两 flex 元素间距相等。容器的垂直轴起点边和终点边分别与第一个 flex 元素和最后一个 flex 元素的距离是相邻两 flex 元素间距的一半。 |
| space-evenly | flex 元素都沿着主轴均匀分布在指定的 flex 元素中。相邻 flex 元素之间的间距，主轴起始位置到第一个 flex 元素的间距,，主轴结束位置到最后一个 flex 元素的间距，都完全一样。 |

### justify-content

justify-content 属性定义了浏览器如何分配顺着 flex 容器主轴的 flex 元素之间及其周围的空间。

| 值 | 意义 |
| -- | ---- |
| flex-start | 从行首开始排列。每行第一个 flex 元素与行首对齐，同时所有后续的 flex 元素与前一个对齐。 |
| flex-end | 从行尾开始排列。每行最后一个 flex 元素与行尾对齐，其他元素将与后一个对齐。 |
| center | 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。 |
| space-between | 在每行上均匀分配 flex 元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。 |
| space-around | 在每行上均匀分配 flex 元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。 |
| space-evenly | flex 元素都沿着主轴均匀分布在指定的 flex 元素中。相邻 flex 元素之间的间距，主轴起始位置到第一个 flex 元素的间距,，主轴结束位置到最后一个 flex 元素的间距，都完全一样。 |

### place-content

place-content 属性是 align-content 和 justify-content 的简写。

语法格式

- `<'align-content'> <'justify-content'>?`

- 如果第二个值不存在，且第一个值适用于用于两者，则第二个值复用第一个
- 如果第二个值不存在，且第一个值不适用于用于两者，则整个值无效

## Flex Item 属性

在 Flex Item 上，同样也有六个属性，而 order 属性在 React Native 上不支持。

### order

order 属性规定了 flex 容器中的 flex 元素在布局时的顺序。flex 元素按照 order 属性的值的增序进行布局。拥有相同 order 属性值的 flex 元素按照它们在源代码中出现的顺序进行布局。默认值为 0。

语法格式

- `<integer>`

### flex-grow

flex-grow 属性定义 flex 元素的拉伸因子。

语法格式

- `<number> | inherit`

### flex-shrink

flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。默认值为 1。

语法格式

- `<number> | inherit`

### flex-basis

flex-basis 指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。

    注意：如果一个 flex 元素同时设置了 flex-basis (auto 除外)和 width (或者 flex-direction: column 时设置了 height )，flex-basis 权级更高。

语法规范

- `content | <'width'>`

- `<’width’>`

    - width 值可以是 `<length>`;
    - 该值也可以是一个相对于其父弹性盒容器主轴尺寸的百分数 。
    - 负值是不被允许的。
    - 默认为 0。

- content

    - 基于 flex 元素的内容自动调整大小。

### flex

flex 规定了 flex 元素如何伸长或缩短以适应 flex 容器中的可用空间。这是一个简写属性，用来设置 flex-grow, flex-shrink 与 flex-basis。

语法格式

- `none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`

- initial

    - 元素会根据自身宽高设置尺寸。
    - 它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器 。
    - 相当于将属性设置为”flex: 0 1 auto”。

- auto

    - 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。
    - 这相当于将属性设置为 “flex: 1 1 auto”。

- none

    - 元素会根据自身宽高来设置尺寸。
    - 它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。
    - 相当于将属性设置为”flex: 0 0 auto”。

### align-self

align-self 会对齐当前 flex 行中的 flex 元素，并覆盖 align-items 的值. 如果任何 flex 元素的侧轴方向 margin 值设置为 auto，则会忽略 align-self。

语法格式

- `auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>`
- `where `
- `<baseline-position> = [ first | last ]? baseline`
- `<overflow-position> = unsafe | safe`
- `<self-position> = center | start | end | self-start | self-end | flex-start | flex-end`

## 组件化开发

不同的平台如 Web、React-Native、微信小程序等各有特色，平台之间的差异很大，会导致很多额外的开发成本。那么如果我们想要完成一个跨平台项目该怎么做呢？

我们开始从比较容易入手的方向考虑，如果采用模块化组件或是 css-in-js 的方案去完成样式的构建会是一个好的方案么？

在目前的前端生态中，模块化组件开发会是个很棒的方案，覆盖模式下构建开箱即用的组件同时可以提供方法来覆盖样式再好不过了，但是如果放到小程序开发的模式中，这就会有个很严重的问题，那就是如果我们在层级样式表中写到的样式，是不能直接传给组件来覆盖样式的，组件和组件的隔离在不同小程序中很难被打破。

```js
/* CustomComp.js */
export default class CustomComp extends Component {
  static defaultProps = {
    className: ''
  }
  render () {
    return <View className={this.props.className}>这段文本的颜色不会由组件外的 class 决定</View>
  }
}

/* MyPage.js */
export default class MyPage extends Component {
  render () {
    return <CustomComp className="red-text" />
  }
}
```

```css
/* MyPage.scss */
.red-text {
  color: red;
}
```

如果大家尝试上述的写法，会发现 red-text 类中的样式并没有生效，那么在这种情况下我们如果考虑是使用 css-in-js 会好么？很遗憾，如果你使用它，我们将不会为这些需要运行时处理的样式补全前缀。

这两个方案都不是合适的方案，那么我们该怎么做呢？试着去打破小程序的组件限制么？我们在微信小程序官方的文档中找到 externalClasses 这个方法，可以先来尝试。

```js
/* CustomComp.js */
export default class CustomComp extends Component {
  static externalClasses = ['my-class']
  render () {
    return <View className="my-class">这段文本的颜色由组件外的 class 决定</View>
  }
}

/* MyPage.js */
export default class MyPage extends Component {
  render () {
    return <CustomComp className="red-text" />
  }
}
```

```css
/* MyPage.scss */
.red-text {
  color: red;
}
```

但是这也并非所有的开发平台都能够提供给开发者相关的方法，所以我们只能转换目光到另一个 addGlobalClass 方法上，这个方法不仅在所有小程序都能够支持，Taro 在 React Native 端上也提供了同样的方法给大家，这样我们也可以避开 css modules 这个体验稍差的方法。

```js
/* CustomComp.js */
export default class CustomComp extends Component {
  static options = {
    addGlobalClass: true
  }
  render () {
    return <View className="red-text">这段文本的颜色由组件外的 class 决定</View>
  }
}
```

```css
/* 组件外的样式定义 */
.red-text {
  color: red;
}
```
