/**
 * 
 * Show Recipe,
 * 
 */


interface  IRecipeBuilder {
    dishName:string,
    addIngredients:(ingredient:string, qty:string) => this,
    waitForPrepration:(preparationSteps:string,time:string) => this,
    print:()=>void
}

export default class RecipeBuilder implements IRecipeBuilder{
    dishName: string;
    private steps:string[]=[];

    constructor(_dishName:string){
        this.dishName=_dishName
    }

    addIngredients(ingredient: string, qty: string){
       this.steps.push(`Add ${ingredient}: ${qty}`)
        return this
    }

    waitForPrepration(preparationSteps: string, time: string){
        this.steps.push(`${preparationSteps}  for ${time}`)
        return this
    }

    print(){
        console.log(`Today we will Prepare ${this.dishName}`)
        console.log("===== Let's Start ====")
        for(let i=0;i<this.steps.length;i++){
            console.log(`${i+1} :  ${this.steps[i]}`)
        }
        console.log("===== End ====")
    }
}


console.log("=========== Builder Pattern Starts =============");

new RecipeBuilder("Spicy Maggy").addIngredients("Maggi","2pack").waitForPrepration("Boil Water", "3 mins").addIngredients("Maggi Masala","2pack").print()

console.log("=========== Builder Pattern Ends =============");
console.log('\n');
console.log('\n')
