require('dotenv').config()

const express = require('express')
const app = express()
//const mongoose = require('mongoose')

//console.log(process.env.DATABASE_URL)
//mongoose.connect('mongodb://localhost/subscribers', { useNewUrlParser: true})
//const db = mongoose.connection
//console.log(db)//
//db.on('error', (error) => console.log(error));
//db.once('open', () => console.log('DB STARTED'));

app.use(express.json());

const UserRouter = require('./routes/users');
app.use('/users', UserRouter);
const ProductRouter = require('./routes/products');
app.use('/products',ProductRouter);

const TokenRouter = require('./routes/buy')
app.use('/buy',TokenRouter);

app.listen(8090, () => console.log('SERVER STARTD AT 8090'));




