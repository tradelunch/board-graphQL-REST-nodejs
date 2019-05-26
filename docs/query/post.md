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
query getPost ($id: ID = 5){
  post(id: $id) {
		...postFields
    userId
  }
}

query plainGetPost {
  post(id: 2) {
    id
    title
    content
    createdAt
    author {
      id
      name
    }
    comments(limit: 10 offset: 1){
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

fragment postFields on Post {
  id
  title
  content
  createdAt
}
```

