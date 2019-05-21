module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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

    Comment.associate = (models) => {
        Comment.belongsTo(models.post);
    };

    return Comment;
}