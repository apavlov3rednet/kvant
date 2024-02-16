const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = 8000;

const createPath = (page, dir = 'views', ext = 'html') => {
    return path.resolve(__dirname, dir, `${page}.html`)
};

//мидлваре - промежуточная функциональность, 
//в самом начале запроса после сервера, до создания роута

//Логируйщий
// app.use((req, res, next) => {
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     next(); //возвращаем контроль серверу
// });

function isFolder(path) {
    return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
}

app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'));

app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

app.get('/', (req, res) => {
    const title = 'Home';
    res.sendFile(createPath('index'), {title});
});

app.get('/index.html', (req, res) => {
    res.redirect('/');
});

//Обработка ошибок должен идти в конце
app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath(404));
});

app.listen(PORT, (error) => {
    (error) ? console.log(error) : console.log('Server start listen on port ' + PORT);
});