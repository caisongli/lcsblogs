---
title: React小记【Router 4.5】
categories:
  - React
tags:
  - React笔记
index_img: /img3/t4.gif
banner_img: /img3/gq4.jpg
---

# React 学习总结( 四 ) 【 路由系列】

---

# react-router-dom(路由 4.5 版本)

---

# 一、基础路由搭建

---

**相关技术点：**

1. **安装路由，解构出 BrowserRouter 套住需要路由的根组件**

   ```javascript
   import { BrowserRouter as Router } from "react-router-dom";
   root.render(
     <Router>
       <App />
     </Router>
   );
   ```

2. **解构 Link, Route, Switch,j 加入 exact 精确匹配**

   ```javascript
   //  Link相当于改变url的a标签，对应vue里面router-link
   //  一个Route表示一个路由
   //  Switch是将包容性转成排他性路由
   import { Link, Route, Switch } from "react-router-dom";
   // 路由组件
   class Home extends Component {
     render() {
       return <div>这是首页页面</div>;
     }
   }
   class About extends Component {
     render() {
       return <div>这是关于页面</div>;
     }
   }
   class Mine extends Component {
     render() {
       return <div>这是我的页面</div>;
     }
   }
   // 父组件部分
   class App extends Component {
     render() {
       return (
         <>
           <h2>react-router-basic</h2>
           <ul>
             <li>
               <Link to="/">home</Link>
             </li>
             <li>
               <Link to="/about">about</Link>
             </li>
             <li>
               <Link to="/mine">mine</Link>
             </li>
           </ul>
           <hr />

           {/* react路由默认是包容性路由 */}
           {/* exact表示精确匹配,默认是模糊匹配 */}
           {/*设置path跳转路径，compoenet注册路由组件 */}
           <Switch>
             <Route path="/" component={Home} exact></Route>
             <Route path="/about" component={About}></Route>
             <Route path="/mine" component={Mine}></Route>
           </Switch>
         </>
       );
     }
   }

   export default App;
   ```

# 二、动态路由 【history 用来做编程式导航, location 用来获取 url 信息, match 用来获取参数】

---

**核心技术点：路径 / :id 获取路由信息，通过 props 的 match 用来获取参数**

组件部分：

<Route path="/detail/:id/:str" component={Detail}></Route>

组件获取 ID 方法

<div>这是详情页面 - {this.props.match.params.id}-{this.props.match.params.str}</div>

```java
class Detail extends Component {
  render() {
    // todo 当一个组件通过路由引入的时候，props就是一个对象
    // todo history用来做编程式导航, location用来获取url信息, match用来获取参数
    // todo 统称为路由信息
    // todo ?.叫做可选链操作符
    console.log(this.props?.match?.params?.id);
    // this.props.history.push?.();
    return <div>这是详情页面 - {this.props.match.params.id}</div>;
  }
}
class App extends Component {
  render() {
    return (
      <>
        <h2>react-router-params动态路由</h2>
        <ul>
            <Link to="/mine">mine</Link>
          </li>
          <li>
            <Link to="/detail/234">detail</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route path="/about" component={About}></Route>
          <Route path="/mine" component={Mine}></Route>
          {/* 动态路由 */}
          <Route path="/detail/:id" component={Detail}></Route>
        </Switch>
      </>
    );
  }
}

export default App;
```

# 三、路由嵌套

---

注意点:如果一个组件需要做嵌套路由，不能加 exact 精确匹配属性

嵌套的方法很简单，直接在要嵌套的组件里继续写 Link 和 switch

```javascript
class Home extends Component {
  render() {
    // console.log(this.props);
    const {
      match: { url },
    } = this.props; //做了而二次解构，把公共的url结构出来
    return (
      <>
        <div>这是首页页面</div>
        <ul>
          <li>
            <Link to={`${url}/home1`}>home1</Link>{" "}
            //模板字符串是JS表达式，需要加{}
          </li>
          <li>
            <Link to={`${url}/home2`}>home2</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route path={`${url}/home1`} component={Home1}></Route>
          <Route path={`${url}/home2`} component={Home2}></Route>
        </Switch>
      </>
    );
  }
}
```

