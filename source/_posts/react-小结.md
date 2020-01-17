---
title: react-小结
date: 2019-12-01 00:46:00
tags: 
- react
- javascript
---

源码： https://github.com/jinven/react-app
演示： https://react-new.now.sh

<!-- more -->

# 搭建

单页引用： [Create React App](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)
服务端渲染： [Next.js](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#nextjs)
静态网站： [Gatsby](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#gatsby)

## 使用构建工具

```sh
npx create-react-app react-app
cd my-app
npm start
```

## HTML快速使用

```html
<div id="root"></div>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<!-- <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script> -->
```

直接使用

```js
const domContainer = document.querySelector('#root');
function Button(props) {
  const [like, setLike] = React.useState(false)
  return React.createElement('button', { 
  onClick: a => setLike(!like) 
  }, `${props.txt}: ${like}`)
}
const e = React.createElement
ReactDOM.render(e(Button, { txt: 'like' }, null), domContainer)
```

使用 `JSX`

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

```js
class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = { like: false }
  }
  likeClick = () => {
    this.setState(state => ({
      like: !state.like
    }))
  }
  render() {
    const like = this.state.like
    return (<button onClick={this.likeClick}>like: { like.toString() }</button>)
  }
}
ReactDOM.render(<Button />, document.getElementById('root') )
```

# 使用

## JSX 

JSX 在线编译器： https://babeljs.io/

建议将内容包裹在括号中，避免[自动插入分号](http://stackoverflow.com/q/2846283)陷阱

- 大写字母开头
- React 必须在作用域内，`import React from 'react'`
- Props 默认值为 true，`<TextBox autocomplete />` 等于 `<TextBox autocomplete={true} />`
- 布尔类型、Null 以及 Undefined 将会忽略
- 属性展开，`<Greeting {...props} />`
- 函数作为子元素，`<Repeat numTimes={10}>{(index) => <div key={index}>item {index}</div>}</Repeat>`

```jsx
const name = 'Josh Perez';
const avatarUrl = 'https://zh-hans.reactjs.org/logo-180x180.png';
const element = (<h1>Hello, {name}</h1>);
const element = <img src={avatarUrl}></img>;
```

## 样式

```jsx
import '../assets/css/h1.css'
const h1Style = {
  fontSize: 20,
  margin: 0,
  background: '#eee'
}
<h1 className="head"></h1>
<h1 style={{fontSize: 20, margin: 0}}>h1</h1>
<h1 style={h1Style}>h1</h1>
<div>
  <p>plain text</p>
  <style>{`
    p {
      font-size: 20px;
    }
  `}</style>
</div>
```

### Styled

https://www.styled-components.com/
https://github.com/styled-components/styled-components

```
npm install --save styled-components
```

```jsx
import styled from 'styled-components';
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: palevioletred;
  `}
`
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`
render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>
    <Button as={Link} href="/docs" prefetch>
      Documentation
    </Button>
    <Wrapper>
      <Title>Hello World!</Title>
    </Wrapper>
  </div>
)
```

### 局部样式

只在本组件中使用

`css`或`scss`命名以 `.module.css`、`.module.scss` 结尾

```jsx
import styleScss from '../assets/css/head.module.scss'
import styleCss from '../assets/css/head.module.css'
<h1 className="head"></h1>
```


## 元素渲染

```jsx
<div id="root"></div>
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

```jsx
function tick() {
  const element = (
    <div>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);
```

## 组件和Props

函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

class 组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

props

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
```

空元素，一个组件必须由一个元素包含多个元素，可使用 `<>` 提升子级元素

```jsx
function LI(){
  return (
    <>
      <li>item</li>
    </>
  )
}
ReactDOM.render(<ul><LI /></ul>, document.getElementById('root'));
```

默认 props

```js
class App extends React.Component {
  static defaultProps = {
    name: 'react'
  }
  render() {
    return (
      <div>{this.props.name}: {this.props.age}</div>
    )
  }
}
App.defaultProps = {
  age: 20
}
```

## State和生命周期

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({ date: new Date() });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(<Clock />, document.getElementById('root'));
```

## 事件处理

命名采用小驼峰式（camelCase）

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>Click me</a>
  );
}
```

class 中

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true, isToggle2On: true, isToggle3On: true};
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
    // handle2Click 使用箭头函数，不需要绑定
    // handle3Click 使用原型调用，不需要绑定
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  handle2Click = () => {
    this.setState(state => ({
      isToggle2On: !state.isToggle2On
    }))
  }
  handle3Click() {
    this.setState(state => ({
      isToggle3On: !state.isToggle2On
    }))
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        <button onClick={this.handle2Click}>{this.state.isToggle2On ? 'ON' : 'OFF'}</button>
        <button onClick={(e) => this.handle3Click(e)}>{this.state.isToggle3On ? 'ON' : 'OFF'}</button>
      </div>
    );
  }
}
ReactDOM.render(<Toggle />, document.getElementById('root'));
```

