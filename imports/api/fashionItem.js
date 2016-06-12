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

  Meteor.methods({
    "tote.FashionItem.addItem": function(userId,url) {
      //if (!Meteor.userId()) {
      //     throw new Meteor.Error('unauthorized');
      // }
      let newItem = {};
      newItem.userId = userId;
      newItem.itemUrl = url;

      newItem._id = FashionItemCollection.insert(newItem);
    },
    "tote.FashionItem.updateTags":function(tags) {

      FashionItemCollection.update({userId : Meteor.userId()}, {$set: {tags: tags}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    }


  });
}