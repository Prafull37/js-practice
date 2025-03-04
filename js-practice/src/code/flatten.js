const inputArray=[1,2,[3,4], [5, [6, 7,[8,[9]]]]];

function flatten(input,flattenedArray=[]){
    //loop will iterate over each element 
     input.forEach(element => {
        //checking the element is array or not
        if(Array.isArray(element)){
            //making a recursive call
            flatten(element,flattenedArray)
        }else{
            //adding to flattenedArray
            flattenedArray.push(element)
        }
    });
    return flattenedArray
}

// function flattenPureRecursively(input,flattenedArray=[],currentIndex=0){
//     const currentElement= input[currentIndex];
    
//     if(Array.isArray(currentElement)){
//          flattenPureRecursively(currentElement,flattenedArray);
//     }

//      flattenPureRecursively(input,[...flattenedArray,currentElement],currentIndex+1)
// }

console.log(flatten(inputArray))

// console.log("flatten",flattenPureRecursively(inputArray))
