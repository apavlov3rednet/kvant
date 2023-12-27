class DOM {
    static create(tagName = '', params = {}) {
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

        if(params.text || params.html) {
            element.innerHTML = params.html || params.text; //element.innerText
        }
        else {
            if(typeof params.children === 'object' && params.children instanceof Array && !params.innerText) {
                params.children.forEach(item => {
                    element.append(item)
                });
            }
        }

        return element;
    }

    static adjust(element = {}, params = {}) {
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

        if(params.text || params.html) {
            element.innerHTML = params.html || params.text; //element.innerText
        }
        else {
            if(typeof params.children === 'object' && params.children instanceof Array && !params.innerText) {
                params.children.forEach(item => {
                    element.append(item)
                });
            }
        }
    }

    static removeStyles(element = {}) {
        element.removeAttribute('style');
    }

    static clearItem(element = {}, all = false) {
        element.innerHTML = '';

        if(all) {
            DOM.removeStyles(element);
            element.removeEventListener();
        }
    }

    static removeItem(element = {}, total = false) {
        if(total) {
            element.remove();
        }
        else {
            DOM.clearItem(element, true);
        }
    }
}