const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();


// conection db
const MONGO_URI = 'mongodb://localhost/crud-mongo';
mongoose.set('useFindAndModify', true);
mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
    })
    .then(db => console.log('DB Connected'))
    .catch(err => console.log(err));

// Importing routes

const indexRoutes = require('./routes/index');

// Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));

// routes
app.use('/', indexRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})