var express = require('express');
var router = express.Router();
var resolve = require('path').resolve;
var User = require(resolve('/GameWeb/models/user.js'));

router.get('/login', (request, response) => {
    response.render("login")
});

router.post('/login', (request, response) => {
    var {login, password} = request.body;
    User.findUser(login).then(function(result) {
        var user = JSON.stringify(result);
        if (user !== "null") {
            if (JSON.parse(user).user_password === password) {
                response.cookie("authorization", "X").redirect("/user?login=" + login);
            }
        }
    });
});

router.get('/logout', (request, response)=>{
    response.clearCookie('authorization');
    response.redirect('/login')
});

module.exports = router;
