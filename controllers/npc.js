var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var NPC = require(resolve('/GameWeb/models/npc.js'));

var order = "asc"
var like = ""

router.get('/npc', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            NPC.selectNPCsByLocationWithOrder(request.query.location, order, like).then(npcs => {
                response.render("npc", {npcs: npcs[0], login: request.query.login, character: request.query.character, location: request.query.location, order: order});
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

router.post('/ordernpc', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            if (order === "asc") {
                order = "desc";
            }
            else {
                order = "asc";
            }
            response.redirect("/npc?login=" + request.query.login + "&character=" + request.query.character+ "&location=" + request.query.location);
        }
        else {
            response.redirect('/login');
        }
    }
    else {
        response.redirect('/login');
    }
});

router.post('/searchnpc', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            like = request.body.like;
            response.redirect("/npc?login=" + request.query.login + "&character=" + request.query.character+ "&location=" + request.query.location);
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
