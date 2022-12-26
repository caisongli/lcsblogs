---
title: Pinia菠萝——Vue的最新状态存储库
categories:
  - Vue
tags:
  - Pinia菠萝
index_img: /img3/gqj2.jpg
banner_img: /img3/gqj2.jpg
---

# 【Pinia 菠萝】——Vue 的最新状态存储库

## **Pinia 是什么?**

<font color= 'BrickRed' >Pinia 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案       Pinia    支持     Vue2 和 Vue3</font>

## Pinia 优势

<font color= 'BrickRed' >_mutations_ 不再存在,更加简洁直观，减少代码冗余</font>

<font color= 'BrickRed' >不需要嵌套模块，符合 Vue3 的 Composition api ，让代码更加扁平化</font>

<font color= 'BrickRed' >完整的 TypeScript 支持</font>

<font color= 'BrickRed' >非常的轻量级， 仅有 1 KB</font>

<font color= 'BrickRed' >模块化设计，便于拆分状态</font>

## 安装 Pinia

```sh
yarn add pinia
# 或者使用 npm
npm install pinia
```

**<font color= 'each' >提示</font>**

```sh
如果您的应用使用 Vue 2，您还需要安装组合 API：`@vue/composition-api`。 如果您使用 Nuxt，则应遵循 [这些说明](https://pinia.web3doc.top/ssr/nuxt.html)。
```

**创建一个 pinia（根存储）并将其传递给应用程序：**

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");
```

**创建 store 仓库**

**<font color= 'Peach' >src  -  store 文件夹   -  index.js</font>**

```js
import { defineStore } from "pinia";
export const store = defineStore("Counter", {
  state: () => ({
    count: 1,
    name: "郦郦郦",
  }),
  getters: {
    countPow2(state) {
      return (state.count + 2) ** 2; // 9 也可以使用this
    },
  },
  actions: {
    add(a, b) {
      console.log("a", a); // 传过来的参数 2
      console.log("b", b); // undefined
      this.$patch({
        count: this.count + a,
      });
    },
  },
});
```

## 组件内使用：

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <p>{{ name }}</p>
    <p>{{ countPow2 }}</p>
    <p><button @click="add">+</button></p>
  </div>
</template>

<script>
import { store as useCountStore } from "../store/index.js";
import { computed } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const store = useCountStore();
    const add = () => {
      store.add(2); // 传参
      store.$patch({
        name: (store.name = "郦111"),
      });
    };
    return {
      count: computed(() => store.count),
      countPow2: computed(() => store.countPow2),
      name: computed(() => store.name),
      add,
    };
  },
};
</script>
```

**初始页面：**

<img src="https://img1.imgtp.com/2022/09/13/l8Dgzphw.png" />

**使用仓库 actions 方法后的页面：**

<img src="https://img1.imgtp.com/2022/09/13/advDR2km.png" />

## 核心概念

**Store**

```
Store 是一个保存状态和业务逻辑的实体，可以自由读取和写入，并通过导入后在 setup 中使用
```

Getters

```js
Pinia 中的 Getters 作用与 Vuex 中的 Getters 相同，但使用略有差异
Pinia 中的 Getters 直接在 Store 上读取，形似 Store.xx，就和一般的属性读取一样
基本使用
Getter 第一个参数是 state，是当前的状态，也可以使用 this.xx 获取状态
Getter 中也可以访问其他的 Getter， 或者是其他的 Store
```

actions

```js
Pinia 没有 Mutations，统一在 actions 中操作 state，通过this.xx 访问相应状态
虽然可以直接操作 Store，但还是推荐在 actions 中操作，保证状态不被意外改变
action 和普通的函数一样
action 同样可以像 Getter 一样访问其他的 Store，同上方式使用其它 Store
```

**<font color= 'each' >提示</font>**

在 vue 文件中解构 pinia 中的 state 会出现丢失响应式的问题,可以通过 pinia 出的 storeToRefs 去进行解构可以保持变量的响应式

```js
import { storeToRefs } from 'pinia';
setup(){
const store = useCountStore();
const { count } = storeToRefs(store);
return { count }
}

```
