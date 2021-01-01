var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));
var Race = require(resolve('/GameWeb/models/race.js'));
var Class = require(resolve('/GameWeb/models/class.js'));
var Location = require(resolve('/GameWeb/models/location.js'));

var sequelize = new Sequelize(config);

class Monster extends Model{};
Monster.init(
    {
        monster_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        monster_name: {type: Sequelize.STRING, allowNull: false},
        monster_race: {type: Sequelize.INTEGER, allowNull: false, references: {model: Race, key: "race_id"}},
        monster_class: {type: Sequelize.INTEGER, allowNull: false, references: {model: Class, key: "class_id"}},
        monster_location: {type: Sequelize.INTEGER, allowNull: false, references: {model: Location, key: "location_id"}},
        monster_level: {type: Sequelize.INTEGER, allowNull: false},
        monster_health: {type: Sequelize.INTEGER, allowNull: false},
        monster_max_health: {type: Sequelize.INTEGER, allowNull: false},
        monster_mana: {type: Sequelize.INTEGER, allowNull: false},
        monster_max_mana: {type: Sequelize.INTEGER, allowNull: false},
        monster_power: {type: Sequelize.INTEGER, allowNull: false},
        monster_speed: {type: Sequelize.INTEGER, allowNull: false},
        monster_mind: {type: Sequelize.INTEGER, allowNull: false},
        monster_image: {type: Sequelize.STRING, allowNull: false},
    }, {
        sequelize: sequelize,
        modelName: "Monster",
        tableName: "monster_table",
        timestamps: false
    }
)

module.exports = {
    selectMonsters: () => {
        return Monster.findAll();
    },
    findMonster: (id) => {
        return Monster.findOne({
            where: {
              monster_id: id
            }
        });
    },
    selectMonstersByLocationWithOrder: (location, order, like) => {
        return sequelize.query("select monster_table.monster_id, monster_table.monster_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "monster_table.monster_level, monster_table.monster_health, monster_table.monster_max_health, monster_table.monster_mana, monster_table.monster_max_mana, "
            + "monster_table.monster_power, monster_table.monster_speed, monster_table.monster_mind,  monster_table.monster_image, "
            + "sum(item_table.item_health) item_health, sum(item_table.item_mana) item_mana, "
            + "sum(item_table.item_power) item_power, sum(item_table.item_speed) item_speed, sum(item_table.item_mind) item_mind "
            + "from monster_table inner join race_table on monster_table.monster_race = race_table.race_id "
            + "inner join class_table on monster_table.monster_class = class_table.class_id "
            + "inner join location_table on monster_table.monster_location = location_table.location_id "
            + "left join monster_item_table on monster_table.monster_id = monster_item_table.monster_item_monster "
            + "left join item_table on monster_item_table.monster_item_item = item_table.item_id "
            + "where location_table.location_name = '" + location + "' and monster_table.monster_name like '" + like + "%' "
            + "group by monster_table.monster_id, monster_table.monster_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "monster_table.monster_level, monster_table.monster_health, monster_table.monster_max_health, monster_table.monster_mana, monster_table.monster_max_mana, "
            + "monster_table.monster_power, monster_table.monster_speed, monster_table.monster_mind, monster_table.monster_image order by monster_name " + order);
    },
    findMonsterWithItems: (name) => {
        return sequelize.query("select monster_table.monster_id, monster_table.monster_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "monster_table.monster_level, monster_table.monster_health, monster_table.monster_max_health, monster_table.monster_mana, monster_table.monster_max_mana, "
            + "monster_table.monster_power, monster_table.monster_speed, monster_table.monster_mind,  monster_table.monster_image, "
            + "sum(item_table.item_health) item_health, sum(item_table.item_mana) item_mana, "
            + "sum(item_table.item_power) item_power, sum(item_table.item_speed) item_speed, sum(item_table.item_mind) item_mind "
            + "from monster_table inner join race_table on monster_table.monster_race = race_table.race_id "
            + "inner join class_table on monster_table.monster_class = class_table.class_id "
            + "inner join location_table on monster_table.monster_location = location_table.location_id "
            + "left join monster_item_table on monster_table.monster_id = monster_item_table.monster_item_monster "
            + "left join item_table on monster_item_table.monster_item_item = item_table.item_id "
            + "where monster_table.monster_name = '" + name + "' " 
            + "group by monster_table.monster_id, monster_table.monster_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "monster_table.monster_level, monster_table.monster_health, monster_table.monster_max_health, monster_table.monster_mana, monster_table.monster_max_mana, "
            + "monster_table.monster_power, monster_table.monster_speed, monster_table.monster_mind, monster_table.monster_image");
    }
};
