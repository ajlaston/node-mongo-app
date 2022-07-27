const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = Schema({
    title : {
        type : String,
        required : true
    },

    author : {
        type : Schema.Types.ObjectId,
        ref : "Author",
        required : true
    },

    likes : {
        type : Number,
        default : 0
    },

    year : Number
});

const bookModel = mongoose.model('Book', BooksSchema);

module.exports = bookModel;