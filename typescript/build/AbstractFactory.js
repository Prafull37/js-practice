"use strict";
/**
 *
 *  Now I learn cooking Chicken too, and I want to extend my Menu
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChickenOrder = void 0;
const Builder_1 = __importDefault(require("./Builder"));
const ItemFactory_1 = require("./ItemFactory");
class NormalChicken {
    constructor() {
        this.ChickenSteps = new Builder_1.default("Chicken");
    }
    prepare() {
        this.ChickenSteps = this.ChickenSteps.addIngredients("Chicken", "2 pack").waitForPrepration("Boil Water", "3 Min").addIngredients("Chicken Masala", "2pack");
        setTimeout(() => {
            this.serve();
        }, 300);
    }
    serve() {
        this.ChickenSteps.print();
    }
}
class TandooriChicken {
    constructor() {
        this.ChickenSteps = new Builder_1.default("Chicken");
    }
    prepare() {
        this.ChickenSteps = this.ChickenSteps.addIngredients("Chicken", "2 pack").waitForPrepration("Boil Water", "3 Min").addIngredients("Chicken Masala", "2pack").addIngredients("Chilli", "2 table Spoon");
        setTimeout(() => {
            this.serve();
        }, 300);
    }
    serve() {
        this.ChickenSteps.print();
    }
}
class CheeseChicken {
    constructor() {
        this.ChickenSteps = new Builder_1.default("Chicken");
    }
    prepare() {
        this.ChickenSteps = this.ChickenSteps.addIngredients("Chicken", "2 pack").waitForPrepration("Boil Water", "3 Min").addIngredients("Chicken Masala", "2pack").addIngredients("Chesse", "2 Slices");
        setTimeout(() => {
            this.serve();
        }, 300);
    }
    serve() {
        this.ChickenSteps.print();
    }
}
const ChickeFactory = {
    'Chicken': new NormalChicken(),
    'tandooriChicken': new TandooriChicken(),
    'chesseChicken': new CheeseChicken()
};
function createChickenOrder(type) {
    ChickeFactory[type].prepare();
}
exports.createChickenOrder = createChickenOrder;
const RestaurantAbstractFactory = {
    'maggi': ItemFactory_1.createMaggiOrder,
    'chicken': createChickenOrder,
};
function createOrder(type, subType) {
    RestaurantAbstractFactory[type](subType);
}
createOrder("maggi", "maggi");
