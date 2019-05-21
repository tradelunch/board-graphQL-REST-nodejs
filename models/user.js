const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            name: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            freezeTableName: true,
            instanceMethods: {
                validPassword(password) {
                    return bcrypt.compare(password, this.password);
                }
            }
        }
    );

    // TODO test
    User.beforeBulkCreate((users, options) => {
        return users.map(user => {
            user.dataValues.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
            return user;
        });
    });

    User.beforeCreate((user, options) => {
        user.dataValues.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        return user;
    });

    User.associate = (models) => {
        User.hasMany(models.post);
        User.hasMany(models.comment);
    };

    return User;
}