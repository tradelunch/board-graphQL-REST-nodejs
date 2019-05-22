module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: DataTypes.TEXT,
                validate : {
                    len : [0, 500],
                },
                allowNull: false
            }
        },
        {
            freezeTableName: true,
        }
    );
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        });
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            targetKey: 'id',
        });
    };
    return Comment;
}