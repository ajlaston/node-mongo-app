const express = require('express');
const Books = require('../models/books');
const bookRouter = express.Router();

bookRouter.get('/', (req, res, next)=>{
    Books.find((err, books)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(200).send(books);
    })
})

bookRouter.get('/:authorId', (req, res, next)=>{
    Books.find({author : req.params.authorId}, (err, books)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(201).send(books);
    })
})

bookRouter.post('/:authorId', (req, res, next)=>{
    req.body.author = req.params.authorId;
    const newBook = new Books(req.body);

    newBook.save((err, books)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(201).send(books);
    })
})

//increment likes
bookRouter.put('/likes/:bookId', (req, res, next)=>{
    const bookId = req.params.bookId;
    Books.findOneAndUpdate(
        {_id : bookId},
        {$inc : {likes : 1}},
        {new : true},
        (err, books)=>{
            if(err){
                res.status(500);
                return next(err);
            }

            res.status(201).send(books);
    })
})

module.exports = bookRouter;