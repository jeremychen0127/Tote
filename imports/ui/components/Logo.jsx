import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AccountsUIWrapper from './accounts/AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';

export default class Logo extends Component {
  render() {
    return (
      <div className="row center">
        <div className="col m8 offset-m2 s12">
          <img src="/img/logo.png" height="100"/>
        </div>
        {
          this.props.currentUserId ?
            <div className="col m2">
              Hi, <AccountsUIWrapper />
            </div>
          :
            ''
        }
      </div>
    );
  }
}

export default createContainer(() => {
  return { currentUserId: Meteor.userId() };
}, Logo);