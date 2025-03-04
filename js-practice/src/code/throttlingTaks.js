
const task = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const count = 2;

// throttle(task, count, 2000); // [1, 2, 3, 4, 5] // immediately 
// throttle(task, count, 2000); // [6, 7, 8, 9, 10] // after 2 seconds
// throttle(task, count, 2000); // [1, 2, 3, 4, 5] // after 2 seconds 


function throttle(tasks,taskCount,timer){

    let pendingTask = tasks;
    let shouldWait;
    console.log("Throttling task execution")
    return function(...args){
        if(shouldWait || pendingTask.length===0) {
            if(pendingTask.length===0){
                console.log("All tasks completed");
            }
            return;
        };
        let completedTask = pendingTask.splice(0,taskCount);
        console.log("Completed Tasks are ==> ", completedTask);
        shouldWait=true;

        setTimeout(()=>{
            shouldWait=false
        },timer)
    }
}

const  btn = document.getElementById('task-throttle-test');
btn.addEventListener("click",throttle(task,count,2000))