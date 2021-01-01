var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Character = require(resolve('/GameWeb/models/character.js'));

var order = "asc"
var like = ""

router.get('/user', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Character.selectCharactersWithOrder(request.query.login, order, like).then(characters => {
                Character.countOfCharacters(request.query.login).then(count => {
                    var disabled = "";
                    var number = Number(JSON.stringify(count[0][0]).substr(4, 1));
                    if (number > 2) {
                        disabled = "disabled"
                    }
                    response.render("user", {characters: characters[0], login: request.query.login, disabled: disabled, order: order});
                });
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

router.post('/ordercharacter', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/user?login=" + request.query.login);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchcharacter', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/user?login=" + request.query.login);
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
