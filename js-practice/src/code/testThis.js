function TestThis(){
    this.name="name";
    this.getName=function (){
        console.log(this.name)
    }
}

const testObject = new TestThis();
console.log("testObject",testObject)
testObject.getName()
