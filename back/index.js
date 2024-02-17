const express = require('express');

const PORT = process.env.PORT || 8000;

const app = express();

app.listen(PORT, () => {
    console.log('server started on port ' + PORT)
});

app.get('/', (req, res)=> {
    res.json({
        message: "Hello from back"
    })
});