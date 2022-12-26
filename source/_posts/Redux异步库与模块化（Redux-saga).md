---
title: React小记【Redux异步库与模块化】
categories:
  - React
tags:
  - React笔记
index_img: /img3/lc.jpg
banner_img: /img3/gqj2.jpg
---

# **Redux 异步库与模块化（Redux-saga)**

---

**安装初始化后创建 sagas.js 文件（负责协调那些复杂或者异步的操作）【使用了 generator 函数，redux-saga 让你可以用 同步的方式来写异步代码】**

```javascript
import { takeEvery, put, call } from "redux-saga/effects";
import { ratedApi } from "../../../utils/api";

function* addAction(action) {
  // todo put相当于组件的dispatch
  console.log(action);
  yield put({ type: "add", num: action.num });
}

function* addload(action) {
  // todo put相当于组件的dispatch
  // todo call做数据请求
  console.log(action);
  const res = yield call(ratedApi); // 同await用法
  yield put({ type: "load", payload: res.result });
}
function* mySaga() {
  // todo takeEvery接收两个参数
  // todo 分配type值
  yield takeEvery("takeAdd", addAction);
  yield takeEvery("takeload", addload);
}

export default mySaga;
```

**index.js 总输出文件：**

```javascript
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
// todo 引入saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas"; // 引入总的saga.js文件
const sagaMiddleware = createSagaMiddleware(); //创建中间件实例
const store = createStore(reducer, applyMiddleware(sagaMiddleware)); //当作第二个参数传入
sagaMiddleware.run(rootSaga); //运行起来
export default store;
```

组件的使用：【useSelector, useDispatch】代替【connect 中间件】

```javascript
// todo useSelector, useDispatch用于将仓库的属性和方法映射到组件
import { useSelector, useDispatch } from "react-redux";
const count = useSelector((state) => state.city.count); //调用仓库的数据
const ratedList = useSelector((state) => state.city.ratedList); //调用仓库的数据
const dispatch = useDispatch(); // 调用仓库的方法
useEffect(() => {
  dispatch({ type: "takeLoad", payload: { a: 3 } });
  // eslint-disable-next-line []报错加上
}, [dispatch]);
```

# Redux 模块化

---

将大的 store 仓库拆分多个小仓库，每个需要的子组件内部都可以创建 store 小仓库【只需创建 reducer 函数和 saga.js 异步文件】，再合并到总的 reducer 和 rootSaga

<font color='Salmon '>combineReducers    用来合并 reducer</font>

```javascript
import { combineReducers } from "redux";

import cityReducer from "../pages/city/store/reducer";

const reducer = combineReducers({
  city: cityReducer,
});

export default reducer;
```

<font color='Salmon '>all 用于合并 sagas</font>

```javascript
import { all } from "redux-saga/effects";

import citySaga from "../pages/city/store/sagas";

function* rootSaga() {
  yield all([citySaga()]);
}

export default rootSaga;
```

**子组件使用: 【同 vuex 的模块化一样，使用数据需要加上仓库名，方法不需要】**

```javascript
const ratedList = useSelector((state) => {
  return state.city.ratedList; // 加上仓库名称
});
```

---
