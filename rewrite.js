

function main(){
    
    getName()
    .then((name)=>{
        console.log(`Hello ${name}!`);
        //returning the value from the resolved promise
        return name
    })
    .then((name)=>{
        //next then will wait for the promise to resolve, then it will be invoked
       return getAge(name)
    })
    .then((age)=>{
        const drink = age < 10 ? "milk" : "coke"; 
        console.log(`Have a ${drink}.`);
        const child = age<10;
        return child
    })
    .catch(e=>{
        console.log('Error')
    })
    .finally(()=>{
        return null;
    })
}
