/**
 * Created by lcc on 2016-06-11.
 */
import { Mongo } from 'meteor/mongo';
import { attachSchema } from 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FashionItemCollection = new Mongo.Collection('tote.FashionItem');

if (Meteor.isServer) {
  FashionItemCollection.schema = new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    userId: {
      type: String
    },
    itemUrl: {
      type: String
    },
    tags: {
      type: [String],
      defaultValue: []
    }
  });

  FashionItemCollection.attachSchema(FashionItemCollection.schema);

  Meteor.publish("tote.FashionItem", function () {
    return FashionItemCollection.find({});
  });

  Meteor.methods({
    "tote.FashionItem.addItem": function(url, category) {
      //if (!Meteor.userId()) {
      //     throw new Meteor.Error('unauthorized');
      // }
      let newItem = {};
      newItem.userId = Meteor.userId();
      newItem.itemUrl = url;
      newItem.category = category;``
      newItem._id = FashionItemCollection.insert(newItem);
    },
    "tote.FashionItem.updateTags":function(tags) {

      FashionItemCollection.update({userId : Meteor.userId()}, {$set: {tags: tags}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.FashionItem.findItem":function() {

      var result = FashionItemCollection.find({userId : Meteor.userId()}).fetch();
      console.log(result);
      return result;


    }


  });
}