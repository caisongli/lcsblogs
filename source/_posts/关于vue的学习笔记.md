---
title: 关于vue2
categories:
  - Vue
tags:
  - vue2
index_img: /img2/10002.jpg
banner_img: /img2/10007.png
---

# MVVM 的理解

---

```javascript
MVVM` 表示的是 `Model-View-ViewModel
1：MVVM 是Model-View-ViewModel 的缩写，它是一种基于前端开发的架构模式。

2：其核心是提供对View 和 ViewModel 的双向数据绑定，这使得ViewModel 的状态改变可以自动传递给 View，即所谓的数据双向绑定。

3：以Vue.js 为例。Vue是一个提供了 MVVM 风格的双向数据绑定的 Javascript 库，专注于View 层。

4：它的核心是 MVVM 中的 VM，也就是 ViewModel。 ViewModel负责连接 View 和 Model，保证视图和数据的一致性，这种轻量级的架构让前端开发
更加高效、便捷。
```

Model：模型层，负责处理业务逻辑以及和服务器进行交互。
View：视图层，负责将数据模型转化为 UI 显示出来，可以简单的理解为 HTML 页面。
ViewModel：试图模型层，用来连接 Model 和 View ，是 Model 和 View 之间的桥梁。每当 V 层获取或者保存数据的时候，都要由 VM 层做中间的处理，从而交给 M 层。

---

### 总结

```
MVVM 模式简化了界面和业务的依赖，解决了数据频繁更新。MVVM 在使用当中，利用了双向绑定技术，使得 Model 在变化时，ViewModel 会自动更新，而 ViewModel 变化时，View 也会自动变化。
```

# vue 的优缺点

---

#### vue2 优点：

1**.轻量级框架（渐进式框架）**：只关注视图层，是一个构建数据的视图集合，大小只有几十 kb

2**.简单易学（尤雨溪）**：国人开发，中文文档，不存在语言障碍，易于理解和学习

3.**双向数据绑定**：双向是指 ViewModel 中的 data 部分和 View 之间的双向关系。

​ 正向：数据驱动页面 反向：页面更新数据

​ 绑定是指自动化处理，data 改变了 view 随之改变，反之也是。

---

# v-for 为什么要加 key

给属性一个唯一值，找到相同的元素，直接进行复用 （**使用 key 属性可以让 diff 算法更高效，提高渲染效率）**

**vue 中使用 v-for 时为什么不能用 index 作为 key**

```javascript
//当以数组为下标的index作为key值时，其中一个元素(例如增删改查)发生了变化就有可能导致所有的元素的key值发生改变diff算法时比较同级之间的不同，以key来进行关联，当对数组进行下标的变换时，比如删除第一条数据，那么以后所有的index都会发生改变，那么key自然也跟着全部发生改变，所以index作为key值是不稳定的，而这种不稳定性有可能导致性能的浪费，导致diff无法关联起上一次一样的数据。因此，能不使用index作为key就不使用index。
```

---

# v-if 和 v-show 的区别

**v-for**比**v-if**有**更高**的**优先级，**所以两个不能一起使用（vue3 解决了这个问题)

```javascript
// v-show，无论初始条件是什么元素都会渲染，它是基于简单地css渲染（给元素添加display：none）
```

```javascript
// v-if，是真正的条件渲染，在切换过程中条件块内事件监听和子组件适当地被销毁和重建
```

总结：

```javascript
'  一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好
```

---

# vue 常用修饰符（事件、按键、v-model）

**事件修饰符**

.stop 阻止事件继续传播
.prevent 阻止标签默认行为
.capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 事件将只会触发一次
.passive 告诉浏览器你不想阻止事件的默认行为

```javascript
<a v-on:click.stop="doThis"></a>
```

**v-model 修饰符**

- **.lazy** - **将 oninput 事件 切换成 onchange 事件**
- **.numbe**r - **输入字符串转为有效的数字**
- **.trim** - **输入首尾空格过**

```javascript
<input v-model.trim="msg">
```

**键盘事件的修饰符**

**enter 回车键**
**.tab 制表键**
**.esc 返回键**
**.space 空格键**
**.up 向上键**
**.down 向下键**
**.left 向左建**
**.right 向右键**

```javascript
<input @keyup.enter="submit">
```

**修饰键：(也叫系统修饰符)**

**.ctrl**
**.alt**
**.shift**
**.meta （就是 ctrl 旁边的 window 图标键**

```javascript

<!-- 按下Ctrl + enter时触发 -->
<input @keydown.ctrl.13="submit">
```

**v-bind 修饰符**

