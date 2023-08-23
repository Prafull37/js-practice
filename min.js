/**
 * Gnanesh Danakonda
14:06
Find a triplet such that maximum - minimum integer in that triplet is minimum of all the triplets, i.e, triplet(x, y, z) = max(x, y, z) - min(x, y, z). A triplet should be selected in a way such that it should have one number from each of the three given arrays.

If there are 2 or more smallest difference triplets, then the one with the smallest sum of its elements should be displayed.

Input : 
	arr1 = [5, 2, 8]
    arr2 = [10, 7, 12]
    arr3 = [9, 14, 6]
Output : [7, 6, 5]

Input : 
	arr1 = [
Input : 
	arr1 = [15, 12, 18, 9]
    arr2 = [10, 17, 13, 8]
    arr3 = [14, 16, 11, 5]
Output : [11, 10, 9]
 */


// const arr1 = [5, 2, 8];  // [2,5,8]
// const arr2 = [10, 7, 12]; // [7,10,12]
// const arr3 = [9, 14, 6]; // [6,9,14]

// const arr1 = [15, 12, 18, 9]
// const  arr2 = [10, 17, 13, 8]
// const arr3 = [14, 16, 11, 5]

const arr1 = [14, 11, 17, 8]
const arr2 = [9, 16, 12, 7]
const arr3 = [12, 15, 10, 4]


function findTriplets(){
    let elements=[];

    for(let i=0;i<arr1.length;i++){
        let difference;
        let previousDifference = Infinity;
        let minElement;
        let tempElements = [arr1[i]];

        for(let j=0;j<arr2.length;j++){
            difference = Math.abs( arr1[i]-arr2[j]);
            if(previousDifference > difference){
                previousDifference = difference;
                minElement = arr2[j]
            }
        }

        tempElements.push(minElement);
        previousDifference = Infinity;

        for(let j=0;j<arr3.length;j++){
            difference = Math.abs( arr1[i]-arr3[j]);
            if(previousDifference > difference){
                previousDifference = difference;
                minElement = arr3[j]
            }
        }

        tempElements.push(minElement);
        elements.push(tempElements);
    }

    let difference;
    let previousDifference=Infinity;
    let minTriplet;

   for(let i =0;i<elements.length;i++){
        const max = Math.max(...elements[i]);
        const min = Math.min(...elements[i]);
         difference = max-min;


         if(previousDifference > difference){
            previousDifference=difference
            minTriplet= elements[i];

         } else if(difference === previousDifference){
            let minTripletSum = minTriplet.reduce((acc,element)=> acc+element,0)
            let currentTripletSum = elements[i].reduce((acc,element)=> acc+element,0);
            if(minTripletSum > currentTripletSum){
                minTriplet=elements[i];
            }
         }
   }

   console.log("minTriplet",minTriplet)
}

findTriplets()

//https://www.geeksforgeeks.org/smallest-difference-triplet-from-three-arrays/                  