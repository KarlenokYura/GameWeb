var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Skill = require(resolve('/GameWeb/models/skill.js'));

var order = "asc"
var like = ""

router.get('/spell', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Skill.selectSkillsByMonsterWithOrder(request.query.monster, order, like).then(spells => {
                response.render("spell", {spells: spells[0], login: request.query.login, character: request.query.character, location: request.query.location, monster: request.query.monster, order: order});
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

router.post('/orderspell', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/spell?login=" + request.query.login + "&character=" + request.query.character+ "&location=" + request.query.location + "&monster=" + request.query.monster);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchspell', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/spell?login=" + request.query.login + "&character=" + request.query.character+ "&location=" + request.query.location + "&monster=" + request.query.monster);
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