.sync .[sync](https://so.csdn.net/so/search?q=sync&spm=1001.2101.3001.7020)修饰符，它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器

```javascript
<comp :foo.sync="bar"></comp>
扩展成
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

# keep-alive 的作用是什么？原理是什么

Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例

**作用：** 在组件切换过程中将状态保留在[内存](https://so.csdn.net/so/search?q=内存&spm=1001.2101.3001.7020)中，防止重复渲染 DOM，减少加载时间及性能消耗，提高用户体验性。

```javascript
// 1. 将缓存 name 为 test 的组件(基本）
<keep-alive include='test'>
  <router-view/>
</keep-alive>
// 2. 将缓存 name 为 a 或者 b 的组件，结合动态组件使用
<keep-alive include='a,b'>
  <router-view/>
</keep-alive>
// 3. 使用正则表达式，需使用 v-bind
<keep-alive :include='/a|b/'>
  <router-view/>
</keep-alive>
// 4.动态判断
<keep-alive :include='includedComponents'>
  <router-view/>
</keep-alive>
// 5. 将不缓存 name 为 test 的组件
<keep-alive exclude='test'>
  <router-view/>
</keep-alive>
```

**生命周期函数**

1. **activated**:在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次 keep-alive 激活时被调用。
2. **deactivated**：在组件被停用时调用。

**注意：** 只有组件被 keep-alive 包裹时，这两个生命周期才会被调用，如果作为正常组件使用

**应用场景**

如果未使用 keep-alive 组件，则在页面回退时仍然会重新渲染页面，触发 created 钩子，使用体验不好。

在以下场景中使用 keep-alive 组件会显著提高用户体验，菜单存在多级关系（如：主页 -> 列表页 -> 详情页）的场景：

```javascript
//1.当从主页跳转列表页时，列表页组件重新渲染；
//2.当从详情页返回列表页时，列表页组件缓存 不重新请求数据
```

**我们还可以通过路由中的 meta 属性来控制，是否需要缓存**

将 test 路由中的 meta 添加 keepAlive 属性为 true，表示当前路由组件要进行缓存。

```javascript
{
  path: '/home',
  name: 'home',
  component: () => import('../views/home.vue')
},
{
  path: '/test',
  name: 'test',
  meta:{
    keepAlive:true
  },
  component: () => import('../views/test.vue')
```

keep-alive 代码可以结合 v-if 进行包裹，如果 meta 中的 keepAlive 为 true 进行缓存，否侧不进行缓存。

```javascript
<keep-alive>
  <router-view v-if="$route.meta.keepAlive" />//缓存显示
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" /> //不缓存显示
```

实际开发中，我们可以结合路由守卫来实现需要缓存组件的缓存。

```javascript
export default {
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
};
```

---

# 虚拟 DOM 的理解

---

可以那么说：

比方说有一段 html 代码，不是直接渲染，而是将 html 代码转成一个 js 的对象，这个对象存在浏览器内存中。当我们要去修改这个 html 的时候，不是不是修改，而是修改那个 js 对象，等待所有的修改都结束了，再一次性地转回成 html，渲染出来。

什么是 diff 算法？

```javascript
// 同级比较：目的是较少的比较次数，减低时间复杂度
// key的比较：目的找到相同的元素，直接进行复用
```

---

# vue 中组件的传值方式

---

**父传子**:

1. 在父组件的子组件标签上面添加自定义属性；在子组件里面添加 props 选项用于接受自定义属性

2. 使用插槽 接收

   ```javascript
   <template #abc>
       <span>名字<span>
   </template>
   <template #default>
       <span>具名插槽 --默认（default）<span>
   </template>
   接收
   <slot name="abc"></slot>
   <slot></slot>
   ```

3. 使用 this.$root访问根实例，使用this.$parent 访问父组件实例

4. 依赖注入（vue2 没有响应式）

   ```javascript
    // provide提供者，依赖
           // 向所有的子孙组件传递一个msg属性
           provide() {
             return {
               msg: "hello",
               a: this.a,
             };
           },
    // inject注入
           inject: ["msg", "a"],
   ```

**子传父**:

1. 在父组件的子组件标签上面添加自定义事件；在子组件里面调用 this.$emit("事件名称", "值")去传递

2. 使用 this.refs.xxx 来访问子组件实例

3. 作用域插槽

   ```vue
   <template #default="{ abc }">
     // 只能单取
     <span>{{ abc }}</span>
   </template>

   <template slot-scope="scope">
     // scope 代表该作用域范围所有参数
     <div>{{ scope.tit }}</div>
     <div>{{ scope.msg }}</div>
     <div>{{ scope.names }}</div>
   </template>

   // 子组件 data() { return { count: 10, name:'ahha' }; },
   <slot :abc="count"></slot>
   <slot :names="name"></slot>
   ```

**兄弟传值**:

通过中央通信 let bus = new Vue()

A：methods :{ 函数{bus.$emit(‘自定义事件名’，数据)} 发送

B：created （）{bus.$on(‘A 发送过来的自定义事件名’，函数)} 进行数据接收

通过中间件

**传值：this.parent.$emit**("事件名"，"值")或者**this.root.$emit(**("事件名"，"值"**)**，

**接收**：**this.parent.$on**("事件名"，（“值”)=>{}）或者**this.root.$on**("事件名"，（“值”)=>{})

---

# vue 组件中的 data 为什么是个函数

```javascript
//  对象为引用类型，当复用组件时，由于数据对象都指向同一个data对象，当在一个组件中修改data时，其他重用的组件中的data会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object的实例），引用地址不同，则不会出现这个问题。
```

---

# **computed 和 watch 的区别**

---

computed(计算属性)：

1. 有缓存，他是被动的，只有当它依赖的响应数据改变，才会改变

2. 计算属性可以同时依赖多个值

3. **根据 data 里的值加工计算出新的返回值**

   ```javascript
   computed:{
                   getMoney(){
                       return '$'+this.money+"!"
                   },
                   reverseStr(){   //缓存
                       return this.str.split('').reverse().join("")+Math.random()
                   }
               }
      data里的值变化了，会重新计算，值不变，会缓存
   ```

4. **计算属性默认是只读的，也可以修改**（通过 get 和 set 修改）![image-20220816091914677](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220816091914677.png)

watch(监听属性)：

1. 没有缓存，他是主动的，自己发生了改变，从而执行其他的事情

2. 侦听属性只能侦听一个值

3. 监听的函数接收两个参数，第一个是最新的值；第二个是输入之前的值

4. 可以写成**handler**形式 【高级用法】

5. 有两个属性：

   **immediate**：组件加载立即触发回调函数执行

   **deep:** deep 的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改**obj**里面任何一个属性都会触发这个监听器里的 handler

   一般监听**对象**和**数组 （**对**复杂类型**进行**深度监听**

```javascript

export default {
	data() {
		return {
			name: '123',
             from:{ name:'333'}
		};
	},
	watch: {
		name(newVal, oldVal) {
			console.log('newVal', newVal);// 1234
			console.log('oldVal', oldVal);// 123
		},
        form: {
			handler(newVal, oldVal) {
				console.log('newVal', newVal);
				console.log('oldVal', oldVal);
			},
			deep: true  //深度监听，复杂类型，以监听到对象内部属性的改变
             immediate: true // 组件加载立即触发回调函数执行,false就是值变化才发生
		}

	}
}
```

## **immediate 监听的时候是否可以获取 dom 元素**

**不能**（测试出来结果是 undefined），可以在$nextTick 里面获取，或者在 mounted 获取

```javascript
// 当数据改变（改变数据时同步） 视图刷新（更新dom，异步 中间要通知观察者，调用render生成虚拟dom，比较两个虚拟dom用diff算法，在更新）
// 所有 我们无法 立即获取，数据改变后生成最新的dom
// vue 提供了一个watcher(观察每一次的dom更新，更新完成后，回调触发，在回调中获取最新的dom)
this.$nextTick(()=>{
  <!-- 在这里获取最新的dom -->
})

Vue.nextTick(()=>{
  <!-- 在这里获取最新的dom -->
})
```

## Watch 和 computed 的区别

computed 支持缓存，只有依赖数据发生改变,才会重新进行计算;而 watch 不支持缓存，数据变,直接会触发相应的操作

computed 不支持异步，当 computed 内有异步操作时无效，无法监听数据的变化，而 watch 支持异步

computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的值;而 watch 监听的函数接收两个参数，第一个参数是最新的值，第二个参数是输入之前的值

如果一个属性是由其它属性计算而来的，这个属性依赖其它属性，多对一或者一对一，一般用 computed；而当一个属性发生变化时，需要执行对应的操作，一对多，一般用 watch。

![image-20220816103853851](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220816103853851.png)

# $nextTick 的使用

---

```javascript
异步更新队列
将里面的内容放到下一次事件轮询里面执行
等待页面渲染完再执行
vue并不是数据改变后dom立即更新，而是等所有数据修改之后才会更新，所以$nextTick可以在页面渲染完成之后再执行
```

经典运用场景： better-scroll 滚动插件，请求到数据后高度撑开后页面未渲染而失效

在使用某个第三方插件时 ，希望在 vue 生成的某些 dom 动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法

```javascript
export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    changeTxt:function(){
      let that=this;
      that.testMsg="修改后的文本值";  //修改dom结构

      that.$nextTick(function(){  //使用vue.$nextTick()方法可以dom数据更新后延迟执行
        let domTxt=document.getElementById('h').innerText;
        console.log(domTxt);  //输出可以看到vue数据修改后并没有DOM没有立即更新，
        if(domTxt==="原始值"){
          console.log("文本data被修改后dom内容没立即更新");
        }else {
          console.log("文本data被修改后dom内容被马上更新了");
        }
      });
  }
```

---

# vue 中 bus 的使用弊端 【事件总线】

**优点：** 传递数据较为方便，可以进行兄弟之间，父子之间的传递
**缺点：** 必须先 on[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)才能进行 emit 触发,**$on 事件是不会自动销毁的。需要我们手动来销毁。**

创建 Bus.js 文件

```javascript
//抛出Bus 供传输数据的组件引用  代码-->>
import Vue from "vue";
const bus = new Vue();
export default bus;
```

**引用组件**
谁用谁引用

```javascript
import Bus from "../common/bus.js";
//触发，“changeCurrentMsg”为触发的信号名
Bus.$emit("changeCurrentPage", 1);
```

接受信息

```javascript
import Bus from '../common/bus.js';
//创建时就要监听，也可以在created中监听
mounted(){
	Bus.$on("changeCurrentPage",(val)=>{
	                this.currentPage=val;
	       });
}

//记得销毁，不然会叠加调用监听
 beforDestroy（）{
         this.$bus.$off("vaPage");  //当这个组件销毁的时候bus也跟着一起销毁
}

```

使用 vue-bus 公共组件

```
1、安装：npm install vue-bus
2、在main.js中引入vue-bus
import Vue from 'vue';
import VueBus from 'vue-bus';
Vue.use(VueBus);
```

在组件中使用

```javascript
//触发事件
this.$bus.emit("changeCurrentPage",1)；
//接受事件
mounted(){
	this.$bus.on("changeCurrentPage",(val)=>{
	           this.currentPage=val;
	    });
}
//组件销毁接触事件绑定
destroyed:function(){
　　this.$bus.off("changeCurrentPage")
}
```

---

# vue 的生命周期的理解和各个钩子的实际使用场景

---

Vue2.0

```javascript
beforeCreated
// 在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。  不能访问数据
created
// 在实例创建完成后被立即同步调用  可以访问数据，但是拿不到真实的dom节点
beforeMount
// 在挂载开始之前被调用
mounted
// 实例被挂载后调用  既可以拿到数据也可以拿到节点  可以拿到真的dom节点可以进行dom操作
通过ref拿到节点
<p ref="parogram"></p>
this.$refs.parogram 拿到节点
beforeUpdate
// 在数据发生改变后，DOM 被更新之前被调用
updated
// 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用
beforeDestroy
// 实例销毁之前调用。在这一步，实例仍然完全可用。 清理资源，防止内存泄露
destroyed
// 实例销毁后调用
缓存阶段
activated.
// 被 keep-alive 缓存的组件激活时调用。
deactivated.
// 被 keep-alive 缓存的组件失活时调用。
```

| 创建前/后    | 在**beforeCreate**阶段，vue 实例的挂载元素 el 和数据对象 data 都为 undefined（**拿不到 data，不能做数据请求**），还未初始化。在**created**阶段，vue 实例的数据对象 data 有了（**能拿到 data，可以做数据请求**），el 为 undefined，还未初始化 |
| ------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 载入前/后    | 在**beforeMount**阶段，vue 实例的$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换（**可以做数据请求）**。在**mounted**阶段，vue 实例挂载完成，data.message 成功渲染（**可以做数据请求，获取 dom 节点）**       |
| 更新前/后    | 当 data 变化时，会触发 beforeUpdate 和 updated 方法**（数据改变后触发，数据得用，不能在 updataed 修改数据，会造成死循环）**                                                                                                                  |
| 销毁前/后    | 在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在**（beforeDestroy——关闭定时器、事件监听、第三方插件、websocket, destroyed 不做事情）**                   |
| 错误处理阶段 | errorCaptured ， 用于捕获子组件的错误，然后显示回退 UI[就是一个界面，错误处理钩子函数是写在 父组件中，触发条件： 子组件出问题了                                                                                                              |

#### 使用场景

**created**

```
可以访问获取数据
修改数据不会触发 beforeUpdate,updated钩子函数
可以正常向后端发起请求获取数据
```

**mounted**

```
可以访问获取数据
修改数据会触发 beforeUpdate,updated钩子函数
this.$refs找到 ref 表示的节点
可以正常向后端发起请求获取数据
```

### updated:

```javascript
生命周期 - 更新阶段
    1. 触发条件： 数据改变【 数据得用 】 <br>
    2. 触发次数： 多次 <hr>
    3. updated:  可以做真实DOM操作，可以发送数据请求 <hr>
```

_特别注意:不要在 **update** **beforeUpdate** 修改数据，否则会引起死循环_

### 相关面试题：

### 初始化阶段，我们哪里拿到了虚拟 DOM 呢？

```
 created之后，beforeMount前
```

### 初始化阶段，我们哪里拿到了真实 DOM 呢？

```
 mounted
```

### 如果有两个组件，是父子组件，父子组件的初始化阶段是如何执行顺序

```
3.1 父组件： beforeCreate created  beforeMount
3.2 子组件： beforeCreate created  beforeMount  mounted
3.3 父组件： mounted
```

### 更新阶段真实 DOM 哪里可以拿到？

```
updated
```

### 父组件更新阶段触发了，子组件是否会重新渲染

```
 父子组件是否有通信[恰好就是通信的数据改了]，
   有的话应该会的
   没有的话就不会了
```

### 子组件更新阶段触发了，父组件是否会重新渲染

```
父子组件是否有通信[恰好就是通信的数据改了]，，
  有的话应该会的
  没有的话就不会了
```

---

# vue 中从 created 和 mouthed 中发送请求的区别是什么

created

```javascript
// created在模板渲染成html前调用，此时的data已经准备完毕，el仍然是underfined，因此没有渲染成html，所以不能操作dom节点，它主要用来初始化一些数据；

// 即使created中的方法没有执行完，mounted也会被调用
```

mounted

```javascript
// mounted在模板渲染成真实的html之后调用的，此时data，el都已经准备好了，可以操作html的dom节点，可以通过id之类的查找元素，也可以加载一些组件等。

// 挂载到阶段上的初始化方法通常用mounted去操作，主动调起的用methods里面封装方法
```

---

# $router 和 $route 区别

---

**$ router** **路由操作对象 ，只写对象**

**$ route **是用来**获取路由信息**的,只读对象

**$router 是 VueRouter 的一个实例**

他包含了所有的路由，包括路由的跳转方法，[钩子函数](https://so.csdn.net/so/search?q=钩子函数&spm=1001.2101.3001.7020)等，也包含一些子对象（例如 history）

常用的跳转连接的方法： **this.$router.push( ) ** **this.$router.replace( )** **tihs.$router.go( )**

**thi.$router.push( )**

```javascript
this.$router.push("/login");
//使用对象的形式 不带参数
this.$router.push({ path:"/login" });
//使用对象的形式，参数为地址栏上的参数
this.$router.push({ path:"/login",query:{username:"jack"} });
使用对象的形式 ，参数为params 不会显示在地址栏
this.$router.push({ name:'user' , params: {id:123} });
```

**this.$router.replace( )**

```javascript
push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，
不会向 history 栈添加一个新的记录

一般使用replace来做404页面
this.$router.replace(’/’)
```

**tihs.$router.go( )**

```javascript
// 页面路由跳转 前进或者后退
this.$router.go(-1); // 后退
this.$router.go(1); // 前进
```

**$ route**是用来**获取路由信息**的

![img](https://img-blog.csdnimg.cn/20200924182516695.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FnMjI3Njg3OTM3OQ==,size_16,color_FFFFFF,t_70#pic_center)

```javascript
1、$route.path
// 字符串，对应当前路由的路径，总是解析为绝对路径，如 “/foo/bar”。

2、$route.params
// 一个 key/value 对象，包含了 动态片段 和 全匹配片段，
// 如果没有路由参数，就是一个空对象。

3.$route.query
一个 key/value 对象，表示 URL 查询参数。
// 例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
// 如果没有查询参数，则是个空对象。

4.$route.hash
当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。锚点

5.$route.fullPath
// 完成解析后的 URL，包含查询参数和 hash 的完整路径。

6.$route.matched
// 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。

7.$route.name 当前路径名字
8.$route.meta 路由元信息
```

---

# 路由传参的方式有几种？区别是什么

---

一、在路由表配置**动态路由 “：id（名字）**” 设置**props 为 true** 在组件那边用**props 接收**

​ **或者** 使用**this.$route.params.id**取值

```javascript
{
   path: '/login/:id/:name', // 这里用动态路由的方式
   name: 'login',
   props:true,
   component: Login
}
```

二、在路由表设置**命名路由 name:"abc" ,**params 传参 [ 不会显示在地址栏 ]

三、使用 path 来配置路由，通过 query 来传递参数，参数会在 url 后边的?id=?中显示

**query 和 params**的区别总结：

1. params 传参，必须使用命名路由的方式传参；
2. params 传参，不会显示在地址栏上，会保存在内存中，刷新会丢失，可以配合本地存储进行使用;
3. query 的参数会显示在地址栏上，刷新不会丢失；

```javascript
//使用对象的形式，参数为地址栏上的参数
this.$router.push({ path:"/login",query:{username:"jack"} });
// 使用对象的形式 ，参数为params 不会显示在地址栏
this.$router.push({ name:'user' , params: {id:123} });

//  router-link 标签传参
<router-link :to="{ name: 'login', query: { name:'zs',age: '19' }}" />
<router-link :to="{ path: '/login', parmas: { name:'zs', age: '19' }}" />
```

---

# vue 的导航守卫有哪些

---

**全局前置守卫** **router.beforeEach** 主要用来路由鉴权

to:即将要进入的路由对象；

from:当前路由正要离开的路由对象；

next:一定要调用该方法来解析这个钩子，否则在导航跳转时没有任何效果。执行效果依赖 next 方法的调用参数；

next()：进行管道的下一个钩子；

next(false)：中断当前的导航；

next(’/’) 或者 next({ path: ‘/’ })：跳转到一个不同的地址，在导航到一个界面时，如果不满足跳转条件，使用该方法跳转到另一个界面，代码示例如下

```javascript
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来resolve这个钩子。执行效果依赖next方法的调用参数
});
```

![img](https://img-blog.csdnimg.cn/20200911093646859.png#pic_center)

**全局后置守卫 —— router.afterEach()**

可以使用 router.afterEach() 注册一个全局后置守卫，和其他守卫(包括组单个路由独享的守卫以及组件中的守卫)不同的是，全局后置守卫不会接受 next() 函数，也不会改变导航本身；

```javascript
router.beforeEach((to, from) => {
  // to: Route: 即将要进入的目标路由对象
  // from: Route: 当前导航正要离开的路由
});
```

##### 路由独享的守卫 beforeEnter

与全局的 beforeEach 完全相同，如果都设置则在 beforeEach 之后紧随执行，参数 to、from、next

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        //
      },
    },
  ],
});
```

