const PROMISE_STATE = {
    PENDING:"pending",
    FULFILED:"fulfiled",
    REJECTED:"rejected"
}


  

// function MyPromise(executor){
//     // assigned self to this for not loosing context
//     let self=this || {}
//     let allCallbacksByType=[];
//     let currentExecutionIndex=-1;
//     self.state = PROMISE_STATE.PENDING;
//     self.value;



//     const findNextExecutableFn=()=>{
//         while(currentExecutionIndex<allCallbacksByType.length-1){
//             const currentFn = allCallbacksByType[currentExecutionIndex];

//             // console.log("currentFn",currentFn)
    
//             if(currentFn.type === "finally"){
//                 return currentFn.callback
//             }
    
//             if(self.state === PROMISE_STATE.FULFILED){
//                 if(currentFn.type === "then" && (currentFn.callback !== null || currentFn.callback !== undefined)){
//                     return currentFn.callback
//                 }
//             }
//             if(self.state === PROMISE_STATE.REJECTED){
//                 if(currentFn.type === "catch"){
//                     return currentFn.errorCallback
//                 }
//                 if(currentFn.type === "then" && (currentFn.errorCallback !== null || currentFn.errorCallback !== undefined)){
//                     return currentFn.errorCallback;
//                 }
//             }
//             currentExecutionIndex++;
//         }
//         return null
//     }

//     const executeCallbacks=()=>{
//         if(currentExecutionIndex !== allCallbacksByType.length-1){
//             currentExecutionIndex++;
//             const callback = findNextExecutableFn();
//             if(callback){
//                 queueMicrotask(()=>{
//                     const value = callback(self.value);
//                     try{
//                         if(value instanceof MyPromise){
//                             value.then(resolveFn,rejectFn)
//                         }else{
//                             self.state = PROMISE_STATE.FULFILED;
//                             self.value = value;
//                             executeCallbacks();
//                         }
//                     }catch(e){
//                         self.state = PROMISE_STATE.REJECTED;
//                         self.value = value;
//                         executeCallbacks();
//                     }
                  
//                 })
//             }
           
//         }
//     }


//     //microtask will kick in when the user will hit either resolve,reject
//     function resolveFn(value){
//         queueMicrotask(()=>{
//             self.value = value
//             self.state = PROMISE_STATE.FULFILED;
//             executeCallbacks();
//         })
//     }

//     function rejectFn(error){
//         queueMicrotask(()=>{
//             self.value = error;
//             self.state = PROMISE_STATE.REJECTED;
//             executeCallbacks();
//           })
//     }

//     function registerCallback(type,callback,errorCallback=null){
//         allCallbacksByType.push({type,callback,errorCallback})
//     }


//     function thenHoF(callback){
//         return (value)=>{
//             try{
//                 const finalValue = callback(value);
//                 self.value = finalValue || self.value;
//                 self.state = PROMISE_STATE.FULFILED;
//                 executeCallbacks();
//             }catch(e){
//                 self.state = PROMISE_STATE.REJECTED;
//                 self.value = e;
//                 executeCallbacks();
//             }
//         }
//     }
    
//     function catchHoF(callback){
//         return (value)=>{
//             try{
//                 const finalValue = callback(value);
//                 self.value = finalValue || self.value;
//                 self.state = PROMISE_STATE.FULFILED;
//                 executeCallbacks();
//             }catch(e){
//                 self.state = PROMISE_STATE.REJECTED;
//                 self.value = e;
//                 executeCallbacks();
//             }
//         }   
//     }
    
//     function finallyHoF(callback){
//         return ()=>{
//             try{
//                 callback();
//                 executeCallbacks();
//             }catch(e){
//                 self.state = PROMISE_STATE.REJECTED;
//                 self.value = e;
//                 executeCallbacks();
//             }
//         }
//     }


//     //include then and catch
//     const thenFn=(onResolveFn,onRejectFn)=>{
//         registerCallback("then",thenHoF(onResolveFn),catchHoF(onRejectFn))
//         resolveFn(self.value)
//     }

//     const catchFn = (onRejectFn)=>{
//         registerCallback("catch",null,catchHoF(onRejectFn))
//         rejectFn(self.value)
//     }

//     const finallyFn=(onFinallyFn)=>{
//         registerCallback("finally",finallyHoF(onFinallyFn))
//         if (self.state === PROMISE_STATE.FULFILLED) resolve(self.value);
//         if (self.state === PROMISE_STATE.REJECTED) reject(self.value);
//     }

