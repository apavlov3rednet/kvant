'use strict';

var promiseCount = 0;
var thisPromiseCount = 0;

function testP () {
    thisPromiseCount = ++promiseCount;

    var log = document.getElementById('log');

    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' Запуск обещания<br>');
}

testP();

var p1 = new Promise((resolve, reject) => {
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' Обещание пошло<br>');

    window.setTimeout(() => {
        resolve(promiseCount);
    }, Math.random() * 4000 + 1000);
});

// p1.then(function(val) {
//     log.insertAdjacentHTML('beforeend', val + ' Промис исполнен<br>');
//     log.insertAdjacentHTML('beforeend', thisPromiseCount + ' завершен<br>');
// });

var p2 = new Promise((resolve, reject) => {
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' Обещание пошло<br>');

    window.setTimeout(() => {
        resolve(promiseCount);
    }, Math.random() * 4000 + 1000);
});

// p2.then(function(val) {
//     log.insertAdjacentHTML('beforeend', val + ' Промис исполнен<br>');
//     log.insertAdjacentHTML('beforeend', thisPromiseCount + ' завершен<br>');
// });

// Promise.all([p1,p2]).then((val) => {
//     log.insertAdjacentHTML('beforeend', val + ' Промис исполнен<br>');
//     log.insertAdjacentHTML('beforeend', thisPromiseCount + ' завершен<br>');
// })

let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
fetch(url)
.then(response => response.json())
.then(commits => console.log(commits));
 