### 组件内的守卫

**beforeRouteEnter**
**beforeRouteUpdate(2.2 新增)**
**beforeRouteLeave**

```javascript

 beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // next（）里面可以写成回调函数，提供vm（相当于this）参数 来访问组件的属性
     next((vm) => {vm.detailInfo = res.result;});
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
```

---

# vue 路由模式，hash 模式 和 history 模式区别

---

原理：

```javascript
hash —— 即地址栏 URL 中的 // # 符号（此 hash 不是密码学里的散列运算）。比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。
它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

// history ——  利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。
（需要特定浏览器支持）这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

// 因此可以说，hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由.
```

|          | hash                         | history            |
| -------- | ---------------------------- | :----------------- |
| url 显示 | 有#，很 Low                  | 无#，好看          |
| 回车刷新 | 可以加载到 hash 值对应页面   | 一般就是 404 掉了  |
| 支持版本 | 支持低版本浏览器和 IE 浏览器 | HTML5 新推出的 API |

```javascript
history.replaceState({}, null, '/b') // 替换路由
history.pushState({}, null, '/a') // 路由压栈 替换当前地址 被替换地址进入访问历史
history.back() // 返回
history.forward() // 前进
history.go(-2) // 后退2次

hash模式优缺点:
优点
只需要前端配置路由表, 不需要后端的参与
兼容性好, 浏览器都能支持
hash值改变不会向后端发送请求, 完全属于前端路由
缺点
hash值前面需要加#, 不符合url规范,也不美观

history 模式的优缺点：
优点：
符合url地址规范, 不需要#, 使用起来比较美观
缺点：
兼容性不如 hash，且需要服务端支持重定向，否则一刷新页面就404了
兼容性比较差, 利用了 HTML5 History对象中新增的 pushState() 和 replaceState() 方法,需要特定浏览器的支持.

```

