function initCustomCookies(){
    const cookies=[];

    Object.defineProperty(document,'myCustomCookie',{
        
        set(val){
            const timestamp = Date.now();
            const [nameString,...optionStrings] = val.split(";");
            const [key,value] =  getKeyValuePair(nameString)
            const options=[]
            for(let option of optionStrings){
                const [key,value] = getKeyValuePair(option);
                options.push({key,value,createdDate:timestamp})
            }
            cookies.push({key,value,options})
        },
        get(){
            let string ="";
            const currentTimestamp =Date.now();
            cookies.forEach((cookie)=>{
                let options = cookie.options;
                let isCookieExpired=false;
                options.forEach((option)=>{
                    if(option.key==="max-age"){
                        const expiryTime = option.createdDate+ Number(option.value) * 1000;
                        isCookieExpired = currentTimestamp > expiryTime
                    }
                });
                if(!isCookieExpired){
                    string= string+ `${cookie.key}=${cookie.value};`
                }
            })
            return string;
        }
    })
}



function getKeyValuePair(string){
    return string.split("=");
}

initCustomCookies();


document.myCustomCookie = "name=Prafull;max-age=1";
document.myCustomCookie = "age=2";

console.log("documentCookie=",document.myCustomCookie);

setTimeout(() => {
    console.log("documentCookie=",document.myCustomCookie);
}, 1500);