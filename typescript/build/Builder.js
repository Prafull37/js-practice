"use strict";
/**
 *
 * Show Recipe,
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeBuilder {
    constructor(_dishName) {
        this.steps = [];
        this.dishName = _dishName;
    }
    addIngredients(ingredient, qty) {
        this.steps.push(`Add ${ingredient}: ${qty}`);
        return this;
    }
    waitForPrepration(preparationSteps, time) {
        this.steps.push(`${preparationSteps}  for ${time}`);
        return this;
    }
    print() {
        console.log(`Today we will Prepare ${this.dishName}`);
        console.log("===== Let's Start ====");
        for (let i = 0; i < this.steps.length; i++) {
            console.log(`${i + 1} :  ${this.steps[i]}`);
        }
        console.log("===== End ====");
    }
}
exports.default = RecipeBuilder;
console.log("=========== Builder Pattern Starts =============");
new RecipeBuilder("Spicy Maggy").addIngredients("Maggi", "2pack").waitForPrepration("Boil Water", "3 mins").addIngredients("Maggi Masala", "2pack").print();
console.log("=========== Builder Pattern Ends =============");
console.log('\n');
console.log('\n');
