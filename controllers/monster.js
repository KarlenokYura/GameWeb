var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Monster = require(resolve('/GameWeb/models/monster.js'));

var order = "asc"
var like = ""

router.get('/monster', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Monster.selectMonstersByLocationWithOrder(request.query.location, order, like).then(monsters => {
                response.render("monster", {monsters: monsters[0], login: request.query.login, character: request.query.character, location: request.query.location, order: order});
            });
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/ordermonster', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/monster?login=" + request.query.login + "&character=" + request.query.character + "&location=" + request.query.location);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchmonster', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/monster?login=" + request.query.login + "&character=" + request.query.character + "&location=" + request.query.location);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.get('/checkmonster', (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Monster.findMonsterWithItems(request.query.monster).then(monster => {
                response.render("checkmonster", {monster: monster[0][0], login: request.query.login, character: request.query.character, location: request.query.location});
            });
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

module.exports = router;
