# board-graphQL-REST-nodejs



## RESTful API

- 유저

|             Resource              | Method | Description                                   |
| :-------------------------------: | :----: | :-------------------------------------------- |
|           /user/:userId           |  GET   | userid에 해당하는 유저 검색                   |
|               /user               |  POST  | user 생성 이름, 이메일, 비밀번호              |
|               /user               |  PUT   | user 수정 / 이름, 이메일, 비밀번호            |
|               /user               | DELETE | user 삭제 / user id                           |
|         /user/list/:page          |  GET   | page에 해당하는 유저 리스트                   |
|  /user/list/post/:userId/:page?   |  GET   | userid가 작성한 page에 해당하는 포스트 리스트 |
| /user/list/comment/:userId/:page? |  GET   | userid가 작성한 page에 해당하는 댓글 리스트   |



- 포스트

|             Resource              | Method | Description                                                  |
| :-------------------------------: | :----: | :----------------------------------------------------------- |
|           /post/:postId           |  GET   | postid에 해당하는 포스트 가져오기                            |
|               /post               |  POST  | 포스트 작성하기 / 작성자, 제목, 내용                         |
|               /post               |  PUT   | postid에 해당하는 포스트 수정 / 작성자, 제목, 내용, 수정시간 |
|               /post               | DELETE | postid에 해당하는 포스트 삭제 / 포스트 id                    |
|         /post/list/:page?         |  GET   | page에 해당하는 포스트 리스트                                |
| /post/list/comment/:postId/:page? |  GET   | postid와 page에 해당하는 댓글 리스트                         |



- 댓글

|      Resource       | Method | Description                            |
| :-----------------: | :----: | :------------------------------------- |
| /comment/:commentId |  GET   | 댓글 가져오기                          |
|      /comment       |  POST  | 댓글 작성하기 / 작성자, 내용           |
|      /comment       |  PUT   | 댓글 수정하기 / 작성자, 내용, 수정시간 |
|      /comment       | DELETE | 댓글 삭제 /                            |



## DB 설정

- 사용할 DB 생성 및 user 생성

```mysql
CREATE DATABASE board;
CREATE USER 'class'@'localhost' IDENTIFIED BY '101';
GRANT ALL PRIVILEGES ON board.* TO 'class'@'localhost';
FLUSH PRIVILEGES;
```



## 프로젝트 설정

```bash
npm i
npm start
```

