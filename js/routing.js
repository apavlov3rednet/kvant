class Routing {

    constructor() {
        this.dirViews = '/views/';
        this.arRoutes = {};
        this.ext = '.tmpl';
        this.error404 = '404';
    }

    /**
     * 
     * @param {*} url important
     * @param {method = GET*|POST, type = sync*|async, responseType = '', headers = [], data = {} } params options
     */
    static ajaxOld(url, params = {}) {
        let xhr = new XMLHttpRequest();

        //Метод запроса к серверу
        let method = params.method || 'GET';
        let type = params.type === 'async';

        xhr.open(method, url, type);

        //Ожидаемый от сервера тип данных
        if(type) {
            /**
             * text === ''
             * arrayBuffer
             * blob
             * document = xml, yml, XPath
             * json
             */
            xhr.responseType = (params.responseType) ? params.responseType : '';
        }

        //Заголовки запроса
        //xhr.setRequestHeader('Content-Type', 'aaplication/json');
        if(params.headers && params.headers instanceof Array) {
            params.headers.forEach((item, index) => xhr.setRequestHeader(index, item));
        }

        if(params.data && Object.keys(params.data).length > 0) {
            xhr.send(params.data);
        }
        else {
            xhr.send();
        }

        //Прогресс запроса
        xhr.oprogress = function(event) {
            console.log(`Загружено: ${event.loaded} из ${event.total}`);
        }

        //Результат запроса к серверу
        xhr.onload = function() {
            /**
             * 10* - ошибки которые происходят на стороне сервера или железа
             * 200 - всегда успех
             * 300 - перенаправления
             * 400 - ошибки которые возникают на стороне клиента
             * 500 - ошибки сервера
             */
            if(xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // 404: Not found
            }
            else {
                console.log(xhr.response);
                return xhr.response;
            }
        }

        xhr.onloadend = function() {
            console.log(xhr.response);
            return xhr.response;
        }

        //Ошибка запроса
        xhr.onerror = function(event) {
            console.error('Какая то ошибка');
            console.log(event);
        }
    }

    /**
     * 
     * @param {*} url 
     * @param {callback = function() {}} params 
     */
    static ajax(url, params) {
        fetch(url)
        .then(response => {
            if(params.type === 'json')
                return response.json();

            if(params.type === 'blob')
                return response.blob();

            return response.text();
        })
        .then(answer => {
            if(params.onsuccess && params.onsuccess instanceof Function) {
                let data = params;
                data.answer = answer;
                params.onsuccess(data);
                return true;
            }
                
            else return answer;
        });
    }

    treeRoutes(menu = []) {
        menu.forEach((item, index) => {
            this.arRoutes[index] = {
                name: item.innerText,
                request: this.dirViews + item.dataset.route + this.ext,
                url: '/' + item.dataset.route + '/'
            }
        });

        this.arRoutes['error'] = {
            name: '404',
            request: this.dirViews + this.error404 + this.ext,
            url: '/404/'
        }
    }

    getContent(id, callback) {
        let url = this.arRoutes[id].request || 'error';
        let title = this.arRoutes[id].name;
        let pageUrl = this.arRoutes[id].url;

        if(url !== 'error') {
            Routing.ajax(url, {
                title: title,
                onsuccess: callback
            }); 
        }

        this.setUrl(pageUrl, title);
    }

    setUrl(url, title) {
        //history.pushState({page: 1}, title, url);
    }
}
