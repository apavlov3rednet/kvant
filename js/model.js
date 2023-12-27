//import {DB} from '/db.js';

class Model {
    params = {};
    id = Math.random(0,1000) * 100000; //Автоматически создаваемый ключ, autoincrement;

    constructor(params = {}) {
        this.params = {};
        this.id = this.id;

        for(let i in params) {
            this.params[i] = params[i];
        }
    }

    add() { //send, post
        if(Object.keys(this.params) === 0 ) return false;

        //поддержка LocalStorage
        for(let i in this.params) {
            DB.set(i, this.params[i]);
        }
    }

    set(params = {}) { //update, change
        for(let i in params) {
            this.params[i] = params[i];
        }
    }
}

// let brand = new Model({tableName: 'brand', name: 'Opel', country: 'Germany'});

// brand.set({parentCompany: 'VW Group'});

// brand.add(); // {tableName, name, country, parentCompany}

/*

.add()
.set()
.filter()
.delete()
.find()

*/