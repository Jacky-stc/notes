---
title: Redux-Persist問題
tags: [Redux]

---

## Redux-Persist問題
在import storage的時候遇到問題
```javascript
import storage from 'redux-persist/lib/storage'
```
```powershell!
Could not find a declaration file for module 'redux-persist/lib/storage'. 'c:/Users/88696/Desktop/training/practice/redux/node_modules/redux-persist/lib/storage/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/redux-persist` if it exists or add a new declaration (.d.ts) file containing `declare module 'redux-persist/lib/storage';`ts(7016)
```
解決方法
在`next-env.d.ts`檔案加入
```typescript
/// <reference types="redux-persist" />
```
Explanatation:

Triple-slash directives in typescript are single-line comments containing a single XML tag. The contents of the comment are used as compiler directives.

These directives are utilised to declare a dependency on a package, which could be type, lib, path, etc..

The process of resolving these package names is similar to the process of resolving module names in an import statement. An easy way to think of triple-slash-reference-types directives are as an import for declaration packages.

For instance, in the code above, including /// <reference types="redux-persist" /> in a declaration file declares that this file uses names declared in @types/node/redux-persist.d.ts; and thus, this package needs to be included in the compilation along with the declaration file.