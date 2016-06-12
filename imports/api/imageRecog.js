import { HTTP } from "meteor/http";

// API Keys
var hpeAPIKey = "dc9a8b7d-8413-4615-8d28-b731ec01b899";
var clarifaiID = "WfikzkWvhIFgs7BXKq01pNeYyklRTCPELYqNcwBF";
var clarifaiSecret = "eJn_t3-WfzeGY37diKxTruPmvlN-OB--zuPzsPLn";
var clarifaiBaseUrl = "https://api.clarifai.com/v1/";

var imageUrl = "http://www.fellsman.org.uk/wp-content/uploads/2013/04/POLO-SHIRT-ROYAL-BLUE.jpg";

getAccessToken(imageUrl);

var getAccessToken = function(imgUrl) {
    var clarifaiToken = "";
    var tokenUrl = "https://api.clarifai.com/v1/token";
    console.log(tokenUrl);
    var data = {
      grant_type: "client_credentials",
      client_id: clarifaiID,
      client_secret: clarifaiSecret
    };
    /*var headers = {
      'Content-Type': 'form-data'
    };*/

    HTTP.post(tokenUrl, {data: data, headers : headers}, function(err,res) {
      console.log("hello");
      if (err) {
        console.log(err);
      } else {
        console.log(clarifaiToken);
        sendClarifaiRequest(imgUrl,clarifaiToken)
      }
    });
  } 

var sendClarifaiRequest = function(imgUrl, token) {
    var tagUrl = clarifaiBaseUrl + "tag";
    var tags = [];
    var data = {
      "url" : imgUrl
    }
    var headers = {
      "Authorization": 'Bearer '+ token
    }

    HTTP.post(tagUrl, {"data": data, "headers": headers}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(tags);
      }
    });

}

