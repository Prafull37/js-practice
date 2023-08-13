const debounceButton=document.getElementById("debounce-test");
const throttleButton = document.getElementById("throttle-test");
console.log(debounceButton,throttleButton)
function log(params){
    console.log("Params",params)
}

const debounceLog = debounce(log,2000,{trailing:true,leading:true});
const throttleLog = throttle(log,1000,{leading:true,trailing:true});

let i=0;
let throttleI=0;


debounceButton.addEventListener("click",function(){
    i=i+1
    console.log("total count",i)
    debounceLog(i);
})

throttleButton.addEventListener("click",function(){
    throttleI=throttleI+1
    console.log("total count",throttleI)
    throttleLog(throttleI);
})





function debounce(fn,delay,options){
    let timer;

    let {leading,trailing=true} = options ||{}
    return (...args)=>{

        if(!leading && !trailing) return fn.apply(this,args);

        if(leading && !timer){
            fn.apply(this,args)
        }

        clearTimeout(timer);
        timer = setTimeout(()=>{
            if(trailing){
             fn.apply(this,args);
            }
            timer=null;
        },delay)
    }
}




function throttle(fn,delay,options){
    let shouldWait;
    let trailingContext;
    let trailingArgs;

    let {leading,trailing=true} = options || {}
    return (...args)=>{
        if(shouldWait) {
            trailingArgs=args;
            trailingContext= trailingContext
        
            return;
        }

        if(leading){
            fn.apply(this,args);
        }
           
        shouldWait=true
        setTimeout(()=>{
            if(trailing){
                fn.apply(trailingContext,trailingArgs);
            }
            shouldWait=false
        },delay)
    }
}