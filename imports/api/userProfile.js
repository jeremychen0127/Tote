import { Mongo } from 'meteor/mongo';
import { attachSchema } from 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserProfileCollection = new Mongo.Collection('tote.UserProfile');

if (Meteor.isServer) {
  UserProfileCollection.schema = new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    type: {
      type: String,
      regEx: /.*\S.*/
    },
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    userName: {
      type: String,
      max: 100,
      regEx: /.*\S.*/
    },
    gender: {
      type: String,
      allowedValues: ['Male', 'Female'],
      optional: true
    },
    height: {
      type: Number,
      min: 40,
      max: 300
    },
    weight: {
      type: Number,
      min: 10,
      max: 300
    },
    ethnicGroup: {
      type: String,
      allowedValues: ['White','Black','Chinese','Japanese','Korean','Indian','Latino','Arab','Other']
    }
  });

  UserProfileCollection.attachSchema(UserProfileCollection.schema);

  Meteor.publish("tote.userProfile", function () {
    return UserProfileCollection.find({});
  });

  Meteor.methods({
    "tote.userProfile.addProfile"(profileObject) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('unauthorized');
      }
      UserProfileCollection.insert(profileObject, function (error, _id) {
        if (error) {
          throw new Meteor.Error(error);
        } else {
          profileObject._id = _id;
        }
      });
    },
    "tote.userProfile.updateName"(profileObjectId, name) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('unauthorized');
      }
      UserProfileCollection.update(profileObjectId, {$set: {userName: name}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.userProfile.updateGender"(profileObjectId, gender) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('unauthorized');
      }
      UserProfileCollection.update(profileObjectId, {$set: {gender: gender}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.userProfile.updateHeight"(profileObjectId, height) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('unauthorized');
      }
      UserProfileCollection.update(profileObjectId, {$set: {height: height}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.userProfile.updateWeight"(profileObjectId, weight) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('unauthorized');
      }
      UserProfileCollection.update(profileObjectId, {$set: {weight: weight}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.userProfile.updateEthnic"(profileObjectId, ethnic) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('unauthorized');
      }
      UserProfileCollection.update(profileObjectId, {$set: {ethnicGroup: ethnic}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    }


  });
}