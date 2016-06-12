import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  fieldLabel: {
    paddingLeft: '0px'
  }
};

export default class BasicInfoQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethnicity: '',
      size: '',
      gender: ''
    };

    this.handleSizeChange = (event, index, value) => {
      this.setState({size: value});
      props.handleSizeChange(event, index, value);
    }

    this.handleEthnicityChange = (event, index, value) => {
      this.setState({ethnicity: value});
      props.handleEthnicityChange(event, index, value);
    }

    this.handleGenderChange = (event, index, value) => {
      this.setState({gender: value});
      props.handleGenderChange(event, index, value);
    }
  }

  render() {
    return (
      <div>
        <br />
        <div className="row">
          <div className="col m6">
            <label htmlFor="height" className="col m6 questionnaireLabel" style={styles.fieldLabel}>Your Height</label>
            <input placeholder="e.g. 170" id="height" type="number" class="validate" onChange={this.props.handleHeightChange}/>
          </div>
          <div className="col m6">
            <label htmlFor="weight" className="col m6 questionnaireLabel" style={styles.fieldLabel}>Your Weight</label>
            <input placeholder="e.g. 60" id="weight" type="number" class="validate" onChange={this.props.handleWeightChange}/>
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
            <input placeholder="e.g. 25" id="age" type="number" class="validate" onChange={this.props.handleAgeChange}/>
          </div>
          <label htmlFor="gender" className="col m6 questionnaireLabel" style={styles.fieldLabel}>Gender</label>
          <div>
            <DropDownMenu
              className="col m6"
              anchorOrigin={{vertical: 'top'}}
              value={this.state.gender}
              onChange={this.handleGenderChange}
              autoWidth={false}>
                <MenuItem value='male' primaryText="Male" />
                <MenuItem value='female' primaryText="Female" />
            </DropDownMenu>
          </div>
        </div>
      </div>
    );
  }
}

BasicInfoQuestion.propTypes = {
  handleHeightChange: React.PropTypes.func.isRequired,
  handleWeightChange: React.PropTypes.func.isRequired,
  handleSizeChange: React.PropTypes.func.isRequired,
  handleEthnicityChange: React.PropTypes.func.isRequired,
  handleAgeChange: React.PropTypes.func.isRequired,
  handleGenderChange: React.PropTypes.func.isRequired
}