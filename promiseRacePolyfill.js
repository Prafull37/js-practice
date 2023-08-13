function myPromiseRace(promises){
    return new Promise((resolve,reject)=>{
        Promise.resolve(promises).forEach((p)=>{
            p.then(resolve).catch(reject)
        })
    })
}