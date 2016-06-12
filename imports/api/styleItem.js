/**
 * Created by lcc on 2016-06-12.
 */

/**
 * Created by lcc on 2016-06-11.
 */
import { Mongo } from 'meteor/mongo';
import { attachSchema } from 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const StyleItemCollection = new Mongo.Collection('tote.StyleItem');

if (Meteor.isServer) {
  StyleItemCollection.schema = new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    fashionStyle: {
      type: String
    },
    photoUrl: {
      type: [String],
      defaultValue:[]
    }
  });

  StyleItemCollection.attachSchema(StyleItemCollection.schema);

  Meteor.methods({
    "tote.fashionStyleItem.addItem": function(fashionStyle,url) {
      //if (!Meteor.userId()) {
      //     throw new Meteor.Error('unauthorized');
      // }
      let newItem = {};
      newItem.fashionStyle = fashionStyle;
      newItem.itemUrl = url;
      newItem._id = StyleItemCollection.insert(newItem);
    },
    "tote.fashionStyleItem.findItem":function(fashionStyle) {

      var result = StyleItemCollection.find({fashionStyle : fashionStyle}).fetch();
      console.log(result);
      return result;
    }


  });
}