// https://medium.com/@cjab/some-things-to-consider-when-deploying-your-react-app-to-heroku-b8a81fa02e82 From this guide
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join('build', 'index.html'));
    });
}