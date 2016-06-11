import { Meteor } from 'meteor/meteor';
/*var Clarifai = require('clarifai');
var Havenondemand = require('havenondemand');*/

Meteor.startup(() => {
  // API Keys
  var hpeAPIKey = "dc9a8b7d-8413-4615-8d28-b731ec01b899";
  var clarifaiID = "WfikzkWvhIFgs7BXKq01pNeYyklRTCPELYqNcwBF";
  var clarifaiSecret = "eJn_t3-WfzeGY37diKxTruPmvlN-OB--zuPzsPLn";
  var clarifaiToken = "f6xSge2rF91T25y16VNOwLgoZbz7PB";
  var clarifaiBaseUrl = "https://api.clarifai.com/v1/";

  var clarifaiTokenData = {
    grant_type: 'client_credentials',
    client_id: clarifaiID,
    client_secret: clarifaiSecret
  };

  var imageUrl = "http://gloimg.rosewholesale.com/ROSE/2014/201408/goods-img/1407522188865-P-1924922.jpg";

  getClarifaiToken();
  getTagsFromUrl(imageUrl,clarifaiToken);



  /* Functions */

  function getClarifaiToken() {
    clarifaiBaseUrl += "token";
    HTTP.call('POST', clarifaiBaseUrl, {"data": clarifaiTokenData }, function(err,res) {
      if (err) {
        console.log("Error occurred " + err);
      } else {
        clarifaiToken = res;
      }
    });

  }

  function getTagsFromUrl(imgUrl, accessToken) {
    clarifaiBaseUrl += "tag";

    var data = {
      "url" : imgUrl
    };
    var headers = {
      "Authorization": 'Bearer '+ accessToken
    }
    console.log("url: " + imgUrl);

    HTTP.call("POST", clarifaiBaseUrl, {"data": data, "headers": headers }, function(err,res) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log(res);
      }
    });
  }
/*  var hpeCLient = new Havenondemand.HODClient(hpeAPIKey);

  var clarifaiClient = new Clarifai({
    id: clarifaiID,
    secret: clarifaiSecret
  });

  // test image url
  var testImageurl = "../test-img/test-img.jpg";

  clarifaiClient.tagFromUrls('image', testImageurl, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
  }) */


});
