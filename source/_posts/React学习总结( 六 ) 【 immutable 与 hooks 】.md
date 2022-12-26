---
title: React小记【immutable与hooks】
categories:
  - React
tags:
  - React笔记
index_img: /img3/xj2.gif
banner_img: /img3/gq6.jpg
---

# **React 学习总结( 六 ) 【 immutable 与 hooks 】**

---

# **immutable**

---

#### 一、什么是 immutable？

```javascript
immutable，译为"不可改变的"，是一种持久化数据。它有一旦被创建就不会被修改的特性。
当你修改 immutable 对象的时候返回新的 immutable。但是原数据不会改变。
```

#### 二、为什么要使用 immutable？

```javascript
//   用处可大了。进行 js 对象的深拷贝对性能的消耗太大时（使用了递归），例如 Redux 中的深拷贝，就需要用到 immutable 来提升性能，从而避免牵一发而动全身。
//   当你使用 immutable 后再进行深拷贝的时候，只会拷贝你改变的节点，从而达到了节省性能的目的。
```

<font color='Salmon '>**总结：immutable 的不可变性让纯函数更强大，每次都返回新的 immutable 的特性让程序员可以对其进行链式操作，用起来更方便**</font>

#### 三、immutable 的简单实用

- #### 初始化

  ```javascript
  安装： npm i immutable -S  // yarn add immutable
  // 使用时解构方法
  import { Map, List, Seq, fromJS, Range } from "immutable";
  ```

- #### Map 数据结构

  **immutable.Map()**：创建一个类似于 js 中的对象的**Map 对象**

  ```javascript
  let map = immutable.Map({
    name: "Apple",
    age: 19,
    sex: "男",
  });
  console.log(map); // Map { "name":"Apple", "age":19, "sex":"男" }
  ```

  **操作 Map：**

  1. map.set 【增加数据】

     ```javascript
     let map1 = map.set("sign", "呜呜");
     console.log(map1); // Map { "name":"Apple", "age":19, "sex":"男", "sign":"呜呜" }
     ```

  2. map.setIn 【setIn 可以深层操作，第一个参数是个数组，数组中第一个元素是操作的对象的 key 值，第二个元素是 value 值】

     ```javascript
     let map1 = map.setIn(["obj", "xxx"], "xxx"); // 深层的set
     console.log(map1); // Map { "name":"Apple", "age":19, "sex":"男", "obj":{ "xxx":"xxx" } }
     ```

  3. map.delete && map.deleteIn【删除】

     ```javascript
     map.delete("a"); // 删除 a 的值
     map.deleteIn(["a", "b"]); // 删除 a 中 b 的值
     ```

  4. 改

     map.update()

     ```
     参数1：需要更新的值
     参数2：回调函数，返回一个更新后的值
     ```

     map.updateIn() 深层更新

     ```
     参数1：一个数组，第一个元素是父元素，第二个元素为目标子元素
     参数2：回调函数，参数为目标值的值，返回值为一个更新后的值
     ```

     ```javascript
     let map1 = map.update("a", function (x) {
       return x + 1;
     });
     let map2 = map.updateIn(["a", "b"], function (x) {
       return x + 1;
     });
     ```

  5. map.get() 【 查取值】 【 返回的不是 immutable 对象了 而是里边定义的正常值 】

     ```javascript
     map.get("a"); // {a:1} 得到1。
     map.getIn(["a", "b"]); // {a:{b:2}} 得到2。
     ```

- #### List 数据结构：

  **immutable.List()**：创建一个类似于 js 中的数组的**List 对象**

  ```Java
    // 创建immutable数组
    const list1 = List([1, 2]); // 创建
    const list2 = list1.push(3, 4, 5);  // 增加
    const list3 = list2.unshift(0); //向前增加
    const list4 = list1.concat(list2, list3); // 合并
    console.log(list1.size === 2);
    console.log(list2.size === 5);
    console.log(list3.size === 6);
    console.log(list4.size === 13);
  // 删
  list.splice(1,1)
  // 改
  list.splice(1,1,10)
  // 查
  list.getIn([0])
  ```

