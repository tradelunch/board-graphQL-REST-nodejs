const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { random, times } = require('lodash');
const faker = require('faker');

const logger = require('morgan');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const db = require('./models');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
    formatError: error => {
        console.log('error:', error);
        return error;
    },
    formatResponse: response => {
        console.log('response:', response);
        return response;
    },    
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

const routers = require('./routes');
app.use('/user', routers.userRouter);
app.use('/post', routers.postRouter);
app.use('/comment', routers.commentRouter);

// mysql db
db.sequelize
.authenticate()
.then(async () => {
    console.log('Connection has been established successfully.');
    await db.sequelize.sync({ force: false });

    const userIds = await db.User.findAll().map(user => user.id);
    const newUserIds = [
        ...new Set(
            ['admin', ...times(10,() => faker.name.firstName())].filter(id => !userIds.includes(id)))
        ];
    await db.User.bulkCreate(
        newUserIds.map(id => ({
                id,
                name: `${id} ${faker.name.lastName()}`
            })
        )
    );

    console.log(newUserIds, newUserIds.length);

    let posts = await db.Post.bulkCreate(
        times(30, () => ({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            userId: newUserIds[random(0, newUserIds.length - 1)]
        }))
    );

    postIds = posts.map(post => post.id);
    await db.Comment.bulkCreate(
        times(300, () => ({
            content: faker.lorem.sentence(),
            userId: newUserIds[random(0, newUserIds.length - 1)],
            postId: postIds[random(0, 10)]
        }))
    );
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