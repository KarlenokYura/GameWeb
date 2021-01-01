
var express = require('express');
var router = express.Router();
const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });
var resolve = require('path').resolve;
var Character = require(resolve('/GameWeb/models/character.js'));
var Monster = require(resolve('/GameWeb/models/monster.js'));
var Item = require(resolve('/GameWeb/models/item.js'));

var character_exp = 0;

router.get('/attack', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {

            var character = await Character.findCharacterWithItems(request.query.login, request.query.character);
            var monster = await Monster.findMonsterWithItems(request.query.monster);
            var items = await Item.selectItemsByMonsterWithOrder(request.query.monster, "asc", "");

            server.on('connection', ws => {
                var monster_health = monster[0][0].monster_health + monster[0][0].item_health;
                var character_health = character[0][0].character_health + character[0][0].item_health;
                character_exp = character[0][0].character_exp;
                ws.on("message", message => {
                    server.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            if (JSON.parse(message).characterAttack !== undefined) {
                                monster_health -= Number(JSON.parse(message).characterAttack);
                                if (monster_health <= 0) {
                                    var exp = character_exp + monster[0][0].monster_level;
                                    if (exp > 2097152) exp = 2097152;
                                    var level = 1;
                                    if (exp < 4) level = 1;
                                    else if (exp >= 4 && exp < 8) level = 2;
                                    else if (exp >= 8 && exp < 16) level = 3;
                                    else if (exp >= 16 && exp < 32) level = 4;
                                    else if (exp >= 32 && exp < 64) level = 5;
                                    else if (exp >= 64 && exp < 128) level = 6;
                                    else if (exp >= 128 && exp < 256) level = 7;
                                    else if (exp >= 256 && exp < 512) level = 8;
                                    else if (exp >= 512 && exp < 1024) level = 9;
                                    else if (exp >= 1024 && exp < 2048) level = 10;
                                    else if (exp >= 2048 && exp < 4096) level = 11;
                                    else if (exp >= 4096 && exp < 8192) level = 12;
                                    else if (exp >= 8192 && exp < 16384) level = 13;
                                    else if (exp >= 16384 && exp < 32768) level = 14;
                                    else if (exp >= 32768 && exp < 65536) level = 15;
                                    else if (exp >= 65536 && exp < 131072) level = 16;
                                    else if (exp >= 131072 && exp < 262144) level = 17;
                                    else if (exp >= 262144 && exp < 524288) level = 18;
                                    else if (exp >= 524288 && exp < 1048576) level = 19;
                                    else if (exp >= 1048576 && exp < 2097152) level = 20;

                                    var health = 35 + 5 * level;
                                    var max_health = 35 + 5 * level;
                                    var mana = 15 + 5 * level;
                                    var max_mana = 15 + 5 * level;
                                    var power = 3 + 2 * level;
                                    var speed = 2 + level;
                                    var mind = 2 + level;

                                    Character.updateCharacterStats(request.query.character, level, exp, health, max_health, mana, max_mana, power, speed, mind);
                                    items[0].forEach(item => {
                                        if (Math.floor(Math.random() * 100) <= item.monster_item_chance) {
                                            Item.insertItem(character[0][0].character_id, item.item_id);
                                        }
                                    });

                                    ws.close();
                                }
                                else {
                                    client.send(JSON.stringify({monsterHealth: monster_health - monster[0][0].item_health}))
                                }
                            }
                            else if (JSON.parse(message).monsterAttack !== undefined) {
                                character_health -= Number(JSON.parse(message).monsterAttack)
                                if (character_health <= 0) {
                                    Character.deleteCharacter(character[0][0].character_id);
                                    ws.close();
                                }
                                else {
                                    client.send(JSON.stringify({characterHealth: character_health - character[0][0].item_health}))
                                }
                            }
                            else if (JSON.parse(message).characterRun !== undefined) {
                                ws.close();
                            }
                            else if (JSON.parse(message).monsterRun !== undefined) {
                                ws.close();
                            }
                        }
                    })
                })
                ws.on("close", () => {
                    delete monster_health;
                    delete character_health;
                    delete character_exp;
                })
            })
            response.render("attack", {login: request.query.login, character: character[0][0], location: request.query.location, monster: monster[0][0]})}
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

module.exports = router;
