
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

mongoose.connect("mongodb://scamp94:database1@ds113736.mlab.com:13736/lab05-nasa", {useMongoClient: true}, function(err, db) {
    if (err)
        console.log('Connection error');
    else
        console.log('Connected');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Start server on port 3000
// It is important to start Node on a different port
var port = 3000;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});


//routing for nasa
router.get('/:key', function(req, res) {
    request({
        uri: "https://images-api.nasa.gov/search?q=mars%2011&description="+req.params.key+"&media_type=image",
        method: 'get'
    }, function(error, message){
        res.json(message);
    });
});

router.get('/', function(req, res){
    request({
        uri: "https://images-api.nasa.gov/search?media_type=image",
        method: 'get'
    }, function(error, message){
        res.json(message);
    });
})


//routing for database


app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);