class View {
    constructor() {
    }

    static setContent(content) {
        let obContent = document.getElementById('content');
        let title = content.title;
        obContent.innerHTML = content.answer;

        let obForm = obContent.querySelector('form');
        let h1 = document.querySelector('h1');
        let obTitle = document.querySelector('title');

        h1.innerHTML = title;
        obTitle.innerHTML = title;

        if(obForm) {
            let dbName = obForm.id;
            let db = DB.getValue(dbName) || [];
            let arSelect = obForm.querySelectorAll('select');

            View.bindSendForm(obForm, db, dbName, arSelect);

            arSelect.forEach(select => {
                let dbSelect = DB.getValue(select.getAttribute('name').toLowerCase()) || [];
                View.updateSelect(select, dbSelect);
            });
        }
    }

    static bindSendForm(obForm, arData, dbName, callback) {
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
        });
    }

    static updateSelect(select, ar, titleChoice = "Выберите") {
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
}