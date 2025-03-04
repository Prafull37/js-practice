import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
// import MyPromise from './code/myCustomPromise.js'
import taskRunner from './code/taskRunner.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


// const results=[]
// let currentPerformance
// const promise = new MyPromise((resolve) => {

//   console.log("Inside Promise before resolving");
//   currentPerformance=performance.now();
//   resolve(42);
//   console.log("new perf",performance.now()-currentPerformance)
//   console.log("Inside Promise after resolving");
// }).then((value)=>{
//   console.log("new more pef",performance.now()-currentPerformance)
// })



// console.log("promise",promise)

taskRunner();