var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var User = require(resolve('/GameWeb/models/user.js'));
var Character = require(resolve('/GameWeb/models/character.js'));
var Race = require(resolve('/GameWeb/models/race.js'));
var Class = require(resolve('/GameWeb/models/class.js'));
var RaceClass = require(resolve('/GameWeb/models/race_class.js'));

router.get('/createcharacter', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Race.selectRacesWithId().then(races => {
                Class.selectClassesWithId().then(classes => {
                    response.render("createcharacter", {
                        races: races[0], classes: classes[0], login: request.query.login
                    });
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

router.post('/createcharacter', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            User.findUser(request.query.login).then(user => {
                Race.findLocationByRace(request.query.race).then(location => {
                    Character.createCharacter(JSON.parse(JSON.stringify(user)).user_id, request.query.name, request.query.race, request.query.class, location[0][0].location_id);
                    response.redirect("/user?login=" + request.query.login)
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

router.post('/loadcharacterimage', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            RaceClass.findRaceClass(request.query.race, request.query.class).then(race_class => {
                response.send(race_class.race_class_image);
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

router.get('/character', (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Character.findCharacterWithItems(request.query.login, request.query.character).then(character => {
                response.render("character", {character: character[0][0], login: request.query.login});
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

router.get('/deletecharacter', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Character.findCharacter(request.query.login, request.query.character).then(character => {
                Character.deleteCharacter(character[0][0].character_id);
                response.redirect("/user?login=" + request.query.login)
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

router.get('/updatecharacter', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Character.findCharacter(request.query.login, request.query.old).then(character => {
                Character.updateCharacter(character[0][0].character_id, request.query.new);
                response.redirect("/character?login=" + request.query.login + "&character=" + request.query.new)
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
