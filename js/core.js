(function () {
    //Меню
    let menuList = document.body.querySelectorAll('menu li');

    //Маршрутизация
    let r = new Routing();
    r.treeRoutes(menuList);

    menuList.forEach((item, i) => {
        item.addEventListener('click', function() {
            r.getContent(i, View.setContent);
        });
    });
})(window);
