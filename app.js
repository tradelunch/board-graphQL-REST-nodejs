const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

const { PORT_PROD } = process.env;

// middleware
app.use(logger('DEV'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('root route');
});

app.use('/user', require('./routes/user'));
app.use('/post', require('./routes/post'));
app.use('/comment', require('./routes/comment'));

app.listen(PORT_PROD, _ => {
    console.log('Express server running on', PORT_PROD);
});