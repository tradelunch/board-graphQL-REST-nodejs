# board-graphQL-REST-nodejs



- [RESTful API Detail](#REST)

- [GraphQL Detail](#graphQL)
- [DB Setting](#db)
- [Project Setting](#setting)
  - [Duumy Data](#dummy)
- [Project Structure](#structure)



## <a id="REST">RESTful API</a>

- User

|                 Resource                 |   Method   | Description                                                  |
| :--------------------------------------: | :--------: | :----------------------------------------------------------- |
|              /user/:userId               |    GET     | userid에 해당하는 유저 검색                                  |
|                  /user                   |    POST    | user 생성 이름, 이메일, 비밀번호                             |
|                ~~/user~~                 |  ~~PUT~~   | ~~user 수정 / 이름, 이메일, 비밀번호~~                       |
|                ~~/user~~                 | ~~DELETE~~ | ~~user 삭제 / user id~~                                      |
|         /user/list/:page?/:size?         |    GET     | page에 해당하는 size만큼 유저 가져오기                       |
|  /user/list/post/:userId/:page?/:size?   |    GET     | userid가 작성한 포스트 중 page에 해당하는 size만큼 포스트 가져오기 |
| /user/list/comment/:userId/:page?/:size? |    GET     | userid가 작성한 댓글 중 page에 해당하는 size만큼 댓글 가져오기 |



- Post

|                 Resource                 | Method | Description                                                  |
| :--------------------------------------: | :----: | :----------------------------------------------------------- |
|              /post/:postId               |  GET   | postid에 해당하는 포스트 가져오기                            |
|                  /post                   |  POST  | 포스트 작성하기 / 작성자, 제목, 내용                         |
|                  /post                   |  PUT   | postid에 해당하는 포스트 수정 / 작성자, 제목, 내용, 수정시간 |
|                  /post                   | DELETE | postid에 해당하는 포스트 삭제 / 포스트 id                    |
|        /post/list/:page?/: size?         |  GET   | page에 해당하는 size만큼 포스트 가져오기                     |
| /post/list/comment/:postId/:page?/:size? |  GET   | postId를 가진 포스트에 작성된 댓글 중 page에 해당하는 size만큼 댓글 가져오기 |



- Comment

|      Resource       | Method | Description                            |
| :-----------------: | :----: | :------------------------------------- |
| /comment/:commentId |  GET   | 댓글 가져오기                          |
|      /comment       |  POST  | 댓글 작성하기 / 작성자, 내용           |
|      /comment       |  PUT   | 댓글 수정하기 / 작성자, 내용, 수정시간 |
|      /comment       | DELETE | 댓글 삭제 /                            |



# <a id="graphQL">GraphQL</a>

| URL      | How to Use                              |
| -------- | --------------------------------------- |
| /graphql | Try Queries<br />- query<br />- mutaion |

- [Example GraphQL Query](./docs/query/)
  - [User](./docs/query/user.md)
  - [Post](./docs/query/post.md)
  - [Comment](./docs/query/post.md)



## <a id="db"> DB 설정</a>

- MySQL
- Create DB, user for the project

```mysql
CREATE DATABASE board;
CREATE USER 'class'@'localhost' IDENTIFIED BY '101';
ALTER USER 'class'@'localhost' IDENTIFIED WITH mysql_native_password BY '101'
GRANT ALL PRIVILEGES ON board.* TO 'class'@'localhost';
FLUSH PRIVILEGES;
```



## <a id="setting">Project Setting</a>

- node.js: v10.15.3
- npm packages

```bash
  "dependencies": {
    "apollo-server-express": "^2.5.0",
    "dotenv": "^8.0.0",
    "express": "^4.17.0",
    "graphql": "^14.3.0",
    "moment": "^2.24.0",
    "mysql2": "^1.6.5",
    "sequelize": "^5.8.6"
  },
  "devDependencies": {
    "bcrypt": "^3.0.6",
    "eslint": "^5.16.0",
    "faker": "^4.1.0",
    "lodash": "^4.17.11",
    "morgan": "^1.9.1",
    "nodemon": "^1.19.0"
```

- How to start

```bash
# git clone
git clone https://github.com/intothedeep/board-graphQL-REST-nodejs.git
# install packages
npm i
# start
nodemon start
```



## <a id="structure">Project Structure</a>

```bash
# REST
|app.js
|--controllers
|----index.js
|----post.js
|----user.js
|----comment.js
|--routes
|----index.js
|----post.js
|----user.js
|----comment.js
|--models
|----index.js
|----Post.js
|----User.js
|----Comment.js

|--daos

# GraphQL
|app.js
|schema.js
|resolvers.js

# misc
|--docs
```



### <a id="dummy">Setup Dummy Data</a>

```js
// app.js
// This code block will generate dummy data and insert them into the DB

// set this true if you want to reset DB.
await db.sequelize.sync({ force: true }); 

// When this block is active, dummy data will be created every time you restart server
// To stop creating dummies, make this code below as comments
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
```







