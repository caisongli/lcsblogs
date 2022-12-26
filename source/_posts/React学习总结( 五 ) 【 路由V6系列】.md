---
title: React小记【Router V6】
categories:
  - React
tags:
  - React笔记
index_img: /img3/t2.gif
banner_img: /img3/gq9.jpg
---

# React 学习总结( 五 ) 【 路由 V6 系列】

---

# react-router-dom(路由 v6 版本)

---

# 新旧版本区别:

#### 一、注册路由的时候 v5 的 Switch 改为了 Routes

```javascript
 import {Route, Routes } from 'react-router-dom' //引入react-router

<div>
        {/* 注册路由（编写路由链接） */}
    <Routes >
        ......
        ......
    </Routes>
```

#### 二、v6 不再支持用 Route 标签包裹子组件，可以直接使用 element 属性 注册组件 【默认是精准匹配，排它性路由】

```javascript
import { Route, Routes } from "react-router-dom"; //引入react-router

<div>
  {/* 注册路由（编写路由链接） */}
  <Routes>
    <Route path="/about" element={<About />} />
  </Routes>
</div>;
```

#### 三、v6 中默认是没有路由信息了，需要使用 hooks 去获取

```javascript
{
  /* useLocation, useParams, useMatch依旧可以用，useHistroy没了 */
}
```

#### 四、v6 中，Route 先后顺序不再重要，它能够自动找出最优匹配路径 【404 页面还是放最后】

#### 五、在 v6 中移除了 NavLink 中的 activeClassName 的这个属性 【可以使用三元或者逻辑与运算符的方式实现这个功能】

```javascript
<li>
  {/* activeClassName被删掉了 */}
  {/* isActive表示是否匹配的true或者false */}
  <NavLink
    to="/home"
    className={({ isActive }) => {
      return isActive && "select";
    }}
  >
    home
  </NavLink>
</li>
```

#### 六、在 v6 中将 Redirect 改为 Navigate

当匹配不到路由时，需要使用 Redirect 做重定向，跳转到我们定义的组件（页面）中

```javascript
<Redirect to="/home/" /> ==> // <Route path="/" element ={<Navigate replace to="/home" />} />  不加 replace 默认是 push
```

#### 七、v6 嵌套路由改为相对匹配，不再像 v5 那样必须提供完整路径 ，新增 Outelt 组件【index 保持和上一级路由相同的路径】

```javascript
{
  /* 嵌套路由可以在一处渲染, 用Outlet组件渲染，Outlet相当于vue的router-view */
}
{
  /* index保持和上一级路由相同的路径 */
}
<Routes>
  <Route path="/home" element={<Home />}></Route>
  <Route path="/about" element={<About />}>
    {/* <Route path="about1" element={<About1 />}></Route> */}
    <Route index element={<About1 />}></Route>
    <Route path="about2" element={<About2 />}></Route>
  </Route>
</Routes>;
```

```javascript
const About = () => {
  return (
    <>
      <div>about页面</div>
      <ul>
        <li>
          <Link to="/about">about1</Link>
        </li>
        <li>
          <Link to="/about/about2">about2</Link>
        </li>
      </ul>
      <hr />
      {/* 嵌套路由可以在一处渲染, 用Outlet组件渲染，Outlet相当于vue的router-view */}
      <Outlet />
    </>
  );
};
```

#### 八、v6 用 useNavigate 实现编程式导航，不再使用 useHistory

```javascript
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const fn = () => {
    // 相当于push方法
    navigate("/about");
    // 相当于replace方法
    // navigate("/about", { replace: true });

    // 直接加数字相当于go方法
    // navigate(2);
  };
   return (
    <div>
      home页面 - <button onClick={fn}>btn</button>
    </div>
  );
```

#### 九、v6 目前没有 prompt 组件阻止不期望的导航。

如果在 v6 中要实现相应的功能，必须自己想办法，这可能是目前 v5 唯一的优势

---
