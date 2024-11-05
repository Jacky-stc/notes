---
title: Debounce in JavaScript
tags: [JavaScript]

---

## Debounce
在前端開發的過程中，經常會遇到需要透過前端發送API request至後端獲取資料，像是按鈕點擊或是輸入搜尋等功能。

最完美且簡易的情況下是針對每一次事件偵測發送一個API request到後端，並且實時更新資料，但是你可以想像當用戶在輸入欄位不斷地輸入並刪除，且同時間可能有上萬名用戶在使用這個功能的時候，會給網站後端帶來多大的負擔，顯然這並不是一個理想的做法，此時就可以透過Debounce（防抖）來對發送request的過程進行限制。

### What is Debounce
Debounce其實來自於電子學，當你按下電視遙控的按鈕後，這個訊號會快速地傳導至遙控中的微晶片(microchip)，由於訊號傳導的速度太快，以至於在你鬆開按鍵之前會多次紀錄，為了解決這個問題，一旦接收到來自按鈕的訊號，微晶片就會停止處理來自按鈕的訊號幾微秒。

### Debounce in JavaScript
Debounce在JavaScript中也是類似的功能，我們需要在觸發某個function後短暫停止一段時間，當時間內沒有新的事件觸發我們才會執行我們想要執行的function。

以下是Debounce在JavaScript的實作
```javascript
const debounce = (cb, time=300)=>{
//     我們需要在debounce傳入一個我們希望執行的callback function，以及延遲的時間，預設是300毫秒
    let timer;
    return (...args)=>{
        
    }
}
```
