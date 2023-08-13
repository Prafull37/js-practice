function myCurry(fn){
    // Storing the argument length of original function
    const argumentLength = fn.length;
    //storing all the arguments 
    let totalArgs=[];
    let value;
    return function curriedWrapper(...args){
       totalArgs=[...totalArgs,...(args||[])];
       //if value is already generated then return value. If we call curried function without any parameter after all arguments are passed
       if(value) return value;
       //checking the length of total arguments recieved
       if(totalArgs.length=== argumentLength){
            // maintaining this and passing all arguments to the function
            value = fn.call(this,...totalArgs);
            return value;
       }

       //returning the function until all arguments are passed
       return curriedWrapper
    }
}

const sum=(a,b,c)=>{
    return a+b+c;
}

const curriedSum = myCurry(sum);

curriedSum(1);
curriedSum(2);
console.log("curried value",curriedSum(3));
console.log("curried value with last",curriedSum());

