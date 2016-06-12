import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Random } from 'meteor/random';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import BasicInfoQuestion from '../components/recommendations/BasicInfoQuestion';
import FemaleBagsQuestion from '../components/recommendations/FemaleBagsQuestion';
import FemaleBodyShapeQuestion from '../components/recommendations/FemaleBodyShapeQuestion';
import FemaleBrunchQuestion from '../components/recommendations/FemaleBrunchQuestion';
import FemaleCelebrityQuestion from '../components/recommendations/FemaleCelebrityQuestion';
import FemaleEverydayQuestion from '../components/recommendations/FemaleEverydayQuestion';
import FemaleLocationQuestion from '../components/recommendations/FemaleLocationQuestion';
import FemaleShoesQuestion from '../components/recommendations/FemaleShoesQuestion';
import FemaleShoeTypeQuestion from '../components/recommendations/FemaleShoeTypeQuestion';
import MaleCasualQuestion from '../components/recommendations/MaleCasualQuestion';
import MaleCologneQuestion from '../components/recommendations/MaleCologneQuestion';
import MaleDressyQuestion from '../components/recommendations/MaleDressyQuestion';
import MaleLocationQuestion from '../components/recommendations/MaleLocationQuestion';
import MalePantsQuestion from '../components/recommendations/MalePantsQuestion';
import MaleShoesQuestion from '../components/recommendations/MaleShoesQuestion';


