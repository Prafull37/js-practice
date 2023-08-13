/**
 * let c = circuitBreaker(t, 3, 200);

c(); // "error"
c(); // "error"
c(); // "error"

// service is closed for 200 MS
c(); // "service unavailable" 
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"

// service becomes available after 300ms
setTimeout(() => {console.log(c());}, 300); // "hello";

 */

function circuitBreaker(fn,count,timeout){
    let totalFailure =0;
    let lastFailureTime;
    let lastExecutionTime;

    return function(...args){
        let currentTime = Date.now();
        try{
            if(currentTime-lastFailureTime>timeout){
                totalFailure=0;
            }

            if(totalFailure>=count) throw "Service unavailalbe";

            lastExecutionTime= Date.now();
            const value =  fn.apply(this,...args)
            return value;
        }catch(e){
            totalFailure=totalFailure+1;
            lastFailureTime=lastExecutionTime;
            console.log("circuit breaker", e);
        }
    }
}

// test function
const testFunction = () => {
    let count = 0;
    
    return function(){
      count++;
      if(count < 4){
        throw "failed";
      }else{
        return "hello";
      }
    }
  };
  
  
let t = testFunction();

let c = circuitBreaker(t, 3, 200);

function execute(){
    try{
        c();
        c();
        c();
        c();
        c();
        c();
        setTimeout(() => {console.log(c());}, 300); // "hello";

    }catch(e){
    
    }
}
execute();



