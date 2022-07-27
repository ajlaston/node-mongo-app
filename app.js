const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 8000;

const url = "mongodb://localhost:27017/manydb";

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/author', require('./routes/author'));
app.use('/book', require('./routes/book'));

app.use((err, req, res, next)=>{
    console.error(err);
    return res.send({error : err});
});

mongoose.connect(url, ()=> console.log('connected to database'));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})