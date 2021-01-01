var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));

var sequelize = new Sequelize(config);

class Location extends Model{};
Location.init(
    {
        location_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        location_name: {type: Sequelize.STRING, allowNull: false},
        location_x: {type: Sequelize.INTEGER, allowNull: false},
        location_y: {type: Sequelize.INTEGER, allowNull: false},
        location_z: {type: Sequelize.INTEGER, allowNull: false},
        location_min_level: {type: Sequelize.INTEGER, allowNull: false},
        location_max_level: {type: Sequelize.INTEGER, allowNull: false},
        location_image: {type: Sequelize.STRING},
    }, {
        sequelize: sequelize,
        modelName: "Location",
        tableName: "location_table",
        timestamps: false
    }
)

module.exports = {
    selectLocations: () => {
        return Location.findAll();
    },
    findLocation: (id) => {
        return Location.findOne({
            where: {
              location_id: id
            }
        });
    },
    selectLocationsByCharacter: (name) => {
        return sequelize.query("select location_id, location_name, location_x, location_y, location_z, location_min_level, location_max_level, location_image, "
        + "location_x - (select location_x from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = '" + name + "') as location_x_dir, "
        + "location_y - (select location_y from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = '" + name + "') as location_y_dir, "
        + "location_z - (select location_z from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = '" + name + "') as location_z_dir "
        + "FROM location_table where "
        + "(abs(location_x - (select location_x from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = '" + name + "')) + " 
        + "abs(location_y - (select location_y from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = '" + name + "')) + "
        + "abs(location_z - (select location_z from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = '" + name + "')) < 2) ");
    },
    changeLocation: (name, id) => {
        return sequelize.query("update character_table set character_table.character_location = " + id  
        + " where character_table.character_name = '" + name + "'");
    }
};
