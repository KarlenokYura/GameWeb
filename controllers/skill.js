var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Skill = require(resolve('/GameWeb/models/skill.js'));

var order = "asc"
var like = ""

router.get('/skill', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Skill.selectSkillsByCharacterWithOrder(request.query.character, order, like).then(skills => {
                response.render("skill", {skills: skills[0], login: request.query.login, character: request.query.character, order: order});
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

router.post('/orderskill', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/skill?login=" + request.query.login + "&character=" + request.query.character);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchskill', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/skill?login=" + request.query.login + "&character=" + request.query.character);
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
