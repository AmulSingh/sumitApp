var mongoose = require('mongoose');

var todoApiSchema = mongoose.Schema({
    task: {
        type:String,
        required:true,
        minlength:2,
        maxlength:100,
        lowercase:true,
        unique:true
    },
    taskstatus: {
        type:Boolean,
        default:false
    }
});


module.exports = mongoose.model('TodoApi', todoApiSchema);