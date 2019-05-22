const express = require('express');
const dotenv = require('dotenv');
const { random, times } = require('lodash');
const faker = require('faker');

const logger = require('morgan');
const bodyParser = require('body-parser');

dotenv.config();
const { PORT } = process.env;

const db = require('./models');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db }
});

const app = express();
server.applyMiddleware({ app });

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
db.sequelize.authenticate()
.then(async () => {
    console.log('Connection has been established successfully.');
    await db.sequelize.sync({ force: false });
    // await db.User.create({ name: 'admin' });
    // await db.User.bulkCreate(
    //     times(10, () => ({
    //         name: `${faker.name.firstName()} ${faker.name.lastName()}`
    //     }))
    // );
    // await db.Post.bulkCreate(
    //     times(50, () => ({
    //         title: faker.lorem.sentence(),
    //         // author: faker.lorem.word(),
    //         content: faker.lorem.paragraph(),
    //         userId: random(1, 10)
    //     }))
    // );
    // await db.Comment.bulkCreate(
    //     times(100, () => ({
    //         content: faker.lorem.sentence(),
    //         // author: faker.lorem.word(),
    //         userId: random(1, 10),
    //         postId: random(1, 20)
    //     }))
    // );
})
.then(() => {
    console.log('DB Sync complete.');
    app.listen(PORT, _ => {
        console.log('Express server running on', PORT);
    });
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});