---

# vue 的路由懒加载是什么

---

文件中包含了所有的用户组件的 js 以及 css 代码，但用户可能根本不会浏览器到某些页面，也就是说根本不需要渲染某些组件，所以 vue-router 提供了一种路由懒加载机制，就是当某个路由规则匹配时，才会去加载下载并加载某个组件，此时可以提升首页的渲染速度.

路由懒加载实现的基础是组件引入方式的变化，需要使用 如下方式引入组件才可以

```javascript
  {
    path:'/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../page/home/HomeView.vue'),
   }
```

---

# vue 中怎么动态劫持属性

---

**在 vue2.0 中使用 Object.defineProperty( ) 来实现 vue 数据劫持这一行为.**

**数据劫持**:指的是在访问或者修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或者修改返回结果

```javascript
let vm = {
  name: "张三",
};
let vm = Object.defineProperty(vm, "name", {
  get() {
    console.log("get...");
    return "张三";
  },
  set(newValue) {
    console.log("set...");
    console.log("新值", newValue);
  },
});
// 多个属性 遍历数组
Object.keys(vm).forEach((key) => {
  let value = vm[key];
  Object.defineProperty(vm, key, {
    get() {
      console.log("get....");
      return value;
    },
    set(newV) {
      console.log("set....");
      if (newV !== value) {
        value = newV;
      }
    },
  });
});
```

