class Poligon
{
    height = 100;
    #width = 6;
    //private value

    //static #KEY = 'somekey';

    constructor(width, height) {
        this.#width = width;
        this.height = height || this.height;
    }

    get area() {
        return this.calcArea();
    }

    calcArea() {
        return this.#width * this.height;
    }

    // get KEY() {
    //     return Poligon.#KEY;
    // }
}

class Square extends Poligon 
{
    constructor(lenght) {
        super(lenght, lenght);

        this.lenght = lenght;
    }

    get diag() {
        return this.lenght * Math.sqrt(2); //2 ^ 2
    }

    calcArea() {
        return this.lenght * 8;
    }

    get parentArea() {
        return super.calcArea();
    }
}

// Side-class value === Костыли
// Poligon.staticWidht = 100;
// Poligon.prototype.prototypeWidth = 10;

let pol = new Poligon(3,5);
// console.log(pol.area);

console.log(pol.height);
//console.log(pol.#width); - приватную переменную так не получить

let pol2 = new Poligon(5);

let kvadrat = new Square(10);


// Альтернативный способ создания
// let poligon = class {
//     constructor() {}
// }

// let poligon2 = class Poligon2 {
// }


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static displayName = 'This is Point';

    static distance(a,b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx,dy);
    }
}

const p1 = new Point(3,5);
const p2 = new Point(5,8);

// Через инстанцированную переменную мы не получим значение
// console.log(p1.displayName);
// console.log(p1.distance);

//Получаем так статические методы и переменные
Point.displayName;
Point.distance(p1, p2);