# 四、组件的渲染方式

---

1.render 属性渲染组件 【主要渲染函数组件】【类组件需要套箭头函数】

主要作用：函数可以进行逻辑判断，根据条件渲染，路由鉴权等....

```javascript
          {/* render属性也可以渲染页面 */}
          {/* render属性只能渲染函数组件，不能渲染类组件 */}
          {/* render想渲染类组件，需要使用箭头函数, 但是路由信息是需要传递一下 */}
          {/* render里面写函数，就可以写逻辑判断 */}
          <Route
            path="/about"
            render={(props) => {
              return <About {...props} />;  /// 类组件渲染 {...传递props}
             }}
          ></Route>
      -----------// withRouter是一个高阶组件，作用就是让那些没有路由信息的组件，拥有路由信息---
              import { Link, Route, Switch, withRouter } from "react-router-dom";

```

2.children 属性渲染组件 【children 属性在有 Switch 的情况下和 render 是一样的，没有 Swtich 的情况下不管 url 是否匹配都会渲染】

```Java
          {/* children属性也可以做渲染 */}
          {/* children属性在有Switch的情况下和render是一样的，没有Swtich的情况下不管url是否匹配都会渲染 */}
          <Route path="/mine" children={Mine}></Route>
```

3.插槽渲染 【既能渲染函数组件也能渲染类组件】 【缺点：没有路由信息,可以用 withRouter 高阶组件解决，但是会让组件树套的更深】

```Java
          {/* 也可以使用插槽的方式直接写在Route的里面 */}
          {/* 既能渲染函数组件也能渲染类组件 */}
          {/* 但是插槽的方式是没有路由信息的 */}
          <Route path="/classify">
            <Classify />
          </Route>
           // withRouter是一个高阶组件，作用就是让那些没有路由信息的组件，拥有路由信息---
              import { Link, Route, Switch, withRouter } from "react-router-dom";
              @withRouter
                class Classify extends Component {
                   render() {
                   console.log(this.props);
                   return <div>这是分类页面</div>;
                   }
                 }
```

4.component 【既能渲染函数组件也能渲染类组件，比较常见的渲染方式】

```Java
          {/* 渲染页面比较常用的方式是使用component属性 */}
          {/* component既能渲染函数组件也能渲染类组件 */}
          <Route path="/home" component={Home}></Route>
```

# 五、Redirect 重定向 【是和 Route 并列的地方 使用 Redirect 的时候要加上 exact】

---

```javascript
import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    return <div>这是首页页面</div>;
  }
}

class About extends Component {
  render() {
    return <div>这是关于页面</div>;
  }
}

class Mine extends Component {
  render() {
    return <div>这是我的页面</div>;
  }
}

class App extends Component {
  render() {
    return (
      <>
        <h2>react-router-重定向</h2>
        <ul>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/mine">mine</Link>
          </li>
        </ul>

        <hr />

        {/* Redirect表示重定向，是和Route并列的地方 */}
        {/* from类似于path(匹配)的效果 */}
        {/* 使用Redirect的时候要加上exact */}
        <Switch>
          <Redirect from="/" to="/home" exact></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/mine" component={Mine}></Route>
        </Switch>
      </>
    );
  }
}

export default App;
```

# 六、路由鉴权 【运用 withRouter 高阶函数获取路由信息】【缺点：会加深组件树】【可以使用 Hooks 解决】

---

