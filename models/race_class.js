var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));
var Race = require(resolve('/GameWeb/models/race.js'));
var Class = require(resolve('/GameWeb/models/class.js'));

var sequelize = new Sequelize(config);

class RaceClass extends Model{};
RaceClass.init(
    {
        race_class_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        race_class_race: {type: Sequelize.INTEGER, allowNull: false, references: {model: Race, key: "race_id"}},
        race_class_class: {type: Sequelize.INTEGER, allowNull: false, references: {model: Class, key: "class_id"}},
        race_class_image: {type: Sequelize.STRING, allowNull: false}
    }, {
        sequelize: sequelize,
        modelName: "RaceClass",
        tableName: "race_class_table",
        timestamps: false
    }
)

module.exports = {
    selectRacesClasses: () => {
        return RaceClass.findAll();
    },
    findRaceClass: (race, _class) => {
        return RaceClass.findOne({
            where: {
              race_class_race: race,
              race_class_class: _class
            }
        });
    }
};