**修改对象总结：**

```javascript
Object.defineProperty() 可以监测到属性的获取、修改，但是新增、删除监测不到
```

**修改数组总结：**

```javascript
//若执行的方法修改了原数组， Object.defineProperty() 监测不到数组的变化，但是若该方法不
修改原数组;
//返回一个新数组的时候， Object.defineProperty()就可以检测到数组的变化。
```

### Proxy：

在 Vue3.0 中将会通过 **Proxy** 来替换原本的 Object.defineProperty() 来实现数据响应式。Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。可以说 Proxy 是 defineProperty 的升级版。

```javascript
var newVm = new Proxy(vm, {
  get(target, key) {
    console.log("get.....");
    console.log(target);
    return target[key];
  },
  set(target, key, newV) {
    console.log("set.....");
    if (target[key] !== newV) {
      target[key] = newV;
    }
  },
});
```

**总结：**

**proxy 不需要对数组、对象进行比遍历，性能上比较好，而且可以完美的监听到任何方式的数据改变，唯一的缺陷就是浏览器的兼容性不好。**

---

# Vue2 的数据响应式缺陷

---

### 修改对象：

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。

可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property

```javascript
Vue.set(要修改的对象, 要修改的值, 修改值);
this.$set(this.someObject, "b", 2);
```

修改数组：【

1、vue 对于数组项是简单数据类型的情况没有劫持,这也导致了 vue 数组使用的一个问题，当数组项是简单数据类型时，修改数据项时视图并不会更新。

2、通过索引修改简单数据类型没有响应式

```
Vue.set(要修改的数组, 要修改的值, 修改值)
this.$set((this.数组, 要修改的值, 修改值)
```

![image-20220822171913416](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220822171913416.png)

```
因为es5的object.defineProperty无法监听对象属性的删除和添加
不能监听数组的变化，除了push/pop/shift/unshift/splice/spObject.definert/reverse，其他都不行
Object.defineProperty只能遍历对象属性直接修改(需要深拷贝进行修改)
```

---

# vue2 的双向数据绑定的原理是什么

---

```
vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
```

## vue3.0 怎么实现的双向数据绑定

## 何为双向数据流，单向数据流呢？

单向数据流

```
顾名思义，数据流是单向的。数据流动方向可以跟踪，流动单一，追查问题的时候可以更快捷。缺点就是写起来不太方便。要使 UI 发生变更就必须创建各种 action 来维护对应的 state
```

双向数据绑定

```
数据之间是相通的，将数据变更的操作隐藏在框架内部。优点是在表单交互较多的场景下，会简化大量与业务无关的代码。缺点就是无法追踪局部状态的变化，增加了出错时 debug 的难度。
```

## proxy 和 object.definepropoty 的区别

（1）Object.defineProperty 监听的是对象的每个属性，而 Proxy 监听的是对象本身。

（2）使用 Object.defineProperty 需要遍历对象的每个属性，而 Proxy 则直接代理对象，不需要遍历操作。

（3）Proxy 对新增属性也可以监听，Object.defineProperty 不可。

（4）Proxy 可以监听到数组的变化。

## proxy 为什么可以劫持到动态绑定的属性

---

# mixin 混入的使用情况

---

**什么是 Mixin 混入**

```
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
```

**场景运用：**

```
有两个非常相似的组件，他们的基本功能是一样的，但他们之间又存在着足够的差异性。他们可能会公用一部分业务逻辑，但是他们的页面结构又不相同。这个时候就可以使用mixin来让代码复用。（类似于JS库，暴露出来的方法达到函数复用的效果。又区别于JS库，它继承了vue中script所有对象，包括生命周期，data，methods）
```

---

## vue 项目的性能优化

```javascript
1、v-if 和 v-show 区分使用场景
2.computed 和 watch 区分使用场景
3.v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
4.事件及销毁
5.长列表以及不需要数据劫持的场景
```

---

# vuex 的使用流程

---

### vuex 官方解释：

```
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
```

**什么时候使用它？**

```
Vuex 可以帮助我们管理共享状态，并附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 store 模式就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。
```

一、创建 store 仓库

```javascript
import { createStore } from "vuex";
// ts声明接口
export interface CountState {
  n: number;
}

export default createStore({
  // 最好用模块，好管理
  modules: {
    count: {
      namespaced: true, // 开启命名空间
      state: {
        n: 1,
      },
      actions: {
        add({ commit }, { payload }) {
          //todo { commit }是store解构出来   {payload} 时传过来的参数，需要结构
          const action = {
            type: "addcount",
            payload,
          };
          commit(action);
        },
      },
      mutations: {
        addcount(state, action) {
          console.log(action); //todo  {type: 'count/add', payload: '23'}
          state.n += Number(action.payload);
          // state.n++
        },
      },
    },
  },
});
```

main.js 配置

```javascript
import store from "./store";
createApp(App).use(router).use(store).use(Antd).mount("#app");
```

组件内使用：

vue2.o 用法：辅助函数： mapState 获取值 mapMutations 获取同步方法 mapActions 调用异步方法

```javascript
  import { mapState, mapActions, mapMutations } from "vuex"

  computed: {
      ...mapState("count", {
        n: (state: any) => {
          return state.n;
        },
      }),
    },
    methods: {
      ...mapMutations("count", ["addcount"]),  // ...展开预算符
      ...mapActions("count", ["add"]),
    },
```

vue3.o 用法 使用 useStore hooks

```javascript
import { useStore } from "vuex";
setup(){
    const store = useStore();
   //todo computed 获取仓库值  不要忘记加上仓库名
    const n = computed(() => store.state.count.n);
   //todo 调用 store的 mutations 方法  store.commit({type:'仓库名/方法名'})
     const addcount = () => {
      store.commit({
        type: "count/addcount",
      });
    };
    //todo 调用 store的 mutations 方法  store.dispath({ type:'仓库名/方法名',payload:要传的参数 })
    const add = () => {
      store.dispatch({
        type: "count/add",
        payload: num.value,
      });
    };
}
```

数据渲染: 在挂载结束阶段调用仓库的 Actions 异步方法请求数据 - 在 commit mutations 改变数据

---

# 组件化和模块化的区别

---

模块化：给同一个功能业务的代码起一个模块名,然后负责对应的部分

