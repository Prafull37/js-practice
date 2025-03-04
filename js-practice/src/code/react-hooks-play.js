

var React = (function(){
        let _initVal=[];
        let idx=0;

        const detectChange = (previousDependncyArray,dependencyArray)=>
                        previousDependncyArray.some((dependency,index)=>!Object.is(dependency,dependencyArray[index]));

        function useState(initArg){
            const _idx= idx; 
            let state= _initVal[_idx]||initArg;

            function setState(updatedState){

                _initVal[_idx] = updatedState
            }

            idx++;
            return [state,setState]
        }

        function useEffect(callbackFn,dependencyArray){
            
            const _idx=idx;
            const previousDependncyArray = _initVal[_idx];

            let isChanged=true;

            if(previousDependncyArray){
            isChanged = detectChange(previousDependncyArray,dependencyArray)
            }

            if(isChanged){
            callbackFn();
            }
            _initVal[_idx] = dependencyArray
            idx++;
        }

        function useCallback(callbackFn,dependency){
            const _idx = idx;
            const [previousCallbackFn,previousDependncyArray] = _initVal[_idx]||[];
            let isChanged=true;
            if(previousDependncyArray){
                isChanged = detectChange(previousDependncyArray,dependency);
            }

            idx++;
            if(isChanged){
                _initVal[_idx] = [callbackFn,dependency];
                return callbackFn;
            }
            return previousCallbackFn

        }

        function useMemo(callbackFn,dependency){
            const _idx = idx;
            const [previousValue,previousDependncyArray] = _initVal[_idx]||[];
            let isChanged=true;
            if(previousDependncyArray){
                isChanged = detectChange(previousDependncyArray,dependency);
            }

            idx++;
            if(isChanged){
                const value = callbackFn();
                _initVal[_idx] = [value,dependency];
                return value
            }

            return previousValue

        }


        function useRef(initValue){
            const _idx = idx;
            _initVal[_idx] = _initVal[_idx] || {current:initValue};

            idx++;
            return _initVal[_idx]
        }


        function useImperativeHandle(ref,callbackFn,dependencyArray){
            const _idx = idx;
            const [previousHandle,previousDependncyArray] = _initVal[_idx]||[];

            let isChanged=true;

            if(previousDependncyArray){
                isChanged=  detectChange(previousDependncyArray,dependencyArray);
            }

            idx++;
            if(isChanged){
                let currentHandle = callbackFn();
                _initVal[_idx] = [currentHandle,dependencyArray];
                ref.current=currentHandle;
            }

            ref.current = previousHandle;
        }

        function render(Component){
            idx=0;
            const C= Component();
            C.render();
            return C;
        }

        return {render,useState,useEffect,useCallback,useMemo,useRef,useImperativeHandle}
   
})()


function TestComponent(){
  const [count,setCount] = React.useState(0);
  const [text,setText] = React.useState("");

  const testRef = React.useRef();
  const valueRef = React.useRef();

  const newFn = React.useCallback(()=>{

  },[count]);

  const newValue = React.useMemo(()=>{
    return {test:"testing.."}
  },[count]);


  if(!Object.is(valueRef.current,newValue)){
    console.log("Printing... value...")
  }


if(!Object.is(testRef.current,newFn)){
    console.log("Printing...")
  }

  testRef.current = newFn;
  valueRef.current = newValue


  return {
    render:()=>{
        console.log("TestComponent",{count,text,testRef});

        
    },
    click:()=> setCount(count+1),
    type:(value)=>setText(value)
  }
}


function NewTestComponent(){
    const [count,setCount] = React.useState(0);
    
  
    return {
      render:()=>{
          console.log("NewTestComponentCount",{count});
  
          
      },
      click:()=> setCount(count+1),
    }
  }

var Test = React.render(TestComponent);
Test.click();
var Test = React.render(TestComponent);


var NewTest = React.render(NewTestComponent);
NewTest.click();
var NewTest = React.render(NewTestComponent);
