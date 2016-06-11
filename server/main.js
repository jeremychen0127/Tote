import { Meteor } from 'meteor/meteor';
var Clarifai = require('clarifai');
var Haveondemand = require('havenondemand');

Meteor.startup(() => {
  // API Keys
  var hpeAPIKey = "dc9a8b7d-8413-4615-8d28-b731ec01b899";
  var clarifaiID = "WfikzkWvhIFgs7BXKq01pNeYyklRTCPELYqNcwBF";
  var clarifaiSecret = "eJn_t3-WfzeGY37diKxTruPmvlN-OB--zuPzsPLn";
  var clarifaiToken = "f6xSge2rF91T25y16VNOwLgoZbz7PB";

  var hpeCLient = new havenondemand.HODClient(hpeAPIKey);

  var clarifaiClient = new Clarifai({
    "id": clarifaiID,
    "secret": clarifaiSecret
  });

  // test image url
  var testImageurl = "../test-img/test-img.jpg";

  clarifaiClient.tagFromUrls('image', testImageurl, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
  })
});
