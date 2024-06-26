const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/mover'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/mover/index.html')
});

app.listen(process.env.PORT || 4200);
