(function () {
    //Объекты форм
    // let obOwnerForm = document.getElementById("owner");
    // let obCardForm = document.getElementById("card");
    // let obBrandForm = document.getElementById("brand");
    // let obModelForm = document.getElementById("model");

    //Меню
    let menuList = document.body.querySelectorAll('menu li');
    let obContent = document.getElementById('content');

    //БД
    let db = localStorage;

    //Связка полей
    // selectBrand.addEventListener('change', function() {
    //   let value = selectBrand.value;

    //   if(arModel.length > 0) {
    //     let newArray = arModel.filter(item => item.params.BRAND === value);
    //     updateSelect(selectModel, newArray);
    //   }
    // });

    //Маршрутизация
    let r = new Routing();
    r.treeRoutes(menuList);

    menuList.forEach((item, i) => {
        item.addEventListener('click', function() {
            let content = r.getContent(i, View.setContent);
        });
    });

    let arHead = ["Название таблицы", "Количество записей"];
    let arBody = [];

    for (let i in db) {
        let count = DB.getCount(i);

        if(count > 0)
            arBody.push([i, count]);
    }

    let table = Table.generate(arHead, arBody, [], {
        className: 'simple-table'
    });

    obContent.append(table);

})(window);
