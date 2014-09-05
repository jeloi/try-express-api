var express = require('express');
var router = express.Router();

// Beer Model
var Beer     = require('../models/beer');

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

// on routes that end in /beers/:beer_id
// ----------------------------------------------------
router.route('/beers/:beer_id')

	// get the beer with that id (accessed at GET http://localhost:8080/api/beers/:beer_id)
	.get(function(req, res) {
		Beer.findById(req.params.beer_id, function(err, beer) {
			if (err)
				res.send(err);
			res.json(beer);
		});
	})

	// update the beer with this id (accessed at PUT http://localhost:8080/api/beers/:beer_id)
	.put(function(req, res) {
		Beer.findById(req.params.beer_id, function(err, beer) {
			if (err)
				res.send(err);
			if (!beer)
				res.json({message: 'No beer with that id found. Check yo label!'})
			beer.name = req.body.name

			beer.save(function(err) {
				console.log(err);
				if (err)
					res.send(err)
				res.json({message: 'Beer has been rebrewed!'})
			})
		})
	})

	// delete the beer with this id (accessed at DELETE http://localhost:8080/api/beers/:beer_id)
	.delete(function(req, res) {
		Beer.remove({
			_id: req.params.beer_id
		}, function(err, beer) {
			if (err)
				res.send(err)

			res.json({message: 'Successfully deleted the beer.'})
		})
	})



module.exports = router;