- #### API

  **merge()**：合并 map 对象

  ```
  let newMap = map.merge(map1)
  ```

  **toObject()**：immutable 的 map 对象转 JS 对象

  ```
  浅转换，只转换最外层
  ```

  **toArray()**：immutable 的 list 对象转 JS 数组

  ```
  浅转换，只转换最外层
  ```

  **toJS()**：immutable 的 map 对象/list 对象 转 JS 对象/JS 数组

  ```
  深转换，全部转换，更耗费性能
  ```

  **Map()**：JS 对象或数组转换成 immutable

  ```
  浅转换，只转换最外层
  ```

  **fromJS()**：JS 对象/JS 数组 转换成 immutable

  ```
  深转换，全部转换，更耗费性能。
  ```

  **Seq():既可以生成 immutable 对象，也可以生成 immutable 数组,是有惰性的(可以从结果出发)**

  ```javascript
  const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
    .filter((x) => {
      console.log("filter x:" + x);
      return x % 2 !== 0;
    })
    .map((x) => {
      console.log("map x:" + x);
      return x * x;
    });
  console.log(oddSquares.get(1));
  9;
  ```

  ```javascript
  const aRange = Range(1, Infinity) // 滑块
      .skip(1000) // 略过
      .map((n) => -n)
      .filter((n) => n % 2 === 0)
      .take(2)
      .reduce((r, n) => r * n, 1);
    console.log(aRange);

    return (
      <>
        <h2>immutable</h2>
        <input type="range" />
      </>
    );
  };
  ```

# **hooks 【重点】**

---

#### useState 【让函数组件可以定义自己的 state】

```javascript
// todo hooks只能给函数组件用
// todo hooks可以在不增加组件树层级的情况下增加组件功能
// todo hooks可以增加代码可读性，将功能代码聚合，方便阅读维护
// todo hooks只能在函数组件的顶层调用

// todo useState是让函数组件可以定义自己的state
// todo useState调用会返回一个数组, 分别是变量和改变变量的方法
// todo useState需要接收一个参数，是变量的初始值
// todo useState改变数据是异步的
```

#### useEffect [ 噎 faiKs ]【用于处理副作用，代替生命周期】

```java
// todo useEffect没有返回值，里面需要传入一个函数作为参数
// todo 如果useEffect里面只传入了一个函数，相当于类组件的componentDidMount和componentDidUpdate
// todo useEffect还可以接收第二个参数，是一个数组（依赖数组）
// todo 如果第二个参数是空数组，相当于类组件的componentDidMount
// todo 如果第二个参数有内容，相当于vue的watch
// todo 如果第一个函数参数里面返回一个函数，相当于类组件的componentWillUnmount
```

#### useLayoutEffect 【跟 useEffect 类似， 同步执行副作用】

```javascript
import React, { useState, useLayoutEffect } from "react";
// todo useLayoutEffect跟useEffect类似的，会在componentDidMount和componentDidUpdate之后同步调用,会阻塞代码执行, 优先于useEffect执行
// todo 只有当加载完毕以后需要改变dom样式的时候用，可以避免页面抖动
// todo 绝大部分情况下，推荐使用useEffect
```

#### memo 【高阶组件，给函数组件用的，作用和 PureComponent 完全相同】

```javascript
import React, { memo } from "react";

const Child = memo(() => {
  console.log("child render");
  return <div>child组件</div>;
});
```

#### useCallback 【用于缓存函数】 【一般用在自定义事件】

```Java
// todo 第一个参数是需要被缓存的函数，第二个参数是一个依赖数组

// todo 当有函数要作为自定义事件的时候，这个函数就需要加useCallback

```

#### useMemo 【当作 vue 的计算属性去理解，缓存的是函数的返回值】

