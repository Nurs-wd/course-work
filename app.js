const express = require('express');
const BodyParser = require('body-parser');
const app = express();
const home = require('./routers/routerHome.js')
const session = require('express-session')
require('dotenv').config();
 
app.use(BodyParser.json());       // to support JSON-encoded bodies
app.use(BodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
  
app.use('/', home);

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.listen(port,(err) => {
    console.log('listening on port: ' + 'localhost:' + port);
    if (err) throw err
});

