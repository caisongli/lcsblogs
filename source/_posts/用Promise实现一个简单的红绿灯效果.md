---
title: 用Promise实现简单的红绿灯效果
categories:
  - js面试题
tags:
  - JavaScript
index_img: /img2/10001.gif
# banner_img: /img2/10007.png
---

# 用 Promise 实现一个简单的红绿灯效果

---

**JS 部分：**

```javascript
// js部分
const delay = {
  query: Promise.resolve(), //初始化一个状态为成功的Promise对象
  wait(timer) {
    // this.query.then()返回值是一个状态为成功的Promise对象,重新赋值给query
    this.query = this.query.then((resolve, reject) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timer); //到达特定时间返回成功的结果
      });
    });
    return this; // 将delay作为返回值
  },
  task(callback) {
    this.query = this.query.then(() => callback());
    return this;
  },
};

//---------------------红绿灯效果------------------

let box = document.querySelector("#box");
[...box.children].forEach((el) => Object.assign(el, delay));
Object.assign(box, delay); //box也是对象,可以使用assign合并delay对象,使其有delay方法
setInterval(() => {
  box
    .task(() => {
      box.children[0].style = `background-color:red`;
    })
    .wait(2000)
    .task(() => {
      box.children[0].style = `background-color:black`;
      box.children[1].style = `background-color:green`;
    })
    .wait(2000)
    .task(() => {
      box.children[1].style = `background-color:black`;
      box.children[2].style = `background-color:yellow`;
    })
    .wait(2000)
    .task(() => {
      box.children[2].style = `background-color:black`;
    });
}, 0);
```

**html 部分：**

```html
 <style>
      #box {
        display: flex;
        justify-content: space-around;
        width: 800px;
        height: 300px;
        background-color: rgb(20, 19, 19);
        align-items: center;
        border-radius: 40px;
      }
      #box > div {
        width: 200px;
        height: 200px;
        border: 1px solid;
        border-radius: 50%;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <div></div>
      <div></div>
      <div></div>
    </div>
   </body>

```

---

### 效果：

<img src="https://lcsblogs.com/img2/10001.gif"  alt="图片"  />