```
模块化是从代码逻辑角度划分，把一些可复用的代码，抽离为单个模块，以便于项目的维护和开发保证职能化的单一。 比如登录模块，他的功能就是登录，注册功能又是一个模块
```

组件化：将可以复用的代码封成组件

```
组件化是从UI界面角度划分的，从页面上每看到一个独立的区域，都可以看作一个组件。前端组件化开发是便于组件的复用，把一些可复用的UI元素，抽离出来不断复用便于减少代码的书写
```

<img src="https://img-blog.csdnimg.cn/20201109161212372.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI1OTUzOTM3,size_16,color_FFFFFF,t_70#pic_center" alt="img" style="zoom:50%;" />

# webpack 的作用是什么

```javascript
// webpack是一种前端资源构建工具，一个静态模块打包器
// 由于浏览器解析不了es6及以上的语法，无法编译less/sacc等，所以我们需要各种插件去es6编译es5、将less编译成css，比较杂乱，所以就有了webpack将这些插件组合在一起
```

# webpack 的打包流程是什么

1.初始化一个管理包

```javascript
yarn init
```

2 、安装使用 webpack 所需要的依赖包

```javascript
yarn add webpack webpack-cli -D
```

3、 在 package.json 文件中配置 scripts(自定义命令)

```javascript
scripts: {
    "build": "webpack"
}
```

4、将新建的打包文件引入 webpack 的默认打包入口 src/index.js 中

5、在根目录下执行 yarn build 命令打包

---

# axios 是怎么封装的

---

**封装的好处**：

```javascript
// 1. 统一数据请求的处理
// 2. 考虑底层库将来可能会切换
// 3. 数据请求可能设计到一些业务逻辑
```

整体思维：

```
  1. timeout  + baseURL
  2. 拦截器
  3. request函数的封装
      1. 对参数的类型，对返回值的类型做约定
      2. 通过method不同，做对应的switch操作
```

创建 index 文件 【cookie 封装】用到了 cookie：

```javascript
function setCookie(name: string, value: string | number, n: number): void {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + n);
  document.cookie = name + "=" + value + ";expires=" + oDate;
}

function getCookie(name: string): string | undefined {
  var str = document.cookie;
  var arr = str.split("; ");
  for (var i = 0; i < arr.length; i++) {
    //console.log(arr[i]);
    var newArr = arr[i].split("=");
    if (newArr[0] == name) {
      return newArr[1];
    }
  }
}

function removeCookie(name: string): void {
  setCookie(name, 1, -1);
}

function People(name: string) {
  this.name = name;
}

export { getCookie, setCookie, removeCookie, People };
```

创建请求 request 文件：

```javascript

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs'; // 主要用于post请求，把请求参数转从 json换成 form date数据
import * as cookie from './index';

//todo 创建自定义请求实例
const ins: AxiosInstance = axios.create({
    timeout: 20000,
    baseURL: 'http://59.110.226.77:5000/api/private/v1/'
})

//todo 拦截器 发送请求时做操作
ins.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    //todo 携带token
    const token: string | undefined = cookie.getCookie('token')
    config.headers.common['Authorization'] = token; // 请求头配置token.方便后端验证
    return config;
}, (error: any): Promise<any> => {
    return Promise.reject(error)
})
//todo 拦截器  接收到请求时做操作
ins.interceptors.response.use((res: AxiosResponse<any>): AxiosResponse<any> => {
    return res.data;
}, (error: any): Promise<any> => {
    return Promise.reject(error)
})

interface IConfig {
    url: string;
    method?: string;
    data?: {
        [key: string]: any;
    },
    postType?: string;
}
const request = ({
    url,
    method = 'GET', //请求方法
    data,
    postType = 'form'  // formData请求方式
}: IConfig): Promise<AxiosResponse<any>> => {
    // 根据请求的类型来进行划分
    switch (method.toLocaleLowerCase()) {
        case 'post': // 一般作于增加
             // formData请求方式
            if (postType === 'file') {
                const p: FormData = new FormData(); //文件
                for (let key in data) { // 将data的所有参数全部给了p
                    p.append(key, data[key])
                }
                return ins.post(url, p)
            }
             // 普通post请求方式
            return ins.post(url, qs.stringify(data))
        case 'put': // 一般作于修改
            return ins.put(url, data)
        case 'delete': // 删除
            return ins.delete(url, { data })
        case 'patch':  // 更新数据
            return ins.patch(url, data);
        default: // get 查询
            return ins.get(url,{params: data})
    }
}
get：获取数据
post：提交数据（表单提交+文件上传）
put：更新数据（所有数据推送到后端）
patch：更新数据（只将更改的数据推送到后端）
delete：删除数据

export default request
```

---

# vue 怎么做反向代理跨域 vue.config.js 配置跨域

---

**主要流程：**

```javascript
 前端跨域 --- 反向代理 <hr>
    1. 首先反向代理要写在  vue.config.js  文件中  <br>
    2. 报什么错就是跨域问题  <hr>
    3. 易犯错地方 <br>
      3.1 代理标识 会起 <br>
      3.2 改了配置文件要重启项目  <br>
      3.3 请求的url要去掉域名和协议 <br>
    <button @click="send"> 发送数据请求 </button>
```

**创建 vue.config.js 文件： 【项目配置文件改了，必须重启项目】**

```javascript
 项目配置文件改了，必须重启项目
module.exports = {
  lintOnSave: false,
  devServer: {
    //todo proxy就是反省代理配置
    // https://m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=70CFC3A08B7911EB8E337BEC41DC7263F6E47DC364A54B0891A2A3D261F1FCD0&optimus_risk_level=71&optimus_code=10
    proxy: {
      // 代理路径【域名后的第一个路径】: 代理配置
      '/ajax': {
        // 目标源
        target: 'https://m.maoyan.com',
        changeOrigin: true,//使用我们当前的服务器源来代替目标源
      }
    }
  }
};

```

## 如何在相应拦截器中处理 token

```javascript
//todo 拦截器 发送请求时做操作
ins.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    //todo 携带token
    const token: string | undefined = cookie.getCookie("token"); //获取token
    config.headers.common["Authorization"] = token; // 请求头配置token.方便后端验证
    return config;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  }
);
//todo 拦截器  接收到请求时做操作
ins.interceptors.response.use(
  (res: AxiosResponse<any>): AxiosResponse<any> => {
    return res.data;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  }
);
```

## 项目：

### **图片地址变成变量注意点;：require**

需要 import 引入 或者 require（图片路径）

![image-20220822212304519](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220822212304519.png)

### amfe-flexible(可伸缩布局方案) postcss-pxtorem 进行移动端适配

```javascript
1.介绍amfe-flexible
// amfe-flexible是配置可伸缩布局方案，主要是将1rem设为viewWidth/10。
2.介绍postcss-pxtorem
// postcss-pxtorem是postcss的插件，用于将像素（px）单元生成rem单位。
```

