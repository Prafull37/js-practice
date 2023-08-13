class InMemorySearchEngine{
    constructor(){
        this.store ={}
    }

    addDocuments(key,...values){
        let existingValues = this.store[key] || [];
        this.store = {[key]:[...values,...existingValues]}
    }

    search(key,filterCallback,sortOptions){
        let values= this.store[key];

        let {key:sortingKey,asc} = sortOptions;

        if(!values) return [];

        let updatedValues = values.filter(filterCallback);

        let sortFunc = asc ? ascendingSortFunction(sortingKey) :descSortFunction(sortingKey)
        let sortedValues = updatedValues.sort(sortFunc);

        return sortedValues;
    }
}

const ascendingSortFunction=(key)=>(a,b)=>{
    if(typeof a[key] === "number" && typeof b[key] ==="number"){
        return a[key]-b[key];
    }
    return a[key]>b[key];
}

const descSortFunction=(key)=>(a,b)=>{
    if(typeof a[key] === "number" && typeof b[key] ==="number"){
        return b[key] -  a[key];
    }
    return b[key]>a[key];
}

const searchEngine = new InMemorySearchEngine();
searchEngine.addDocuments('Movies', 
                    {name: 'Avenger', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );
console.log("searching...",searchEngine.search('Movies', (e) => e.rating > 8.5, {key: 'rating', asc: false}));