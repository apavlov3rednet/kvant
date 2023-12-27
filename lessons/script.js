'use strict';

(function() {
    var DataBase = {
        /**Создание переменной в базе
         * @param {*} key 
         * @param {*} value 
         */
        setValue: function(key, value) {
            if(typeof value === undefined || typeof value === null || value === '')
                this.removeValue(key);

            window.localStorage.setItem(key, JSON.stringify(value));
        },

        /** Получение переменной с базы
         * @param {*} key 
         * @returns 
         */
        getValue: function(key) {
            let value = window.localStorage.getItem(key);

            if(this.isJson(value))
                return JSON.parse(value);
            
            return value;
        },

        /** Удаление переменной из базы
         * @param {*} key 
         */
        removeValue: function(key) {
            window.localStorage.removeItem(key);
        },

        /** Очистка базы */
        clear: function() {
            window.localStorage.clear();
        },

        /** Проверка является ли строка JSON объектом
         * @param {*} str 
         * @returns 
         */
        isJson: function(str) {
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

    var DOM = {
        /**
         * 
         * @param {*} tagName 
         * @param {className, attrs{}, styles{}, events{}, children[], inner} params 
         * @returns 
         */
        create: function(tagName = '', params = {}) {
            if(!tagName) 
                return false;

            let element = document.createElement(tagName);

            if(params.className) {
                let classList = params.className.split(' ');
                for(let value of classList) {
                    element.classList.add(value);
                }
            }

            if(typeof params.attrs === 'object') {
                for(let index in params.attrs) {
                    element.setAttribute(index,  params.attrs[index]);
                }
            }

            if(typeof params.styles === 'object') {
                for(let i in params.styles) {
                    element.style[i] = params.styles[i];
                }
            }

            if(typeof params.events === 'object') {
                for(let i in params.events) {
                    element.addEventListener(i, params.events[i]);
                }
            }

            if(typeof params.children === 'object' && params.children instanceof Array && !params.innerText) {
                params.children.forEach(item => {
                    element.append(item)
                });
            }

            return element;
        },

        adjust: function(element = {}, params = {}) {
            if(params.className) {
                let classList = params.className.split(' ');
                for(let value of classList) {
                    element.classList.add(value);
                }
            }

            if(typeof params.attrs === 'object') {
                for(let index in params.attrs) {
                    element.setAttribute(index,  params.attrs[index]);
                }
            }

            if(typeof params.styles === 'object') {
                for(let i in params.styles) {
                    element.style[i] = params.styles[i];
                }
            }

            if(typeof params.events === 'object') {
                for(let i in params.events) {
                    element.addEventListener(i, params.events[i]);
                }
            }

            if(typeof params.children === 'object' && params.children instanceof Array && !params.innerText) {
                params.children.forEach(item => {
                    element.append(item)
                });
            }
        },

        removeStyles: function(element = {}) {
            element.removeAttribute('style');
        },

        clearItem: function(element = {}, all = false) {
            element.innerHTML = '';

            if(all) {
                DOM.removeStyles(element);
                element.removeEventListener();
            }
        },

        removeItem: function(element = {}, total = false) {
            if(total) {
                element.remove();
            }
            else {
                DOM.clearItem(element, true);
            }
        }
    }

    var Owner = {
        userName: {},

        setName: function(firstName = '', lastName = '', secondName) {
            if(typeof firstName != 'string' || typeof lastName != 'string')
                return false;

            this.userName = {
                firstName : firstName,
                lastName : lastName
            }

            if(typeof secondName === 'string' && secondName != "")
                this.userName.secondName = secondName;
        },

        getFullName: function() {
            if(Object.keys(this.userName).length > 0)
                return this.userName.lastName + ' ' + this.userName.firstName + this.getSecondName();
        },

        setBirthDate: function(date) {
            try {
                if(date instanceof Date) {
                    let d = new Date(date);

                    this.userName.dateBD = d;
                }
            }
            catch(error) {
                return false;
            }
        },

        isBirthDate: function() {
            //сегодня ДР?
        },

        getSecondName: function() {
            if(this.userName.secondName)
                return ' ' + this.userName.secondName;
        },

        getUser: function() {
            return this.userName;
        }
    }

    // let personal1 = Owner;
    //     personal1.setName('Иван', 'Петров');

    // DataBase.setValue('user1', personal1.getUser());

    let test = DOM.create('div', {
        className: 'test some-class',
        styles: {
            display: 'block',
            width: '100px',
            height: '100px',
            background: '#333'
        },
        events: {
            click: function(event) {
                console.log('good');
            }
        },
        children: [
            DOM.create('span')
        ]
    });

    document.body.append(test);
    console.log(test);

})(window);
