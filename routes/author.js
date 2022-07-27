const express = require('express');
const Author = require('../models/author');

const authorRouter = express.Router();

authorRouter.get('/', (req, res, next)=>{
    Author.find((err, authors)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(200).send(authors);
    });
});

authorRouter.post('/', (req, res, next)=>{
    const newAuthor = new Author(req.body);
    newAuthor.save((err, author)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(201).send(author);
    })
})

//get authors by search term or characters etc
authorRouter.get('/search', (req, res, next)=>{
    const {author} = req.query;
    const pattern = RegExp(author);
    Author.find({name: {$regex: pattern, $options: 'i'}}, (err, authors)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(200).send(authors);
    })
})

module.exports = authorRouter;