function compose(...fns){
    let finalValue ;
    return  function(...vals){
       
        let valueToPass = vals;

        fns.forEach(func => {
            
            finalValue = func(...valueToPass)
            valueToPass = [finalValue]
        });

        return finalValue
           
        }
}


function add(a,b,c){
   
    return a+b+c;
}

const half = (val)=>{
    return val/2
}

const square = (val)=>{
    return val * val
}

console.log("composing",compose(add,half,square)(1,2,3))