```javascript
const oddArr = useMemo(() => {
  return arr.filter((item) => item % 2);
}, [arr]);
```

#### useCallback 与 useMemo 区别

```java
' useCallback和useMemo的区别
// todo useCallback是真正的缓存函数
// todo useMemo缓存的是函数的返回值
' useCallback和useMemo能否相互转换
// todo 只有useCallback可以写成useMemo，将之前的函数当作返回值，柯里化函数
 const fn2 = useMemo(() => {
    return () => {
      console.log("do something");
    };
  }, []);
```

#### useContext 【代替 Consumer 的作用】

```javascript
import React, { createContext, useContext } from "react";
// todo useContext只能代替Consumer的作用
// todo 里面需要传入context对象, 返回value对象

const context1 = createContext();
const context2 = createContext();

const Child2 = () => {
  const { name } = useContext(context1); // 传入context对象, 返回value对象 name
  const { nick } = useContext(context2); // 传入context对象, 返回value对象 nick
  return (
    <div>
      child2组件 - {name} - {nick}
      {/* <context1.Consumer>
        {(value) => (
          <span>
            {value.name} -{" "}
            <context2.Consumer>
              {(val) => <span>{val.nick}</span>}
            </context2.Consumer>
          </span>
        )}
      </context1.Consumer> */}
    </div>
  );
};
```

#### useReducer 【redux 的阉割版，只能做同步】【返回数组】

```javascript
import React, { useReducer } from "react";

const defaultState = {
  count: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        count: state.count + 1,
      };
    case "minus":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const App = () => {
  // todo useReducer需要传入两个参数
  // todo 返回值是一个数组
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <>
      <h2>useReducer</h2>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "add" })}>btn</button>
    </>
  );
};

export default App;
```

#### useRef 【来定义变量，可以绕过捕获值的特性】【变量是没有响应式】

```javascript
// todo 还可以用useRef来定义变量，可以绕过捕获值的特性
// todo 用useRef定义的变量是没有响应式
import React, { useRef } from "react";
function App() {
  const count = useRef(1);

  const showCount = () => {
    console.log("count: " + count.current);
  };

  const handleClick = (number) => {
    count.current = count.current + number;
    setTimeout(showCount, 2000);
  };

  return (
    <div>
      <p>You clicked {count.current} times</p>
      <button onClick={() => handleClick(1)}>增加 count</button>
      <button onClick={() => handleClick(-1)}>减少 count</button>
    </div>
  );
}
export default App;
```

#### useImperativeHandle 【用于让父组件获取子组件内的索引】

#### forwardRef() 【创建一个 React 组件, 可以把上级 ref 转发(传递) 给下级组件, 继而可以在上级组件中获取下级目标】

```javascript
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

function ChildInputComponent(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return <input type="text" name="child input" ref={inputRef} />;
}

const ChildInput = forwardRef(ChildInputComponent); // 转发ref 节点

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus(); // 子组件的Input框聚焦了
  }, []);
  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}

export default App;
```

#### 自定义 hooks 【类似模块化开发，将可以复用的功能方法放在外面】 【相同功能的代码放到了一起，方便阅读和维护】

```javascript
import { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(1);
  const fn1 = () => {
    setCount((v) => v - 1);
  };
  const fn2 = () => {
    setCount((v) => v + 1);
  };

  return [count, fn1, fn2]; // 组件需要啥就输出啥
};

export default useCounter;
```

```java
import React from "react";

import useCounter from "./utils/useCounter";

// todo 自定义hooks
// todo 相同功能的代码放到了一起，方便阅读和维护
// todo 可以复用

// todo 显示当前事件 / 文件上传功能 / 倒计时

const App = () => {
  const [count, fn1, fn2] = useCounter();
  return (
    <>
      <h2>自定义hooks</h2>
      <button onClick={fn1}>-</button>
      <span>{count}</span>
      <button onClick={fn2}>+</button>

      <p>当前事件为: {nowTime}</p>
    </>
  );
};

export default App;
```

---
