var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var Location = require(resolve('/GameWeb/models/location.js'));

router.get('/location', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Location.selectLocationsByCharacter(request.query.character).then(locations => {
                var current, left, right, forward, back, top, bottom;
                locations[0].forEach(location => {
                    if (location.location_x_dir === 0 && location.location_y_dir === 0 && location.location_z_dir === 0) current = location;
                    else if (location.location_x_dir === -1 && location.location_y_dir === 0 && location.location_z_dir === 0) left = location;
                    else if (location.location_x_dir === 1 && location.location_y_dir === 0 && location.location_z_dir === 0) right = location;
                    else if (location.location_x_dir === 0 && location.location_y_dir === -1 && location.location_z_dir === 0) forward = location;
                    else if (location.location_x_dir === 0 && location.location_y_dir === 1 && location.location_z_dir === 0) back = location;
                    else if (location.location_x_dir === 0 && location.location_y_dir === 0 && location.location_z_dir === 1) top = location;
                    else if (location.location_x_dir === 0 && location.location_y_dir === 0 && location.location_z_dir === -1) bottom = location;
                });
                response.render("location", {current: current, left: left, right: right, forward: forward, back: back, top: top, bottom: bottom, 
                    login: request.query.login, character: request.query.character});
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

router.post('/changelocation', async (request, response) => {
    if(request.cookies.authorization) {
        if (request.query.login) {
            Location.changeLocation(request.query.character, request.body.id);
            response.redirect("/location?login=" + request.query.login + "&character=" + request.query.character);
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
