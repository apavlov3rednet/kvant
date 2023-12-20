class DB
{
    static #PORT = '27017';
    static #LOCATION = 'mongodb://localhost';
    static #LOGIN;
    static #PSSWD;
    static #DBNAME = 'mongo';

    constructor() {}

    static Init() {
        const MongoClient = require(DB.#DBNAME).MongoClient;
        const url = [DB.#LOCATION, DB.#PORT].join(':'); // mongodb://localhost:27017

        this.mongoClient = new MongoClient(url);
        this.client = this.mongoClient.connect(); // LOGIN & PSSWD
        this.db = client.db(DB.#DBNAME);
    }

    static getValue(key) {
        //this.Init();

        let value  = window.localStorage.getItem(key);

        //this.mongoClient.close();

        if(this.isJson(value))
            return JSON.parse(value);

        return value;
    }

    static isJson(value) {
        try {
            JSON.parse(value);
        }
        catch(error) {
            return false;
        }

        return true;
    }

    static setValue(key, value) {
        //this.Init();
        if(typeof value === undefined || typeof value === null || value === '')
                this.removeValue(key);
 
        window.localStorage.setItem(key, JSON.stringify(value));
        //this.mongoClient.close();
    }

    static removeValue(key) {
        //this.Init();
        if(confirm('Удалить?')) 
            window.localStorage.removeItem(key);

            //this.mongoClient.close();
    }
}