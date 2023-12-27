'use strict';

var promiseCount = 0;
var thisPromiseCount = 0;

function testP() {
    thisPromiseCount = ++promiseCount;
    var log = document.getElementById('log');

    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' Запуск обещания <br>');
}

testP(); 

var p1 = new Promise((resolve, reject) => {
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' старт асинхронного кода <br>');

    window.setTimeout(() => {
        resolve(promiseCount);
    }, Math.random() * 4000 + 1000);
});

var p2 = 1111;

var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 4000);
})

Promise.all([p1,p2,p3]).then((val) => {
    log.insertAdjacentHTML('beforeend', val + ' Промис исполнен <br>');
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' завершен <br>');
});