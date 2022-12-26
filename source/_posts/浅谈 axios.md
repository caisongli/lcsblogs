---
title: axios
categories:
  - 数据请求
tags:
  - 网络请求
index_img: /img3/img2.jpg
banner_img: /img3/gqj5.jpg
---

# **浅谈 axios**

---

# 什么是 axios？

---

Axios 是一个基于 promise 的 异步 ajax 请求库，前端最流行的 ajax 请求库。简单的讲就是可以发送 get、post 请求，负责与后端交互。
Vue、React 等框架的出现，促使了 Axios 轻量级库的出现， react/vue 官方都推荐使用 axios 发 ajax 请求。
因为 Vue 等，不需要操作 Dom，所以不需要引入 Jquery.js 了

---

# axios 的特点？

---

1. 可以**转换请求数据和响应数据**，并对响应回来的内容自动转换成 JSON 类型的数据

2. Axios 是一个**基于 promise 的异步 ajax 请求库**，支持 promise 所有的 API

3. **拦截请求和响应**（就是前端发送请求前，可以设置自动拦截请求，相当于给请求加条件）

4. axios.all(promises): **批量发送多个（异步）请求**

5. **axios 在览器端/node 端都可以使用**

6. **安全性更高，客户端支持防御 XSRF（**跨站请求伪造**）**

   ```javascript
   //就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略
   ```

# axios 常用的两种请求方式

---

1. **axios({method:'方法'，url: ''baseURL: ''，data:{name: 'cc', sex: 'man'} })**

   ```javascript
   axios({
     url: "/login",
     method: "post",
     data: {
       name: "cc",
       sex: "man",
     },
   });
   ```

2. **axios.方法名(url, {name:'cc', sex:'man'})**

   ```javascript
   axios.get(url[, config])   //get请求 用于列表和信息查询
   axios.delete(url[, config])  //删除
   axios.post(url[, data[, config]])  //post请求用与提交数据，添加信息
   axios.put(url[, data[, config]])  //更新操作

   //例如
   axios.post('/login',{name:'cc', sex:'man'})
   ```

# 说下你了解的 axios 相关配置属性？

---

```javascript
`url`是用于请求的服务器URL ；
`method`是创建请求时使用的方法,默认是get ；
`baseURL`将自动加在`url`前面，除非`url`是一个绝对URL。它可以通过设置一个`baseURL`便于为axios实例的方法传递相对URL ；
`headers`是即将被发送的自定义请求头；
`params`是即将与请求一起发送的URL参数，必须是一个无格式对象。params:{ID:12345}。
```

# axios 拦截器 【 在请求或响应被 then 或 catch 处理前拦截它们 】

---

#### 拦截器分为请求拦截器和响应拦截器：

- **请求拦截器**（interceptors.requst）是指可以**拦截每次或指定 HTTP 请求，并可修改配置项**
- **响应拦截器**（interceptors.response）可以在每次 HTTP 请求后拦截住每次或指定 HTTP 请求，并可**修改返回结果项**

#### 先创建实例：

```Java
import axios from "axios";

// todo 创建实例
const instance = axios.create({
  baseURL: "http://www.pudge.wang:3080/api",
  timeout: 10000, // 超时时间
  headers: { "content-type": "application/json" }, // 表单提交 form-data
  // params: {
  //   // 只有get请求会来加params
  //   // ID: 12345,
  //   token: localStorage.getItem("token"),
  // },
});
```

# 添加请求拦截器:

---

```java
// todo 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // console.log(config);
    // 在发送请求之前做些什么
    // config.params.token = localStorage.getItem("token");

    // 对一些特殊的接口做一些特殊的处理
    // 一个项目很多的请求，绝大部分请求都是数据的请求，请求头application/json
    // 偶尔有个别接口要做表单提交

    // if (config.url === "/upload") {
    //   config.headers = { "content-type": "form-data" };
    // }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

```

# 添加响应拦截器:

---

```javascript
// todo 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 在刚刚得到数据的时候触发
    // 对响应数据做点什么
    // console.log(response);

    // 404是没法判断
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 500) {
      alert("服务端错误");
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

# axios 简单封装

---

#### 创建 http.js：

```java
import axios from "axios";
// todo 创建实例
const instance = axios.create({
  baseURL: "http://www.pudge.wang:3080/api",
  timeout: 10000, // 超时时间
  headers: { "content-type": "application/json" }, // 表单提交 form-data
});
const http = {
  get(url, params) {
    return instance
      .get(url, { params })
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        alert(err.message);
      });
  },
};
export default http;
```

---
