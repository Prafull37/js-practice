var myPromise= function(executor){
    let self = this;

    self.state = "pending"
    self.onFulfilCallbackQueue = [];
    self.onRejectCallbackQueue= [];

    function resolve(value){
        self.state = "fulfiled";
        self.value = value
        self.onFulfilCallbackQueue.forEach((callback)=>{
           self.value = callback(self.value)
           return self.value
        })
    }

    function reject(reason){
        self.state = "rejected";
        self.reason = reason
        self.onRejectCallbackQueue.forEach((callback)=>{
           self.reason = callback(self.reason)
        })
    }


    executor(resolve,reject)
}

myPromise.prototype.then = function(onFulfil,onReject){
    var self= this;
    if(typeof onFulfil === "function"){
        self.onFulfilCallbackQueue.push(onFulfil)
    }
    if(typeof onReject === "function"){
        self.onRejectCallbackQueue.push(onReject)
   }
     return self;
 }

 myPromise.prototype.catch = function(onReject){
    if(typeof onReject === "function"){
        onRejectCallbackQueue.push(onReject)
    }
    return self;
}


myPromise.resolve= function(value){
    const testValue = new myPromise((resolve)=>resolve(value));
    console.log("Resolve Test Value",testValue);
    return testValue
}

myPromise.reject= function(value){
    return new myPromise((_,reject)=>reject(value))
}

const myPromiseTest = new myPromise((resolve,reject)=>{
    const value = 0.6;

    setTimeout(()=>{
        console.log("Executing Set Timeout");
        if(value<0.5){
            console.log("Rejecting...");
            reject(2)
        }else{
            console.log("Resolving...");
            resolve(6)
        }
    },4000)
})

myPromiseTest.then((value)=>{
    console.log("First then called",value);
    return value*2;
}).then((value)=>{
    console.log("second then called",value);
    return value*2
})

console.log("myPromiseTest",myPromiseTest)

console.log (myPromise.resolve(4))
console.log (myPromise.reject(120))