```javascript
import { Link, Route, Switch, Redirect, withRouter } from "react-router-dom";
// 登录组件，以插槽形式渲染，没有路由信息，用withRouter高阶组件解决
class Login extends Component {
  fn = () => {
    localStorage.setItem("token", "grthrthrth");
    // 编程式导航
    this.props.history.push("/home");
  };
  render() {
    return (
      <div>
        这是登录页面 - <button onClick={this.fn}>登录</button>
      </div>
    );
  }
}
// ---鉴权组件封装---做到复用功能------
class Auth extends Component {
  render() {
    return (
      <Route
        path={this.props.path}
        render={() => {
          if (localStorage.getItem("token")) {
            return this.props.children;
          } else {
            return <Redirect from={this.props.path} to="/login"></Redirect>;
          }
        }}
      ></Route>
    );
  }
}
// App
class App extends Component {
  render() {
    return (
      <>
        <h2>react-router-路由鉴权</h2>
        <ul>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/mine">mine</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Redirect from="/" to="/home" exact></Redirect>
          <Route path="/home" component={Home}></Route>
          {/* <Route path="/about" component={About}></Route> */}
          <Auth path="/about">
            <About />
          </Auth>
          {/* <Route
            path="/mine"
            render={() => {
              if (localStorage.getItem("token")) {
                return <Mine />;
              } else {
                return <Redirect to="/login"></Redirect>;
              }
            }}
          ></Route> */}
          <Auth path="/mine">
            <Mine />
          </Auth>
          <Route path="/login">
            {withRouter(Login)} //有高阶组件包住，插槽方式渲染就有路由信息了
          </Route>
        </Switch>
      </>
    );
  }
}
```

# 七、 NavLink 组件 【作用是包含了 Link 的全部的功能，除此之外，增加了高亮的作用】【activeClassName 用于替换高亮的类名，exact 精准匹配】

---

<font color='Salmon '>**【不添加 activeClassName 替换类名，默认就加了 className='active'】**</font>

```javascript
import { NavLink, Route, Switch } from "react-router-dom";
import "./07-styles.css"; //引入css样式
// App部分
        <h2>react-router-路由高亮</h2>
        <ul>
          <li>
            <NavLink to="/" activeClassName="select" exact> // 直接使用类名
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="select">
              about
            </NavLink>
          </li>
          <li>
            <NavLink to="/mine" activeClassName="select">
              mine
            </NavLink>
          </li>
        </ul>
```

# 八、Prompt 组件 【路由保护】【有 when 和 message 属性控制】

---

```javascript
import { Link, Route, Switch, Redirect, Prompt } from "react-router-dom";
// 案例，当input表单有内容的时候，进行跳转提示
class About extends Component {
  state = {
    value: "",
  };
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <>
        <div>这是关于页面</div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <Prompt
          when={！！this.state.value} // when里面接收 布尔值
          message={(location) => // 接收location参数，包含了当前路由信息
          // {pathname: '/mine', search: '?a=4&b=8', hash: '', state: undefined, key: '7dibvy'}
            `Are you sure you want to go to ${location.pathname}`// url的跳转路径
          }
        ></Prompt>
      </>
    );
  }
}
        <li>
            <Link to="/mine?a=4&b=8">mine</Link>   ///加search直接?x=x&x=x
          </li>
       <Switch>
          <Redirect from="/" to="/home" exact></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/about/:id" component={About}></Route>
          <Route path="/mine" component={Mine}></Route>
        </Switch>
```

# 九、404 页面匹配 【必须和 Switch 一起用，只能写在所有 Route 的最后面 】

---

```javascript
// App的switch部分
<Switch>
  {/* 必须和 Switch一起用，只能写在所有Route的最后面 */}
  <Redirect from="/" to="/home" exact></Redirect>
  <Route path="/home" component={Home}></Route>
  <Route path="/about" component={About}></Route>
  <Route path="/mine" component={Mine}></Route>
  <Route path="*" component={NotFound}></Route>
</Switch>
```

# **十、params 路由信息 【获取 search 部分信息】**

---

相关方法：<font color='Salmon '>**【const params = new URLSearchParams(search)】**</font>

```Java
class Mine extends Component {
  render() {
    // console.log(this.props);
    const {
      location: { search },
    } = this.props;
    // console.log(search);

    const params = new URLSearchParams(search);
    console.log(params.get("a"));
    console.log(params.get("b"));

    return <div>这是我的页面</div>;
  }
}
class App extends Component {
  render() {
    return (
      <>
        <h2>react-router-参数</h2>
        <ul>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            {/* params传参 */}
            <Link to="/about/123">about</Link>
          </li>
          <li>
            {/* query传参 */}
            <Link to="/mine?a=3&b=4">mine</Link>
          </li>
          <li>
            <Link
              to={{ // 写成对象，就是location属性
                pathname: "/detail",
                search: "?x=10&y=20",
                hash: "#lll",
                // state可以写任意对象
                state: { str: "hello" },
              }}
            >
              detail
            </Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Redirect from="/" to="/home" exact></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/about/:id" component={About}></Route>
          <Route path="/mine" component={Mine}></Route>
          <Route path="/detail" component={Detail}></Route>
        </Switch>
      </>
    );
  }
}
```