## 条件渲染

```jsx
// 
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
// 元素变量
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
// 与运算符 &&、三目运算符
function Mailbox(props) {
  const isLoggedIn = this.state.isLoggedIn;
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      <p>The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.</p>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

## 列表与Key

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('root'));
```

必须包括key

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (<ul>{listItems}</ul>);
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers} />, document.getElementById('root'));
```

## 表单

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  handleSubmit = (event) => {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

## 状态提升

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
  }
  handleCelsiusChange = (temperature) => {
    this.setState({scale: 'c', temperature});
  }
  handleFahrenheitChange = (temperature) => {
    this.setState({scale: 'f', temperature});
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

## 组合 vs 继承

子组件传递

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

props传递

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}
function App() {
  return (
    <SplitPane left={ <Contacts /> } right={ <Chat /> } />
  );
}
```

特例关系

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}
function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  );
}
```

## Context

无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

- 在 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的
- 这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题）
- 这些属性是应用程序中许多组件都需要的

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据

例如当前认证的用户、主题或首选语言

主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。


```jsx
// Context 可以无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```


## 错误边界

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // 可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // 可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}
```

## Refs 转发

https://zh-hans.reactjs.org/docs/refs-and-the-dom.html

将 ref 自动地通过组件传递到其一子组件的技巧
允许访问 DOM 节点或在 render 方法中创建的 React 元素

适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
// 可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

## Fragments

```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

## 高阶组件（HOC）

高阶组件是参数为组件，返回值为新组件的函数
例如 `Redux` 的 `connect` 和 `Relay` 的 `createFragmentContainer`

`const EnhancedComponent = higherOrderComponent(WrappedComponent);`

- 不要改变原始组件。使用组合。
- 不要在 render 方法中使用 HOC
- 务必复制静态方法
- Refs 不会被传递

HOC 不会修改传入的组件，也不会使用继承来复制其行为。
HOC 通过将组件包装在容器组件中来组成新组件，是纯函数，没有副作用。

```jsx
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }
    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }
    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
class CommentList extends React.Component {
  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
class BlogPost extends React.Component {
  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments());
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id));
```

## 与第三方库协同

如： jQuery 和 Backbone 进行整合

使用 ref 取得 DOM 元素

```jsx
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.somePlugin();
  }
  componentWillUnmount() {
    this.$el.somePlugin('destroy');
  }
  render() {
    return <div ref={el => this.el = el} />;
  }
}
```

## Portals

将子节点渲染到存在于父组件以外的 DOM 节点的方案

`ReactDOM.createPortal(child, container)`

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

```jsx
// 在 DOM 中有两个容器是兄弟级 （siblings）
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    // 在 Modal 的所有子元素被挂载后，
    // 这个 portal 元素会被嵌入到 DOM 树中，
    // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
    // 如果要求子组件在挂载时可以立刻接入 DOM 树，
    // 例如衡量一个 DOM 节点，
    // 或者在后代节点中使用 ‘autoFocus’，
    // 则需添加 state 到 Modal 中，
    // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // 当子元素里的按钮被点击时，
    // 这个将会被触发更新父元素的 state，
    // 即使这个按钮在 DOM 中不是直接关联的后代
    this.setState(state => ({ clicks: state.clicks + 1 }));
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}
function Child() {
  // 这个按钮的点击事件会冒泡到父元素
  // 因为这里没有定义 'onClick' 属性
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}
ReactDOM.render(<Parent />, appRoot);
```

## Profiler API

测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”

```jsx
function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Profiler id="Main" onRender={callback}>
      <Main {...props} />
    </Profiler>
  </App>
);
render(
  <App>
    <Profiler id="Panel" onRender={callback}>
      <Panel {...props}>
        <Profiler id="Content" onRender={callback}>
          <Content {...props} />
        </Profiler>
        <Profiler id="PreviewPane" onRender={callback}>
          <PreviewPane {...props} />
        </Profiler>
      </Panel>
    </Profiler>
  </App>
);
```

## Render Props

在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

```jsx
<DataProvider render={data => (<h1>Hello {data.target}</h1>)}/>
```

使用 render prop 的库有 

