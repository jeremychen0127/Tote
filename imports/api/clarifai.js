var request = require('request'),
  apiKey = 'acc_26b52201bd6a24a',
  apiSecret = '7fd8ac7f0cdd7173e23510d0fa422015',
  imageUrl = 'http://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';



Meteor.methods({
  "tote.clarifai.image": function(url) {
    request.get('https://api.imagga.com/v1/categorizers?url='+encodeURIComponent(url), function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    }).auth(apiKey, apiSecret, true);
  },
  "tote.clarifai.imageColor": function(url) {
    request.get('https://api.imagga.com/v1/colors?url='+encodeURIComponent(url), function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    }).auth(apiKey, apiSecret, true);
  }
});