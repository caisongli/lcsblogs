---
title: React小记（一）
categories:
  - React
tags:
  - React笔记
index_img: /img3/react.jpg
banner_img: /img3/css.png
---

# React 学习总结（一）

# 1、组件中的 DOM 样式

---

### 第一种：行内样式

```html
// 注意这里的两个括号，第一个表示我们在要JSX里插入JS了，第二个是对象的括号
 <p style={{color:'red', fontSize:'14px'}}>Hello world</p>
```

### 第二种：class 样式引入

```html
import "./02-style.css";//引入写好的样式
<h2>class添加样式</h2>
{/* class属性，要写成className */}
<p className="font" id="abc">hello react!!!</p>
```

### 第三种：styled-components

**`styled-components`是针对 React 写的一套 css-in-js 框架，简单来讲就是在 js 中写 css。**

```javascript
import styled from "styled-components";
const BlueBig = styled.p`
  color: blue;
  /* font-size: 50px; */
  font-size: ${(props) => props.size}px; //可进行处理
`;
```

### 第四种：**classnames**【不同的条件添加不同的样式】

有时候需要根据不同的条件添加不同的样式，比如：完成状态，完成是绿色，未完成是红色。那么这种情况下，我们推荐使用[classnames](https://www.npmjs.com/package/classnames)这个包：

```javascript
//! 引入classNames，用于不同的条件添加不同的样式
import classNames from "classnames/bind";
import styles from "./03-style.css";
let cx = classNames.bind(styles);
const Child = (props) => {
  let className = cx({
    // key表示类名，value表示变量或者表达式
    green: props.num === "1",
    red: props.num === "2",
    big: true,
  });
  return (
    // <div className={props.num === "1" ? "green" : "red"}>
    <div className={className}>hello react!! - {props.num}</div>
  );
};
```

# 2、受控组件和非受控组件

---

**受控组件：**如果将`React`里的`state`属性和表单元素的值建立依赖关系，再通过`onChange`事件与`setState()`结合更新`state`属性，就能达到控制用户输入过程中表单发生的操作。被`React`以这种方式控制取值的表单输入元素就叫做**受控组件**

```javascript
<h2>form表单</h2>
        <input
          type="text"
          value={this.state.textVlaue}
          onChange={this.handleChange1}
        />
        <hr />
        <textarea
          value={this.state.areaValue}
          onChange={this.handleChange2}
        ></textarea>
        <hr />
        <select value={this.state.selectValue} onChange={this.handleChange3}>
          <option value="" disabled>//disabled 不能被选择
            -- 请选择 --
          </option>
          <option value="1">男</option>
          <option value="2">女</option>
          <option value="0">未知</option>
        </select>
        <hr />
        我已阅读{" "}
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange4}
        />
        <hr />
        <button onClick={this.handleClick}>btn</button>
```

**非受控组件：**`input`标签它实际也是一个`DOM`元素，我们可以用获取`DOM`元素信息的方式来获取表单元素的值呢？也就是[使用 ref](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据。【有三种获取 DOM 节点的写法】

关键代码：<font color='Peach'> ipt = createRef();<br>　　　　　 this.ipt.current 获取 DOM 元素</font>

```javascript
import React, { Component, createRef } from "react";
 //todo createRef用来做非受控组件的
 //todo createRef()返回的是一个地址引用
  ipt = createRef();
handleClick() {
  // console.log(this.ipt.current);是input标签
    console.log(this.ipt.current.value);//获取表单的值
  }
   {/* 非受控组件的初始值要用defaultValue */}
   <input type="text" ref={this.ipt} defaultValue="abc" />

    // 箭头函数的写法获取input标签 (工作中用的多)
     let {inputDom} = this //直接在实例中结构,就可以获取input标签了
     <input type="text" ref={(currentNode) => this.inputDom = currentNode} defaultValue="abc" />
    //要被废弃的一种,字符串形式ref打标识, 实例属性refs来收集,键值对形式
     /   let {input1} = this.refs 获取input1标签
     <input type="text" ref='input1' defaultValue="abc" />
```

# 3、setState

---

**接受一个对象的形式**：如果改变后的值不需要依赖上一次的值，最好用对象，更加方便

```javascript
//todo 可以接收第一个参数是对象，第二个参数是回调函数，在改变结束以后调用
this.setState(
  {
    count: 10,
  },
  () => {
    console.log(this.state.count);
  }
);
```

**setState 是可以接收一个函数, 第二个参数是回调函数**：如果改变后的值需要依赖上一次的值，最好用函数，更加安全

```javascript
 this.setState(
      (prevState，props) => { //可以接收上一个数据和props值
        return {
          count: prevState.count + 1,
        };
      },
      () => {
        console.log(this.state.count);
      }
    );
```

# 4、状态提升（将公用数据放在父组件）

---

**理解：**`React的状态提升就是用户对子组件操作，子组件不改变自己的状态，通过自己的props把这个操作改变的数据传递给父组件，改变父组件的状态，从而改变受父组件控制的所有子组件的状态，这也是React单项数据流的特性决定的`。

---

<font color='Rhodamine'>**官方的原话是**：共享 state(状态) 是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。 这被称为“状态提升(Lifting State Up)”。</font>

```javascript
class App extends Component {
  state = {
    count: undefined,
  };
  getCount(count) {
    this.setState({
      count,
    });
  }
  render() {
    return (
      <>
        <h2>状态提升 - {this.state.count}</h2>
        <Child1 onGetCount={this.getCount.bind(this)} /> 数据方法都放在父组件，子组件调用即
        可使用
        <Child2 count={this.state.count} />
      </>
    );
  }
}
```

# 5、this 的指向问题

---

1、<font color="red">内联地使用 bind, 不是很推荐，bind 会产生新函数，会增加内存消耗</font>

```javascript
<button onClick={this.handleClick.bind(this)}>btn</button>
```

2、<font color='each'>在 constructor 里面调用 this.xxx = this.xxx.bind(this); 比较推荐</font>

```javascript
constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
```

3、<font color='Peach'>箭头函数，箭头函数的 this 指向外层, 推荐</font>

```javascript
handleClick = () => {
  console.log(this.state.count);
};
```

# 6、事件传参问题

---

1、<font color="red">使用内联的 bind(this, xxx), bind 会产生新函数，新函数不会自动调用，并且 bind 的第二个参数会作为新函数的第一个参数, 不推荐，会增加内存</font>

```java
remove = (id, e) => { // e 参数是event
    console.log(id, e);
  };//事件
 <button onClick={this.remove.bind(this, item.id)}>删除</button>
```

2、<font color='each'>使用内联的箭头函数，多套了一层，触发外层，里层自动执行, 不是特别推荐，因为会产生新函数增加内存, **但是这是项目里面用的最多的方式**</font>

```javascript
 <button onClick={ (e) => this.remove(item.id, e) }>删除</button> e 参数是event
 remove = (id, e) => {
    console.log(id, e);
  };//事件
```

3、<font color='Peach'> 柯里化函数，外层自动调用，里层点击后调用, 最推荐的方式</font>

```javascript
remove = (id, num) => (e) => {
  e.stopPropagation(); //阻止事件冒泡
  console.log(id, e, num); // e 为event
};
<button onClick={this.remove(item.id, 123)}>删除</button>;
```

# 7、createContext 【跨组件通信】

---

关键代码：<font color='Peach'>{ Provider, Consumer } = createContext()</font>

<font color='each'>在 react 没有类似 vue 中的事件总线来解决这个问题，我们只能借助它们共同的父级组件来实现，将非父子关系装换成多维度的父子关系。react 提供了`context` api 来实现跨组件通信, React 16.3 之后的`context`api 较之前的好用。</font>

```javascript
// todo 引入createContext，用于跨组件通信
import React, { Component, createContext } from "react";
// todo 执行以后会返回context对象
const context = createContext();
// todo  提供者    消费者 export暴露组件，可以给需要的组件用
export const { Provider, Consumer } = context;
// todo Provider使用的时候需要又一个属性value，包在父级的<></>
<Provider
  value={{
    count: 123,
    name: this.state.name,
  }}
>
  <Child />
</Provider>;
// todo Consumer里面需要写一个函数，函数可以接收一个value参数，需要返回jsx
// todo import后面的解构用as取别名，普通对象用冒号取别名
import { Consumer as Abc } from "./App";
<div>
  child组件 -
  <Consumer>
    {" "}
    //可以用别名，Abc
    {(value) => (
      <span>
        {value.count} - {value.name}
      </span>
    )}
  </Consumer>
</div>;
```

### 父子组件通信

<font color='Peach'>1.父组件将自己的状态传递给子组件，子组件当做属性来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变</font>

<font color='orange'>2.父组件利用`ref`对子组件做标记，通过调用子组件的方法以更改子组件的状态,也可以调用子组件的方法..</font>

**子组件与父组件通信**

<font color='Salmon '>**父组件将自己的某个方法传递给子组件，在方法里可以做任意操作，比如可以更改状态，子组件通过`this.props`接收到父组件的方法后调用**</font>

## --------未完待续----------
