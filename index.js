//Подключаем модуль поддержки протокла HTTP
const http = require('http');
//Подключаем модуль управления файлами
const fs = require('fs'); //file system
const path = require('path');
const express = require('express');

const PORT = 8082;

//Майм типы данных и расширения файлов
const mymeType = {
    '.html' : 'text/html',
    '.tmpl' : 'text/html',
    '.js' : 'text/javascript',
    '.css' : 'text/css',
    '.png' : 'image/png',
    '.jpg' : 'image/jpg',
    '.jpeg' : 'image/jpg',
    '.gif' : 'image/gif',
    '.svg' : 'image/svg+xml',
    '.woff' : 'application/font-woff',
    '.eot' : 'application/vnd.ms-fontobject',
    '.ttf' : 'application/font-ttf'
};

const staticFile = (res, filePath, ext) => {
    let params = {};
    if(mymeType[ext].match('text/')) {
        params = {encoding: 'utf8', flag: 'r'}; 
    }

    fs.readFile('.' + filePath, params, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 404;
            res.end();
        }

        res.setHeader('Content-Type', mymeType[ext]);
        res.end(data);
    });
}

const server = http.createServer(function(req, res) {
    console.log('Server request');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.tmpl`);
    const url = req.url;

    let basePath = '';

    switch(url) {
        case '/':
            basePath = '/index.html';
        break;

        case '/brands':
            basePath = createPath('brands');
        break;

        default: 
            const extname = String(path.extname(url)).toLowerCase();
            if(extname in mymeType) {
                console.log(url);
                console.log(extname);
                staticFile(res, url, extname);
            }
            else {
                console.log('404');
                res.end();
            }
        break;
    }

    if(basePath != '') {
        staticFile(res, basePath, '.html');
    }
});

server.listen(PORT, 'localhost', function() {
    console.log('Server start listen');
});