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
  constructor(props) {
    super(props);
    this.handleSelectGender = (event) => {
      Meteor.call('tote.userProfile.updateGender', event.target.value);
      FlowRouter.go('recommendations');
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    return (
      <div>
        { !this.props.currentUserId ?
            <div className="center">
              <AccountsUIWrapper />
            </div>
          :
            <div>
              <br />
              <div className="row">
                <div className="col offset-m1 m4 s12 hoverable center genderButton" style={styles.genderButton}>
                  <Paper value="male" onClick={this.handleSelectGender}>
                    <br /><br />
                    <h2>Male</h2>
                    <br /><br />
                  </Paper>
                </div>
                <div className="col offset-m2 m4 s12 hoverable center genderButton" style={styles.genderButton}>
                  <Paper value="female" onClick={this.handleSelectGender}>
                    <br /><br />
                    <h2>Female</h2>
                    <br /><br />
                  </Paper>
                </div>
              </div>
            </div>
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