// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// connect to the database
mongoose.connect('mongodb://node:node@ds035270.mongolab.com:35270/beers-api'); 

// Beer Model
var Beer     = require('./app/models/beer');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/beers')

	// create a beer (accessed at POST http://localhost:8080/api/beers)
	.post(function(req, res) {
		var beer = new Beer(); 		// create a new instance of the beer model
		beer.name = req.body.name;  // set the beers name (comes from the request)

		// save the beer and check for errors
		beer.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'beer created!' });
		});
	})

	// get all the beers (accessed at POST http://localhost:8080/api/beers)
	.get(function(req, res) {
		Beer.find(function(err, beers) {
			if (err)
				res.send(err);

			res.json(beers);
		})
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
