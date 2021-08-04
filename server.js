const bodyParser = require('body-parser');
const express = require('express');
const puerto = process.env.PORT || 3000;
const app = express();

const server = require('http').Server(app);
var io = require('socket.io').listen(server);
io.set('origins', '*:*');
io.set('match origin protocol', true);
const Router = require('./app/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('',Router);

app.set('view engine','pug');

require('./app/sockets')(io);

server.listen( puerto, function(){
    console.log('Servidor corriendo en el puerto 3000');
});