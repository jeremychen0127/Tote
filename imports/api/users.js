import { UserProfileCollection } from './userProfile';
import { FlowRouter } from 'meteor/kadira:flow-router';

if (Meteor.isServer) {
  Hooks.onLoggedIn = function (userId) {
    let oldUser = UserProfileCollection.findOne({userId: userId});
    if (!oldUser) {
      Meteor.call('tote.userProfile.addProfile', userId);
    }
  }

  Hooks.onLoggedOut = function (userId) {
    FlowRouter.go('index');
  }
}