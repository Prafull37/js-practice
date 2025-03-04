/**
 * const ex = new TaskRunner(3);

// Simulated async tasks
const t1 = async () => { console.log('t1 started'); await delay(2000); console.log('t1 finished'); };
const t2 = async () => { console.log('t2 started'); await delay(1000); console.log('t2 finished'); };
const t3 = async () => { console.log('t3 started'); await delay(1500); console.log('t3 finished'); };
const t4 = async () => { console.log('t4 started'); await delay(1000); console.log('t4 finished'); };
const t5 = async () => { console.log('t5 started'); await delay(500); console.log('t5 finished'); };
https://devtools.tech/questions/s/how-to-implement-an-asynchronous-task-runner-with-concurrency-control-rippling-frontend-interview-question---qid---QCu4pbqp5zgxZQaQzh0D

// Add tasks to the executor
ex.push(t1);  // Starts immediately
ex.push(t2);  // Starts immediately
ex.push(t3);  // Starts immediately
ex.push(t4);  // Waits until at least one task finishes
ex.push(t5);  // Waits until another task finishes

**/

const delay = (timeout)=> new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },timeout)
})

class TaskRunner{
    constructor(limit){
        this.limit=limit;
        this.currentRunning=0;
        this.allPendingTasks = []
    }

    isLessRunningTask(){
        return this.currentRunning < this.limit;
    }


    push(callback){
        if(this.isLessRunningTask()){
            callback().finally(()=>{
                this.currentRunning--;
                if(this.allPendingTasks.length &&  this.isLessRunningTask()){
                    this.push(this.allPendingTasks.shift());
                }
            })
            this.currentRunning++;
        }else{
            this.allPendingTasks.push(callback);
        }
    }
}




export default function taskRunner(){
    const ex = new TaskRunner(3);

    const t1 = async () => {
            console.log('t1 started'); 
            await delay(2000); 
            console.log('t1 finished');
    };

    const t2 = async () => {
         console.log('t2 started'); 
            await delay(1000); 
         console.log('t2 finished'); 
    };
    const t3 = async () => {
         console.log('t3 started'); await delay(1500); console.log('t3 finished');
        };
    const t4 = async () => {
         console.log('t4 started'); await delay(1000); console.log('t4 finished');
         };
    const t5 = async () => {
         console.log('t5 started'); await delay(500); console.log('t5 finished');
         };

    ex.push(t1);  // Starts immediately
    ex.push(t2);  // Starts immediately
    ex.push(t3);  // Starts immediately
    ex.push(t4);  // Waits until at least one task finishes
    ex.push(t5);  // Waits until another task finishes
}