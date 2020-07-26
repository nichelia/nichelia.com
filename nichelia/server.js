const express = require('express');
const app = express();

app.use(express.static('dist/nichelia'));
app.get('/', (req, res) => {
    res.redirect('/');
});
app.all('/*', (req, res) => {
    res.sendFile('dist/nichelia/index.html', { root: __dirname });
});

app.listen(8080)
