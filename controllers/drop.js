var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Item = require(resolve('/GameWeb/models/item.js'));

var order = "asc"
var like = ""

router.get('/drop', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Item.selectItemsByMonsterWithOrder(request.query.monster, order, like).then(drops => {
                response.render("drop", {drops: drops[0], login: request.query.login, character: request.query.character, location: request.query.location, monster: request.query.monster, order: order});
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

router.post('/orderdrop', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/drop?login=" + request.query.login + "&character=" + request.query.character+ "&location=" + request.query.location+ "&monster=" + request.query.monster);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchdrop', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/drop?login=" + request.query.login + "&character=" + request.query.character+ "&location=" + request.query.location+ "&monster=" + request.query.monster);
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
