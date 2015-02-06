var Q = require('q');
var url = require('url');
var yelp = require('yelp').createClient({
 consumer_key: process.env.YELP_CONSUMER_KEY, 
 consumer_secret: process.env.YELP_CONSUMER_SECRET,
 token: process.env.YELP_TOKEN,
 token_secret: process.env.YELP_TOKEN_SECRET 
});

module.exports = {

  fetchYelp: function (req, res, next) {

    //Only call the Yelp API if the keys are defined
    if (process.env.YELP_CONSUMER_KEY) {
      var latLng = req.body.latitude+','+req.body.longitude;

      yelp.search(
      {
        ll: latLng,
        radius_filter: '75',
        limit: '10'
      },
      function(error, data){
        if(error){
          next(error);
        }else{
          var businesses = data.businesses;
          var outputObj = {};
          businesses.map(function(item, index, collection){
            outputObj[item.name] = item;
          });
          console.log('outputObj being sent to the client fromyelp Controller');
          console.log(outputObj);
          res.send(outputObj);
        }
      });
    } else {
      res.send({});
    }

  }
  //turns out we're already getting all the info we'd want in our search api call. 
  // getBusinessInfo: function(yelpId) {
  //   //Only call the Yelp API if the keys are defined
  //   if (process.env.YELP_CONSUMER_KEY) {
  //     //get the data for that business
  //     yelp.business(yelpId, function(error, data) {

  //       if(error){
  //         console.error('received an error from yelp.business request');
  //         console.error(error);
  //       }else{
  //         console.log('data from getBusinessInfo');
  //         console.log(data);
  //         return data;
  //       }
  //     });
  //   } else {
  //     console.error('no yelp consumer key defined');
  //   }

  // }
};
