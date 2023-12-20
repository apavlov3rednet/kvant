(function () {
    //Объекты форм
    // let obOwnerForm = document.getElementById("owner");
    // let obCardForm = document.getElementById("card");
    // let obBrandForm = document.getElementById("brand");
    // let obModelForm = document.getElementById("model");

    //Меню
    let menuList = document.body.querySelectorAll('menu li');

    //Объекты селектов
    // let selectOwner = obCardForm.querySelector("[name=OWNER]");
    // let selectBrand = obCardForm.querySelector("[name=BRAND]");
    // let selectModel = obCardForm.querySelector("[name=MODEL]");
    // let selectModelBrand = obModelForm.querySelector("[name=BRAND]");

    //Массивы БД
    let arOwners = DB.getValue("owners") || [];
    let arBrands = DB.getValue("brands") || [];
    let arModel = DB.getValue("models") || [];
    let arCard = DB.getValue('cards') || [];

    /**
     * @param {*} select 
     * @param {*} ar 
     * @param {*} titleChoice 
     */
    function updateSelect(select, ar, titleChoice = "Выберите") {
        let children = [];

        select.innerHTML = "";

        children.push(
            DOM.create("option", {
                attrs: { value: 0 },
                text: titleChoice,
            })
        );

        ar.forEach((item) => {
            if (Object.keys(item).length > 0) {
                children.push(
                    DOM.create("option", {
                        attrs: { value: item.id },
                        text: Object.values(item.params).join(" "),
                    })
                );
            }
        });

        DOM.adjust(select, {
            children: children,
        });
    }

    function bindSendForm(obForm, arData, dbName, callback = []) {
        obForm.addEventListener("submit", function (e) {
            e.preventDefault(); //Отмена штатного поведения

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

            arData.push(model);

            DB.setValue(dbName, arData);

            if(callback.length > 0)
              callback.forEach((item) => updateSelect(item, arData));
        });
    }

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

    //События формы
    // bindSendForm(obOwnerForm, arOwners, "owners", [selectOwner]);
    // bindSendForm(obBrandForm, arBrands, "brands", [
    //     selectBrand,
    //     selectModelBrand,
    // ]);
    // bindSendForm(obModelForm, arModel, "models", [selectModel]);
    // bindSendForm(obCardForm, arCard, 'cards');

    // //Обновление полей при первой загрузке
    // updateSelect(selectOwner, arOwners, "Выберите владельца");
    // updateSelect(selectBrand, arBrands);
    // updateSelect(selectModelBrand, arBrands);
    // updateSelect(selectModel, arModel);
})(window);
