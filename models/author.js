const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema({
    name : {
        type : String,
        required : true
    }
})

const AuthorModel = mongoose.model('Author', authorSchema);

module.exports = AuthorModel;