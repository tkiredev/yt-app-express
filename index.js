const express = require('express');
const path = require('path');

app = express();

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/watch/?', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/results/?', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
})


app.listen(3000);