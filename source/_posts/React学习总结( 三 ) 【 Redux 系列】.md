---
title: React小记【Redux】
categories:
  - React
tags:
  - React笔记
index_img: /img3/t3.gif
banner_img: /img3/gq5.jfif
---

# React 学习总结( 三 )

# 1.什么是 redux?

---

Web 应用是一个状态机，视图与状态是一一对应的。

所有的状态，保存在一个对象里面。

```javascript
// Redux是react中进行state状态管理的JS库（并不是react插件），一般是管理多个组件中共享数据状态。这个是和Vuex是一样的。

首先明确一点，Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。

曾经有人说过这样一句话：

"如果你不知道是否需要 Redux，那就是不需要它。"

"只有遇到 React 实在解决不了的问题，你才需要 Redux 。"
```

# 2.Redux 仓库结构【legacy_createStore】

---

![img](https://img-blog.csdnimg.cn/img_convert/f26cfee8d5ec298034b914d2c343e73e.png)

# 3.legacy_createStore（作用和 vue 的 createStore 完全一样，执行可以返回一个仓库实例）

---

#### 使用流程：

- #### 首先安装 redux 框架

  ```node
  npm install redux --save
  ```

- #### 创建 index.js 文件（需要用 node.js 启动该文件）

- #### 结构出 legacy_createStore 【用 node 的 CommonJS 语法导入】

  ```javascript
  const { legacy_createStore } = require("redux");
  ```

- #### 创建仓库原始数据

  ```java
  const defaultState = {
    count: 3,
    name: "zhangmou",
  };
  ```

- #### 创建 reducer 函数, 用于改变 state

  ```javascript
  //todo reducer需要传入两个参数, state,action
  //todo action是一个带有type属性的对象
  //todo reducer要满足纯函数的条件
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case "add":
        return {
          ...state, // state原始数据始终没有被改变，返回一个新的对象覆盖原对象
          count: state.count + 1,
        };
      case "minus":
        return {
          ...state,
          count: state.count - action.num,
        };
      default:
        return state;
    }
  };
  '纯函数的概念：一个函数的返回结果只依赖其参数，并且执行过程中没有副作用，非异步，入参相同，出场必定相同

  //  非纯函数 返回值与a相关，无法预料
  const a = 1
  const foo = (b) => a + b
  foo(2) // => 3

  // 纯函数 返回结果只依赖于它的参数 x 和 b，foo(1, 2) 只要 foo 代码不改变，你传入的参数是确定的，那么 foo(1, 2) 的值永远是可预料的。
  const a = 1
  const foo = (x, b) => x + b
  foo(1, 2) // => 3
  ```

- #### 创建 store 仓库实例

  ```java
  //todo legacy_createStore执行可以返回一个仓库实例
  //todo 第一个参数是reducer的函数
  const store = legacy_createStore(reducer);
  console.log(store); //生成了含有方法的对象 [dispath、subscribe、getState]
   {
     // dispatch用来调用reducer函数
       dispatch: [Function: dispatch],
    // subscribe用来监听仓库数据的改变
      subscribe: [Function: subscribe],
     // getState用于获取仓库数据
      getState: [Function: getState],
      replaceReducer: [Function: replaceReducer],
      '@@observable': [Function: observable]
    }
  ```

  - **store.dispatch（{type:xxxx}）<font color='each'>调用 action，里面传入的对象就是 action</font>**

  - **store.subscribe(callback 回调函数) <font color='each'>传入回调函数，用来监听仓库数据的改变</font>**

  - **store.getState( ) <font color='each'>用于获取仓库数据</font>**

    ```javascript
    //todo 表示仓库的原始数据
    const defaultState = {
      count: 3,
      name: "zhangmou",
    };
    //dispatch用来调用reducer函数
    const reducer = (state = defaultState, action) => {
      // switch (action.type) {
      //   case "add":
      //     return {
      //       ...state,
      //       count: state.count + 1,
      //     };
      //   case "minus":
      //     return {
      //       ...state,
      //       count: state.count - action.num,
      //     };
      //   default:
      //     return state;
      // }
      //用对象字面量代替switch冗杂的语句
      const obj = {
        add: { ...state, count: state.count + 1 },
        minus: { ...state, count: state.count - action.num },
        default: state,
      };
      return obj[action.type] || obj["default"];
    };
    store.dispatch({ type: "add" }); //{ count: 4, name: 'zhangmou' }
    store.dispatch({ type: "add" }); //{ count: 5, name: 'zhangmou' }
    store.dispatch({ type: "minus", num: 3 }); // { count: 2, name: 'zhangmou' }
    ```

# 4.redux 与 react 结合实战

---

#### 一、同步方法

1. **单独创建 store 文件夹【index.js 创建仓库实例，reducer.js 写方法】**

   ```javascript
   import { legacy_createStore as createStore } from "redux"; // as重命名
   import reducer from "./reducer.js";//引入reducer函数

   const store = createStore(reducer);
   export default store;

   --------------'创建reducer函数---------
    //todo 表示仓库的原始数据
   const defaultState = {
     count: 3,
     name: "zhangmou",
   };
   const reducer = (state = defaultState, action) => {
       const obj = {
       'add': { ...state, count: state.count + 1 },
       'minus': { ...state, count: state.count - action.num },
       'default': state
     }
     return obj[action.type] || obj['default']
   }
   ```

​ **2.组件的 index.js 部分配置** 【<font color='orage'>解构出 provider 提供者，引入 store 仓库实例，挂载到组件上，类似跨组件通信</font>】

```javascript
import { Provider } from "react-redux"; //解构出Provider,提供仓库数据
import store from "./redux-todolist-async/redux"; // 将创建好的仓库实例引入
import App from "./redux-todolist-async/App"; // App组件
root.render(
  <Provider store={store}>
    {" "}
    // 包裹总组件，可以为所有组件提供服务，传入store数据
    <App />
  </Provider>
);
```

​ **3.组件如何使用？**【<font color='orage'>哪个组件需要，就在哪个组件解构出 **connect** 函数连通仓库，mapStateToProps 数据，mapDispatchToProps 方法</font>】

```javascript
// todo connect需要接收两个参数，这两个参数都是函数, mapStateToProps[state数据],mapDispatchToProps[dispatch调用]
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add(num) {
      dispatch({ type: "add", num });
    }, // 可以写方法，dispatch调用仓库的reducer函数进行交互，可以从组件接受参数
    minus() {
      dispatch({ type: "minus" });
    },
  };
};
class App extends Component {
  render() {
    console.log(this.props); // 将仓库的改变数据的方法映射到组件的props里面
    return (
      <>
        <button onClick={() => this.props.add(2)}>+1</button> //
        this.props.xxx调用方法
        <span>{this.props.count}</span>
        <button onClick={() => this.props.minus()}>-1</button>
      </>
    );
  }
}

export default "connect(mapStateToProps,mapDispatchToProps)(App)"; //connect是函数，返回函数，调用后将App当参数传递
```

#### 二、异步方法

##### 与同步的不同点: **<font color='Salmon '>使用 applyMiddleware 中间件接收一个异步库 thunk,异步库需安装</font>**

- **仓库实例部分**

  ```javascript
  // 创建仓库实例
  // todo applyMiddleware中间件用于处理异步
  import { legacy_createStore as createStore, applyMiddleware } from "redux";
  import reducer from "./reducer";
  // todo 异步库
  import thunk from "redux-thunk";

  // todo createStore还可以接收第二个参数, 就是中间件的返回值
  // todo applyMiddleware可以接收一个参数是异步库
  const store = createStore(reducer, applyMiddleware(thunk));
  export default store;
  ```

- **额外创建 actionCreator.js 文件,【动作创建者】**

  ```javascript
  export const minusAction = (id) => {
    // 需要暴露一下，需要的地方引入，还可以接收参数
    // todo 使用了中间件以后，action里面就可以返回函数了，由中间件来帮助执行这个函数
    // todo 这个函数可以使用dispatch参数
    return (dispatch) => {
      setTimeout(() => {
        dispatch({ type: "remove", id });
      }, 1000);
    };
  };
  export const addlist = () => {
    return (dispatch) => {
      fetch("http://www.pudge.wang:3080/api/rated/list") //进行数据请求
        .then((response) => response.json())
        .then((res) => {
          dispatch({ type: "load", list: res.result }); //真正的dispatch调用action
        });
    };
  };
  ```

- **组件如何使用？**

  ```javascript
  // 哪个组件需要直接引入动作创建者文件
  import {addlist} from './redux/actionCreator'；
  import { connect } from 'react-redux';

  const mapDispatchToProps = (dispatch) => {
      return {
          addlist() {
              dispatch(addlist()) // dispatch调用的是异步函数的方法，不是直接调用action了，需要中转一下
          }
      }
  }

  ```

  **总结:**

  **<font color='Salmon '>总的与同步一样，多了中间件引用异步库，第一次 dispatch 调用的是异步库的函数进行中转<br>第二次 dispatch 调用才是真正的 action,用法与同步相同</font>**

  ***