- [React Router](https://reacttraining.com/react-router/web/api/Route/render-func)
- [Downshift](https://github.com/paypal/downshift)
- [Formik](https://github.com/jaredpalmer/formik)

```jsx
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  }
  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (<Cat mouse={mouse} />)}/>
      </div>
    );
  }
}
```

## 严格模式

StrictMode 是一个用来突出显示应用程序中潜在问题的工具
严格模式检查仅在开发模式下运行；它们不会影响生产构建

- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

```js
import React from 'react';
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

## PropTypes类型检查

```jsx
import PropTypes from 'prop-types';
MyComponent.propTypes = {
  // 可以将属性声明为 JS 原生类型，默认情况下这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  // 任何可被渲染的元素（包括数字、字符串、元素或数组）(或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,
  // 一个 React 元素。
  optionalElement: PropTypes.element,
  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,
  // 可以声明 prop 为类的实例，这里使用JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),
  // 可以让 prop 只能是特定的值，指定它为枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),
  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),
  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   
  // 可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,
  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,
  // 可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },
  // 可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

```jsx
import PropTypes from 'prop-types';
class Greeting extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
Greeting.propTypes = {
  name: PropTypes.string,
  children: PropTypes.element.isRequired
};
// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};
```

## Web Components

- Web Components 为可复用组件提供了强大的封装
- React 则提供了声明式的解决方案，使 DOM 与数据保持同步

```jsx
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

```jsx
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

# Hook

在不编写 class 的情况下使用 state 以及其他的 React 特性

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 的 exhaustive-deps 规则


## useState

`const [state, setState] = useState(initialState);`

setState 函数用于更新 state： `setState(newState);`

```jsx
import React, { useState } from 'react';
function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果

```jsx
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});
```

惰性初始 state，initialState 参数只会在组件的初始渲染中起作用

```jsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

```

## useEffect

跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途

- 会在每次渲染后都执行
- 可以使用多个 effect
- 可以通过返回一个函数来指定如何“清除”副作用

```jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

清除副作用

```jsx
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

第二个可选参数判断某些特定值在两次重渲染之间没有发生变化

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

想执行只运行一次的 effect，可以传递一个空数组（[]）作为第二个参数


## useContext

`const value = useContext(MyContext);`

- useContext 的参数必须是 context 对象本身
- 会在 context 值变化时重新渲染，可以[通过使用 memoization 来优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

```jsx
const themes = {
  light: { foreground: "#000000", background: "#eeeeee" },
  dark: { foreground: "#ffffff", background: "#222222" }
};
const ThemeContext = React.createContext(themes.light);
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## 自定义 Hook

自定义名称为 useFriendStatus 的 Hook

```jsx
import React, { useState, useEffect } from 'react';
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });
  return isOnline;
}
```

使用

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);
  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

## useReducer

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

useState 的替代方案

state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等，会比 useState 更适用

```jsx
const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return {count: state.count + 1};
    case 'decrement': return {count: state.count - 1};
    default: throw new Error();
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

- 指定初始 state： 作为第二个参数传入
- 惰性初始化： 将 init 函数作为 useReducer 的第三个参数传入

```jsx
function init(initialCount) {
  return {count: initialCount};
}
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return {count: state.count + 1};
    case 'decrement': return {count: state.count - 1};
    case 'reset': return init(action.payload);
    default: throw new Error();
  }
}
function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## useCallback

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数

回调函数仅在某个依赖项改变时才会更新

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

- 依赖项数组不会作为参数传给回调函数。

## useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个 `memoized` 值

仅会在某个依赖项改变时才重新计算 `memoized` 值

有助于避免在每次渲染时都进行高开销的计算

- 不要在这个函数内部执行与渲染无关的操作
- 可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证

## useRef

```jsx
const refContainer = useRef(initialValue);
```

返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）

返回的 ref 对象在组件的整个生命周期内保持不变

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

`useRef` 就像是可以在其 `.current` 属性中保存一个可变值的“盒子”

## useImperativeHandle

```jsx
useImperativeHandle(ref, createHandle, [deps])
```

在使用 ref 时自定义暴露给父组件的实例值

useImperativeHandle 应当与 forwardRef 一起使用

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

## useLayoutEffect

其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect

可以使用它来读取 DOM 布局并同步触发重渲染。

在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

## useDebugValue

`useDebugValue(value)`

可用于在 React 开发者工具中显示自定义 hook 的标签

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

# 测试

- 渲染组件树： 在一个简化的测试环境中渲染组件树并对它们的输出做断言检查。
- 运行完整应用： 在一个真实的浏览器环境中运行整个应用（也被称为“端到端（end-to-end）”测试）。

## 推荐的工具

