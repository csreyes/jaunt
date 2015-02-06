var Jaunt = require('./jauntModel.js');
var query = require('../utils/queryUtils.js');
// var yelpApi = require('../yelp/yelpController.js');
var Q = require('q');

module.exports = {

  fetchJaunts: function (req, res, next) {
	var find = Q.nbind(Jaunt.find, Jaunt);

	var dbQuery = query.dbQuery(req.query);

	find(dbQuery)
	  .then(function (jaunts) {
	    res.json(jaunts);
	  })
	  .fail(function (error) {
	    next(error);
	  });
  },

  newJaunt: function (req, res, next) {
		var createJaunt = Q.nbind(Jaunt.create, Jaunt);

		var newJaunt = req.body;
		// console.log('req.body inside jauntController.newJaunt',req.body);
		// console.log('req.body.stops inside jauntController.newJaunt', req.body.stops);

		createJaunt(newJaunt)
		  .then(function (createdJaunt) {
			  res.send("SAVED DER");
		  })
	    .fail(function (error) {
	      next(error);
	    });
	
  }

};
