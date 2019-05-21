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
    return Comment;
}