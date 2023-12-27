class Routing
{
    constructor() {
        this.dirViews = '/views/';
        this.arRoutes = {};
        this.ext = '.tmpl';
        this.error404 = '404';
    }

    /**
     * 
     * @param {*} url important
     * @param {method = GET*|POST, type = sync*|async, responseType = '', headers = [], data = {}} params options
     */
    static ajax(url, params = {}) {
        fetch(url)
            .then(response => {
                if(params.type == 'json')
                    return response.json();

                if(params.type == 'blob')
                    return response.blob() || response.arrayBuffer();

                return response.text();
            })
            .then(answer => {
                if(params.onsuccess && params.onsuccess instanceof Function) {
                    let data = params;

                    if(answer != '')
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

    /**
     * 
     * @param {*} id 
     * @param {*} callback Function
     */
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

        Routing.setUrl(pageUrl, title);
    }

    static setUrl(url, title) {
        //history.pushState({page: 1}, title, url);
    }
}

