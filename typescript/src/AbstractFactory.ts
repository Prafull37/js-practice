/**
 *  
 *  Now I learn cooking Chicken too, and I want to extend my Menu
 * 
 */


import RecipeBuilder  from "./Builder";
import { createMaggiOrder } from "./ItemFactory";

interface IChicken {
    prepare:()=>void;
    serve:()=>void
}

class NormalChicken implements IChicken{ 
  private ChickenSteps:RecipeBuilder;

  constructor(){
    this.ChickenSteps=new RecipeBuilder("Chicken")
  }

  prepare(){
    this.ChickenSteps=this.ChickenSteps.addIngredients("Chicken","2 pack").waitForPrepration("Boil Water","3 Min").addIngredients("Chicken Masala","2pack");
    setTimeout(()=>{
        this.serve();
    },300);
  }

  serve(){
    this.ChickenSteps.print()
  }
}

class TandooriChicken implements IChicken{
    private ChickenSteps:RecipeBuilder;

    constructor(){
      this.ChickenSteps=new RecipeBuilder("Chicken")
    }
  
    prepare(){
      this.ChickenSteps=this.ChickenSteps.addIngredients("Chicken","2 pack").waitForPrepration("Boil Water","3 Min").addIngredients("Chicken Masala","2pack").addIngredients("Chilli","2 table Spoon");
      setTimeout(()=>{
          this.serve();
      },300)
    }
  
    serve(){
      this.ChickenSteps.print()
    }
}

class CheeseChicken implements IChicken{

    private ChickenSteps:RecipeBuilder;

    constructor(){
      this.ChickenSteps=new RecipeBuilder("Chicken")
    }
  
    prepare(){
      this.ChickenSteps=this.ChickenSteps.addIngredients("Chicken","2 pack").waitForPrepration("Boil Water","3 Min").addIngredients("Chicken Masala","2pack").addIngredients("Chesse","2 Slices");
      setTimeout(()=>{
          this.serve();
      },300)
    }
  
    serve(){
      this.ChickenSteps.print()
    }
  
}


interface IChickenFactory <T extends IChicken>{
    [key:string]:T
}

const ChickeFactory:IChickenFactory<NormalChicken | TandooriChicken | CheeseChicken>={
    'Chicken': new NormalChicken(),
    'tandooriChicken':new TandooriChicken(),
    'chesseChicken': new CheeseChicken()
}


export function createChickenOrder(type:string){
    ChickeFactory[type].prepare();
}


type fnType = typeof createMaggiOrder | typeof createChickenOrder


interface IRestaurantAbstractFactory {
    [key:string]:fnType
}

const RestaurantAbstractFactory:IRestaurantAbstractFactory={
    'maggi':createMaggiOrder,
    'chicken':createChickenOrder,
}

function createOrder(type:string,subType:string){
    RestaurantAbstractFactory[type](subType)
}

createOrder("maggi","maggi")