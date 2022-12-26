---
title: Vue性能优化——按需引入第三方组件库
categories:
  - Vue性能优化
tags:
  - Vue性能优化
index_img: /img3/yuan (1).jpg
banner_img: /img3/yuan (1).jpg
---

# Vue按需引入第三方组件库



## 为什么按需引入组件库?

<font color= 'yellow' >为了能够快速开发，提高开发效率，通常都会引入第三方组件库，当把组件库全部导入项目中，最后打包项目后会发现项目的体积过大。实际情况中，整个项目可能才使用整个组件库40%的组件，而剩下60%不用就显得非常浪费。我们可以将这用到的40%的组件按需引入到项目中，不用的组件则不引入到项目，从而达到减少打包体积，提升项目响应速度的目的。</font>

## 项目打包体积对比：

<img src = " https://img1.imgtp.com/2022/09/19/JJyeel3R.png" />

```
dist.zip为按需引入组件库，使用了些许标签的打包体积，只有392KB
```

```
dist(2).zip为组件库全局引入，使用了些许标签的打包结果，却是达到了1.1M
```

**<font color= 'each' >总结：由此可见，按需引入组件库是可以有效减少项目体积的，提高项目线上首屏渲染速度，减少白屏时间，减少流量消耗</font>**

## 组件按需引入的方法【以arco-design/web-vue组件库为例】

**<font color= 'sdffwd' >1、安装unplugin-vue-components  和  unplugin-auto-import  插件</font>**

```sh
yarn add -D unplugin-vue-components unplugin-auto-import
# 或者使用 npm
npm install -D unplugin-vue-components unplugin-auto-import
```

**<font color= 'sdffwd' >2、配置vue.config.js文件</font>**

vue-cli内部用的就是[webpack](https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020)，所以configureWebpack配置的会被合并

**<font color= 'each' >自动引入组件与样式，不需在main.js引入</font>**

```js

const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ArcoResolver } = require('unplugin-vue-components/resolvers') //如果是ElementPlus组件库则是ElementPlusResolver
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ArcoResolver()]
      }),
      Components({
        resolvers: [ArcoResolver()]
      })
    ],
  }
})
```

### 组件使用：【使用了组件库的Layout、Button、Space、图片轮播 Carousel组件】

```HTML
<template>
  <div class="layout-demo" style="height: 100vh">
    <a-layout style="height: 100%">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider theme="dark">Sider</a-layout-sider>
        <a-layout-content
          ><div class="hello">
            <slot />
            <router-link to="/">home | </router-link>
            <router-link to="/about">about</router-link>
            <slot name="b"></slot>
            <h1>哈哈哈</h1>
            <h1>{{ msg }}</h1>
            <a-space>
              <a-button type="primary">Primary</a-button>
              <a-button type="dashed">Dashed</a-button>
              <a-button type="outline">Outline</a-button>
              <a-button type="text">Text</a-button>
            </a-space>
          </div>
          <div>
            <a-carousel
              :style="{
                width: '600px',
                height: '240px',
              }"
              :default-current="2"
              @change="handleChange"
              :auto-play="true"
              animation-name="fade"
            >
              <a-carousel-item v-for="image in images" :key="image">
                <img
                  :src="image"
                  :style="{
                    width: '100%',
                  }"
                />
              </a-carousel-item>
            </a-carousel>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const images = [
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
    ];
    const handleChange = (value) => {
      console.log(value);
    };
    return {
      images,
      handleChange,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  /* height: calc(100% - 128px); */
  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
```

<img src="https://img1.imgtp.com/2022/09/19/B61ULNRQ.png" />