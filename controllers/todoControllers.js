var bodyParser = require('body-parser');

var mogoose = require('mongoose');

//connect to the database

mogoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});

//schema

var Todoschema = new mogoose.Schema({
    item: String
});

var Todo = mogoose.model('todo', Todoschema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        var newTodo = Todo(req.body).save( function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove( function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}