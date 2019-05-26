const Dao = require('./daos/dao');

const dao = new Dao();
const resolvers = {
    User: {
        posts: async (parent, { limit, offset }, context, info) => await parent.getPosts({ limit, offset }),
        comments: async (parent, { limit, offset }, context, info) => await parent.getComments({ limit, offset })
    },
    Post: {
        author: async (parent, args, context, info) => await parent.getUser(),
        comments: async (parent, { limit, offset }, context, info) => await parent.getComments({ limit, offset, order:[ ['createdAt', 'ASC'] ] })
    },
    Comment: {
        author: async (parent, args, context, info) => await parent.getUser(),
        post: async (parent, args, context, info) => await parent.getPost(),
    },

    Query: {
        user: (parent, { id }, { db: { User } }, info) => dao.findByPk(User, id),
        post: (parent, { id }, { db: { Post } }, info) => dao.findByPk(Post, id),
        comment: (parent, { id }, { db: { Comment } }, info) => dao.findByPk(Comment, id),

        users: (parent, { limit, offset }, { db: { User } }, info) => dao.findAll(User, limit, offset, [ ['id', 'ASC'] ], {}),
        posts: (parent, { limit, offset }, { db: { Post } }, info) => dao.findAll(Post, limit, offset, [ ['createdAt', 'DESC'] ], {}),
        comments: (parent, { limit, offset }, { db: { Comment } }, info) => dao.findAll(Comment, limit, offset, [ ['createdAt', 'ASC'] ], {}),
    },

    Mutation: {
        createUser: (parent, { name }, { db: { User } }, info) => dao.create(User, { name }),

        createPost: (parent, { userId, title, content }, { db: { Post } }, info) => dao.create(Post, { userId, title, content }),
        updatePost: (parent, { postId: id, title, content }, { db: { Post } }, info) => dao.updateById(Post, { title, content }, id),
        deletePost: (parent, { postId: id }, { db: { Post } }, info) => dao.destroyById(Post, id),

        createComment: (parent, { postId, userId, title, content }, { db: { Comment } }, info) => dao.create(Comment, { title, content, userId, postId }),
        updateComment: (parent, { commentId: id, content }, { db: { Comment } }, info) => dao.updateById(Comment, { content }, id),
        deleteComment: (parent, { commentId: id }, { db: { Comment } }, info) => dao.destroyById(Comment, id),
    }
};

module.exports = resolvers;