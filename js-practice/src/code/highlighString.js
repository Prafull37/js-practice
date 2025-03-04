const str = "Ultimate JavaScript / FrontEnd Guide";
const words = [ 'End', 'JavaScript'];


function highlightString(str , words){
    const uniqueKeySet = new Set(words);
    const strWords = str.split(" ");
    let finalStr = [];
    strWords.forEach(word => {
        if(uniqueKeySet.has(word)){
            finalStr.push(`<strong>${word}</strong>`);
        }else{
            let updatedString="";
            for(let i=0;i<word.length;i++){
                const prefix = word.slice(0,i+1);
                const suffix = word.slice(i+1);

                if(uniqueKeySet.has(prefix) && uniqueKeySet.has(suffix)){
                    updatedString = `<strong>${word}</strong>`;
                    break;
                }

                if(uniqueKeySet.has(prefix) && !uniqueKeySet.has(suffix)){
                    updatedString = `<strong>${prefix}</strong>${suffix}`;
                    break;
                }

                if(!uniqueKeySet.has(prefix) && uniqueKeySet.has(suffix)){
                    updatedString = `${prefix}<strong>${suffix}</strong>`;
                    break;
                }
            }
            if(updatedString){
                finalStr.push(updatedString)
            }else{
                finalStr.push(word)
            }
        }
    }); 

   return finalStr.join(" ");

}

console.log("highlightedString",highlightString(str,words))