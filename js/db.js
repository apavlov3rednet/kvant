class DB 
{
    static #DBNAME = 'mongodb'; // Имя базы данных
    static #LOCATION = 'mongodb://localhost'; //Адрес === 127.0.0.1
    static #PORT = 27017; //Порт
    static #LOGIN;
    static #PSSWD;

    constructor() {}

    static initDb() {
        /*
        const MongoClient = require(DB.#DBNAME).MongoClient;
        const url = [DB.#LOCATION, DB.#PORT].join(":"); // mongodb://localhost:27017

        this.mongoClient = new MongoClient(url);
        this.client = this.mongoClient.connect(); //login & password
        this.db = client.db(DB.#DBNAME);
        */
    }

    static set(key, value) {
        this.initDb();

        if(typeof value === undefined || typeof value === null || value === '') {
            this.remove(key);
        }

        window.localStorage.setItem(key, JSON.stringify(value));
        //this.mongoClient.close();
        // return id;
    }

    static remove(key) {
        if(confirm('Удалить?')) {
            this.initDb();
            window.localStorage.removeItem(key);
            //this.mongoClient.close();
        }
    }

    static get(key) {
        this.initDb();

        let value = window.localStorage.getItem(key);
        //this.mongoClient.close();

        if(this.isJson(value)) {
            return JSON.parse(value);
        }
        return value;
    }

    static count(key) {
        let values = DB.get(key);
        if(values instanceof Array)
            return values.length;

        return 0;
    }

    static isJson(str) {
        try {
            JSON.parse(str);
        }
        catch(error) {
            //console.error(error);
            return false;
        }

        return true;
    }
}