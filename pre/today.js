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