var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var resolve = require('path').resolve;
var config = require(resolve('/GameWeb/config/database.js'));

var sequelize = new Sequelize(config);

class Item extends Model{};
Item.init(
    {
        item_id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
        item_name: {type: Sequelize.STRING, allowNull: false},
        item_type: {type: Sequelize.STRING, allowNull: false},
    }, {
        sequelize: sequelize,
        modelName: "Item",
        tableName: "item_table",
        timestamps: false
    }
)

module.exports = {
    selectItems: () => {
        return Item.findAll();
    },
    findItem: (id) => {
        return Item.findOne({
            where: {
              item_id: id
            }
        });
    },
    selectItemsByCharacter: (name) => {
        return sequelize.query("select character_item_table.character_item_id, item_table.item_name, item_table.item_type, " 
        + "item_table.item_health, item_table.item_mana, item_table.item_power, item_table.item_speed, item_table.item_mind, item_table.item_image "
        + "from character_item_table left join character_table on character_item_table.character_item_character = character_table.character_id "
        + "left join item_table on character_item_table.character_item_item = item_table.item_id "
        + "where character_table.character_name = '" + name + "'");
    },
    findItemByCharacterItemId: (id) => {
        return sequelize.query("select item_table.item_name, item_table.item_type, item_table.item_health, item_table.item_mana, "
        + "item_table.item_power, item_table.item_speed, item_table.item_mind, item_table.item_image "
        + "from character_item_table left join item_table on character_item_table.character_item_item = item_table.item_id "
        + "where character_item_table.character_item_id = " + id);
    },
    deleteItemByCharacterItemId: (id) => {
        return sequelize.query("delete character_item_table where character_item_id = " + id);
    },
    selectItemsByCharacterWithOrder: (name, order, like) => {
        return sequelize.query("select character_item_table.character_item_id, item_table.item_name, item_table.item_type, " 
        + "item_table.item_health, item_table.item_mana, item_table.item_power, item_table.item_speed, item_table.item_mind, item_table.item_image "
        + "from character_item_table left join character_table on character_item_table.character_item_character = character_table.character_id "
        + "left join item_table on character_item_table.character_item_item = item_table.item_id "
        + "where character_table.character_name = '" + name + "' and item_table.item_name like '" + like + "%' order by item_name " + order);
    },
    selectItemsByMonsterWithOrder: (name, order, like) => {
        return sequelize.query("select monster_item_table.monster_item_id, item_table.item_id, item_table.item_name, item_table.item_type, monster_item_table.monster_item_chance, " 
        + "item_table.item_health, item_table.item_mana, item_table.item_power, item_table.item_speed, item_table.item_mind, item_table.item_image "
        + "from monster_item_table left join monster_table on monster_item_table.monster_item_monster = monster_table.monster_id "
        + "left join item_table on monster_item_table.monster_item_item = item_table.item_id "
        + "where monster_table.monster_name = '" + name + "' and item_table.item_name like '" + like + "%' order by item_name " + order);
    },
    insertItem: (character, item) => {
        return sequelize.query("insert into character_item_table (character_item_character, character_item_item) values (" + character + ", " + item + ")");
    }
};
