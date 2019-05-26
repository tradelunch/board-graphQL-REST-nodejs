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
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            freezeTableName: true,
        }
    );
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            onDelete: 'cascade'
        });
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            targetKey: 'id',
            onDelete: 'cascade'
        });
    };
    return Comment;
}