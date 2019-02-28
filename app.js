var express = require('express');
var todoController = require('./controllers/todoControllers');

var app = express();

//setup template engine

app.set('view engine', 'ejs');

//static files

app.use(express.static('./public')); 
//fire Controllers

todoController(app);

//listen to a port

app.listen(3000);
console.log('listing to port 3000');
