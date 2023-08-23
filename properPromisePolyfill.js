const waitFunction = () => {
  return new Promise((resolve)=>{
    console.log("step-1")
    setTimeout(() => {
      console.log("step-2")
      resolve(true);
    }, 2000);
  })
}

const runner = async () => {
  console.log("step-0")
  waitFunction();
  console.log("step-3")
}

runner();
console.log("step-4");