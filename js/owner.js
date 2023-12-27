class Owner 
{
    #data = {};

    constructor(firstName = '', lastName = '', secondName, bdate) {
        if(typeof firstName != 'string' || typeof lastName != 'string')
        return false;

        this.#data = {
            firstName : firstName,
            lastName : lastName
        }

        if(typeof secondName === 'string' && secondName != "")
            this.#data.secondName = secondName;

        if(bdate instanceof Date)
            this.setBDate(bdate);
    }

    setBDate(date) {
        let d = new Date(date);
        this.#data.dateBD = d;
    }

    get sName() {
        if(this.#data.secondName)
                return this.#data.secondName;
    }

    get fullName() {
        if(Object.keys(this.#data).length > 0)
            return [this.#data.lastName, this.#data.firstName, this.sName].join(' ');
    }

    get data() {
        return this.#data;
    }
}