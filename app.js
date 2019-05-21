const express = require('express');
const dotenv = require('dotenv');
const { random, times } = require('lodash');
const faker = require('faker');

const logger = require('morgan');
const bodyParser = require('body-parser');


dotenv.config();
const app = express();

const { PORT_PROD } = process.env;

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('root route');
});

app.use('/user', require('./routes/user'));
app.use('/post', require('./routes/post'));
app.use('/comment', require('./routes/comment'));

// mysql db
const db = require('./models');
db.sequelize.authenticate()
.then(async () => {
    console.log('Connection has been established successfully.');
    await db.sequelize.sync({ force: true });

    // dummy data
    await db.User.create({ name: 'admin' });
    await db.User.bulkCreate(
        times(10, () => ({
            name: `${faker.name.firstName()} ${faker.name.lastName()}`
        }))
    );
    await db.Post.bulkCreate(
        times(20, () => ({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            userId: random(1, 11)
        }))
    );
    await db.Comment.bulkCreate(
        times(100, () => ({
            content: faker.lorem.sentence(),
            userId: random(1, 11),
            postId: random(1, 20)
        }))
    );
})
.then(() => {
    console.log('DB Sync complete.');
    app.listen(PORT_PROD, _ => {
        console.log('Express server running on', PORT_PROD);
    });
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});