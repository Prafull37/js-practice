// maintaining a key for each event and its subscriber
let events_vs_suscriber={};

function subscribe(eventName,callback){
    //extracting existing subscriber and add new one
    const suscribers= events_vs_suscriber[eventName] || [];
    
    events_vs_suscriber[eventName]= [...suscribers,callback];
}


function publish(eventName,value){
    // extracting all subscriber and calling them with value
    const suscribers= events_vs_suscriber[eventName] || [];
    
    suscribers.forEach((suscriber)=>{
        suscriber(value)
    })
}

subscribe("event1", function(value){console.log(value)})
subscribe("event1", function(value){console.log(value)})
subscribe("event1", function(value){console.log(value)})
publish("event1", "Hello world");