- [Jest](https://facebook.github.io/jest/) 是一个 JavaScript 测试运行器。

- [React 测试库](https://testing-library.com/react) 是一组能让你不依赖 React 组件具体实现对他们进行测试的辅助工具。

## 测试运行器

使用 [Jest](https://jestjs.io/)，[mocha](https://mochajs.org/)，[ava](https://github.com/avajs/ava) 等测试运行器能像编写 JavaScript 一样编写测试套件，并将其作为开发过程的环节运行

- Jest 与 React 项目广泛兼容，支持诸如模拟 模块、计时器 和 jsdom 等特性。已经能够开箱即用且包含许多实用的默认配置。
- mocha 在真实浏览器环境下运行良好，并且可以为明确需要它的测试提供帮助。
- 端对端测试用于测试跨多个页面的长流程，并且需要不同的设置。

## Jest

### 创建/清理

``` jsx
import { unmountComponentAtNode } from "react-dom";
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
```

### act()

在编写 UI 测试时，可以将渲染、用户事件或数据获取等任务视为与用户界面交互的“单元”。

确保在进行任何断言之前，与这些“单元”相关的所有更新都已处理并应用于 DOM

```jsx
act(() => {
  // 渲染组件
});
// 进行断言
```

### 渲染

组件

```jsx
// hello.js
import React from "react";
export default function Hello(props) {
  if (props.name) {
    return <h1>你好，{props.name}！</h1>;
  } else {
    return <span>嘿，陌生人</span>;
  }
}
```

测试

```jsx
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hello from "./hello";
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("渲染有或无名称", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("嘿，陌生人");

  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("你好，Jenny！");

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("你好，Margaret！");
});
```

### 数据获取

可以使用假数据来 mock 请求，而不是在所有测试中调用真正的 API

```jsx
// user.js
import React, { useState, useEffect } from "react";
export default function User(props) {
  const [user, setUser] = useState(null);
  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }
  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);
  if (!user) {
    return "加载中...";
  }
  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> 岁
      <br />
      住在 {user.address}
    </details>
  );
}
```

```jsx
// user.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("渲染用户数据", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );
  // 使用异步的 act 应用执行成功的 promise
  await act(async () => {
    render(<User id="123" />, container);
  });
  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);
  // 清理 mock 以确保测试完全隔离
  global.fetch.mockRestore();
});
```

### mock 模块

有些模块可能在测试环境中不能很好地工作，或者对测试本身不是很重要

```jsx
// map.js
import React from "react";
import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap id="example-map" center={props.center} />
    </LoadScript>
  );
}

// contact.js
import React from "react";
import Map from "./map";
function Contact(props) {
  return (
    <div>
      <address>
        联系 {props.name}，通过{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          email
        </a>
        或者他们的 <a data-testid="site" href={props.site}>
          网站
        </a>。
      </address>
      <Map center={props.center} />
    </div>
  );
}
```

```jsx
// contact.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Contact from "./contact";
import MockedMap from "./map";
jest.mock("./map", () => {
  return function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  };
});
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("应渲染联系信息", () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact name="Joni Baez" email="test@example.com" site="http://test.com" center={center} />,
      container
    );
  });
  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");
  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");
  expect(container.querySelector('[data-testid="map"]').textContent).toEqual("0:0");
});
```

### Events

建议在 DOM 元素上触发真正的 DOM 事件，然后对结果进行断言

```jsx
// toggle.js
import React, { useState } from "react";
export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }} data-testid="toggle">
      {state === true ? "Turn off" : "Turn on"}
    </button>
  );
}
```

```js
// toggle.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Toggle from "./toggle";
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  // container *必须* 附加到 document，事件才能正常工作。
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("点击时更新值", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });
  // 获取按钮元素，并触发点击事件
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Turn off");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Turn on");
  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });
  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Turn on");
});
```

### 计时器

```jsx
// card.js
import React, { useEffect } from "react";
export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);
  return [1, 2, 3, 4].map(choice => (
    <button key={choice} data-testid={choice} onClick={() => props.onSelect(choice)}>
      {choice}
    </button>
  ));
}
```

```jsx
// card.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
jest.useFakeTimers();
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("超时后应选择 null", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  // 提前 100 毫秒执行
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();
  // 然后提前 5 秒执行
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});
it("移除时应进行清理", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();
  // 卸载应用程序
  act(() => {
    render(null, container);
  });
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});
it("应接受选择", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  act(() => {
    container.querySelector("[data-testid=2]").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onSelect).toHaveBeenCalledWith(2);
});
```

### 快照测试

```jsx
// hello.test.js, again
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import Hello from "./hello";
let container = null;
beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("应渲染问候语", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... 由 jest 自动填充 ... */

  act(() => {
    render(<Hello name="Jenny" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... 由 jest 自动填充 ... */

  act(() => {
    render(<Hello name="Margaret" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... 由 jest 自动填充 ... */
});
```

### 多渲染器

```jsx
import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
// ...
let root;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});
expect(root).toMatchSnapshot();
```

# redux

https://cn.redux.js.org/

## 安装

```sh
npm install --save react-redux
npm install --save-dev redux-devtools
```

- state
- getState
- dispatch
- subscribe(listener)
- unsubscribe

## 使用

- 永远不要直接修改 reducer 的参数

```jsx
return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
```

1. 创建  `reducer` 函数

```jsx
// /src/reducers/index.js
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
```

2. 装载

```jsx
// /src/index.js
import { createStore } from 'redux'
import counter from './reducers'
const store = createStore(counter)
const render = () => ReactDOM.render(
    <App 
      value={store.getState()} 
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />, 
    document.getElementById('root')
);
render()
const unsubscribe = store.subscribe(render)
// unsubscribe() // 停止监听 state 更新
```

3. 操作

```jsx
// /src/App.js
import Redux from './components/Redux'
class App extends React.Component {
  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <div id="app">
        <Redux value={value} onIncrement={onIncrement} onDecrement={onDecrement} />
      </div>
    )
  }
}

// /src/components/Redux.js
export default function Redux(props) {
  const { value, onIncrement, onDecrement } = props
  return (
    <div>
      <span>{value}</span>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>+</button>
    </div>
  )
}
```

## createStore

Redux 应用只有一个单一的 store

当需要拆分数据处理逻辑时，应该使用 reducer 组合 而不是创建多个 store

源码

```jsx
export default function createStore(reducer, preloadedState, enhancer) {
  if ((typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error('not supported.')
  }
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, preloadedState)
  }
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }
  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error('reducer is executing. ')
    }
    return currentState
  }
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }
    if (isDispatching) {
      throw new Error('reducer is executing. ')
    }
    let isSubscribed = true
    ensureCanMutateNextListeners()
    nextListeners.push(listener)
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      if (isDispatching) {
        throw new Error('reducer is executing. ')
      }
      isSubscribed = false
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ')
    }
    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ')
    }
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    return action
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }
  function observable() {
    const outerSubscribe = subscribe
    return {
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }
        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },
      [$$observable]() {
        return this
      }
    }
  }
  dispatch({ type: ActionTypes.INIT })
  return { dispatch, subscribe, getState, replaceReducer, [$$observable]: observable }
}
```

## combineReducers

生成一个函数，来调用一系列 reducer

每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理

然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象


```jsx
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO: return ...
    case TOGGLE_TODO: return ...
    default: return ...
  }
}
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: return ...
    default: return ...
  }
}
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

重构

```jsx
import { combineReducers } from 'redux'
export default combineReducers({
  visibilityFilter,
  todos
})
```

等价于

```jsx
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

源码

```jsx
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)
  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }
  let shapeAssertionError
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }
    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}
```

## applyMiddleware

7个示例

```jsx
// 1. 记录所有被发起的 action 以及产生的新的 state。
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}
// 2. 在 state 更新完成和 listener 被通知之后发送崩溃报告。
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, { extra: { action, state: store.getState() } })
    throw err
  }
}

// 3. 用 { meta: { delay: N } } 来让 action 延迟 N 毫秒。
// 让 `dispatch` 返回一个取消 timeout 的函数。
const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action)
  }
  let timeoutId = setTimeout(() => next(action), action.meta.delay)
  return function cancel() {
    clearTimeout(timeoutId)
  }
}

// 4. 通过 { meta: { raf: true } } 让 action 在一个 rAF 循环帧中被发起。
// 让 `dispatch` 返回一个从队列中移除该 action 的函数。
const rafScheduler = store => next => {
  let queuedActions = []
  let frame = null
  function loop() {
    frame = null
    try {
      if (queuedActions.length) {
        next(queuedActions.shift())
      }
    } finally {
      maybeRaf()
    }
  }
  function maybeRaf() {
    if (queuedActions.length && !frame) {
      frame = requestAnimationFrame(loop)
    }
  }
  return action => {
    if (!action.meta || !action.meta.raf) {
      return next(action)
    }
    queuedActions.push(action)
    maybeRaf()
    return function cancel() {
      queuedActions = queuedActions.filter(a => a !== action)
    }
  }
}
// 5. 使你除了 action 之外还可以发起 promise。
// 如果这个 promise 被 resolved，他的结果将被作为 action 发起。
// 这个 promise 会被 `dispatch` 返回，因此调用者可以处理 rejection。
const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action)
  }
  return Promise.resolve(action).then(store.dispatch)
}

// 6. 让你可以发起带有一个 { promise } 属性的特殊 action。
// 这个 middleware 会在开始时发起一个 action，并在这个 `promise` resolve 时发起另一个成功（或失败）的 action。
// 为了方便起见，`dispatch` 会返回这个 promise 让调用者可以等待。
const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }
  function makeAction(ready, data) {
    let newAction = Object.assign({}, action, { ready }, data)
    delete newAction.promise
    return newAction
  }
  next(makeAction(false))
  return action.promise.then(
    result => next(makeAction(true, { result })),
    error => next(makeAction(true, { error }))
  )
}

// 7. 可以发起一个函数来替代 action。
// 这个函数接收 `dispatch` 和 `getState` 作为参数。
// 对于（根据 `getState()` 的情况）提前退出，或者异步控制流（ `dispatch()` 一些其他东西）来说，这非常有用。
// `dispatch` 会返回被发起函数的返回值。
const thunk = store => next => action =>
  typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)
```

使用

```jsx
import { createStore, combineReducers, applyMiddleware } from 'redux'
let todoApp = combineReducers(reducers)
let store = createStore(
  todoApp,
  applyMiddleware(rafScheduler, timeoutScheduler, thunk, vanillaPromise, readyStatePromise, logger, crashReporter)
)
```

源码

```jsx
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error('Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
      )
    }
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    return { ...store, dispatch }
  }
}
```

## connect

```jsx
// /src/index.js
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// /src/App.js
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
export default function App() {
  return (<div className="App"><AddTodo /><VisibleTodoList /><Footer /></div>);
}
```

```jsx
// /src/reducers/index.js
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
export default combineReducers({ todos, visibilityFilter })

// /src/reducers/todos.js
export default todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: action.id, text: action.text, completed: false } ]
    case 'TOGGLE_TODO':
      return state.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo )
    default:
      return state
  }
}

// /src/reducers/visibilityFilter.js
import { VisibilityFilters } from './actions'
export default visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER': return action.filter
    default: return state
  }
}

// /src/reducers/actions/index.js
let nextTodoId = 0
export const addTodo = text => ({ type: 'ADD_TODO', id: nextTodoId++, text })
export const setVisibilityFilter = filter => ({ type: 'SET_VISIBILITY_FILTER', filter })
export const toggleTodo = id => ({ type: 'TOGGLE_TODO', id })
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
```

```jsx
// /src/containers/AddTodo.js
import { connect } from 'react-redux'
import { addTodo } from '../reducers/actions'
const AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
export default connect()(AddTodo)

// /src/containers/FilterLink.js
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../reducers/actions'
import Link from '../components/Link'
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})
export default connect(mapStateToProps, mapDispatchToProps)(Link)

// /src/containers/VisibleTodoList.js
import { connect } from 'react-redux'
import { toggleTodo } from '../reducers/actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../reducers/actions'
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL: return todos
    case VisibilityFilters.SHOW_COMPLETED: return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE: return todos.filter(t => !t.completed)
    default: throw new Error('Unknown filter: ' + filter)
  }
}
const mapStateToProps = state => ({ todos: getVisibleTodos(state.todos, state.visibilityFilter) })
const mapDispatchToProps = dispatch => ({ toggleTodo: id => dispatch(toggleTodo(id)) })
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```

```jsx
// /src/components/Footer.js
import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../reducers/actions'
export default Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
)

// /src/components/Link.js
import React from 'react'
import PropTypes from 'prop-types'
const Link = ({ active, children, onClick }) => (
  <button onClick={onClick} disabled={active} style={{ marginLeft: '4px' }}>{children}</button>
)
Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}
export default Link

// /src/components/Todo.js
import React from 'react'
import PropTypes from 'prop-types'
const Todo = ({ onClick, completed, text }) => (
  <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</li>
)
Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}
export default Todo

// /src/components/TodoList.js
import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)}/>
    )}
  </ul>
)
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}
export default TodoList
```

## 异步 Action

重点是 `redux-thunk`

```jsx
// /src/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
function posts(state = { isFetching: false, didInvalidate: false, items: [] }, action) {
  switch (action.type) {
    case 'INVALIDATE_SUBREDDIT': return Object.assign({}, state, { didInvalidate: true })
    case 'REQUEST_POSTS': return Object.assign({}, state, { isFetching: true, didInvalidate: false })
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default: return state
  }
}
function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case 'SELECT_SUBREDDIT': return action.subreddit
    default: return state
  }
}
function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case 'INVALIDATE_SUBREDDIT':
    case 'RECEIVE_POSTS':
    case 'REQUEST_POSTS':
      return Object.assign({}, state, { [action.subreddit]: posts(state[action.subreddit], action) })
    default: return state
  }
}
const reducers =  combineReducers({ postsBySubreddit, selectedSubreddit })
const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

// /src/App.js
import { connect } from 'react-redux'
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch({ type: 'REQUEST_POSTS', subreddit })
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch({
        type: 'RECEIVE_POSTS',
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
      }))
  }
}
export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    return dispatch(fetchPosts(subreddit))
  }
}
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded('reactjs'))
  }
  render() {
    return (<div></div>)
  }
}
export default connect()(App)
```

## redux-saga

https://redux-saga.js.org/
https://github.com/redux-saga/redux-saga

是一个 redux 中间件

用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library

目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。

就像是应用程序中一个单独的线程，它独自负责处理副作用

```sh
npm install --save redux-saga
```

示例：同步计数和延时1秒计数

```jsx
import '@babel/polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { put, takeEvery, delay } from 'redux-saga/effects'

const reducer = function(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    default: return state
  }
}
const incrementAsync = function*() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}
const rootSaga = function*() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const Counter = ({ value, onIncrement, onIncrementAsync }) => (
  <p>
    Clicked: {value} times <button onClick={onIncrement}>+</button>{' '}
    <button onClick={onIncrementAsync}>Increment async</button>
  </p>
)
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onIncrementIfOdd: PropTypes.func.isRequired,
}
const action = type => store.dispatch({ type })
function render() {
  ReactDOM.render(
    <Counter value={store.getState()} onIncrement={() => action('INCREMENT')} onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root'),
  )
}
render()
store.subscribe(render)
```

# 路由

https://reacttraining.com/react-router/

## 安装

```sh
npm install react-router-dom
```

## 使用

```jsx
import { BrowserRouter as Router, Switch, Link, Route, useRouteMatch, useParams } from 'react-router-dom'
function Home() { 
  return <h2>Home</h2>
}
function About() { 
  return <h2>About</h2>
}
function Topic() {
  let { topicId } = useParams()
  return <h3>Requested topic ID: {topicId}</h3>
}
function Topics() {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li><Link to={`${match.url}/components`}>Components</Link></li>
        <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}><Topic /></Route>
        <Route path={match.path}><h3>Please select a topic.</h3></Route>
      </Switch>
    </div>
  )
}
export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/topics"><Topics /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  )
}
```

## js跳转

```jsx
// /src/index.js
import { withRouter } from 'react-router';
import { BrowserRouter, Switch, Link, Route, useRouteMatch, useParams, NavLink, Redirect, useHistory } from 'react-router-dom'
function Home(){
  return <h2>Home</h2>
}
function About(){
  return <h2>About</h2>
}
function ContactUs(){
  return <h2>Contact us</h2>
}
export default withRouter(function App(props){
  let history = useHistory()
  let match = useRouteMatch()
  function toAbout(){
    props.history.push(`${match.url}/about`)
  }
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to={`${match.url}/home`}>home</Link></li>
          <li><button onClick={toAbout}>about</button></li>
          <li><button onClick={() => history.push(`${match.url}/contact`)}>contact us</button></li>
        </ul>
        <Switch>
          <Route path={`${match.path}/home`}>
            <Home />
          </Route>
          <Route path={`${match.path}/about`}>
            <About />
          </Route>
          <Route path={`${match.path}/contact`}>
            <ContactUs />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
})
```

示例：点击后5秒内可取消，5秒后加1

```jsx
// /src/index.js
import '@babel/polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { eventChannel, END } from 'redux-saga'
import { take, put, call, fork, race, cancelled } from 'redux-saga/effects'
import PropTypes from 'prop-types'
const INCREMENT = 'INCREMENT'
const INCREMENT_ASYNC = 'INCREMENT_ASYNC'
const CANCEL_INCREMENT_ASYNC = 'CANCEL_INCREMENT_ASYNC'
const COUNTDOWN_TERMINATED = 'COUNTDOWN_TERMINATED'
const countdown = function (state = 0, action) {
  switch (action.type) {
    case INCREMENT_ASYNC: return action.value
    case COUNTDOWN_TERMINATED: 
    case CANCEL_INCREMENT_ASYNC: return 0
    default: return state
  }
}
const counter = function (state = 0, action) {
  switch (action.type) {
    case INCREMENT: return state + 1
    default: return state
  }
}
const countdownAsync = secs => {
  console.log('countdown', secs)
  return eventChannel(listener => {
    const iv = setInterval(() => {
      secs -= 1
      console.log('countdown', secs)
      if (secs > 0) listener(secs)
      else {
        listener(END)
        clearInterval(iv)
        console.log('countdown terminated')
      }
    }, 1000)
    return () => {
      clearInterval(iv)
      console.log('countdown cancelled')
    }
  })
}
const incrementAsync = function* ({ value }) {
  const chan = yield call(countdownAsync, value)
  try {
    while (true) {
      let seconds = yield take(chan)
      yield put({ type: INCREMENT_ASYNC, value: seconds })
    }
  } finally {
    if (!(yield cancelled())) {
      yield put({ type: INCREMENT })
      yield put({ type: COUNTDOWN_TERMINATED })
    }
    chan.close()
  }
}
const watchIncrementAsync = function* () {
  try {
    while (true) {
      const action = yield take(INCREMENT_ASYNC)
      yield race([call(incrementAsync, action), take(CANCEL_INCREMENT_ASYNC)])
    }
  } finally {
    console.log('watchIncrementAsync terminated')
  }
}
const rootSaga = function*() {
  yield fork(watchIncrementAsync)
}
const reducer = combineReducers({ countdown, counter })
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

function CounterComponent({ counter, countdown, dispatch }) {
  const action = (type, value) => () => dispatch({ type, value })
  return (
    <div>
      Clicked: {counter} times <button onClick={action(INCREMENT)}>+</button>{' '}
      <button onClick={countdown ? action(CANCEL_INCREMENT_ASYNC) : action(INCREMENT_ASYNC, 5)}
        style={{ color: countdown ? 'red' : 'black' }}>
        {countdown ? `Cancel increment (${countdown})` : 'increment after 5s'}
      </button>
    </div>
  )
}
CounterComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  countdown: PropTypes.number.isRequired,
}
const Counter = connect((state) => ({counter: state.counter, countdown: state.countdown}))(CounterComponent)
render(<Provider store={store}><Counter /></Provider>, document.getElementById('root'))
```

## 关键点

- NavLink 当前页面启用指定样式
- Redirect 重定向
- useHistory
- useParams
- useLocation
- useRouteMatch
- HashRouter
- StaticRouter
- matchPath 
- withRouter
- Switch
- MemoryRouter
- Route render, children, component

# 国际化

https://github.com/formatjs/react-intl

```sh
npm install --save react-intl
```

```jsx
// /src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {IntlProvider} from 'react-intl'
import App from './App'
const langs = (state = 'zh', action) => {
  switch(action.type){
    case 'zh': return 'zh'
    case 'en': return 'en'
    default: return state || 'zh'
  }
}
let messages = {}
messages['en'] = { home: 'Home', about: 'About', contact: 'Contact' }
messages['zh'] = { home: '主页', about: '关于', contact: '联系' }
const storeLangs = createStore(langs);
function render() {
  const lang = storeLangs.getState();
  ReactDOM.render(
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Provider store={storeLangs}>
        <App onChangeLangs={lang => storeLangs.dispatch({type: lang})} />
      </Provider>
    </IntlProvider>,
    document.getElementById('root')
  )
}
render()
storeLangs.subscribe(render)

// /src/App.js
import React from 'react';
import {connect} from 'react-redux'
import {FormattedMessage, injectIntl} from 'react-intl';
const mapStateToProps = (state, ownProps) => {
  return {
    lang: state,
    ownProps: ownProps
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSwitchLangs: (lang) => {
      dispatch({type: lang})
    }
  }
}
const About = () => <p><FormattedMessage id="about" /></p>
const Contact = injectIntl((props) => <p>{props.intl.formatMessage({id: 'contact'})}</p>)
export default connect(mapStateToProps, mapDispatchToProps)(function App(props){
  const {lang, onChangeLangs, onSwitchLangs} = props
  return (
    <div>
      <p>
        <label><input type="radio" name="lang" value="en" onChange={() => onChangeLangs('en')} checked={lang==='en'} />English</label>
        <label><input type="radio" name="lang" value="zh" onChange={() => onSwitchLangs('zh')} checked={lang==='zh'} />中文</label>
      </p>
      <p><FormattedMessage id="home" /></p>
      <About />
      <Contact />
    </div>
  )
})
```

# Gatsby

https://www.gatsbyjs.org/
https://github.com/gatsbyjs/gatsby

```sh
npm install -g gatsby-cli
```

示例

```sh
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
cd hello-word
gatsby develop
# gatsby develop --host=0.0.0.0
# http://localhost:8000
```

