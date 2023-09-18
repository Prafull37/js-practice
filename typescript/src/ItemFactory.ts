/**
 * 
 * I learned Creating Maggi , I want to open my shop on Maggi Where I will sell different types of maggi...
 * 
 */

import RecipeBuilder  from "./Builder";


interface IMaggi {
    prepare:()=>void;
    serve:()=>void
}

class NormalMaggi implements IMaggi{ 
  private MaggiSteps:RecipeBuilder;

  constructor(){
    this.MaggiSteps=new RecipeBuilder("Maggi")
  }

  prepare(){
    this.MaggiSteps=this.MaggiSteps.addIngredients("Maggi","2 pack").waitForPrepration("Boil Water","3 Min").addIngredients("Maggi Masala","2pack");
    setTimeout(()=>{
        this.serve();
    },300);
  }

  serve(){
    this.MaggiSteps.print()
  }
}

class TandooriMaggi implements IMaggi{
    private MaggiSteps:RecipeBuilder;

    constructor(){
      this.MaggiSteps=new RecipeBuilder("Maggi")
    }
  
    prepare(){
      this.MaggiSteps=this.MaggiSteps.addIngredients("Maggi","2 pack").waitForPrepration("Boil Water","3 Min").addIngredients("Maggi Masala","2pack").addIngredients("Chilli","2 table Spoon");
      setTimeout(()=>{
          this.serve();
      },300)
    }
  
    serve(){
      this.MaggiSteps.print()
    }
}

class CheeseMaggi implements IMaggi{

    private MaggiSteps:RecipeBuilder;

    constructor(){
      this.MaggiSteps=new RecipeBuilder("Maggi")
    }
  
    prepare(){
      this.MaggiSteps=this.MaggiSteps.addIngredients("Maggi","2 pack").waitForPrepration("Boil Water","3 Min").addIngredients("Maggi Masala","2pack").addIngredients("Chesse","2 Slices");
      setTimeout(()=>{
          this.serve();
      },300)
    }
  
    serve(){
      this.MaggiSteps.print()
    }
  
}


interface IMaggiFactory <T extends IMaggi>{
    [key:string]:T
}

const MaggiFactory:IMaggiFactory<NormalMaggi | TandooriMaggi | CheeseMaggi>={
    'maggi': new NormalMaggi(),
    'tandooriMaggi':new TandooriMaggi(),
    'chesseMaggi': new CheeseMaggi()
}

export function createMaggiOrder(type:string){
    MaggiFactory[type].prepare();
}

createMaggiOrder("tandooriMaggi")