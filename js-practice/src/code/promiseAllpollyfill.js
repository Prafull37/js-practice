Promise.myPromiseAll= function (promises){
  //Promise.All returns a promise 

	return new Promise((resolve,reject)=>{
  	let completedResponse=[];
  	promises.forEach((promise)=>{
    	promise.then((response)=>{
        
          //pushing all promise response to an array .
            completedResponse.push(response)

            //checking the length of promise is same as response or not.
          if(completedResponse.length ===  promises.length){
    	        resolve(completedResponse)
            }

      }).catch((error)=>{
        //If any of the promises fails reject all of them
        completedResponse=[];
        reject(error)
      })
    })
  
  })
}


//A helper function which will reject a promise if you manually wants to reject
const fetchPromises=(todo,{manuallyReject=false}={})=>{
    if(manuallyReject) return Promise.reject("Promies no 2");
   return fetch(`https://jsonplaceholder.typicode.com/todos/${todo}`)
}


//this function will return with all success
function CheckingMyPromiseAllWithAllSuccess(){
	 Promise.myPromiseAll([fetchPromises(1),fetchPromises(2,{manuallyReject:false})])
  .then(([first,second])=>{
  	console.log("responses",first,second)
  }).catch((err)=>{
  	console.log("Error: in ",err)
  });
}

CheckingMyPromiseAllWithAllSuccess()


//this function will return with one failure
function CheckingMyPromiseAllWithOneFailure(){
  Promise.myPromiseAll([fetchPromises(1),fetchPromises(2,{manuallyReject:true})])
 .then(([first,second])=>{
   console.log("responses",first,second)
 }).catch((err)=>{
   console.log("Error: in ",err)
 });
}

CheckingMyPromiseAllWithOneFailure()