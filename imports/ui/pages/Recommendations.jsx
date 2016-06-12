import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { UserProfileCollection } from '../../api/userProfile';

const styles = {
  fieldLabel: {
    paddingLeft: '0px'
  }
};

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaireOpen: true,
      height: -1,
      weight: -1,
      ethnicity: '',
      size: '',
      age: -1,
    };

    this.handleQuestionnaireOpen = () => this.setState({questionnaireOpen: true});

    this.handleQuestionnaireClose = () => this.setState({questionnaireOpen: false});

    this.handleQuestionnaireSubmit = this.handleQuestionnaireSubmit.bind(this);

    this.handleHeightChange = (event) => this.setState({height: Number(event.target.value)});

    this.handleWeightChange = (event) => this.setState({weight: Number(event.target.value)});

    this.handleSizeChange = (event, index, value) => this.setState({size: value});

    this.handleEthnicityChange = (event, index, value) => this.setState({ethnicity: value});

    this.handleAgeChange = (event) => this.setState({age: Number(event.target.value)});

    this.isInputValid = () => {
      return this.state.height > 0 && this.state.weight > 0 && !!this.state.ethnicity && !!this.state.size && this.state.age > 0;
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  handleQuestionnaireSubmit() {
    Meteor.call("tote.userProfile.updateInfo", this.state.height, this.state.weight, this.state.ethnicity, this.state.size, this.state.age);
    this.setState({questionnaireOpen: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Later"
        primary={true}
        onTouchTap={this.handleQuestionnaireClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.isInputValid()}
        onTouchTap={this.handleQuestionnaireSubmit}
      />,
    ];

    return (
      <div>
        { this.props.currentProfile && this.props.currentProfile.isQuestionnaireTaken ?
          <div>
            <br />
            <RaisedButton label="Redo Questionnaire" onTouchTap={this.handleQuestionnaireOpen} />
          </div>
          :
          <Dialog
            title="Determine Your Style!"
            titleClassName="center"
            actions={actions}
            modal={true}
            open={this.state.questionnaireOpen}
            autoScrollBodyContent={true}>
              <br />
              <div className="row">
                <div className="col m6">
                  <label htmlFor="height" className="col m6 questionnaireLabel" style={styles.fieldLabel}>Your Height</label>
                  <input placeholder="e.g. 170" id="height" type="number" class="validate" onChange={this.handleHeightChange}/>
                </div>
                <div className="col m6">
                  <label htmlFor="weight" className="col m6 questionnaireLabel" style={styles.fieldLabel}>Your Weight</label>
                  <input placeholder="e.g. 60" id="weight" type="number" class="validate" onChange={this.handleWeightChange}/>
                </div>
              </div>
              <div className="row">

                <label htmlFor="size" className="col m6 questionnaireLabel">Shirt Size</label>
                <label htmlFor="ethnicity" className="col m6 questionnaireLabel">Ethnicity</label>
                <div>
                  <DropDownMenu
                    className="col m6"
                    anchorOrigin={{vertical: 'top'}}
                    value={this.state.size}
                    onChange={this.handleSizeChange}
                    autoWidth={false}>
                      <MenuItem value='xxs' primaryText="XXS" />
                      <MenuItem value='xs' primaryText="XS" />
                      <MenuItem value='s' primaryText="S" />
                      <MenuItem value='m' primaryText="M" />
                      <MenuItem value='l' primaryText="L" />
                      <MenuItem value='xl' primaryText="XL" />
                      <MenuItem value='xxl' primaryText="XXL" />
                  </DropDownMenu>
                </div>
                <div>
                  <DropDownMenu
                    className="col m6"
                    anchorOrigin={{vertical: 'top'}}
                    value={this.state.ethnicity}
                    onChange={this.handleEthnicityChange}
                    autoWidth={false}>
                      <MenuItem value='white' primaryText="White" />
                      <MenuItem value='black' primaryText="Black" />
                      <MenuItem value='chinese' primaryText="Chinese" />
                      <MenuItem value='japanese' primaryText="Japanese" />
                      <MenuItem value='korean' primaryText="Korean" />
                      <MenuItem value='indian' primaryText="Indian" />
                      <MenuItem value='latino' primaryText="Latino" />
                      <MenuItem value='arab' primaryText="Arab" />
                      <MenuItem value='other' primaryText="Other" />
                  </DropDownMenu>
                </div>
              </div>
              <div className="row">
                <div className="col m6">
                  <label htmlFor="age" className="col m6 questionnaireLabel" style={styles.fieldLabel}>Age</label>
                  <input placeholder="e.g. 25" id="weight" type="number" class="validate" onChange={this.handleAgeChange}/>
                </div>
              </div>
          </Dialog>
        }
      </div>
    );
  }
}

Recommendations.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  let handle = Meteor.subscribe('tote.userProfile');
  if (handle.ready()) {
    if (Meteor.userId()) {
      let currentProfile = UserProfileCollection.find({userId: Meteor.userId()});
      return {currentProfile: currentProfile};
    }
  }
  return {};
}, Recommendations);
