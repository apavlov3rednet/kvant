'use strict';
(function() {
    var DataBase = {
        setValue: function(key, value) {
            if(typeof value === undefined || typeof value === null || value === '')
                this.removeValue(key);
 
            window.localStorage.setItem(key, JSON.stringify(value)); // [Object object]
        },

        getValue: function(key) {
            let value = window.localStorage.getItem(key);

            if(this.isJson(value))
                return JSON.parse(value);

            return value;
        },

        isJson: function(value) {
            try {
                JSON.parse(value);
            }
            catch(error) {
                return false;
            }

            return true;
        },

        removeValue: function(key) {
            window.localStorage.removeItem(key);
        },

        clear: function() {
           // window.localStorage.clear();
        }
    }

    var Owner = {
        user: {},

        setName: function(firstName = '', lastName = '', secondName) {
            if(typeof firstName != 'string' || typeof lastName != 'string')
                return false;

            this.user = {
                firstName: firstName,
                lastName: lastName
            }

            if(typeof secondName === 'string' && secondName!="")
                this.user.secondName = secondName;
        },

        getUser: function() {
            return this.user;
        },

        getFullName: function() {
            if(Object.keys(this.user).lenght > 0)
                return this.user.lastName + ' ' + this.user.lastName + this.getSecondName();
        },

        getSecondName: function() {
            if(this.user.secondName)
                return ' ' + this.user.secondName;
        },

        setBirthDate: function(date) {
            try {
                if(date instanceof Date) {
                    let d = new Date(date);

                    this.user.dateBD = d;
                }
            }
            catch(error) {
                return false;
            }
        },

        isBirthDate: function() {
            //обработчик
        }
    }

    var DOM = {
        /**
         * @param {*} tagName 
         * @param {className = '', attrs{}, styles{}, events{}, children[]} params 
         * @returns 
         */
        create: function(tagName = '', params = {}) {
            if(!tagName)
                return false;

            let element = document.createElement(tagName);

            if(params.className) {
                let classList = params.className.split(' ');
                for (let index of classList) {
                    element.classList.add(index);
                }
            }

            if(typeof params.attrs === 'object') { //attrs - attributes
                for(let i in params.attrs) {
                    element.setAttribute(i, params.attrs[i]);
                }
            }

            if(typeof params.styles === 'object') {
                for(let i in params.styles) {
                    element.style[i] = params.styles[i];
                }
            }

            if(typeof params.events === 'object') {
                for(let i in params.events) {
                    element.addEventListener(i, params.events[i])
                }
            }

            if(typeof params.children === 'object' && params.children instanceof Array) {
                params.children.forEach(item => element.append(item));
            }

            return element;
        },

        adjust: function(element = {}, params = {}) {
            if(Object.keys(element).length == 0) 
                return false;

                if(params.className) {
                    let classList = params.className.split(' ');
                    for (let index of classList) {
                        element.classList.add(index);
                    }
                }
    
                if(typeof params.attrs === 'object') { //attrs - attributes
                    for(let i in params.attrs) {
                        element.setAttribute(i, params.attrs[i]);
                    }
                }
    
                if(typeof params.styles === 'object') {
                    for(let i in params.styles) {
                        element.style[i] = params.styles[i];
                    }
                }
    
                if(typeof params.events === 'object') {
                    for(let i in params.events) {
                        element.addEventListener(i, params.events[i])
                    }
                }
    
                if(typeof params.children === 'object' && params.children instanceof Array) {
                    params.children.forEach(item => element.append(item));
                }
        },

        removeStyle: function(element) {
            element.removeAttribute('style');
        },

        clearItem: function(element = {}, all = false) {
            element.innerHTML = '';

            if(all) {
                DOM.removeStyle(element);
                element.removeEventListener();

                // Array.from(element.attributes).forEach(item => {
                //     element.removeAttribute(item);
                // })
            }
        },

        /**
         * @param {*} element 
         * @param {*} total - при true полное удаление, false - очистка
         */
        removeItem: function(element = {}, total = false) {
            if(total) {
                element.remove();
            }
            else {
                DOM.clearItem(element, true);
            }
        }
    }

    var Model = {
        obModel: {},

        /**
         * 
         * @param {*} parentId 
         * @param {Array, string, object, nodeList, etc.} params 
         * @returns 
         */
        create: function(parentId, params= {}) {
            if(!parentId)
                return false;

            for(let index in params) {
                let value = params[index];

                if(value instanceof Array || value instanceof Object) {
                    this.obModel[index] = JSON.stringify(value);
                }
                else {
                    this.obModel[index] = value;
                }
            }

            this.obModel.parentId = parentId;

            return this.obModel;
        }
    }

    let owners = [
        {name: 'Ivan', lastName: 'Petrov'},
        {name: 'Semen', lastName: 'Ivanov'}
    ],
    ownersDB = [];

    for(let i in owners) {
        let name = owners[i].name,
            lastName = owners[i].lastName;

        ownersDB.push(Owner.setName(name, lastName));
    }

    

    // DataBase.setValue('owner', own);

    // let car = Model;

    // car.create(DataBase.getValue('owner'), {
    //     brand: 'Mersedes',
    //     model: 'SLK500',
    //     nomer: 'a000aa123',
    //     option: ['climat', 'audio', 'podogrev']
    // });

    // DataBase.setValue('car', car);

    //console.log(car);

    // let test = DOM.create('div', {
    //     className: 'test someone-class',
    //     styles: {
    //         display: 'block',
    //         'backgroundColor' : '#333',
    //         width: '100px',
    //         height: '100px'
    //     },
    //     events: {
    //         click: function() {
    //             console.log('good');
    //         }
    //     },
    //     children: [
    //         DOM.create('span'), DOM.create('b')
    //     ]
    // });

    // document.body.append(test);
})(window);