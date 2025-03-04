/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
	return async function(...args) {
        try{
            const executionTime = Date.now();
            const value = await fn(...args);
            const delay=Date.now()-executionTime
            if(delay <=t){
                return {resolved:value,time:delay}
            }else{
                throw  ({reject:"Time Limit Exceed",time:delay})
            }
        }catch(e){
           throw e;
        }
    }
};

const fn=async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; }
const time=50;
const args=5;

const limitfn=timeLimit(fn,time)
console.log("limitfn",limitfn)
limitfn(5).then((v)=>console.log("time limit pas",v)).catch((e)=>console.log("time limit fail",e))

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */