const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const nunjucks = require('nunjucks')
const fs = require('fs')
var app = express();
var models = require('./models')
var routes = require('./routes/index.js')

let env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(routes)

app.get('/', function (req, res) {
    res.render('index.html')
})


// app.get("/wiki/", function (req,res){
//     res.render('')
// })

// models.User.sync({})
// .then(function () {
//     return models.Page.sync({})
// })
// .then(function () {
//     app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
//     });
// })
// .catch(console.error);

models.db.sync({force: true})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);