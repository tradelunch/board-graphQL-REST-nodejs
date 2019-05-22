const resolvers = {
    User: {
        posts: async (parent, args, context, info) => {
            const { limit, offset } = args;
            return await parent.getPost({ limit, offset });
        },
        comments: async (parent, args, context, info) => {
            const { limit, offset } = args;
            return await parent.getComment({ limit, offset });
        }
    },
    Post: {
        author: async (parent, args, context, info) => await parent.getUser(),
        comments: async (parent, args, context, info) => {
            console.log(parent);
            const { limit, offset } = args;
            return await parent.getComment({ limit, offset,
                order:[
                    ['createdAt', 'ASC']
                ],
            });
        }
    },
    Comment: {
        author: async (parent, args, context, info) => await parent.getUser(),
        post: async (parent, args, context, info) => await parent.getPost(),
    },

    Query: {
        user: async (parent, { id }, { db: { User } }, info) => await User.findByPk(id),
        post: async (parent, { id }, { db: { Post } }, info) => await Post.findByPk(id),
        comment: async (parent, { id }, { db: { Comment } }, info) => await Comment.findByPk(id),

        users: async (parent, args, { db: { User } }, info) => await User.findAll(),
        posts: async (parent, args, { db: { Post } }, info) => {
            const { limit, offset } = args;
            return await Post.findAll({
                order:[
                    ['createdAt', 'DESC']
                ],                
                limit, 
                offset 
            });
        },
        comments: async (parent, args, { db: { Comment } }, info) => {
            const { limit, offset } = args;
            return await Comment.findAll({ 
                order:[
                    ['createdAt', 'ASC']
                ],
                limit, 
                offset 
            });
        },
    },
    
    Mutation: {
        createUser: async (parent, { name }, { db: { User } }, info) => await User.create({ name }),

        createPost: async (parent, { userId, title, content }, { db: { Post } }, info) => await Post.create({ userId, title, content }),
        updatePost: async (parent, { postId: id, title, content }, { db: { Post } }, info) => {
            return await Post.update({ title, content }, {
                where: {
                    id
                }
            });
        },
        deletePost: async (parent, { postId: id }, { db: { Post } }, info) => await Post.destroy({ where: { id } }),

        createComment: async (parent, { postId, userId, title, content }, { db: { Comment } }, info) => await Comment.create({ title, content, userId, postId }),
        updateComment: async (parent, { commentId: id, content }, { db }, info) => {
            return await Comment.update({ content }, {
                where: {
                    id
                }
            });
        },
        deleteComment: async (parent, { commentId: id }, { db: { Comment } }, info) => await Comment.destroy({ where: { id } }),
    }
};

module.exports = resolvers;