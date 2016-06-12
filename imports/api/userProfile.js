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
    userId: {
      type: String
    },
    userName: {
      type: String,
      max: 100
    },
    age:{
      type: Number
    },
    gender: {
      type: String,
      allowedValues: ['Male', 'Female']
    },
    height: {
      type: Number
    },
    weight: {
      type: Number
    },
    size: {
      type: String
    },
    ethnicGroup: {
      type: String,
      allowedValues: ['White','Black','Chinese','Japanese','Korean','Indian','Latino','Arab','Other']
    },
    isQuestionnaireTaken: {
      type: Boolean
    }
  });

//  UserProfileCollection.attachSchema(UserProfileCollection.schema);

  Meteor.publish("tote.userProfile", function () {
    return UserProfileCollection.find({});
  });

  Meteor.methods({
    "tote.userProfile.addProfile": function(userId) {
      //if (!Meteor.userId()) {
      //     throw new Meteor.Error('unauthorized');
     // }
      let newUserProfile = {};
      newUserProfile.userId = userId;
      newUserProfile.userName = 'N/A';
      newUserProfile.gender = '';
      newUserProfile.height = 0;
      newUserProfile.weight = 0;
      newUserProfile.size = '';
      newUserProfile.age = 0;
      newUserProfile.ethnicGroup = 'Other';
      newUserProfile.isQuestionnaireTaken = false;
      newUserProfile._id = UserProfileCollection.insert(newUserProfile, {removeEmptyStrings: false});
    },
    "tote.userProfile.updateInfo": function(height, weight, ethnicity, size, age) {

      UserProfileCollection.update({userId : Meteor.userId()}, {$set: {height: height,weight:weight,ethnicGroup: ethnicity, size: size, age: age, isQuestionnaireTaken: true}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.userProfile.updateName": function(name) {

      UserProfileCollection.update({userId : Meteor.userId()}, {$set: {userName: name}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    },
    "tote.userProfile.updateGender": function(gender) {

      UserProfileCollection.update({userId : Meteor.userId()}, {$set: {gender: gender}}, function (error, numDocChanged) {
        if (error) {
          throw new Meteor.Error(error);
        }
      });
    }


  });
}