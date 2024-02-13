class Owner
{
    firstName = '';
    lastName = '';
    secondName;
    bdate;
    #obOwner = {};

    constructor(firstName, lastName, secondName, bdate) {
        if(typeof firstName != 'string' || typeof lastName != 'string')
            return false;

        this.#obOwner = {
            firstName: firstName,
            lastName: lastName
        }

        if(typeof secondName === 'string' && secondName!="")
                this.#obOwner.secondName = secondName;

        if(bdate instanceof Date)
            this.setBDate(bdate);
    }

    setBDate(date) {
        let d = new Date(date);
        this.#obOwner.dateBD = d;
    }

    get data() {
        return this.#obOwner;
    }

    get sName() {
        if(this.#obOwner.secondName)
            return this.#obOwner.secondName;
    }

    get fullName() {
        if(Object.keys(this.#obOwner).lenght > 0) {
            return [this.#obOwner.lastName, this.#obOwner.firstName, this.sName].join(' ');
        }
    }
}