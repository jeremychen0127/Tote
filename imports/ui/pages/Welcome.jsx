import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

const styles = {
  genderButton: {
    padding: '0px'
  }
};

class Welcome extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUserId) {
      FlowRouter.go('/recommendations');
    }
  }

  render() {
    return (
      <div>
        { !this.props.currentUserId ?
            <div className="center">
              <AccountsUIWrapper />
            </div>
          :
            ''
        }
      </div>
    );
  }
}

Welcome.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { currentUserId: Meteor.userId() };
}, Welcome);