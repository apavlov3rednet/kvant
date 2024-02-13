class View {
    constructor() {
    }

    static setContent(content) {
        let obFormContent = document.getElementById('form');
        let title = content.title;
        obFormContent.innerHTML = content.answer;

        let obForm = obFormContent.querySelector('form');
        let h1 = document.querySelector('h1');
        let obTitle = document.querySelector('title');

        h1.innerHTML = title;
        obTitle.innerHTML = title;

        if(obForm) {
            let dbName = obForm.id;
            let db = DB.getValue(dbName) || [];
            let arSelect = obForm.querySelectorAll('select');

            View.bindSendForm(obForm, db, dbName, arSelect);
            View.setTable(dbName);

            arSelect.forEach(select => {
                let dbSelect = DB.getValue(select.getAttribute('name').toLowerCase()) || [];
                View.updateSelect(select, dbSelect);
            });
        }
    }

    static setTable(baseName) {
        let dbValues = DB.getValue(baseName) || [];
        let data = [];
        let arHead = [];
        let obContent = document.getElementById('content');

        if(dbValues instanceof Array) {
            dbValues.forEach((item, index) => {
                let row = [];
                row.push(item.id);

                if(index == 0)
                    arHead.push('ID');

                for(let i in item.params) {
                    row.push(item.params[i]);
                    
                    if(index == 0)
                        arHead.push(i);
                }

                data.push(row);
            });
        }

        let table = Table.generate(arHead, data, [], {
            className: 'simple-table'
        });

        obContent.innerHTML = "";

        DOM.adjust(obContent, {
            children: [table]
        });
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
            View.setTable(dbName);
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
            events: {
                change: function(event) {
                    if(select.dataset.rel) {
                        let id = select.value;
                        let relSelect = document.body.querySelector('[name='+select.dataset.rel+']');
                        let db = relSelect.getAttribute('name').toLowerCase();
                        let arDB = DB.getValue(db).filter(item => item.params[select.getAttribute('name')] === id) || [];
                    
                        View.updateSelect(relSelect, arDB);
                    }
                }
            }
        });
    }
}