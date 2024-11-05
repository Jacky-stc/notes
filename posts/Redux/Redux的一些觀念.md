---
title: Redux的一些觀念
tags: [Redux]

---

## Redux的一些觀念

### 關於State Immutable這件事
在原生的Redux中，state都是immutable的，也就是我們在操作actions時不應該直接去改變原本的state，而是返還一個全新的物件，像是這樣
```javascript
function insertItem(array, action) {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index)
  ]
}
// 不去變動原本的array物件，而是透過運算展開符創建並返回一個全新的array
```
但是有趣的事情是，如果用這個方式結合redux toolkit來寫reducers可能是***錯的***
#### Redux Toolkit與Immer
Immer是一個第三方套件，簡化了更新immutable物件的過程。

Immer提供了一個funciton叫做`produce`，他會接收兩個參數，一個是你原始的`state`，另一個是一個`callback function`，這個`callback function`會建立一個原始`state`的範本，並且透過更新並返還這個範本來避免對原始資料做更動。

Redux Toolkit會自動套用Immer，讓你可以在撰寫mutating語法的時候對於immutable state做更新，簡化了複雜的撰寫流程

所以如果想要在Redux Toolkit中更新state，可以直接以mutating的語法撰寫即可
```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
        //  可以直接使用Array.push()語法而不用擔心會直接更動到原本的state
    },
  },
});
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
```
Redux Toolkit中的createSlice會「期待」你使用mutating的寫法，所以如果你堅持要以immutable的寫法甚至會有type error
```javascript
addTodo: (state, action)=>{
            return {
                ...state,
                todos:[...state.todos, action.payload],
            }
        },
```
```javascript
// Error
Type '(state: WritableDraft<{ todos: never[]; }>, action: { payload: any; type: string; }) => { todos: any[]; }' is not assignable to type 'CaseReducer<{ todos: never[]; }, { payload: any; type: string; }> | CaseReducerWithPrepare<{ todos: never[]; }, PayloadAction<any, string, any, any>>'.
  Type '(state: WritableDraft<{ todos: never[]; }>, action: { payload: any; type: string; }) => { todos: any[]; }' is not assignable to type 'CaseReducer<{ todos: never[]; }, { payload: any; type: string; }>'.
    Type '{ todos: any[]; }' is not assignable to type 'void | { todos: never[]; } | WritableDraft<{ todos: never[]; }>'.
      Type '{ todos: any[]; }' is not assignable to type 'WritableDraft<{ todos: never[]; }>'.
        Types of property 'todos' are incompatible.
          Type 'any[]' is not assignable to type 'never[]'.
            Type 'any' is not assignable to type 'never'.ts(2322)
```

隨然這樣幾乎可以完全避免mutating state的問題，但是可能會讓許多人在學習與撰寫Redux reducers的過程中忽略了**State Immutable**這個非常重要且核心的Rule

---
### Redux基本概念
Redux主要由幾個部分所構成：Store、Reducer、Action
* **Action**
    Action是一個plain JavaScript object，他描述了網站所發生的行為
    ```javascript
    { type: 'ADD_TODO', text: 'Go to swimming pool' }
    { type: 'TOGGLE_TODO', index: 1 }
    { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
    ```
    我們通過Dispatch(發送)Actions到Reducers去改變State

* **Reducer**
    Reducer就是一個一個的function，將`Action`以及`State`作為參數並且回傳新的State，以此來達成修改State的目的
    ```JavaScript
    function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
        return action.filter
      } else {
        return state
      }
    }

    function todos(state = [], action) {
      switch (action.type) {
        case 'ADD_TODO':
          return state.concat([{ text: action.text, completed: false }])
        case 'TOGGLE_TODO':
          return state.map((todo, index) =>
            action.index === index
              ? { text: todo.text, completed: !todo.completed }
              : todo
          )
        default:
          return state
      }
    }
    ```
    我們也會創建一個Reducer將所有的Reducers集中在一起
    ```javascript
    function todoApp(state = {}, action) {
      return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
      }
    ```
* **Store**
    Store負責管理所有的Reducers，可以把它想像成app state的一個database，在一個application中「**只會有一個Store**」
    Redux Toolkit提供了`configureStore`函數，可以簡化store的創建和配置
    ```javascript
    // 原生 Redux 需要這樣寫
    import { createStore, applyMiddleware, combineReducers } from 'redux';
    import thunk from 'redux-thunk';
    import rootReducer from './reducers';

    const store = createStore(
      combineReducers(rootReducer),
      applyMiddleware(thunk),
    );

    // RTK 則簡化為：
    import { configureStore } from '@reduxjs/toolkit';

    const store = configureStore({
      reducer: rootReducer,
    });

    ```
    