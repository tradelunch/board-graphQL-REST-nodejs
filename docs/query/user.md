### createUser

```sql
mutation {
  createUser(name: "victor") {
    id
    name
  }
}
```



### GET query

```sql
query {
  user(id: 1) {
    id
    name
    createdAt
    posts(limit: 2) {
      id
      title
      content
      createdAt
      author {
        id
        name
      }
      comments(limit: 3) {
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
  
  users(limit: 2) {
    id
    name
    createdAt
    posts(limit: 1) {
      id
      title
      content
      createdAt
    }
    comments(limit: 2) {
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