具体步骤：
**1. 安装两个插件**

```
npm install amfe-flexible --save
npm install postcss-pxtorem --save
```

**2. 在 main.js 导入 amfe-flexible**

```
import 'amfe-flexible'
```

**在安装 postcss-pxtorem 的时候会生成一个文件.postcssrc.js**

```javascript

module.exports = {
          // 按照设计稿750px 的 1/2
        plugins: [
         "postcss-pxtorem"：{
             rootValue: 37.5, //根据设计稿宽度除以10进行设置，假设设计稿为375，即rootValue设为37.5
             propList: ['*'], //设置需要转换的属性，*为所有都进行转换
              // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
            }
         ]
}

5、在index.html头部加入手机端自适应meta
在首页中(项目中-public-index.html)中添加以下meta标签
<meta name="viewport" content="width=device-width, initial-scale=1.0">

```

---

5、在 index.html 头部加入手机端自适应 meta
在首页中(项目中-public-index.html)中添加以下 meta 标签

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

![image-20220822211329549](C:\Users\LL\AppData\Roaming\Typora\typora-user-images\image-20220822211329549.png)

### vue-lazyload 图片资源懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 vue-lazyload 插件：

（1）安装插件

```javascript
npm install vue-lazyload --save-dev
```

（2）在入口文件 man.js 中引入并使用

```javascript
import VueLazyload from "vue-lazyload";
```

然后再 vue 中直接使用

```javascript
Vue.use(VueLazyload);
```

或者添加自定义选项

```javascript
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "dist/error.png",
  loading: "dist/loading.gif",
  attempt: 1,
});
```

（3）在 vue 文件中将 img 标签的 src 属性直接改为 v-lazy ，从而将图片显示方式更改为懒加载显示：

```javascript
<img v-lazy="/static/img/1.png">
```

---

### 第三方插件的按需引入

我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 babel-plugin-component ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 element-ui 组件库为例：

（1）首先，安装 babel-plugin-component ：

```
npm install babel-plugin-component -D
```

（2）然后，将 .babelrc 修改为：

```javascript

{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

```

（3）在 main.js 中引入部分组件：

```java

import Vue from 'vue';
import { Button, Select } from 'element-ui';

Vue.use(Button)
Vue.use(Select)
```

---

**二，Webpack 层面的优化**

### 2.1、Webpack 对图片进行压缩

在 vue 项目中除了可以在 webpack.base.conf.js 中 url-loader 中设置 limit 大小来对图片处理，对小于 limit 的图片转化为 base64 格式，其余的不做操作。所以对有些较大的图片资源，在请求资源的时候，加载会很慢，我们可以用 image-webpack-loader 来压缩图片：

（1）首先，安装 image-webpack-loader ：

```javascript
npm install image-webpack-loader --save-dev
```

（2）然后，在 webpack.base.conf.js 中进行配置：

```javascript
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use:[
    {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      }
    }
  ]
}
```

用 element-ui 最新版 2.15.9 引入 form 表单 里面的 el-date-picker 【日期选择器】组件会报错：

```javascript
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
Instead, use a data or computed property based on the prop's value. Prop being mutated: "value"
从报错内容上来看，我们改动了子组件中引用的父组件的变量，也就是 props 中的数据，是不能这么操作的；
因为Vue的单项数据流，子组件不能改动父组件props传过来的值
```

解决：

```javascript
锁定组件，发现是 el-date-picker 组件抛出的警告。通过在 github 上搜索，最终找到了答案

问题出在了这个 PR 21806 增加了 props placement 用来适应位置，但是之前的代码 created 时有给 placement 赋值。

this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;

说白了之前 placement 是 data 的对象，现在变成 props 了，然后修改就报错了

降级
先卸载最新版
将最新版2.15.9 降级到 2.15.8
```

优化总结：

```javascript
//代码包优化

屏蔽sourcemap，vue.config.js里面设置productionSourceMap为false

对项目代码中的js,css,svg,ico文件进行gzip压缩，在vue-cli脚手架的配置信息中，有对代码进行压缩的配置项，例如index.js的通用配置，productionGzip设置为true，但是首先需要对compress-webpack-plugin支持

对路由组件进行懒加载，在router.js里面对组件进行按需加载

//2.源码优化

v-if和v-show的选择性调用。对频繁调用的，不需要权限的显示隐藏，可以选择v-show，减少系统开销。

对item设置唯一的key值

细分vuejs组件，尽可能组件化

减少watch的数据，有些情况可用vuex取代

内容类系统的图片资源按需加载

//3.用户体验优化

防抖节流实现（按钮点击，下拉刷新，下拉搜索，上拉加载，页面滚动等情况）

骨架屏加载

//4.cdn资源调用

引入的js,css,image用cdn地址来实现
```

## better-scroll 插件做滚动

安装 better-scroll

```
npm i 'better-scroll'
```

页面引入：

```html
import BScroll from 'better-scroll';
```

创建实例：

```java
 bs = new BScroll('.scroll-wrapper', {
                pullUpLoad: {  // 触底
                threshold: 100,
                },
                scrollX: false,
                scrollY: true,
                click: true, // 不阻止点击事件
               //  bounce: true, //回弹动画
              });
bs.on('pullingUp', () => {
               console.log("触底了") // 监听下拉是否到底，到底后就执行一次函数，可以获取新的数据
                 this.moreListAsync().then((res) => {
                 this.finishMore(res)
                })
             })
  bs.refresh();// 重新计算高度
 bs.finishPullUp();//告诉bs已经结束下拉行为，可以重新下拉；
```

项目可说难点： 【 **vue 组件中 click 事件失效** 】

