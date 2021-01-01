var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));
var User = require(resolve('/GameWeb/models/user.js'));
var Race = require(resolve('/GameWeb/models/race.js'));
var Class = require(resolve('/GameWeb/models/class.js'));
var Location = require(resolve('/GameWeb/models/location.js'));

var sequelize = new Sequelize(config);

class Character extends Model{};
Character.init(
    {
        character_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        character_user: {type: Sequelize.INTEGER, allowNull: false, references: {model: User, key: "user_id"}},
        character_name: {type: Sequelize.STRING, allowNull: false},
        character_race: {type: Sequelize.INTEGER, allowNull: false, references: {model: Race, key: "race_id"}},
        character_class: {type: Sequelize.INTEGER, allowNull: false, references: {model: Class, key: "class_id"}},
        character_location: {type: Sequelize.INTEGER, allowNull: false, references: {model: Location, key: "location_id"}},
    }, {
        sequelize: sequelize,
        modelName: "Character",
        tableName: "character_table",
        timestamps: false
    }
)

module.exports = {
    selectCharacters: (login) => {
        return sequelize.query("select character_table.character_id, race_class_table.race_class_image, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "character_table.character_level, character_table.character_exp, character_table.character_health, character_table.character_max_health, character_table.character_mana, character_table.character_max_mana "
            + "from character_table inner join user_table on character_table.character_user = user_table.user_id "
            + "inner join race_table on character_table.character_race = race_table.race_id "
            + "inner join class_table on character_table.character_class = class_table.class_id "
            + "inner join location_table on character_table.character_location = location_table.location_id "
            + "inner join race_class_table on race_table.race_id = race_class_table.race_class_race and class_table.class_id = race_class_table.race_class_class "
            + "where user_table.user_login = '" + login + "'");
    },
    selectCharactersWithOrder: (login, order, like) => {
        return sequelize.query("select character_table.character_id, race_class_table.race_class_image, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "character_table.character_level, character_table.character_exp, character_table.character_health, character_table.character_max_health, character_table.character_mana, character_table.character_max_mana, "
            + "character_table.character_power, character_table.character_speed, character_table.character_mind, "
            + "sum(item_table.item_health) item_health, sum(item_table.item_mana) item_mana, "
            + "sum(item_table.item_power) item_power, sum(item_table.item_speed) item_speed, sum(item_table.item_mind) item_mind "
            + "from character_table inner join user_table on character_table.character_user = user_table.user_id "
            + "inner join race_table on character_table.character_race = race_table.race_id "
            + "inner join class_table on character_table.character_class = class_table.class_id "
            + "inner join location_table on character_table.character_location = location_table.location_id "
            + "inner join race_class_table on race_table.race_id = race_class_table.race_class_race and class_table.class_id = race_class_table.race_class_class "
            + "left join character_item_table on character_table.character_id = character_item_table.character_item_character "
            + "left join item_table on character_item_table.character_item_item = item_table.item_id "
            + "where user_table.user_login = '" + login + "' and character_table.character_name like '" + like + "%' "
            + "group by character_table.character_id, race_class_table.race_class_image, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "character_table.character_level, character_table.character_exp, character_table.character_health, character_table.character_max_health, character_table.character_mana, character_table.character_max_mana, "
            + "character_table.character_power, character_table.character_speed, character_table.character_mind order by character_name " + order);
    },
    findCharacter: (login, name) => {
        return sequelize.query("select character_table.character_id, race_class_table.race_class_image, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "character_table.character_level, character_table.character_exp, character_table.character_health, character_table.character_max_health, character_table.character_mana, character_table.character_max_mana, "
            + "character_table.character_power, character_table.character_speed, character_table.character_mind "
            + "from character_table inner join user_table on character_table.character_user = user_table.user_id "
            + "inner join race_table on character_table.character_race = race_table.race_id "
            + "inner join class_table on character_table.character_class = class_table.class_id "
            + "inner join location_table on character_table.character_location = location_table.location_id "
            + "inner join race_class_table on race_table.race_id = race_class_table.race_class_race and class_table.class_id = race_class_table.race_class_class "
            + "where user_table.user_login = '" + login + "' and character_table.character_name = '" + name + "'");
    },
    findCharacterWithItems: (login, name) => {
        return sequelize.query("select character_table.character_id, race_class_table.race_class_image, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "character_table.character_level, character_table.character_exp, character_table.character_health, character_table.character_max_health, character_table.character_mana, character_table.character_max_mana, "
            + "character_table.character_power, character_table.character_speed, character_table.character_mind, "
            + "sum(item_table.item_health) item_health, sum(item_table.item_mana) item_mana, "
            + "sum(item_table.item_power) item_power, sum(item_table.item_speed) item_speed, sum(item_table.item_mind) item_mind "
            + "from character_table inner join user_table on character_table.character_user = user_table.user_id "
            + "inner join race_table on character_table.character_race = race_table.race_id "
            + "inner join class_table on character_table.character_class = class_table.class_id "
            + "inner join location_table on character_table.character_location = location_table.location_id "
            + "inner join race_class_table on race_table.race_id = race_class_table.race_class_race and class_table.class_id = race_class_table.race_class_class "
            + "left join character_item_table on character_table.character_id = character_item_table.character_item_character "
            + "left join item_table on character_item_table.character_item_item = item_table.item_id "
            + "where user_table.user_login = '" + login + "' and character_table.character_name = '" + name + "' " 
            + "group by character_table.character_id, race_class_table.race_class_image, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, "
            + "character_table.character_level, character_table.character_exp, character_table.character_health, character_table.character_max_health, character_table.character_mana, character_table.character_max_mana, "
            + "character_table.character_power, character_table.character_speed, character_table.character_mind ");
    },
    countOfCharacters: (login) => {
        return sequelize.query("select count(*) from character_table inner join user_table on character_table.character_user = user_table.user_id "
            + "where user_table.user_login = '" + login + "'");
    },
    createCharacter: (user, name, race, _class, location) => {
        Character.create({
            character_user: user, character_name: name, character_race: race, character_class: _class, character_location: location
        })
    },
    deleteCharacter: (id) => {
        Character.destroy({where: {character_id: id}});
    },
    updateCharacter: (id, name) => {
        Character.update({character_name: name}, {where: {character_id: id}})
    },
    updateCharacterStats: (name, level, exp, health, max_health, mana, max_mana, power, speed, mind) => {
        return sequelize.query("update character_table set character_table.character_level = " + level + " , character_table.character_exp = " + exp + ", " 
        + "character_table.character_health = " + health + ", character_table.character_max_health = " + max_health + ", character_table.character_mana = " + mana +", character_table.character_max_mana = " + max_mana + ", "
        + "character_table.character_power = " + power + ", character_table.character_speed = " + speed + ", character_table.character_mind = " + mind + " " 
        + "where character_table.character_name = '" + name + "' ");
    }
};
