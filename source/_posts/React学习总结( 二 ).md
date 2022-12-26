---
title: React小记（二）
categories:
  - React
tags:
  - React笔记
index_img: /img3/t1.gif
banner_img: /img3/gq7.jpg
---

# React 学习总结( 二 )

# 1、HOC(高阶组件)

---

#### **Higher-Order Components 就是一个函数，传给它一个组件，它返回一个新的组件。**

作用：<font color='Peach'>可以给组件添加相同的结构,添加相同的属性等等,增强组件的功能，以及进行复用</font>

<font color='orange'>温馨提示：一般用 **with xxx.js** 单独放置高阶组件，默认就是高阶组件</font>

```javascript
const hoc = (Comp) => {
  return class extends Component {
    render()
      // todo {...this.props}将这个组件接收到的所有的props，接着往下传
      return (
        <>
          <Comp count="3" {...this.props} />
        </>
      );
    }
  };
};
class App extends Component {
  render() {
    console.log(this.props); // count=3
    return (
      <>
        <h2>高阶组件</h2>
      </>
    );
  }
}

// const App2 = hoc(App);
export default hoc(App);
```

# 2、Portal

---

#### **Portals 提供了一个最好的在父组件包含的 DOM 结构层级外的 DOM 节点渲染组件的方法。**

```
ReactDOM.createPortal(child,container);
```

##### **第一个参数 child 是可渲染的 react 子项，比如元素，字符串或者片段等。第二个参数 container 是一个 DOM 元素。**

```Java
import React, { Component } from "react";
import { createPortal } from "react-dom";

class Child extends Component {
  render() {
    return createPortal(<div>child组件</div>, document.querySelector("body"));
  }
}
```

# 3、组件的生命周期(旧版)

---

#### **前提**：<font color='red'>只有类组件才有生命周期！</font>

### 一、挂载阶段

##### **constructor**就是 react 的第一个生命周期，constructor 是组件被实例化的时候就调用，只调用一次

<font color='Salmon '>特点：可以将接收 props，当作初始值，达到修改 props 的效果</font>

```javascript
 // constructor就是react的第一个生命周期，constructor是组件被实例化的时候就调用，只调用一次
  // 初始化state，改变事件的this，得到ref变量等等以及处理props
  constructor(props) {
    super(props);
    this.state = {
      count: 10+props.属性,
      list: [1, 2, 3, 4, 5, 6, 7],
      this.fn = this.fn.bind(this)
      this.ipt = createRef();
    };
```

#### <font color='red'>componentWillMount      将被弃用</font>

#### 表示挂载前,已经被废弃了,没啥用，不能做数据请求, 因为 fiber(16 版本)算法的存在，有可能导致请求做多次，影响性能

### render ：render 也是生命周期，它必须要返回 jsx, 页面显示的内容，可以做解构以及对数据的处理, 不要在 render 做数据请求

<font color='Peach'>componentDidMount  用的很多</font>

#### 表示挂载结束,可以做任意的事情，包括数据请求

<font color='Salmon '>特点：可以数据请求，设置定时器</font>

```javascript
componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => {
      this.setState({
        count: 20,
      });
    }, 2000);
  }
```

### 二、更新阶段

<font color='Peach'>shouldComponentUpdate 用的较多</font>

询问是否需要更新， 必须要返回 true 或者 false

触发时机：<font color='orage'>父级 props 改变和内部的 state 数据改变</font>

参数：nextProps、nextState,更新后的 props 和更新后的 state

```javascript
shouldComponentUpdate(nextProps, nextState) {
  console.log("shouldComponentUpdate");
  console.log(nextState.count);//20 更新后
  console.log(this.state.count);//10，默认10
  return false;
  if (nextState.count === this.state.count) {
    return false;
  } else {
    return true;
  }
    return nextState.count !== this.state.count;//优化后
  }
```

扩展：<font color='Peach'>PureComponent，有复杂类型不好判断，所以有了它可以让 react 自己控制是否需要更新，值的类型也不限制,推荐直接写上</font>

```Java
import React, { PureComponent } from "react";//先结构出来

class Child extends PureComponent { //直接用
  render() {
    console.log("child render");
    return <div>child组件 - {this.props.count}</div>;
  }
```

<font color='red'>componentWillUpdate 将被弃用</font>

```Java
 UNSAFE_componentWillUpdate() {
    // 跟vue不同的是，这里是数据是改变之前的数据
    // console.log(this.state.count);
    console.log("componentWillUpdate");
  }
```

<font color='Peach'>componentDidUpdate  更新后  </font><font color='orange'>不要在这里修改数据,会造成死循环</font>

```javascript
  // componentDidUpdate表示更新后
  // 不要在这里修改数据,会造成死循环
  componentDidUpdate() {
    // this.setState({
    //   count: 30
    // })
    console.log("componentDidUpdate");
  }
```

### 三、卸载阶段

<font color='Peach'>componentWillUnmount 用的较多</font>

```javascript
  // todo 卸载阶段
  // todo 卸载定时器，卸载websocket，移出事件监听，销毁echarts的实例等第三方插件
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
```

**<font color='Salmon '>父子组件渲染顺序：只要父组件渲染了，子组件默认也必定会渲染</font>**

**<font color='Salmon '>父 render -> 子 render -> 子 componentDidMount -> 父 componentDidMount</font>**

![image-20220805212645645](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220805212645645.png)

# 4、组件的生命周期(新版 16.3 之后)

---

![image-20220805214333021](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220805214333021.png)

**1.getDerivedStateFromProps** <font color='each'>必须要加 static,不常用</font>

触发时机：<font color='orage'>父级 props 改变和内部的 state 数据改变</font>

此方法适用于[罕见的用例](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state)，即 state 的值在任何时候都取决于 props

```javascript
// todo getDerivedStateFromProps必须要加static, 需要有state
  // todo 根据props的值得到一个新的state(可以有一个state，让这个state的值一直保持和某个props一致)
  // todo 里面必须要返回一个对象或者null
 state = {
    count: 10,
    prevCount: 10,
  };
// 父级初始值为20,设置了定时器，2秒后变成40，每次改变都会触发该生命周期
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("getDerivedStateFromProps"）
    // todo 1. nextProps.num 20, nextState.prevCount 10 -> count 20 prevCount 20
    // todo 2. nextProps.num 40, nextState.prevCount 20 -> count 40 prevCount 40
    // todo 3. nextProps.num 40, nextState.prevCount 40 -> null //最后一次state的触发结果
    if (nextProps.num === nextState.prevCount) {
      return null;
    } else {
      return {
        count: nextProps.num,
        prevCount: nextProps.num,
      };
    }
  }
// 修改后触发 static getDerivedStateFromProps
componentDidMount() {
    setTimeout(() => {
      this.setState({
        count: 80,
      });
    }, 4000);
  }
```

**2.getSnapshotBeforeUpdate** <font color='each'>不常用</font>

<font color='each'>描述：在更新之前得到一个快照</font> <font color='each'>注意！必须和 componentDidUpdate 一起使用</font>

作用：在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。

应返回 snapshot 的值（或 `null`）。

```javascript
  // todo 在更新之前得到一个快照
  // todo 必须和componentDidUpdate一起使用
  // todo 可以得到dom更新前的ui信息
  // todo 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return 123;
  }
  // todo 传递给dom更新以后
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", snapshot);
  }
```

#
