### <a id="post#createPost"> </a>createPost 

```sql
mutation {
  createPost(userId: 10 title: "How to include model with findAll()" content: "U need to ...") {
    id
    title
    content
  	createdAt
    author {
      id
      name
    }
  }
}
```

### updatePost

```sql
mutation {
  updatePost(postId: 10 title: "==> modified" content: "U need to ...")
}
```

### deletePost

```sql
mutation {
  deletePost(postId: 1)
}
```

### get Query

```sql
query {
  post(id: 3) {
    id
    title
    content
    createdAt
    author {
      id
      name
    }
    comments(limit: 10 offset: 2){
      id
      content
      userId
      createdAt
    }
  }
}

query {
  posts(limit: 50 offset: 300) {
    id
    title
    content
    createdAt
    author {
      id
      name
    }
    comments(limit: 5) {
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
```

