const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const standing = require('./routes/standing');

app.use(bodyParser.json());

app.use('/standing', standing)

app.listen(config.PORT,()=>{
    mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
    console.log(`server is listening on port ${config.PORT} !`)
});

const db = mongoose.connection;
db.on('error', err => console.log(err));

db.once('open', () => {
    console.log(`Database is connected!`);
  });