import { UserProfileCollection } from '../../api/userProfile';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaireOpen: props.currentProfile ? !props.currentProfile.isQuestionnaireTaken : false,
      height: -1,
      weight: -1,
      ethnicity: '',
      size: '',
      age: -1,
      gender: '',
      femaleEveryday: '',
      femaleShoes: '',
      femaleLocation: '',
      femaleBrunch: '',
      femaleBags: '',
      femaleCelebrity: '',
      femaleBodyShape: '',
      currentStep: 0,
      finalStep: -1,
      recommendedStyle: null,
    };

    this.handleQuestionnaireSubmit = this.handleQuestionnaireSubmit.bind(this);

    this.handleQuestionnaireNext = () => {
//      if (this.state.currentStep === 0) {
//        Meteor.call("tote.userProfile.updateInfo", this.state.height, this.state.weight, this.state.ethnicity, this.state.size, this.state.age, this.state.gender);
//      }
      this.setState({currentStep: this.state.currentStep + 1});
    }

    this.handleQuestionnairePrev = () => this.setState({currentStep: this.state.currentStep - 1});

    this.handleQuestionnaireOpen = () => this.setState({questionnaireOpen: true});

    this.handleQuestionnaireClose = () => this.setState({questionnaireOpen: false});

    this.handleHeightChange = (event) => this.setState({height: Number(event.target.value)});

    this.handleWeightChange = (event) => this.setState({weight: Number(event.target.value)});

    this.handleSizeChange = (event, index, value) => this.setState({size: value});

    this.handleEthnicityChange = (event, index, value) => this.setState({ethnicity: value});

    this.handleAgeChange = (event) => this.setState({age: Number(event.target.value)});

    this.handleGenderChange = (event, index, value) => {
      if (value === 'male') {
        this.setState({finalStep: 6});
      } else {
        this.setState({finalStep: 7});
      }
      this.setState({gender: value});
    }

    this.handleFemaleEverydayChange = (event) => {
      this.setState({femaleEveryday: event.target.value});
    }
    this.handleFemaleShoesChange = (event)=> {
        this.setState({femaleShoes: event.target.value});
    }
    this.handleFemaleLocationChange = (event)=> {
        this.setState({femaleLocation: event.target.value});
    }
    this.handleFemaleBrunchChange = (event) => {
        this.setState({femaleBrunch: event.target.value});
    }
    this.handleFemaleBagsChange = (event) => {
        this.setState({femaleBags: event.target.value});
    }
    this.handleFemaleCelebrityChange = (event) => {
        this.setState({femaleCelebrity: event.target.value});
    }
    this.handleFemaleBodyShapeChange = (event) => {
        this.setState({femaleBodyShape: event.target.value});
    }

    this.isInputValid = () => {
//      console.log('h: ' + this.state.height > 0);
//      console.log('w: ' + this.state.weight > 0);
//      console.log('e: ' + !!this.state.ethnicity);
//      console.log('s: ' + !!this.state.size);
//      console.log('a: ' + this.state.age > 0);
//      console.log('g: ' + !!this.state.gender);
      console.log('1: ' + !!this.state.femaleEveryday);
      console.log('2: ' + !!this.state.femaleShoes);
      console.log('3: ' + !!this.state.femaleLocation);
      console.log('4: ' + !!this.state.femaleBrunch);
      console.log('5: ' + !!this.state.femaleBags);
      console.log('6: ' + !!this.state.femaleCelebrity);
      console.log('7: ' + !!this.state.femaleBodyShape);
      console.log('return:' + !!this.state.femaleEveryday &&
                                      !!this.state.femaleShoes &&
                                      !!this.state.femaleLocation &&
                                      !!this.state.femaleBrunch &&
                                      !!this.state.femaleBags &&
                                      !!this.state.femaleCelebrity &&
                                      !!this.state.femaleBodyShape)

//        this.state.height > 0 &&
//        this.state.weight > 0 &&
//        !!this.state.ethnicity &&
//        !!this.state.size &&
//        this.state.age > 0 &&
//        !!this.state.gender &&
      return
        !!this.state.femaleEveryday &&
        !!this.state.femaleShoes &&
        !!this.state.femaleLocation &&
        !!this.state.femaleBrunch &&
        !!this.state.femaleBags &&
        !!this.state.femaleCelebrity &&
        !!this.state.femaleBodyShape;
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  handleQuestionnaireSubmit() {
    let styles = ['chic', 'punc', 'tomboy', 'soph', 'sexy', 'cute'];
    let counts = [0, 0, 0, 0, 0, 0];

    counts[styles.indexOf(this.state.femaleEveryday)] += 1;
    counts[styles.indexOf(this.state.femaleShoes)] += 1;
    counts[styles.indexOf(this.state.femaleLocation)] += 1;
    counts[styles.indexOf(this.state.femaleBrunch)] += 1;
    counts[styles.indexOf(this.state.femaleBags)] += 1;
    counts[styles.indexOf(this.state.femaleCelebrity)] += 1;
    counts[styles.indexOf(this.state.femaleBodyShape)] += 1;

    let highest = Math.max(...counts);
    let highestStyle = styles[counts.indexOf(highest)];

    let result = Meteor.call("tote.fashionStyleItem.findItem", highestStyle);
    Meteor.call("tote.userProfile.updateIsQuestionnaireTaken");
    this.setState({questionnaireOpen: false, recommendedStyle: result});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentProfile) {
      this.setState({questionnaireOpen: !nextProps.currentProfile.isQuestionnaireTaken});
    } else {
      this.setState({questionnaireOpen: false});
    }
  }

  renderSteps() {
    let numSteps = 0;
    if (this.state.gender === 'male') {
      numSteps = 7;
    } else if (this.state.gender === 'female') {
      numSteps = 8;
    }

    let steps = [];

    while (numSteps) {
      steps.push(
        <Step key={Random.id()}>
          <StepLabel></StepLabel>
        </Step>
      );
      numSteps--;
    }

    return steps;
  }

  renderStepper() {
    return (
      <Stepper activeStep={this.state.currentStep}>
          {this.renderSteps()}
      </Stepper>
    );
  }

  renderQuestions() {
    if (this.state.currentStep === 0) {
      return <BasicInfoQuestion
        handleHeightChange={this.handleHeightChange}
        handleWeightChange={this.handleWeightChange}
        handleSizeChange={this.handleSizeChange}
        handleEthnicityChange={this.handleEthnicityChange}
        handleAgeChange={this.handleAgeChange}
        handleGenderChange={this.handleGenderChange}/>
    } else if (this.state.gender === 'female') {
      if (this.state.currentStep === 1) {
        return <FemaleEverydayQuestion handleFemaleEverydayChange={this.handleFemaleEverydayChange}/>
      }
      else if (this.state.currentStep == 2) {
        return <FemaleShoesQuestion handleFemaleShoesChange={this.handleFemaleShoesChange}/>
      }
      else if (this.state.currentStep == 3) {
        return <FemaleLocationQuestion handleFemaleLocationChange={this.handleFemaleLocationChange}/>
      }
      else if (this.state.currentStep == 4) {
        return <FemaleBrunchQuestion handleFemaleBrunchChange={this.handleFemaleBrunchChange}/>
      }
      else if (this.state.currentStep == 5) {
        return <FemaleBagsQuestion handleFemaleBagsChange={this.handleFemaleBagsChange}/>
      }
      else if (this.state.currentStep == 6) {
        return <FemaleCelebrityQuestion handleFemaleCelebrityChange = {this.handleFemaleCelebrityChange}/>
      }
      else if (this.state.currentStep == 7) {
        return <FemaleBodyShapeQuestion handleFemaleBodyShapeChange = {this.handleFemaleBodyShapeChange}/>
      }
    }
  }

  render() {
    const actions =
      this.state.currentStep === this.state.finalStep ?
        [
          <FlatButton
            label="Later"
            primary={true}
            onTouchTap={this.handleQuestionnaireClose}
          />,
          <FlatButton
            label="Back"
            primary={true}
            onTouchTap={this.handleQuestionnairePrev}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={this.isInputValid()}
            onTouchTap={this.handleQuestionnaireSubmit}
          />,
        ]
      :
        [
          <FlatButton
            label="Later"
            primary={true}
            onTouchTap={this.handleQuestionnaireClose}
          />,
          <FlatButton
            label="Back"
            primary={true}
            onTouchTap={this.handleQuestionnairePrev}
          />,
          <FlatButton
            label="Next"
            primary={true}
            onTouchTap={this.handleQuestionnaireNext}
          />,
        ];

    if (this.props.doneLoading) {
      return (
        <div>
          { this.props.currentProfile && this.props.currentProfile.isQuestionnaireTaken ?
            <div className="center">
              <br />
              <RaisedButton label="Redo Questionnaire" onTouchTap={this.handleQuestionnaireOpen} />
            </div>
            :
            <div className="center">
              <br />
              <RaisedButton label="Complete Questionnaire" onTouchTap={this.handleQuestionnaireOpen} />
            </div>
          }
          <Dialog
            title="Determine Your Style!"
            titleClassName="center"
            actions={actions}
            modal={true}
            open={this.state.questionnaireOpen}
            autoScrollBodyContent={true}>
              {this.renderQuestions()}
              {this.renderStepper()}
          </Dialog>
          <br />
          {
            this.state.recommendedStyle ?
              <div className="center">
                <img src={this.state.recommendedStyle[0].itemUrl} />
                <img src={this.state.recommendedStyle[1].itemUrl} />
                <img src={this.state.recommendedStyle[2].itemUrl} />
              </div>
            :
              ''
          }
        </div>
      );
    } else {
      return (
        <div className="center">
          <CircularProgress />
        </div>
      );
    }
  }
}

Recommendations.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  let handle = Meteor.subscribe('tote.userProfile');
  if (handle.ready()) {
    if (Meteor.userId()) {
      let currentProfile = UserProfileCollection.findOne({userId: Meteor.userId()});
      return {currentProfile: currentProfile, doneLoading: true};
    }
  }
  return {doneLoading: false};
}, Recommendations);
