
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

var nev = require('email-verification')(mongoose);
var bcrypt = require ('bcrypt');

//database models
var users = require('./models/user');
var Collection = require('./models/collection');

//connect to database
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

//email verification
var myHasher = function(password, tempUserData, insertTempUser, callback) {
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    return insertTempUser(hash, tempUserData, callback);
};

// async version of hashing function
myHasher = function(password, tempUserData, insertTempUser, callback) {
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            return insertTempUser(hash, tempUserData, callback);
        });
    });
};



// NEV configuration =====================
nev.configure({
    persistentUserModel: users,
    expirationTime: 600, // 10 minutes

    verificationURL: 'http://localhost:8080/api/email-verification/${URL}',
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: '4networkinglabs@gmail.com',
            pass: 'networking'
        }
    },
    hashingFunction: myHasher,
    passwordFieldName: 'password'
}, function(err, options) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(users, function(err, tempUserModel) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

router.post('/signUp', function(req, res) {
    console.log('post data received');
    var email = req.body.email;
    var password = req.body.password;

    //hash password


    // register button was clicked
    if (req.body.type === 'register') {

        var newUser = new users({
            email: email,
            password: password,
            collections: []
        });


        nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
            if (err) {
                return res.status(404).send('ERROR: creating temp user FAILED');
            }

            // user already exists in persistent collection
            if (existingPersistentUser) {
                console.log('user already exists');
                return res.json({
                    msg: 'You have already signed up and confirmed your account. Did you forget your password?'
                });
            }

            // new user created
            if (newTempUser) {
                console.log('new user created');

                var URL = newTempUser[nev.options.URLFieldName];

                nev.sendVerificationEmail(email, URL, function(err, info) {
                    if (err) {
                        return res.status(404).send('ERROR: sending verification email FAILED');
                    }
                    console.log('sending verification email');
                    res.json({
                        msg: 'An email has been sent to you. Please check it to verify your account.',
                        info: info
                    });
                });

                // user already exists in temporary collection!
            } else {
                res.json({
                    msg: 'You have already signed up. Please check your email to verify your account.'
                });
            }
        });

        // resend verification button was clicked
    } else {
        nev.resendVerificationEmail(email, function(err, userFound) {
            if (err) {
                return res.status(404).send('ERROR: resending verification email FAILED');
            }
            if (userFound) {
                res.json({
                    msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                });
            } else {
                res.json({
                    msg: 'Your verification code has expired. Please sign up again.'
                });
            }
        });
    }
});


// user accesses the link that is sent
router.get('/email-verification/:URL', function(req, res) {
    var url = req.params.URL;

    nev.confirmTempUser(url, function(err, user) {
        if (user) {
            nev.sendConfirmationEmail(user.email, function(err, info) {
                if (err) {
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                else {
                    console.log('confirmed');
                    res.json({
                        msg: 'CONFIRMED!',
                        info: info
                    });
                }
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
});



//routing for nasa
router.get('/search/:key', function(req, res) {
    request({
        uri: "https://images-api.nasa.gov/search?q="+req.params.key+"&media_type=image",
        method: 'get'
    }, function(error, message){
        res.json(message);
    });
});

router.get('/search/', function(req, res){
    request({
        uri: "https://images-api.nasa.gov/search?media_type=image",
        method: 'get'
    }, function(error, message){
        res.json(message);
    });
});

//routing for database
router.get('/collections', function(req,res){
    Collection.find()

});

router.post('/createCollection', function(req, res){
    var collection = new Collection();
    collection.name = req.body.name;
    collection.privacy = req.body.privacy;
    collection.owner = req.body.owner;
    collection.description = req.body.description;

    collection.save(function(err){
        if(err)
            res.send(err);

        res.json({message: 'Collection created!'});
    })
});

//check login credentials
router.get('/login?:query', function (req, res){

    if(req.header('authentication') === 'false') {
        users.find({"email": req.query.email}, function (err, userList) {
            if (err)
                res.send(err);

            //check password
            bcrypt.compare(req.query.password, userList[0].password, function(err, result){
            if(result === true)
                res.send(userList);
            else
                res.send({message: 'Incorrect Username or Password'});
            });
        })
    }else{
        res.send({message: 'You are already signed in!'});
    }


});

//page routing


app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);