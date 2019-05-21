module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
        }
    );

    Post.associate = (models) => {
        Post.hasMany(models.Comment, {
            as: 'Comment',
            foreignKey: 'postId',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });
        // Post.belongsTo(models.User, {
        //     foreignKey: 'userName',
        //     targetKey: 'name',
        //     constraints: false,
        // });
    };

    return Post;
}