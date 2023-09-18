"use strict";
/**
 *
 * I learned Creating Maggi , I want to open my shop on Maggi Where I will sell different types of maggi...
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMaggiOrder = void 0;
const Builder_1 = __importDefault(require("./Builder"));
class NormalMaggi {
    constructor() {
        this.MaggiSteps = new Builder_1.default("Maggi");
    }
    prepare() {
        this.MaggiSteps = this.MaggiSteps.addIngredients("Maggi", "2 pack").waitForPrepration("Boil Water", "3 Min").addIngredients("Maggi Masala", "2pack");
        setTimeout(() => {
            this.serve();
        }, 300);
    }
    serve() {
        this.MaggiSteps.print();
    }
}
class TandooriMaggi {
    constructor() {
        this.MaggiSteps = new Builder_1.default("Maggi");
    }
    prepare() {
        this.MaggiSteps = this.MaggiSteps.addIngredients("Maggi", "2 pack").waitForPrepration("Boil Water", "3 Min").addIngredients("Maggi Masala", "2pack").addIngredients("Chilli", "2 table Spoon");
        setTimeout(() => {
            this.serve();
        }, 300);
    }
    serve() {
        this.MaggiSteps.print();
    }
}
class CheeseMaggi {
    constructor() {
        this.MaggiSteps = new Builder_1.default("Maggi");
    }
    prepare() {
        this.MaggiSteps = this.MaggiSteps.addIngredients("Maggi", "2 pack").waitForPrepration("Boil Water", "3 Min").addIngredients("Maggi Masala", "2pack").addIngredients("Chesse", "2 Slices");
        setTimeout(() => {
            this.serve();
        }, 300);
    }
    serve() {
        this.MaggiSteps.print();
    }
}
const MaggiFactory = {
    'maggi': new NormalMaggi(),
    'tandooriMaggi': new TandooriMaggi(),
    'chesseMaggi': new CheeseMaggi()
};
function createMaggiOrder(type) {
    MaggiFactory[type].prepare();
}
exports.createMaggiOrder = createMaggiOrder;
createMaggiOrder("tandooriMaggi");
