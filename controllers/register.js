var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var User = require(resolve('/GameWeb/models/user.js'));

router.get('/register', (request, response) => {
    response.render("register");
});

router.post('/register', async (request, response) => {
    var {login, password, name, surname} = request.body;
    User.countOfUsers(login).then(count => {
        if (count == 0) {
            User.createUser(login, password, name, surname)
            response.cookie("authorization", "X").redirect("/user?login=" + login);
        }
    });
});

module.exports = router;
