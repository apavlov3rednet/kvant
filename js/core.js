"use strict";

(function () {
    //БД
    let db = localStorage;

    //Элементы разметки
    let menuList = document.body.querySelectorAll('menu li');
    let content = document.getElementById('content');
    
    let r = new Routing();
    r.treeRoutes(menuList);

    menuList.forEach((item, i) => {
        item.addEventListener('click', function() {
            r.getContent(i, View.setContent);
        });
    });

    //Загрузка по умолчанию
    let arHead = ['Название таблицы', 'Кол-во записей'];
    let arBody = [];

    for(let i in db) {
        let count = DB.count(i);

        if(count > 0) {
            arBody.push([i, count]);
        }
    }

    let table = Table.generate(arHead, arBody, [], {
        className: 'simple-table'
    });

    content.append(table);

})(window);
