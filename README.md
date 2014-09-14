A lil' Express API Example App
==============================

Just playing with Express to build a RESTful API that serves Beers.
Database used was a free sandbox MongoDB courtesy of [MongoLab](https://mongolab.com)

Routes served:

Route | HTTP Verb | Description
--- | --- | ---
/api/ | GET | Responds with { "message": "hooray! welcome to our api!" }
/api/beers | GET | Get all the beers
/api/beers | POST | Brew a delicious new beer
/api/beers/:beer_id | GET | Get a single beer
/api/beers/:beer_id | PUT | Update a beer with new info
/api/beers/:beer_id | DELETE | Delete a beer

For playing around with/testing API's, I recommend [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en)
