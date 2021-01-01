var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));

var sequelize = new Sequelize(config);

class Class extends Model{};
Class.init(
    {
        class_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        class_name: {type: Sequelize.STRING, allowNull: false},
    }, {
        sequelize: sequelize,
        modelName: "Class",
        tableName: "class_table",
        timestamps: false
    }
)

module.exports = {
    selectClasses: () => {
        return Class.findAll();
    },
    findClass: (id) => {
        return Class.findOne({
            where: {
              class_id: id
            }
        });
    },
    selectClassesWithId: () => {
        return sequelize.query("select class_id, class_name from class_table where class_id <= 4")
    },
};
