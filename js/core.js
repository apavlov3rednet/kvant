(function () {
    let db = [...localStorage];

    console.log(db)

    //Меню
    let menuList = document.body.querySelectorAll('menu li');
    let obContent = document.getElementById('content');

    //Маршрутизация
    let r = new Routing();
    r.treeRoutes(menuList);

    menuList.forEach((item, i) => {
        item.addEventListener('click', function() {
            r.getContent(i, View.setContent);
        });
    });


})(window);
