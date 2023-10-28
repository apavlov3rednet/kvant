//Объявление функции
//function definition, function declaration, function statement
// function square(number) {
//     return number * number;
// }
//---------

//function definition expression, anonim
//1
// let square = function (number) { //anonim
//     return number * number;
// };
// let x = square(4);
// console.log(x);


//2
// let factorial = function fac(n) { //naming
//     return n < 2 ? 1 : n * fac(n - 1);
// };
//
// console.log(factorial(3));

//3
// function map(f, a) {
//     let result = [];
//     let i;
//     for (i = 0; i != a.length; i++) result[i] = f(a[i]); //t
//     return result;
// }
// let f = function (x) {
//     return x * x * x;
// };
// let numbers = [0, 1, 2, 5, 10];
// let cube = map(f, numbers);
// console.log(cube);

//Вызов функции
//square(5);

//hoisting, поднятие
// console.log(square(5));
// function square(n) {
//     return n * n;
// }

//Область видимости

//Scope and stack
// var foo = function bar() { //bar(), arguments.callee(), foo() - recursive
//
// };
// function foo(i) {//stack
//   if (i < 0) return;
//   console.log("begin: " + i);
//   foo(i - 1);
//   console.log("end: " + i);
// }
// foo(3);

//Вложенные функции, инкапсуляция и зависимости переменных
//Замыкания
//Arguments
//Parameters
//Rest ...
//Arrow function
//this


function test(number = 12, string = 'test', array = [], debag = false) {
    console.log(number);


    if(debag) {
        console.log(array)
    }
}

let square = function sqr(number) { //square(), sqr(), arguments.callee()
    return number * number;
}

let factorial = function fac(n) { //naming
    return n < 2 ? 1 : n * fac(n - 1);
};

function map(func, a) {
    let result = [];
    let i;
    for (i = 0; i != a.length; i++) result[i] = func(a[i]); //t
    return result;
}

let f = function (x) {
    return x * x * x;
};

let numbers = [0, 1, 2, 5, 10];
let cube = map(f, numbers);


function test2(number) {
    function innerTest() {
        return number * 3;
    }

    return innerTest();
}

function rest(...d) {
    let ob = document.getElementById("r");

    d.forEach(() => {
        console.log(this);
    });

    d.forEach(function(item) {
        console.log(this);
        let col = document.createElement('div');

        col.style.display = 'block';
        col.style.marginLeft = '2px';
        col.style.height = item + 'px';
        col.style.width = '4px';
        col.style.background = "blue";

        ob.append(col);
    });

    () => {
        console.log(this)
    }
}

let obj = {};

function myPet() {
    let name = 'Jery';
    let age = 2;

    return {
        setName: function(newName) {
            name = newName;
        },

        getName: function() {
            return this.name
        },

        setAge: function(number) {
            age = number;
        },

        getHumanAge: function() {
            let humanAge = age * 7;
            return humanAge;
        }
    }

    console.log(humanAge);
}

// myPet2.prototype = function() {};
// myPet2.prototype.setAge = function() {};

let myPet3 = {
    name: '',
    age: 12,

    setName: function(newName) {
        name = newName;
    },

    getName: function() {
        return this.name
    },

    setAge: function(number) {
        age = number;
    },

    getHumanAge: function() {
        let humanAge = this.age * 7;
        return humanAge;
    }
}

console.log(myPet3.getHumanAge());

//console.log(myPet());



















// BX.ajax({
//     url: "",
//     onsuccess: () => {
//         console.log(this)
//     }
// })

//rest(10, 15);




//console.log(test2(3))

//console.log(cube);

//console.log(factorial(3));

//0 1 1 2 3 5 8 13

//console.log(square(5));



























//import ModuleName;

// let myPet = function() {
//     this.name = '';

//     return {
//         setName: function(name) {
//             this.name = name;
//         },

//         getName: function() {
//             console.log(this.name);
//         }
//     }
// }

// let pet = myPet();

// pet.setName('Bim');
// pet.getName();

// let obj = {

//     name: "Ivan",
//     age: 12,
//     ar: {},

//     getName: function() {
//         return this.name;
//     },

//     setName: function(newName) {
//         this.name = newName;
//     },

//     forEach: function() {
//         return Array.from(this.ar).forEach()
//     }
// }

// obj.setName('Peia');
