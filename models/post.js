module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
        }
    );

    Post.associate = (models) => {
        Post.hasMany(models.comment);
    };

    return Post;
}