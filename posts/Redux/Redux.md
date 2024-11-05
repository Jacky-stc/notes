---
title: Redux
tags: [Redux]

---

## Redux
Redux是一個基於Flux運行模式的第三方套件，協助我們對於React中的狀態(state)進行管理與更新

> Flux運行模式
![image](https://hackmd.io/_uploads/S1E_hWKg1e.png)


- Redux makes code more predictable, testable, and maintainable by consolidating state in a single object. Components are just given data to render and can request changes using events called actions.

In a Redux application, data flows in one direction: from state to view to action back to state, and so on.
    

- State is the current information behind a web application.

- An action is an object describing an event in the application. It must have a type property and it typically has a payload property as well.

- A reducer is a function that determines the application’s next state given a current state and a specific action. It returns a default initial state if none is provided and returns the current state if the action is not recognized

--- 
- A reducer must follow these three rules:

    - They should only calculate the new state value based on the existing state and action.
    - They are not allowed to modify the existing state. Instead, they must copy the existing state and make changes to the copied values.
    - They must not do any asynchronous logic or other “side effects”.

In other words, a reducer must be a **pure function**, and it must update the state **immutably**.

---
### 什麼是store
可以把store想成是你的app state的一個中心database，這個store是不可變動的(immutable)，也就是說無法直接改變它的資料，必須透過dispatch(派發)用戶的actions來做state的更新

The store is a container for state, it provides a way to dispatch actions, and it calls the reducer when actions are dispatched. Typically there is only one store in a Redux application.