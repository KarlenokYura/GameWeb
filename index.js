var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cookies = require('cookie-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: null}));
app.use(cookies());

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

var loginRouter = require('./controllers/login');
var registerRouter = require('./controllers/register');
var userRouter = require('./controllers/user');
var characterRouter = require('./controllers/character');
var locationRouter = require('./controllers/location');
var itemRouter = require('./controllers/item');
var skillRouter = require('./controllers/skill');
var monsterRouter = require('./controllers/monster');
var npcRouter = require('./controllers/npc');
var dropRouter = require('./controllers/drop');
var spellRouter = require('./controllers/spell');
var attackRouter = require('./controllers/attack');

app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', userRouter);
app.use('/', characterRouter);
app.use('/', locationRouter);
app.use('/', itemRouter);
app.use('/', skillRouter);
app.use('/', monsterRouter);
app.use('/', npcRouter);
app.use('/', dropRouter);
app.use('/', spellRouter);
app.use('/', attackRouter);

var port = Number(process.env.PORT || 8000)
app.listen(port, function() {
  console.log('Listening on port ' + port)
})
