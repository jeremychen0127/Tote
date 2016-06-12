/**
 * Created by lcc on 2016-06-11.
 */
var havenondemand = require('havenondemand');
var util = require('util');
var client = new havenondemand.HODClient('dc9a8b7d-8413-4615-8d28-b731ec01b899');
var callback = function(err,resp,body){
  console.log(body)
};

Meteor.methods({
  "tote.havenondemand.analyzesentiment": function() {
    var data = {'text' : 'damn you mother fucker'};
    client.call('analyzesentiment', callback, data);
  },
  "tote.havenondemand.trainmachine": function() {
    var serviceName = 'fashionService';
    //var predictionField = ['upper_garment_type','upper_garment_color','lower_garment_type','lower_garment_color'];
    var predictionField = 'clothing_style';
    var url = "https://raw.githubusercontent.com/jeremychen0127/tote/master/public/data/fashionDataSet.csv";
    var format = 'csv';
    var jobID;
    var dataTrainPredictor = {url: url, prediction_field: predictionField, service_name: serviceName};
    client.call('trainpredictor', dataTrainPredictor, true, function(err, resp, body) {
      jobID = resp.body.jobID;
      console.log(resp.body);
    })
  },
  "tote.havenondemand.prefictdata": function(gender,height,age,weight,ethnicGroup,size) {
    var serviceName = 'fashionService';
    var rows = {row:[]};
    rows.row.push(String(gender));
    rows.row.push(Number(height));
    rows.row.push(Number(age));
    rows.row.push(Number(weight));
    rows.row.push(String(ethnicGroup));
    rows.row.push(String(size));

    var fashionPredict = {
      name:"name",
      fields:[
        {name:"gender",type:"RICH_TEXT"},
        {name:"height",type:"INTEGER"},
        {name:"age",type:"INTEGER"},
        {name:"weight",type:"INTEGER"},
        {name:"ethnicGroup",type:"RICH_TEXT"},
        {name:"size",type:"RICH_TEXT"},
        {name:"clothing_style",type:"RICH_TEXT"}
      ],
      values:[]
    };
    fashionPredict.values.push(rows);
    console.log(fashionPredict);
    console.log(typeof fashionPredict);
    var format = 'json';
    var dataPredict = {json : fashionPredict, service_name: serviceName, format: format};
    client.call('predict', dataPredict, function(err, resp) {
      console.log(util.inspect(resp.body, false, null));
    })

  }
});