require('dotenv').config();
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var db_model = require('./mongodb');
var db = mongoose.connection;
var bodyParser = require('body-parser');
var _ = require('underscore');
var cors = require('cors');

db.on('error', function(){
   console.log('error occured u duffer...'); 
});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/frontend'));

//GET request for displaying all todos with queryParams
app.get('/todos', (req, res) => {
    try{
        if(req.query.hasOwnProperty('task') && req.query.task.length > 0){
            db_model.find().where({task : {$regex : req.query.task, $options : 'i'}}).then(function(data){
                res.json(data);
            }, function(){
                console.log('error in regex queryParam...');
            });
        }else if(req.query.hasOwnProperty('taskstatus') && req.query.taskstatus == "false"){
            db_model.find().where({taskstatus : req.query.taskstatus}).then(function(data){
                res.json(data);
            }, function(){
                console.log('error in regex queryParam...');
            });   
        }else if(req.query.hasOwnProperty('taskstatus') && req.query.taskstatus == "true"){
            db_model.find().where({taskstatus : req.query.taskstatus}).then(function(data){
                res.json(data);
            }, function(){
                console.log('error in regex queryParam...');
            });         
        }else{
            db_model.find().then(function(data){
                res.json(data);
            }, function(){
                console.log('something wrong in fetch');
            });
        }
    }catch(e){
        console.log(e.message);
    }
});

//GET request for displaying Todo with id
app.get('/todos/:id', function(req,res){
    db_model.findById({_id : req.params.id}).then(function(todo){
        res.json(todo);
    }, function(){
        console.log('something went wrong in delete request...');
    });
});

// POST request to add todo
app.post('/todos', (req, res) => {
    try{
        if(req.body.task && req.body.taskstatus){
            var todo = db_model({
                task:req.body.task,
                taskstatus:req.body.taskstatus
            });
            todo.save().then(function(){
                res.json(todo);
            }, function(){
                console.log('error occured while saving...');
            });
        }else if(req.body.task){
            var todo = db_model({
                task:req.body.task
            });
            todo.save().then(function(){
                res.json(todo);
            }, function(){
                console.log('error occured while saving...');
            });
        }else{
            console.log('task cannot be empty...');
        }
    }catch(e){
        console.log(e.message);
    }
});

//PATCH request to update the todo by id
app.patch('/todos/:id', (req, res) => {
    try{
        if(req.body.task && req.body.taskstatus){
            db_model.updateOne({_id : req.params.id}, {$set : {
                task:req.body.task,
                taskstatus:req.body.taskstatus
            }}).then(function(todo){
                res.json(todo);
            }, function(){
                console.log('something went wrong in update request...')
            });
        }else if(req.body.task){
            db_model.updateOne({_id : req.params.id}, {$set : {
                task:req.body.task
            }}).then(function(todo){
                res.json(todo);
            }, function(){
                console.log('something went wrong in update request...')
            });
        }else{
            db_model.updateOne({_id : req.params.id}, {$set : {
                taskstatus:req.body.taskstatus
            }}).then(function(todo){
                res.json(todo);
            }, function(){
                console.log('something went wrong in update request...')
            });
        }
    }catch(e){
        console.log(e.message);
    }
});

//DELETE request to delete todo
app.delete('/todos/:id', (req, res) => {
    db_model.deleteOne({_id : req.params.id}).then(function(todo){
        res.json(todo);
    }, function(){
        console.log('something went wrong in delete request...');
    });
});

//DB connection
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.ljteb.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}, function(){
    app.listen(PORT, function(){
        console.log('Express server running live on PORT :'+PORT);
        console.log('Database connected successfully!');
    });
});