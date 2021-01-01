var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));
var Race = require(resolve('/GameWeb/models/race.js'));
var Class = require(resolve('/GameWeb/models/class.js'));

var sequelize = new Sequelize(config);

class Skill extends Model{};
Skill.init(
    {
        skill_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        skill_name: {type: Sequelize.STRING, allowNull: false},
        skill_type: {type: Sequelize.STRING, allowNull: false},
        skill_race: {type: Sequelize.INTEGER, allowNull: false, references: {model: Race, key: "race_id"}},
        skill_class: {type: Sequelize.INTEGER, allowNull: false, references: {model: Class, key: "class_id"}},
        skill_health: {type: Sequelize.INTEGER, allowNull: false},
        skill_mana: {type: Sequelize.INTEGER, allowNull: false},
        skill_level: {type: Sequelize.INTEGER, allowNull: false},
        skill_image: {type: Sequelize.STRING, allowNull: false},
    }, {
        sequelize: sequelize,
        modelName: "Skill",
        tableName: "skill_table",
        timestamps: false
    }
)

module.exports = {
    selectSkills: () => {
        return Skill.findAll();
    },
    findSkill: (id) => {
        return Skill.findOne({
            where: {
              skill_id: id
            }
        });
    },
    selectSkillsByCharacter: (name) => {
        return sequelize.query("select character_item_table.character_item_id, item_table.item_name, item_table.item_type, " 
        + "item_table.item_health, item_table.item_mana, item_table.item_power, item_table.item_speed, item_table.item_mind, item_table.item_image "
        + "from character_item_table left join character_table on character_item_table.character_item_character = character_table.character_id "
        + "left join item_table on character_item_table.character_item_item = item_table.item_id "
        + "where character_table.character_name = '" + name + "'");
    },
    selectSkillsByCharacterWithOrder: (name, order, like) => {
        return sequelize.query("select skill_table.skill_name, skill_table.skill_type, race_table.race_name, class_table.class_name, "
        + "skill_table.skill_health, skill_table.skill_mana, skill_table.skill_level, skill_table.skill_image "
        + "from skill_table left join character_table on skill_table.skill_race = character_table.character_race and skill_table.skill_class = character_table.character_class "
        + "inner join race_table on skill_table.skill_race = race_table.race_id "
        + "inner join class_table on skill_table.skill_class = class_table.class_id "
        + "where character_table.character_name = '" + name + "' "
        + "and skill_table.skill_level <= (select character_table.character_level from character_table where character_table.character_name = '" + name + "') "
        + "and skill_table.skill_name like '" + like + "%' order by skill_name " + order);
    },
    selectSkillsByMonsterWithOrder: (name, order, like) => {
        return sequelize.query("select skill_table.skill_name, skill_table.skill_type, race_table.race_name, class_table.class_name, "
        + "skill_table.skill_health, skill_table.skill_mana, skill_table.skill_level, skill_table.skill_image "
        + "from skill_table left join monster_table on skill_table.skill_race = monster_table.monster_race and skill_table.skill_class = monster_table.monster_class "
        + "inner join race_table on skill_table.skill_race = race_table.race_id "
        + "inner join class_table on skill_table.skill_class = class_table.class_id "
        + "where monster_table.monster_name = '" + name + "' "
        + "and skill_table.skill_level <= (select monster_table.monster_level from monster_table where monster_table.monster_name = '" + name + "') "
        + "and skill_table.skill_name like '" + like + "%' order by skill_name " + order);
    }
};
