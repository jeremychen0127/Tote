/**
 * Created by lcc on 2016-06-11.
 */
import { UserProfileCollection } from './userProfile.js';
import { Random } from 'meteor/random';

Meteor.methods({
  "tote.data_test.importData": function() {
    let newUserProfile = {};
    newUserProfile.userId = Random.id();
    newUserProfile.userName = 'Philip Chang';
    newUserProfile.gender = 'Male';
    newUserProfile.height = '183';
    newUserProfile.weight = '92';
    newUserProfile.size = 'L';
    newUserProfile.age = '20';
    newUserProfile.ethnicGroup = 'Chinese';
    newUserProfile.isQuestionnaireTaken = true;
    newUserProfile._id = UserProfileCollection.insert(newUserProfile, {removeEmptyString: false});

  }

   

  
});
