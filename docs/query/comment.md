### createComment

```sql
mutation {
  createComment(postId: 51, userId: "5", content: ">>>> test create comment!") {
    id
    content
    createdAt
    userId
    postId
    post {
      id
      title
      content
      userId
      author {
        id,
        name
      }
      comments(limit: 3) {
        id
        content
        author {
          id
          name
        }
      }
    }
    author {
      id
      name
    }
  }
}
```

### updateComment

```sql
mutation {
  updateComment(commentId: 3 content: "===>comment modified")
}
```



### deleteComment

```sql
mutation {
  deleteComment(commentId: 801)
}

```



### GET Query

```sql
query {
  comments(limit: 3 offset: 5) {
    id
    content
    createdAt
    author {
      id
      name
    }
    post {
      id
      userId
      title
      content
      createdAt
    }
  }
  
  comment(id: 9) {
    id
    content
    createdAt
    author {
      id
      name
    }
    post {
      id
      title
      content
      createdAt
      author {
        id
        name
      }
      comments(limit: 5 offset: 0) {
        id
        content
        createdAt
        author {
          id
          name
        }
      }
    }
  }
}
```



### 