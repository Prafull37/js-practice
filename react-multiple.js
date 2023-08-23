// var React = (function(){
//     let _initVal=[];
//     let idx=0;

//     const detectChange = (previousDependncyArray,dependencyArray)=>
//                     previousDependncyArray.some((dependency,index)=>!Object.is(dependency,dependencyArray[index]));

//     function useState(initArg){
//         const _idx= idx; 
//         let state= _initVal[_idx]||initArg;

//         function setState(updatedState){

//             _initVal[_idx] = updatedState
//         }

//         idx++;
//         return [state,setState]
//     }

//     function useEffect(callbackFn,dependencyArray){
        
//         const _idx=idx;
//         const previousDependncyArray = _initVal[_idx];

//         let isChanged=true;

//         if(previousDependncyArray){
//         isChanged = detectChange(previousDependncyArray,dependencyArray)
//         }

//         if(isChanged){
//         callbackFn();
//         }
//         _initVal[_idx] = dependencyArray
//         idx++;
//     }

//     function useCallback(callbackFn,dependency){
//         const _idx = idx;
//         const [previousCallbackFn,previousDependncyArray] = _initVal[_idx]||[];
//         let isChanged=true;
//         if(previousDependncyArray){
//             isChanged = detectChange(previousDependncyArray,dependency);
//         }

//         idx++;
//         if(isChanged){
//             _initVal[_idx] = [callbackFn,dependency];
//             return callbackFn;
//         }
//         return previousCallbackFn

//     }

//     function useMemo(callbackFn,dependency){
//         const _idx = idx;
//         const [previousValue,previousDependncyArray] = _initVal[_idx]||[];
//         let isChanged=true;
//         if(previousDependncyArray){
//             isChanged = detectChange(previousDependncyArray,dependency);
//         }

//         idx++;
//         if(isChanged){
//             const value = callbackFn();
//             _initVal[_idx] = [value,dependency];
//             return value
//         }

//         return previousValue

//     }


//     function useRef(initValue){
//         const _idx = idx;
//         _initVal[_idx] = _initVal[_idx] || {current:initValue};

//         idx++;
//         return _initVal[_idx]
//     }


//     function useImperativeHandle(ref,callbackFn,dependencyArray){
//         const _idx = idx;
//         const [previousHandle,previousDependncyArray] = _initVal[_idx]||[];

//         let isChanged=true;

//         if(previousDependncyArray){
//             isChanged=  detectChange(previousDependncyArray,dependencyArray);
//         }

//         idx++;
//         if(isChanged){
//             let currentHandle = callbackFn();
//             _initVal[_idx] = [currentHandle,dependencyArray];
//             ref.current=currentHandle;
//         }

//         ref.current = previousHandle;
//     }

//     function render(Component){
//         idx=0;
//         const C= Component();
//         C.render();
//         return C;
//     }

//     return {render,useState,useEffect,useCallback,useMemo,useRef,useImperativeHandle}

// })()


// class React{
//     constructor(){
//         this._idx=0;
//         this.initVal=[];
//     }
// }