var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));

var sequelize = new Sequelize(config);

class User extends Model{};
User.init(
    {
        user_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        user_login: {type: Sequelize.STRING, allowNull: false},
        user_password: {type: Sequelize.STRING, allowNull: false},
        user_name: {type: Sequelize.STRING, allowNull: false},
        user_surname: {type: Sequelize.STRING, allowNull: false},
        user_role: {type: Sequelize.INTEGER, allowNull: false},
    }, {
        sequelize: sequelize,
        modelName: "User",
        tableName: "user_table",
        timestamps: false
    }
)

module.exports = {
    selectUsers: () => {
        return User.findAll();
    },
    findUser: (login) => {
        return User.findOne({
            where: {
                user_login: login
            }
        });
    },
    countOfUsers: (login) => {
        return User.count({
            where: {
                user_login: login,
            },
        });
    },
    createUser: (login, password, name, surname) => {
        User.create({
            user_login: login, user_password: password, user_name: name, user_surname: surname, user_role: 0
        })
    }
};
