---
title: JavaScript Array functions
tags: [JavaScript]

---

## JavaScript Array functions
### Array.filter(callbackFn, args)
這個function簡單來說就是「符合callback function條件的留下來」
```javascript
const numArray = [1,2,3,4,5,6,7];
const filteredArray = numArray.filter((num)=> num >= 4);
console.log(filteredArray)
// [4,5,6,7]
```
