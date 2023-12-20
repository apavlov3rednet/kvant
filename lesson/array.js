// let ar = [100, 200, 300, 400];
// let ar2 = new Array();

let names = [
    'Ivan',
    'Artem',
    'Aleksey',
    'Ruslan',
    'Olga',
    'Inna,Valentina',
];

names[names.length] = 'David';

// Так никогда не делай!
// names[12] = 'Misha'; - создание дыры в массиве
// names.someValue = 'SomeValues'; - создание посторонней переменной
// let names2 = [...names]; - чиним так

//console.log(names);

//names[3]; // получение по ключу

//console.log(names[names.length - 1]); // старый способ получения последнего элемента

// names[-1];
//console.log(names.at(-1)); //новый метод получения последнего элемента

let matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//console.log(matrix[1][1]);
// let str1 = names.join('; '); // JSON.stringify(names)

// console.log(str1);

// let str2 = String(names);

// console.log(str2);

// console.log(str1.split('; '));
// console.log(str2.split(','));

// console.log([] + 1);
// console.log([1] + 1);
// console.log([1,2] + 1);
// console.log([1,2] + [2,4]);

// console.log([...[1,2], ...[3,4]]);

// console.log([1,2].concat([4,3]));

// for ... in
// for ... of
// for(let i =);
if(names instanceof Array)
    names.forEach(item => {
});

// pop/push && shift/unshift
//console.log(names);

names.push('Rita', 'Margarita', 'Pavel');

names.unshift('Sveta', 'Lada');

// console.log(names);

//names.length = 5;

// console.log(names);

//names.length = 12;

//names.fill('Bpgdan'); - все заполнить
//names.fill('Bogdan', 5); - c 5 строки
//names.fill('Bogdan', 5, 8); - c 5 -8
//names.fill('Bogdan', 5, 100);

// let ar = Array(5).fill({});

// ar[0].hi = 'All';

// console.log(ar);

// let names2 = names;
// let names3 = [...names];

let bigName = names.filter(name => name.length > 4);

let someArray = [];
names.forEach(name => {
    if(name.length > 4)
        someArray.push(name);
});

let nameA = names.find(name => name.length > 3); 
//.findIndex
//.findLastIndex
//.findLast
function someFunction(item) {
    return item * 10;
}

let numbers = [1,4,9,25,3,8,10];

let roots = numbers.map(item => {
    let number = Math.sqrt(item);
    return Math.round(number);
});

let roots2 = numbers.map(someFunction);

console.log(numbers);
console.log(roots);
console.log(roots2);
