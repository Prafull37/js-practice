function Shape(){
    this.colors=["red","green","black"]
}


function Rectangles(){
    Shape.apply(this)
}

let rectangle1 = new Rectangles();
console.log(rectangle1)

function Product(name, price) {
    this.name = name;
    this.price = price;
}
Product.prototype.tellMe = function() {
    console.log('Name = ' + this.name + ', Price = ' + this.price);
}

function Food(name, price, category) {
    Product.call(this, name, price);
    this.category = category;
}
Food.prototype = Object.create(Product.prototype);
Food.prototype.constructor = Food;
var b = new Food('Name', 123, 'Category');
var a = new Product('Name2', 321);


Product.prototype.checkQuality=function(){
    console.log("this is quality")
}


console.log("B",b);
b.tellMe();
console.log("A",a);  