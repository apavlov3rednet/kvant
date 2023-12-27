class View {
    static setContent(data = {}) {
        let obContent = document.getElementById('content');
        let obH1 = document.querySelector('h1');
        let obTitle = document.querySelector('title');

        obH1.innerHTML = data.title;
        obTitle.innerHTML = data.title;
        obContent.innerHTML = data.answer;

        let obForm = obContent.querySelector('form');

        if(obForm) {
            let dbName = obForm.id;
            let db = DB.get(dbName) || [];
            let arSelect = obForm.querySelectorAll('select');

            View.bindSendForm(obForm, db, dbName);

            arSelect.forEach(item => {
                let name = item.getAttribute('name').toLowerCase() + 's';
                let db2 =  DB.get(name) || [];
                View.updateList(item, db2);
            });
        }
    }

    /**
     * 
     * @param {*} obForm 
     * @param {*} arr 
     * @param {*} db 
     * @param {*} callback Function
     */
    static bindSendForm(obForm, arr, db, callback) {
        obForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let arFields = obForm.querySelectorAll("input, select");
            let model = new Model();

            arFields.forEach((item) => {
                let params = {};
                params[item.name] = item.value;
                model.set(params);

                switch (item.tagName) {
                    case "INPUT":
                        item.value = "";
                        break;

                    case "SELECT":
                        item.value = 0;
                        break;
                }
            });

            arr.push(model);

            DB.set(db, arr);
        });
    }

    static updateList(select, arr, title = "Выберите") {
        let childrens = [];

        select.innerHTML = "";

        childrens.push(
            DOM.create("option", {
                attrs: { value: 0 },
                text: title,
            })
        );

        arr.forEach((item) => {
            if (Object.keys(item).length > 0) {
                childrens.push(
                    DOM.create("option", {
                        attrs: { value: item.id },
                        text: Object.values(item.params).join(" "),
                    })
                );
            }
        });

        DOM.adjust(select, {
            children: childrens,
            events: {
                //Стартуем отслеживание события Изменение поля
                change: function(event) {
                    if(select.dataset.rel) { //Проверяем есть ли связанное поле
                        let id = select.value; //Получаем значение текущего поля
                        let relationSelect = document.querySelector('[name='+select.dataset.rel+']'); //Получаем объект связанного поля
                        let dbName = relationSelect.getAttribute('name').toLowerCase() + 's'; //Получаем имя БД связанного поля
                        let arDb = DB.get(dbName).filter(item => item.params[select.getAttribute('name')] === id) || []; //Получаем только те записи из БД которые соответствуют значению текущего поля

                        View.updateList(relationSelect, arDb); //Обновляем связанное поле
                    }
                }
            }
        });
    }
}