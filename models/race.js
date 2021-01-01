var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));
var Location = require(resolve('/GameWeb/models/location.js'));

var sequelize = new Sequelize(config);

class Race extends Model{};
Race.init(
    {
        race_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        race_name: {type: Sequelize.STRING, allowNull: false},
        race_location: {type: Sequelize.INTEGER, allowNull: false, references: {model: Location, key: "location_id"}},
    }, {
        sequelize: sequelize,
        modelName: "Race",
        tableName: "race_table",
        timestamps: false
    }
)

module.exports = {
    selectRaces: () => {
        return Race.findAll();
    },
    findRace: (id) => {
        return Race.findOne({
            where: {
              race_id: id
            }
        });
    },
    selectRacesWithId: () => {
        return sequelize.query("select race_id, race_name, race_location from race_table where race_id <= 6")
    },
    findLocationByRace: (id) => {
        return sequelize.query("select location_id from race_table inner join location_table on race_table.race_location = location_table.location_id where race_id = " + id)
    }
};