解决：使用了 bette-[scroll](https://so.csdn.net/so/search?q=scroll&spm=1001.2101.3001.7020)插件做滚动。发现 better-scroll 的配置中没有设置 click：true，设置过之后 click 事件成功。

---

# Vue 中组件的封装

---

### 注册和使用一个组件

在 componet 下创建一个 button.vue 的文件，放置 button 组件代码。创建一个组建的 button 组件，，并且指定 name 为 oneButton。

```javascript
<template>
  <button class="one-button">按钮组件</button>
</template>

<script>
export default {
  name: "oneButton", //todo 设置名字方便注册
};
</script>
<style>
.one-button {
  width: 200px;
  height: 40px;
  background-color: rgb(70, 130, 241);
}
</style>
```

创建组件完成后，不能在项目中直接使用，需要到 main.js 中注册才可以使用。

```javascript
// 第一步：导入button组件
import OneButton from "./components/button.vue";

// 第二步：注册组件,设置(组件名，组件)
Vue.component(OneButton.name, OneButton);
```

注册完成后，组件就可以在项目中使用了。

```javascript
<template>
  <div>
    <one-button></one-button>
  </div>
</template>
```

---

### 封装一个 element-ui 风格的按钮

需要使用到的知识：

1. **组件通讯**
2. **组件插槽**
3. **props 校验**

参数支持：

| 参数名   | 参数描述                                        | 参数类型 | 默认值  |
| -------- | ----------------------------------------------- | -------- | ------- |
| type     | 按钮类型（primary/success/warning/danger/info） | string   | default |
| plain    | 是否是朴素按钮                                  | boolean  | false   |
| round    | 是否是圆角按钮                                  | boolean  | false   |
| circle   | 是否是圆形按钮                                  | boolean  | false   |
| disabled | 是否禁用按钮                                    | boolean  | false   |
| icon     | 图标类名                                        | string   | 无      |

事件支持：

| 事件名 | 事件描述 |
| ------ | -------- |
| click  | 点击事件 |

使用[插槽](https://so.csdn.net/so/search?q=插槽&spm=1001.2101.3001.7020)：

为何？ 凡是希望组件中内容可以灵活设置的地方，都需要用到 slot 插槽来自定义内容

按钮组件：

```php+HTML
<template>
  <button class="one-button">
   <span><slot></slot></span> //父组件可以随便定义内容了
  </button>
</template>
```

在使用时就可以直接输入文本，定义按钮文本内容了：

```html
<template>
  <div>
    <one-button>登录</one-button>
    <one-button>删除</one-button>
    <one-button>取消</one-button>
  </div>
</template>
```

#### 设置 button 组件的 type 属性 【让按钮支持 type 属性，使得按钮支持不同样式：】

第一步:父组件组件传递 type 属性

```html
<template>
  <div id="app">
    <div class="row">
      <one-button>按钮</one-button>
      <one-button type="primary">primary按钮</one-button>
      <one-button type="success">success按钮</one-button>
      <one-button type="info">info按钮</one-button>
      <one-button type="danger">danger按钮</one-button>
      <one-button type="warning">warning按钮</one-button>
    </div>
  </div>
</template>
```

第二步：子组件接收负组件传递的数据

```javascript
export default {
  name: 'oneButton',
  // 此时对props进行校验，值接收string类型的type值
  props: {
    type:{
      type: String，
      // 设置默认值：如果不传值，那么使用default
      default: 'default'
    }
  },
  created () {
    console.log(this.type)//defalut primary success info danger warning
  }
}
```

### button 组件的 plain 属性 【添加多类名】

第三步:通过绑定类名的方法动态控制样式，由于 plain 类型是布尔值，所以在类型中我们使用对象的形式来控制样式

```html
<template>
  <button
    class="one-button"
    :class="[`one-button-${type}`,{
    'is-plain':plain
  }]"
  >
    <span><slot></slot></span>
  </button>
</template>
```

第四步：设置不同类型的样式，由于 plain 类型是以对象的形式在类中定义的，所以使用获取属性的方法定义样式

```stylus

// 朴素按钮样式
.one-button.is-plain{
  &:hover,
  &:focus{
    background: #fff;
    border-color: #489eff;
    color: #409eff;
  }
}
.one-button-primary.is-plain{
  color: #409eff;
  background: #ecf5ff;
  &:hover,
  &:focus{
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
.one-button-success.is-plain{
  color: #67c23a;
  background: #c2e7b0;
  &:hover,
  &:focus{
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}
```

### button 组件的 round 属性 button 组件的 circle 属性

设置 round 属性和之前的相似，只要在组件中定义好了样式，动态获取属性值即可。

```vue
circle: { type: Boolean, default: false }
```

### button 组件中使用字体图标

```vue
首先需要有字体图标，我们可以去阿里巴巴矢量图标库下载。

在asset目录下新建一个fonts目录，存放我们下载到的字体图标

在main.js中引入字体图标
import './assets/fonts/iconfont.css'

将下载的字体图标css文件中的类名做修改，我将icon全部改为了one-icon，并且将初始的iconfont类改为了[class*='one-icon']，当类名中有one-icon时使用，如下

[class*='one-icon'] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.one-icon-bluetoothoff:before {
  content: "\e697";
}

父组件传递图标名，子组件接收并且放到图标中
父组件传值：
      <one-button icon="bluetoothon"></one-button>
      <one-button type="primary" icon="camera">照相机</one-button>
      <one-button type="success" icon="course"></one-button>
      <one-button type="info" icon="bluetooth_link"></one-button>
子组件接收：
 icon: {
      type: String,
      default: ''
    }
使用接收到的字体图标。在没有传入icon时隐藏<i>标签，在slot插槽没有传入值时，不显示<span>标签
 <button class="one-button" :class="[`one-button-${type}`,{
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
  }]">
  <i v-if="icon" :class="`one-icon-${icon}`"></i>
  <!-- 如果没传入文本插槽，则不显示span内容 -->
   <span v-if="$slots.default"><slot></slot></span>
  </button>

  设置icon配套样式，使图标和文字之间有一定间隔
  .one-button [class*=one-icon-]+span{
  margin-left: 5px;
}

```

---

### button 组件中的点击事件

我们在使用组件时，直接给组件定义事件是不会被触发的。我们需要在组件中定义一个点击事件，这个点击事件不进行其他操作，只出发父组件中的点击事件。

组件中的定义点击事件：

```HTML
<template>
  <button class="one-button" :class="[`one-button-${type}`,{
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
  }]"
  @click="handleClick"
  >
  <i v-if="icon" :class="`one-icon-${icon}`"></i>
  <!-- 如果没传入文本插槽，则不显示span内容 -->
   <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
```

定义一个点击事件，这个点击事件的作用是调用父组件中的点击事件，并且回调

```javascript
methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
```

父组件在使用时定义自己的点击事件，其本质是子组件中的点击事件触发父组件中的点击事件。

```javascript

<div class="row">
  <one-button @click="getInfo">按钮</one-button>
</div>
  methods: {
    getInfo () {
      console.log('获取信息！！')//获取信息！！
    }
  }
```

---

### button 组件中的 disabled 属性

和之前相似，只要父子组件传值并且动态获取这个值并且赋给 disabled 属性,并且设置一个 disabled 样式即可。

父组件

```html
<div class="row">
  <one-button @click="getInfo" disabled>按钮</one-button>
</div>
```

子组件

```html
<template>
  <button
    class="one-button"
    :class="[`one-button-${type}`,{
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled
  }]"
    @click="handleClick"
    :disabled="disabled"
  >
    <i v-if="icon" :class="`one-icon-${icon}`"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
// props disabled: { type: Boolean, default: false } // css
.one-button.is-disabled{ cursor: no-drop; }
```

## [axios](https://so.csdn.net/so/search?q=axios&spm=1001.2101.3001.7020)拦截器

请求拦截器、响应拦截器

1. 请求拦截器 在请求发送前进行必要操作处理，例如添加统一 cookie、请求体加验证、设置请求头等，相当于是对每个接口里相同操作的一个封装；
2. 响应拦截器 同理，响应拦截器也是如此功能，只是在请求得到响应之后，对响应体的一些处理，通常是数据统一处理等，也常来判断登录失效等。
