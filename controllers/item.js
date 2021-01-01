var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Item = require(resolve('/GameWeb/models/item.js'));

var order = "asc"
var like = ""

router.get('/item', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Item.selectItemsByCharacterWithOrder(request.query.character, order, like).then(items => {
                response.render("item", {items: items[0], login: request.query.login, character: request.query.character, order: order});
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

router.post('/orderitem', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/item?login=" + request.query.login + "&character=" + request.query.character);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchitem', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/item?login=" + request.query.login + "&character=" + request.query.character);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.get('/checkitem', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Item.findItemByCharacterItemId(request.query.item).then(item => {
                response.render("checkitem", {item: item[0][0], login: request.query.login, character: request.query.character, character_item_id: request.query.item});
            })
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.get('/deleteitem', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Item.deleteItemByCharacterItemId(request.query.item)
            response.redirect("/item?login=" + request.query.login + "&character=" + request.query.character)
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