# 十一、Hooks 【useHistory、 useLocation、useParams、useRouteMatch, useSearchParams 】【只能给函数组件用】

---

增强函数组件的功能, 不会使组件树变深

所有的 hooks 都要写在函数组件的顶层

所有的 hooks 都是函数，都是 use 开头的

```javascript
import {
  Link,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  useSearchParams
} from "react-router-dom";
const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  const [searchParams,setSearchParams] = useSearchParams();// 或取url search部分的键值对
   console.log(searchParams.get("id"));可以或许?id='xxxxx' 部分
  const fn = () => {
    console.log(location);
  };

  return (
    <div>
      这是home组件 - <button onClick={fn}>btn</button>
    </div>
  );
};
```

# 十二、路由表 【类似 vue 的路由表】

---

1. 建立路由表文件 【将原本的 App 导入，把路由组件写在这边，通过插槽创建路由层级，App proprs.children 接受，再导出到总文件】

   ```javascript
   import App from "./App"; //引入App父组件
   import { Route } from "react-router-dom";

   import Home from "./pages/Home";
   import About from "./pages/About";

   import Home1 from "./pages/Home1";
   import Home2 from "./pages/Home2";

   const Router = () => {
     return (
       <App>
         <Route path="/home">
           <Home>
             <Route path="/home/home1">
               <Home1 />
             </Route>
             <Route path="/home/home2">
               <Home2 />
             </Route>
           </Home>
         </Route>
         <Route path="/about">
           <About />
         </Route>
       </App>
     );
   };

   export default Router;
   ```

2. App 部分

   ```javascript
   import React from "react";
   import { Link, Switch } from "react-router-dom";

   const App = (props) => {
     return (
       <>
         <h2>router5-路由表</h2>
         <ul>
           <li>
             <Link to="/home">home</Link>
           </li>
           <li>
             <Link to="/about">about</Link>
           </li>
         </ul>
         <hr />
         <Switch>{props.children}</Switch> / //类似vue的link-view,显示对应的路由页面
       </>
     );
   };

   export default App;
   ```

3. 二级嵌套路由

   ```javascript
   import React from "react";

   import { Link, Switch } from "react-router-dom";

   const Home = (props) => {
     return (
       <>
         <div>这是首页页面</div>
         <ul>
           <li>
             <Link to="/home/home1">home1</Link>
           </li>
           <li>
             <Link to="/home/home2">home2</Link>
           </li>
         </ul>

         <hr />

         <Switch>{props.children}</Switch>
       </>
     );
   };

   export default Home;
   ```

# 十三、Lazy 【 路由懒加载 】 【 lazy 函数、Suspense 包裹懒加载的组件、fallback 加载过程显示内容】

---

- App 配置

  ```javascript
  import React, { Component, lazy, Suspense } from "react";
  // todo lazy就是用来做组件懒加载的
  // todo lazy需要配合Suspense一起使用

  // import Child from "./Child";
  const Child = lazy(() => import("./Child")); //lazy函数包裹需要做懒加载的子组件

  const Loading = () => {
    return <div>loading,,,,,</div>;
  };

  class App extends Component {
    state = {
      show: false,
    };
    fn = () => {
      this.setState({
        show: true,
      });
    };
    render() {
      return (
        <>
          <h2>组件懒加载</h2>
          <button onClick={this.fn}>btn</button>
          {/* fallback表示组件在加载的过程中显示的内容 */}'
          <Suspense fallback={<Loading />}>
            {this.state.show && <Child />}
          </Suspense>
        </>
      );
    }
  }

  export default App;
  ```

---