//     Object.setPrototypeOf(self,{then:thenFn,catch:catchFn,finally:finallyFn})

//     try {
//         executor(resolveFn, rejectFn);
//     } catch (error) {
//         rejectFn(error);
//     }
//     return self
// }





function MyPromise(executor) {
    let self = this || {};
    let allCallbacksByType = [];
    let currentExecutionIndex = -1;
    self.state = PROMISE_STATE.PENDING;
    self.value = undefined;

    const findNextExecutableFn = () => {
        while (currentExecutionIndex < allCallbacksByType.length) {
            const currentFn = allCallbacksByType[currentExecutionIndex];

            if (currentFn.type === "finally") {
                return currentFn.callback;
            }

            if (self.state === PROMISE_STATE.FULFILLED && currentFn.type === "then" && currentFn.callback) {
                return currentFn.callback;
            }

            if (self.state === PROMISE_STATE.REJECTED) {
                if (currentFn.type === "catch") {
                    return currentFn.errorCallback;
                }
                if (currentFn.type === "then" && currentFn.errorCallback) {
                    return currentFn.errorCallback;
                }
            }

            currentExecutionIndex++;
        }
        return null;
    };

    const executeCallbacks = () => {
        if (currentExecutionIndex < allCallbacksByType.length - 1) {
            currentExecutionIndex++;
            const callback = findNextExecutableFn();
            if (callback) {
                queueMicrotask(() => {
                    try {
                        const result = callback(self.value);
                        if (result instanceof MyPromise) {
                            result.then(resolveFn, rejectFn);
                        } else {
                            self.value = result;
                            self.state = PROMISE_STATE.FULFILLED;
                            executeCallbacks();
                        }
                    } catch (e) {
                        self.state = PROMISE_STATE.REJECTED;
                        self.value = e;
                        executeCallbacks();
                    }
                });
            }
        }
    };

    function resolveFn(value) {
        if (self.state !== PROMISE_STATE.PENDING) return; // Prevent multiple resolves
        queueMicrotask(() => {
            self.value = value;
            self.state = PROMISE_STATE.FULFILLED;
            executeCallbacks();
        });
    }

    function rejectFn(error) {
        if (self.state !== PROMISE_STATE.PENDING) return; // Prevent multiple rejections
        queueMicrotask(() => {
            self.value = error;
            self.state = PROMISE_STATE.REJECTED;
            executeCallbacks();
        });
    }

    function registerCallback(type, callback, errorCallback = null) {
        allCallbacksByType.push({ type, callback, errorCallback });
    }

    function thenHoF(callback) {
        return (value) => {
            try {
                return callback ? callback(value) : value;
            } catch (e) {
                return new MyPromise((_, reject) => reject(e));
            }
        };
    }

    function catchHoF(callback) {
        return (error) => {
            try {
                return callback ? callback(error) : error;
            } catch (e) {
                return new MyPromise((_, reject) => reject(e));
            }
        };
    }

    function finallyHoF(callback) {
        return () => {
            try {
                callback();
                return self.value;
            } catch (e) {
                return new MyPromise((_, reject) => reject(e));
            }
        };
    }

    // Return a new promise for chaining
    const thenFn = (onResolveFn, onRejectFn) => {
        return new MyPromise((resolve, reject) => {
            registerCallback("then", thenHoF(onResolveFn), catchHoF(onRejectFn));
            resolveFn(self.value); // Ensure chained `.then()` runs
        });
    };

    const catchFn = (onRejectFn) => {
        return new MyPromise((resolve, reject) => {
            registerCallback("catch", null, catchHoF(onRejectFn));
            rejectFn(self.value); // Ensure chained `.catch()` runs
        });
    };

    const finallyFn = (onFinallyFn) => {
        return new MyPromise((resolve, reject) => {
            registerCallback("finally", finallyHoF(onFinallyFn));
            if (self.state === PROMISE_STATE.FULFILLED) resolve(self.value);
            if (self.state === PROMISE_STATE.REJECTED) reject(self.value);
        });
    };

    Object.setPrototypeOf(self, { then: thenFn, catch: catchFn, finally: finallyFn });

    try {
        executor(resolveFn, rejectFn);
    } catch (error) {
        rejectFn(error);
    }

    return self;
}



  



export default MyPromise;