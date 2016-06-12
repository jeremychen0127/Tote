import { HTTP } from "meteor/http";

// API Keys
var hpeAPIKey = "dc9a8b7d-8413-4615-8d28-b731ec01b899";
var clarifaiID = "WfikzkWvhIFgs7BXKq01pNeYyklRTCPELYqNcwBF";
var clarifaiSecret = "eJn_t3-WfzeGY37diKxTruPmvlN-OB--zuPzsPLn";
var clarifaiToken = "";
var clarifaiBaseUrl = "https://api.clarifai.com/v1/";
Future = Npm.require('fibers/future');


Meteor.methods({
  "tote.imageRecog.getAccessToken" : function() {
    var tokenUrl = "https://api.clarifai.com/v1/token";
    var fut = new Future();
    console.log(tokenUrl);
    var data = {
      grant_type: "client_credentials",
      client_id: clarifaiID,
      client_secret: clarifaiSecret
    };
    var headers = {
      'Content-Type': 'form-data'
    };

    HTTP.post(tokenUrl, {data: data, headers : headers}, function(err,res) {
      console.log("hello");
      if (err) {
        fut.throw(err);
      } else {
        console.log(clarifaiToken);
        clarifaiToken = fut.return(res);
      }
    });
    return fut.wait();
  },
  "tote.imageRecog.postClarifaiRequest": function(imgUrl) {
    var fut = new Future();
    var tagUrl = clarifaiBaseUrl + "tag";
    var tags = [];
    var data = {
      "url" : imgUrl
    }
    var headers = {
      "Authorization": 'Bearer '+ accessToken
    }
    console.log("url: " + imgUrl);
    HTTP.post(tagUrl, {"data": data, "headers": headers}, function(err, res) {
      if (err) {
        fut.throw(err);
      } else {
        tags = fut.return(res);
        console.log(tags);
      }
    });
    return fut.wait();
  }
});
