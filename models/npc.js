var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));
var Race = require(resolve('/GameWeb/models/race.js'));
var Location = require(resolve('/GameWeb/models/location.js'));

var sequelize = new Sequelize(config);

class NPC extends Model{};
NPC.init(
    {
        npc_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        npc_name: {type: Sequelize.STRING, allowNull: false},
        npc_race: {type: Sequelize.INTEGER, allowNull: false, references: {model: Race, key: "race_id"}},
        npc_prof: {type: Sequelize.STRING, allowNull: false},
        npc_location: {type: Sequelize.INTEGER, allowNull: false, references: {model: Location, key: "location_id"}},
        npc_level: {type: Sequelize.INTEGER, allowNull: false},
        npc_image: {type: Sequelize.STRING, allowNull: false},
    }, {
        sequelize: sequelize,
        modelName: "NPC",
        tableName: "npc_table",
        timestamps: false
    }
)

module.exports = {
    selectSkills: () => {
        return NPC.findAll();
    },
    findSkill: (id) => {
        return NPC.findOne({
            where: {
              npc_id: id
            }
        });
    },
    selectNPCsByLocationWithOrder: (location, order, like) => {
        return sequelize.query("select npc_table.npc_id, npc_table.npc_name, race_table.race_name, npc_table.npc_prof, location_table.location_name, " 
        + "npc_table.npc_level, npc_table.npc_image "
        + "from npc_table inner join race_table on npc_table.npc_race = race_table.race_id "
        + "inner join location_table on npc_table.npc_location = location_table.location_id "
        + "where location_table.location_name = '" + location + "' and npc_table.npc_name like '" + like + "%' order by npc_name " + order);
    },
};
