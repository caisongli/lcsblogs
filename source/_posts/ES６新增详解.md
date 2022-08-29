---
title: ES6新增详解
---

# ES6 新增详解

## let 声明变量和 const 声明常量，两个都有块级作用域

```
ES5中是没有块级作用域的，并且var有变量提升，在let中，使用的变量一定要进行声明
```

## 箭头函数

```
ES6中的函数定义不再使用关键字function()，而是利用了()=>来进行定义

特点：箭头函数中的this始终指向箭头函数定义时的离this最近的一个函数，如果没有最近的函数就指向window。
```

## 模板字符串

```
模板字符串是增强版的字符串，用反引号（`）标识，可以当作普通字符串使用，也可以用来定义多行字符串
```

## 解构赋值

```
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值
```

## for ... of...循环

```Java
for…of循环可以遍历数组、Set和Map结构、某些类似数组的对象、对象，以及字符串
应用场景
//arguments是个类数组对象，通常先要将其转换为数组才能遍历，但for...of可以直接遍历
```

## import、export 导入导出

```
ES6标准中，Js原生支持模块(module)。将JS代码分割成不同功能的小块进行模块化，将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用
```

### set 数据结构

- **方法：**add()、delete()、has()、clear()

```
Set数据结构，类似数组。所有的数据都是唯一的，没有重复的值。它本身是一个构造函数
```

应用 【数组去重、并集（Union）、交集（Intersect）和差集（Difference】

```
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]

2、并集（Union）、交集（Intersect）和差集（Difference）
```

## … 展开运算符

```
可以将数组或对象里面的值展开；还可以将多个值收集为一个变量
```

## 应用 【合并数组、浅拷贝数组、类数组转数组、使用 Math 函数判断最大最小】

```
1. 合并数组

arr1.push(...arr2) // 将arr2 追加到数组的末尾
arr1.unshift(...arr2) // 将arr2 追加到数组的开头

2. 拷贝数组

var arr = [1,2,3];
var arr2 = [...arr]; // 和arr.slice()差不多
arr2.push(4)
//记住：数组中的对象依然是引用值，所以不是任何东西都“拷贝”过去了。

3.将arguments或者NodeList转换为Array

var myFn = function(...args) {
// ...
```

## 修饰器 @ 【比如 vue 的事件修饰符 代替 v-on:】

```
decorator【待 科 ra 腾】是一个函数，用来修改类甚至于是方法的行为。修饰器本质就是编译时执行的函数
```

## class 类的继承

### ES6 中不再像 ES5 一样使用原型链实现继承，而是引入 Class 这个概念 extends【继承】

```
class Person{} 父类
class Worker extends Person{
constructor(name, age,job) {
         super(name, age);
          this.job = job;
    }
}  子继承父类
```

---

## promise

Promise 是 ES6 提出的一种解决异步编程的方案，比传统的解决方案（回调函数和事件）更合理、强大

它有三种状态，分别是 pending-进行中、fulfilled-已完成、rejected-已失败。

【 可以链式调用解决回调地狱问题 】

Promise 的实例方法有 .then()/.catch() /finally() 三种，

静态方法有 all / race / allSettled [塞抖~] / any / resolve / reject 六种

```javascript
Promise.prototype.then()
Promise.prototype.catch()
Promise.prototype.finally() // 不管 Promise 对象最后状态如何，都会执行的操作。
Promise.all()  // 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。所有参数数组 Promise 实例执行 resolve 回调后，新实例执行 resolve 回调；如果中间有任何一个 Promise 实例执行 reject 回调，那么新实例就直接执行 reject 回调了。
Promise.race)  //顾名思义，就是竞赛，返回最快完成那一个 Promise 实例。只要参数数组中有一个 Promise 实例执行 resolve 回调或 reject 回调后，新实例就直接返回结果。
Promise.allSettled( ) // 方法只有等到 参数 数组 的所有 Promise 实例都发生状态变更，返回的 Promise 实例才会发生状态变更，无论是执行 resolve 回调还是 reject 回调的状态。
'有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。
Promise.any()  // 返回任意一个最快执行 resolve 回调的 Promise 实例。
Promise.resolve()  // 方法返回一个以给定值解析后的 Promise 实例。相当于执行 then 方法里面的 _resolvePromise。
Promise.reject() // 方法返回一个带有拒绝原因的 Promise 实例。

```

---

## Symbol

是一种基本类型。Symbol 通过调用 symbol 函数产生，它接收一个可选的名字参数，该函数返回的 symbol 是唯一的

- Symbol 的值是唯一的，常用来解决命名冲突问题。
- Symbol 的值不能和其他数据进行运算。

应用场景：

```javascript
应用场景1：使用Symbol来作为对象属性名(key)

应用场景2：使用Symbol来替代常量

应用场景3：使用Symbol定义类的私有属性/方法

//正常的 Symbol
let h1 = Symbol('小宝')
let h2 = Symbol('小宝')
console.log(h1 === h2) // false

//相等的Symbol   ----使用 Symbol.for()
let h3 = Symbol.for('小宝')
let h4 = Symbol.for('小宝')
console.log(h1 === h2) // true

```

## Map

`Map`类型是键值对的有序列表，而键和值都可以是任意类型

- **属性和方法：**size()、set()、get()、has()、delete()、clear()

```javascript

 // 声明Map
         let m = new Map()
 ​
         // 1.添加元素(键值对)
         m.set('name','小宝')
         m.set('age',18)
 ​
         // 2.获取元素
         console.log(m.get(name)) //小宝
 ​
         // 3.删除元素
         m.delete('name')
 ​
         // 4.获取元素个数
         let size = m.size
         console.log(size) //1
 ​
         // 5.检测是否包含某个元素
         console.log(m.has('age')); //true

         // 6.清空Map
         m.clear()
         console.log(m) //0

```

---

## Proxy 代理

使用代理（Proxy）监听对象的操作，然后可以做一些相应事情

```javascript

ES6原生提供了Proxy构造函数，用来生成Proxy实例。

var proxy = new Proxy(target, handler);
Proxy对象的所有用法，都是上面的这种形式。不同的只是handle参数的写法。其中new Proxy用来生成Proxy实例，target是表示所要拦截的对象，handle是用来定制拦截行为的对象。

var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
上面是一个拦截读取属性的行为的例子。要使Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象（target）进行操作。

```

---
