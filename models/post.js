module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
    };

    return Post;
}